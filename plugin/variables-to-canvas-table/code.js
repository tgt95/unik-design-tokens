// Figma Plugin: Print: Variables → Table (v2.8.1) - dynamic-page compat
// Fix: replace `catch {}` with `catch (e) {}` to avoid syntax error in some runtimes
//
// High-level flow:
// 1. `init()` runs on plugin start → loads all collections/variables and
//    sends a summary to the UI (collection name, modes, count).
// 2. In the UI, you select collections + unit options and click "Print to Canvas".
// 3. UI sends a `PRINT_SELECTED` message with selected collection IDs + unit config.
// 4. `figma.ui.onmessage` receives this → calls `loadFonts()` then `buildTable()`.
// 5. `buildTable()` creates a big table frame, grouped by collection, and
//    for each variable prints type, token name, values per mode, alias info,
//    color swatches, or unit-converted float values.
// 6. NEW: inside the main table we create two Auto Layout groups:
//      - Header: title/subtitle + column header row
//      - Body:   all section rows + token rows
//    And we name layers semantically instead of "Frame".

// ---------------------------------------------------------------------------
// FONT CONFIGURATION + LOADING
// ---------------------------------------------------------------------------

var FONT_MAIN = { family: 'Space Mono', style: 'Regular' }
var FONT_BOLD = { family: 'Space Mono', style: 'Bold' }
var FALLBACK_MAIN = { family: 'Inter', style: 'Regular' }
var FALLBACK_BOLD = { family: 'Inter', style: 'Bold' }

// Load fonts before we write any text nodes.
// Try Space Mono first; if that fails, fall back to Inter.
async function loadFonts() {
  var okMain = true,
    okBold = true
  try {
    await figma.loadFontAsync(FONT_MAIN)
  } catch (e) {
    okMain = false
  }
  try {
    await figma.loadFontAsync(FONT_BOLD)
  } catch (e) {
    okBold = false
  }
  if (!okMain || !okBold) {
    // If Space Mono isn't available, switch to Inter and load it.
    FONT_MAIN = FALLBACK_MAIN
    FONT_BOLD = FALLBACK_BOLD
    try {
      await figma.loadFontAsync(FONT_MAIN)
    } catch (e) {}
    try {
      await figma.loadFontAsync(FONT_BOLD)
    } catch (e) {}
  }
}

// ---------------------------------------------------------------------------
// LOW-LEVEL UTILS (COLORS, NAMES, NUMBERS)
// ---------------------------------------------------------------------------

// Convert a Figma RGBA object to a fill paint.
function rgbaToPaint(rgba) {
  var opacity = rgba && typeof rgba.a === 'number' ? rgba.a : 1
  return [{ type: 'SOLID', color: { r: rgba.r, g: rgba.g, b: rgba.b }, opacity: opacity }]
}

// Quick checker that a value looks like a Figma RGBA object.
function isRGBA(v) {
  return v && typeof v === 'object' && 'r' in v && 'g' in v && 'b' in v
}

// Convert RGBA (0..1 floats) into a hex string #RRGGBB.
function rgbaToHex(v) {
  var r = Math.round(v.r * 255),
    g = Math.round(v.g * 255),
    b = Math.round(v.b * 255)
  return (
    '#' +
    [r, g, b]
      .map(function (n) {
        return n.toString(16).padStart(2, '0')
      })
      .join('')
      .toUpperCase()
  )
}

// Turn a Figma variable name (with /) into CSS custom prop style (--x-y-z).
function cssTokenNameFromVarName(name) {
  return '--' + String(name || '').replace(/\//g, '-')
}

// Turn a Figma variable name into a dot-notation name (for alias display).
function dotNameFromVarName(name) {
  return String(name || '').replace(/\//g, '.')
}

// Round a number to 3 decimal places.
function round3(n) {
  return Math.round(n * 1000) / 1000
}

// ---------------------------------------------------------------------------
// TEXT + TABLE CELLS
// ---------------------------------------------------------------------------

// Make a text node with common styling.
// IMPORTANT: set `fontName` before `characters` to avoid font errors.
function makeText(str, opts) {
  opts = opts || {}
  var t = figma.createText()
  t.fontName = opts.bold ? FONT_BOLD : FONT_MAIN
  t.fontSize = typeof opts.fontSize === 'number' ? opts.fontSize : 12
  t.fills = [{ type: 'SOLID', color: { r: 0.12, g: 0.12, b: 0.12 } }]
  t.opacity = typeof opts.opacity === 'number' ? opts.opacity : 1
  t.textAutoResize = opts.textAutoResize || 'WIDTH_AND_HEIGHT'
  t.characters = str == null ? '' : String(str)
  return t
}

// Make a horizontal row frame that will contain cells.
function makeRow(columns) {
  columns = columns || []
  var row = figma.createFrame()
  row.layoutMode = 'HORIZONTAL'
  row.itemSpacing = 16
  row.counterAxisAlignItems = 'MIN'
  row.primaryAxisSizingMode = 'AUTO'
  row.counterAxisSizingMode = 'AUTO'
  row.paddingLeft = row.paddingRight = 16
  row.paddingTop = row.paddingBottom = 12
  row.strokes = [{ type: 'SOLID', color: { r: 0.92, g: 0.92, b: 0.92 } }]
  row.strokeWeight = 1
  row.strokeTopWeight = 0
  for (var i = 0; i < columns.length; i++) {
    var n = columns[i]
    if (n) row.appendChild(n)
  }
  return row
}

// Make a single table cell with fixed width and optional alignment.
function makeCell(node, width, align) {
  node.layoutGrow = 1 // Make the children node fill along the width of the parent (autolayout mode)
  width = typeof width === 'number' ? width : 220
  align = align || 'MIN'
  var cell = figma.createFrame()
  cell.layoutMode = 'HORIZONTAL'
  cell.counterAxisAlignItems = 'CENTER'
  cell.primaryAxisSizingMode = 'FIXED'
  cell.counterAxisSizingMode = 'AUTO'
  cell.resizeWithoutConstraints(width, 32)
  cell.fills = []
  if (node) cell.appendChild(node)
  if (align === 'CENTER') cell.primaryAxisAlignItems = 'CENTER'
  if (align === 'MAX') cell.primaryAxisAlignItems = 'MAX'
  return cell
}

// ---------------------------------------------------------------------------
// ALIAS CHAIN RESOLUTION
// ---------------------------------------------------------------------------
// A variable value can be a VARIABLE_ALIAS, pointing to another variable.
// This walks through aliases (for a specific mode name) until it reaches a
// final, non-alias value. It also collects the alias chain names for display.
function getAliasChainByModeName(allById, collectionsById, startModeName, initialValue) {
  var names = []
  var current = initialValue
  var guard = 0

  // Given a collection ID and a mode *name*, find the matching modeId.
  function getModeIdForCollectionByName(collectionId, modeName) {
    var col = collectionsById[collectionId]
    if (!col) return null
    for (var i = 0; i < col.modes.length; i++) if (col.modes[i].name === modeName) return col.modes[i].modeId
    return col.modes.length ? col.modes[0].modeId : null
  }

  // Follow VARIABLE_ALIAS pointers, up to a safety guard (100 steps).
  while (current && typeof current === 'object' && current.type === 'VARIABLE_ALIAS' && guard < 100) {
    var targetVar = allById[current.id]
    if (!targetVar) break
    names.push(dotNameFromVarName(targetVar.name))
    var targetModeId = getModeIdForCollectionByName(targetVar.variableCollectionId, startModeName)
    if (!targetModeId) break
    current = targetVar.valuesByMode[targetModeId]
    guard++
  }
  return { names: names, final: current }
}

// ---------------------------------------------------------------------------
// FLOAT + UNIT RENDERING
// ---------------------------------------------------------------------------

// Generate an array of strings representing conversions of a float
// (e.g. ["16px", "1rem", "1em", "100%", "16", ...]) depending on selected units.
function floatUnitsList(n, u) {
  var out = []
  var base = u && typeof u.basePxForRemEm === 'number' ? u.basePxForRemEm : 16
  var pct = u && typeof u.percentOf === 'number' ? u.percentOf : 1
  if (u && u.showPx) out.push(round3(n) + 'px')
  if (u && u.showRem) out.push(round3(n / base) + 'rem')
  if (u && u.showEm) out.push(round3(n / base) + 'em')
  if (u && u.showPercent) out.push(round3((n / pct) * 100) + '%')
  if (u && u.showMs) out.push(round3(n) + 'ms')
  if (u && u.showS) out.push(round3(n / 1000) + 's')
  out.push(String(round3(n)))
  return out
}

// Create a horizontal row showing all float unit conversions.
function makeUnitsRow(val, u) {
  var row = figma.createFrame()
  row.layoutMode = 'HORIZONTAL'
  row.counterAxisAlignItems = 'CENTER'
  row.primaryAxisSizingMode = 'AUTO'
  row.counterAxisSizingMode = 'AUTO'
  row.itemSpacing = 12
  row.fills = []
  var arr = floatUnitsList(val, u)
  for (var i = 0; i < arr.length; i++) row.appendChild(makeText(arr[i], { fontSize: 12, opacity: 0.9 }))
  return row
}

// ---------------------------------------------------------------------------
// COLOR SWATCH + HEX ROW
// ---------------------------------------------------------------------------

// For color variables: draw a swatch + hex code (or "—" if missing).
function makeColorRow(raw, res) {
  var rectContainer = figma.createFrame()
  rectContainer.resizeWithoutConstraints(12, 12)
  rectContainer.cornerRadius = 4
  rectContainer.strokes = [{ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.9 } }]
  rectContainer.strokeWeight = 0.5
  rectContainer.layoutMode = 'HORIZONTAL'
  rectContainer.counterAxisAlignItems = 'CENTER'
  rectContainer.primaryAxisSizingMode = 'FIXED'
  rectContainer.name = 'Swatch'

  var row = figma.createFrame()
  row.layoutMode = 'HORIZONTAL'
  row.counterAxisAlignItems = 'CENTER'
  row.primaryAxisSizingMode = 'AUTO'
  row.counterAxisSizingMode = 'AUTO'
  row.itemSpacing = 8
  row.fills = []
  var rect = figma.createRectangle()
  rect.layoutGrow = 1
  rect.layoutAlign = 'STRETCH'
  rectContainer.appendChild(rect)
  // rect.resize(12, 12)
  // rect.cornerRadius = 4
  // rect.strokes = [{ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.9 } }]
  // rect.strokeWeight = 0.5
  if (isRGBA(res)) rect.fills = rgbaToPaint(res)
  else if (isRGBA(raw)) rect.fills = rgbaToPaint(raw)
  else rect.fills = [{ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.9 } }]
  row.appendChild(rectContainer)
  // row.appendChild(rect)
  row.appendChild(makeText(isRGBA(res) ? rgbaToHex(res) : '—', { fontSize: 12, opacity: 0.9 }))
  return row
}

// ---------------------------------------------------------------
// ALIAS BLOCK (NAME + CHAIN)
// - line 1: own dot-name
// - for each alias: "↓" + aliasName
// - always one final "↓" at the bottom so it points to the
//   swatch / resolved value row (even when there is no alias).
// ---------------------------------------------------------------
function makeAliasBlock(own, chain) {
  var lines = []

  // First line: variable's own dot-name
  if (own) lines.push(own)

  // For each alias in the chain: add "↓" then the alias name
  if (chain && chain.length) {
    for (var i = 0; i < chain.length; i++) {
      lines.push('↓')
      lines.push(chain[i])
    }
  }

  // If we have any label at all (own or aliases), add one final arrow
  // to visually point down to the swatch/value row.
  if ((own && own.length) || (chain && chain.length)) {
    lines.push('↓')
  }

  return makeText(lines.join('\n'), { fontSize: 12, opacity: 0.9 })
}


// ---------------------------------------------------------------------------
// VALUE NODE (per cell) – COLOR / FLOAT / OTHER TYPES
// ---------------------------------------------------------------------------

// Decide how to visually represent a value for a given variable + mode.
// It can be:
// - color row (+ alias block)
// - float units row (+ alias block)
// - plain text representation (+ alias block)
function makeValueNode(raw, res, chain, type, u, own) {
  var has = (own && own.length) || (chain && chain.length)

  // COLOR
  if (type === 'COLOR') {
    var cr = makeColorRow(raw, res)
    if (!has) return cr
    var v = figma.createFrame()
    v.layoutMode = 'VERTICAL'
    v.primaryAxisSizingMode = 'AUTO'
    v.counterAxisSizingMode = 'AUTO'
    v.itemSpacing = 4
    v.fills = []
    v.appendChild(makeAliasBlock(own, chain))
    v.appendChild(cr)
    return v
  }

  // FLOAT
  if (type === 'FLOAT' && typeof res === 'number') {
    var ur = makeUnitsRow(res, u)
    if (!has) return ur
    var vf = figma.createFrame()
    vf.layoutMode = 'VERTICAL'
    vf.primaryAxisSizingMode = 'AUTO'
    vf.counterAxisSizingMode = 'AUTO'
    vf.itemSpacing = 4
    vf.fills = []
    vf.appendChild(makeAliasBlock(own, chain))
    vf.appendChild(ur)
    return vf
  }

  // STRING / BOOLEAN / NUMBER / OTHER: convert to text
  var label = '—'
  if (typeof res === 'string') label = res
  else if (typeof res === 'boolean') label = res ? 'true' : 'false'
  else if (typeof res === 'number') label = String(round3(res))
  var single = makeText(label, { fontSize: 12, opacity: 0.9 })
  if (!has) return single
  var vs = figma.createFrame()
  vs.layoutMode = 'VERTICAL'
  vs.primaryAxisSizingMode = 'AUTO'
  vs.counterAxisSizingMode = 'AUTO'
  vs.itemSpacing = 4
  vs.fills = []
  vs.appendChild(makeAliasBlock(own, chain))
  vs.appendChild(single)
  return vs
}

// ---------------------------------------------------------------------------
// MAIN TABLE BUILDER
// ---------------------------------------------------------------------------
// `selected`  : array of collection IDs chosen in the UI
// `u`         : unit configuration (px/rem/em/%/ms/s flags, base px, etc.)
async function buildTable(selected, u) {
  var page = figma.currentPage

  // Get all collections and variables (async APIs required by dynamic-page).
  var allCollections = await figma.variables.getLocalVariableCollectionsAsync()
  var allVars = await figma.variables.getLocalVariablesAsync()

  // For quick lookups.
  var collectionsById = {}
  for (var i = 0; i < allCollections.length; i++) collectionsById[allCollections[i].id] = allCollections[i]

  // Filter collections by `selected`. If none selected, use all.
  var selectedSet = new Set(selected || [])
  var collections = allCollections.filter(function (col) {
    return selectedSet.size === 0 || selectedSet.has(col.id)
  })

  // Map variable ID → variable object.
  var allById = {}
  for (var j = 0; j < allVars.length; j++) allById[allVars[j].id] = allVars[j]

  // Create the main table frame on the canvas.
  var table = figma.createFrame()
  table.name = 'Variables Table (' + new Date().toLocaleDateString() + ')'
  table.layoutMode = 'VERTICAL'
  table.itemSpacing = 0
  table.primaryAxisSizingMode = 'AUTO'
  table.counterAxisSizingMode = 'AUTO'
  table.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]
  table.strokes = [{ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.9 } }]
  table.strokeWeight = 1
  table.paddingLeft = table.paddingRight = 24
  table.paddingTop = table.paddingBottom = 24
  page.appendChild(table)

  // -----------------------------------------------------------------------
  // HEADER GROUP  (Title + Table Header)
  // -----------------------------------------------------------------------

  // Title + generated date block.
  var title = makeText('Variables – Canvas Table', { bold: true, fontSize: 24 })
  var subtitle = makeText('Generated: ' + new Date().toLocaleDateString(), { fontSize: 12, opacity: 0.6 })
  var headerBox = figma.createFrame()
  headerBox.layoutMode = 'VERTICAL'
  headerBox.itemSpacing = 4
  headerBox.primaryAxisSizingMode = 'AUTO'
  headerBox.counterAxisSizingMode = 'AUTO'
  headerBox.fills = []
  headerBox.name = 'Title' // meaningful name for this layer
  headerBox.appendChild(title)
  headerBox.appendChild(subtitle)

  // Collect union of modes for the selected collections.
  var modeNameSet = {}
  for (var c = 0; c < collections.length; c++) {
    var cl = collections[c]
    for (var m = 0; m < cl.modes.length; m++) {
      modeNameSet[cl.modes[m].name] = true
    }
  }
  var modeNames = Object.keys(modeNameSet)

  // Sort modes so light/dark come first in a sensible order.
  var preferred = ['light', 'Light', 'dark', 'Dark']
  modeNames.sort(function (a, b) {
    var ia = preferred.indexOf(a),
      ib = preferred.indexOf(b)
    if (ia !== -1 && ib !== -1) return ia - ib
    if (ia !== -1) return -1
    if (ib !== -1) return 1
    return a.localeCompare(b)
  })

  // Table header row: Type | Token name | [modes...] | Description
  var header = makeRow(
    [
      makeCell(makeText('Type', { bold: true, opacity: 0.8 }), 80),
      makeCell(makeText('Token name', { bold: true, opacity: 0.8 }), 280)
    ]
      .concat(
        modeNames.map(function (n) {
          return makeCell(makeText(n, { bold: true, opacity: 0.8 }), 260)
        })
      )
      .concat([makeCell(makeText('Description', { bold: true, opacity: 0.8 }), 400)])
  )
  header.topLeftRadius = header.topRightRadius = 8
  header.strokes = [{ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.9 } }]
  header.strokeWeight = 1
  header.fills = [{ type: 'SOLID', color: { r: 0.95, g: 0.95, b: 0.95 } }]
  header.name = 'Table Header'

  // Group title + header row into a single "Header" Auto Layout frame.
  var headerGroup = figma.createFrame()
  headerGroup.name = 'Header'
  headerGroup.layoutMode = 'VERTICAL'
  headerGroup.itemSpacing = 16
  headerGroup.primaryAxisSizingMode = 'AUTO'
  headerGroup.counterAxisSizingMode = 'AUTO'
  headerGroup.fills = []
  headerGroup.appendChild(headerBox)
  headerGroup.appendChild(header)
  table.appendChild(headerGroup)

  // -----------------------------------------------------------------------
  // BODY GROUP (all section rows + variable rows)
  // -----------------------------------------------------------------------
  var bodyGroup = figma.createFrame()
  bodyGroup.name = 'Body'
  bodyGroup.layoutMode = 'VERTICAL'
  bodyGroup.itemSpacing = 0
  bodyGroup.primaryAxisSizingMode = 'AUTO'
  bodyGroup.counterAxisSizingMode = 'AUTO'
  bodyGroup.fills = []
  table.appendChild(bodyGroup)

  // Render each selected collection as a section inside Body.
  for (var cix = 0; cix < collections.length; cix++) {
    var collection = collections[cix]

    // Section row with collection name.
    var sectionTitle = makeText(collection.name, { bold: true, fontSize: 16 })
    var sectionRow = figma.createFrame()
    sectionRow.layoutMode = 'HORIZONTAL'
    sectionRow.primaryAxisSizingMode = 'AUTO'
    sectionRow.counterAxisSizingMode = 'AUTO'
    sectionRow.fills = []
    sectionRow.appendChild(sectionTitle)
    var sectionWrapper = makeRow(
      [makeCell(makeText(''), 80), makeCell(sectionRow, 280)]
        .concat(
          modeNames.map(function () {
            return makeCell(makeText(''), 260)
          })
        )
        .concat([makeCell(makeText(''), 400)])
    )
    // sectionWrapper.strokes = [{ type: 'SOLID', color: { r: 0.96, g: 0.96, b: 0.96 } }]
    sectionWrapper.strokes = [{ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.9 } }]
    sectionWrapper.strokeLeftWeight = 1
    sectionWrapper.strokeRightWeight = 1
    sectionWrapper.name = 'Collection – ' + collection.name
    bodyGroup.appendChild(sectionWrapper)

    // Grab all variables that belong to this collection.
    var modes = collection.modes
    var varsInCollection = allVars.filter(function (v) {
      return v.variableCollectionId === collection.id
    })

    // For each variable, render one row.
    for (var k = 0; k < varsInCollection.length; k++) {
      var vobj = varsInCollection[k]

      // Left columns: type and token CSS name.
      var typeLabel = makeText(vobj.resolvedType || '—', { fontSize: 12, opacity: 0.7 })
      var tokenName = makeText(cssTokenNameFromVarName(vobj.name), { fontSize: 12 })
      var ownDot = dotNameFromVarName(vobj.name)
      
      tokenName.layoutGrow = 1

      // Mode columns: resolve alias chain for each mode, then render value.
      var modeCells = []
      for (var mn = 0; mn < modeNames.length; mn++) {
        var modeName = modeNames[mn]
        var modeInCol = null
        for (var mm = 0; mm < modes.length; mm++) {
          if (modes[mm].name === modeName) {
            modeInCol = modes[mm]
            break
          }
        }
        if (!modeInCol) {
          modeCells.push(makeCell(makeText('—', { opacity: 0.5 }), 260))
          continue
        }
        var raw = vobj.valuesByMode[modeInCol.modeId]
        var chain = getAliasChainByModeName(allById, collectionsById, modeName, raw)
        var resolved = chain.final
        var valueNode = makeValueNode(raw, resolved, chain.names, vobj.resolvedType, u, ownDot)
        modeCells.push(makeCell(valueNode, 260))
      }

      // Description cell (if variable has description).
      var desc = makeText(vobj.description || '', { fontSize: 12, opacity: 0.8 })

      // Combine into a single row and append to Body group.
      var row = makeRow(
        [makeCell(typeLabel, 80), makeCell(tokenName, 280)].concat(modeCells).concat([makeCell(desc, 400)])
      )
      row.name = 'Row – ' + cssTokenNameFromVarName(vobj.name)
      if (k === varsInCollection.length -1) row.bottomLeftRadius = row.bottomRightRadius = 8
      bodyGroup.appendChild(row)
    }
  }

  // Position + zoom viewport to show the table nicely, then close plugin.
  table.x = 120
  table.y = 120
  figma.viewport.scrollAndZoomIntoView([table])
  figma.notify('Variables printed to canvas ✅')
  figma.closePlugin()
}

// ---------------------------------------------------------------------------
// UI → PLUGIN MESSAGE HANDLER
// ---------------------------------------------------------------------------
// UI posts `{ type: 'PRINT_SELECTED', selected: [...], unitCfg: {...} }`
// when the user clicks "Print to Canvas".
figma.ui.onmessage = async function (msg) {
  if (!msg || !msg.type) return
  if (msg.type === 'PRINT_SELECTED') {
    var u = msg.unitCfg || {}
    await loadFonts()
    await buildTable(msg.selected || [], u)
  }
}

// ---------------------------------------------------------------------------
// INITIALIZATION (runs once when plugin is opened)
// ---------------------------------------------------------------------------
// 1. Fetch all collections + variables (async).
// 2. Count how many variables belong to each collection.
// 3. Send this list + counts to the UI so it can render the collection list.
;(async function init() {
  var allVars = await figma.variables.getLocalVariablesAsync()
  var allCols = await figma.variables.getLocalVariableCollectionsAsync()
  var varCountByCol = {}
  for (var i = 0; i < allVars.length; i++) {
    var id = allVars[i].variableCollectionId
    varCountByCol[id] = (varCountByCol[id] || 0) + 1
  }
  var cols = allCols.map(function (c) {
    return {
      id: c.id,
      name: c.name,
      modes: c.modes.map(function (m) {
        return m.name
      }),
      count: varCountByCol[c.id] || 0
    }
  })
  figma.showUI(__html__, { width: 480, height: 560 })
  figma.ui.postMessage({ type: 'COLLECTIONS', collections: cols })
})()
