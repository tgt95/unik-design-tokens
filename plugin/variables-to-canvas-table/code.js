// Figma Plugin: Print: Variables → Table (v2.8.1) - dynamic-page compat
// Fix: replace `catch {}` with `catch (e) {}` to avoid syntax error in some runtimes

var FONT_MAIN = { family: "Space Mono", style: "Regular" };
var FONT_BOLD = { family: "Space Mono", style: "Bold" };
var FALLBACK_MAIN = { family: "Inter", style: "Regular" };
var FALLBACK_BOLD = { family: "Inter", style: "Bold" };

async function loadFonts() {
  var okMain = true, okBold = true;
  try { await figma.loadFontAsync(FONT_MAIN); } catch (e) { okMain = false; }
  try { await figma.loadFontAsync(FONT_BOLD); } catch (e) { okBold = false; }
  if (!okMain || !okBold) {
    FONT_MAIN = FALLBACK_MAIN;
    FONT_BOLD = FALLBACK_BOLD;
    try { await figma.loadFontAsync(FONT_MAIN); } catch (e) { }
    try { await figma.loadFontAsync(FONT_BOLD); } catch (e) { }
  }
}

function rgbaToPaint(rgba) {
  var opacity = (rgba && typeof rgba.a === 'number') ? rgba.a : 1;
  return [{ type: 'SOLID', color: { r: rgba.r, g: rgba.g, b: rgba.b }, opacity: opacity }];
}
function isRGBA(v) { return v && typeof v === 'object' && 'r' in v && 'g' in v && 'b' in v; }
function rgbaToHex(v) {
  var r = Math.round(v.r * 255), g = Math.round(v.g * 255), b = Math.round(v.b * 255);
  return '#' + [r, g, b].map(function (n) { return n.toString(16).padStart(2, '0'); }).join('').toUpperCase();
}
function cssTokenNameFromVarName(name) { return '--' + String(name || '').replace(/\//g, '-'); }
function dotNameFromVarName(name) { return String(name || '').replace(/\//g, '.'); }
function round3(n) { return Math.round(n * 1000) / 1000; }

function makeText(str, opts) {
  opts = opts || {};
  var t = figma.createText();
  t.fontName = opts.bold ? FONT_BOLD : FONT_MAIN;
  t.fontSize = (typeof opts.fontSize === 'number') ? opts.fontSize : 12;
  t.fills = [{ type: 'SOLID', color: { r: 0.12, g: 0.12, b: 0.12 } }];
  t.opacity = (typeof opts.opacity === 'number') ? opts.opacity : 1;
  t.textAutoResize = opts.textAutoResize || 'WIDTH_AND_HEIGHT';
  t.characters = (str == null) ? '' : String(str);
  return t;
}
function makeRow(columns) {
  columns = columns || [];
  var row = figma.createFrame();
  row.layoutMode = 'HORIZONTAL'; row.itemSpacing = 16; row.counterAxisAlignItems = 'CENTER';
  row.primaryAxisSizingMode = 'AUTO'; row.counterAxisSizingMode = 'AUTO';
  row.paddingLeft = row.paddingRight = 16; row.paddingTop = row.paddingBottom = 10;
  row.strokes = [{ type: 'SOLID', color: { r: 0.92, g: 0.92, b: 0.92 } }]; row.strokeWeight = 1; row.strokeTopWeight = 0;
  for (var i = 0; i < columns.length; i++) { var n = columns[i]; if (n) row.appendChild(n); }
  return row;
}
function makeCell(node, width, align) {
  width = (typeof width === 'number') ? width : 220;
  align = align || 'MIN';
  var cell = figma.createFrame(); cell.layoutMode = 'HORIZONTAL'; cell.counterAxisAlignItems = 'CENTER';
  cell.primaryAxisSizingMode = 'FIXED'; cell.counterAxisSizingMode = 'AUTO'; cell.resizeWithoutConstraints(width, 32);
  cell.fills = []; if (node) cell.appendChild(node); if (align === 'CENTER') cell.primaryAxisAlignItems = 'CENTER'; if (align === 'MAX') cell.primaryAxisAlignItems = 'MAX'; return cell;
}
function getAliasChainByModeName(allById, collectionsById, startModeName, initialValue) {
  var names = []; var current = initialValue; var guard = 0;
  function getModeIdForCollectionByName(collectionId, modeName) {
    var col = collectionsById[collectionId]; if (!col) return null;
    for (var i = 0; i < col.modes.length; i++) if (col.modes[i].name === modeName) return col.modes[i].modeId;
    return col.modes.length ? col.modes[0].modeId : null;
  }
  while (current && typeof current === 'object' && current.type === 'VARIABLE_ALIAS' && guard < 100) {
    var targetVar = allById[current.id]; if (!targetVar) break;
    names.push(dotNameFromVarName(targetVar.name));
    var targetModeId = getModeIdForCollectionByName(targetVar.variableCollectionId, startModeName); if (!targetModeId) break;
    current = targetVar.valuesByMode[targetModeId]; guard++;
  }
  return { names: names, final: current };
}
function floatUnitsList(n, u) {
  var out = []; var base = (u && typeof u.basePxForRemEm === 'number') ? u.basePxForRemEm : 16; var pct = (u && typeof u.percentOf === 'number') ? u.percentOf : 1;
  if (u && u.showPx) out.push(round3(n) + 'px'); if (u && u.showRem) out.push(round3(n / base) + 'rem'); if (u && u.showEm) out.push(round3(n / base) + 'em');
  if (u && u.showPercent) out.push(round3((n / pct) * 100) + '%'); if (u && u.showMs) out.push(round3(n) + 'ms'); if (u && u.showS) out.push(round3(n / 1000) + 's');
  out.push(String(round3(n))); return out;
}
function makeUnitsRow(val, u) {
  var row = figma.createFrame(); row.layoutMode = 'HORIZONTAL'; row.counterAxisAlignItems = 'CENTER';
  row.primaryAxisSizingMode = 'AUTO'; row.counterAxisSizingMode = 'AUTO'; row.itemSpacing = 12; row.fills = [];
  var arr = floatUnitsList(val, u); for (var i = 0; i < arr.length; i++) row.appendChild(makeText(arr[i], { fontSize: 11, opacity: 0.9 })); return row;
}
function makeColorRow(raw, res) {
  var row = figma.createFrame(); row.layoutMode = 'HORIZONTAL'; row.counterAxisAlignItems = 'CENTER'; row.primaryAxisSizingMode = 'AUTO'; row.counterAxisSizingMode = 'AUTO'; row.itemSpacing = 8; row.fills = [];
  var rect = figma.createRectangle(); rect.resize(18, 12); if (isRGBA(res)) rect.fills = rgbaToPaint(res); else if (isRGBA(raw)) rect.fills = rgbaToPaint(raw); else rect.fills = [{ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.9 } }];
  row.appendChild(rect); row.appendChild(makeText(isRGBA(res) ? rgbaToHex(res) : '—', { fontSize: 11, opacity: 0.9 })); return row;
}
function makeAliasBlock(own, chain) { var lines = []; if (own) lines.push(own); if (chain && chain.length) { for (var i = 0; i < chain.length; i++) { lines.push('↓'); lines.push(chain[i]); } } return makeText(lines.join('\n'), { fontSize: 11, opacity: 0.9 }); }
function makeValueNode(raw, res, chain, type, u, own) {
  var has = ((own && own.length) || (chain && chain.length)); if (type === 'COLOR') { var cr = makeColorRow(raw, res); if (!has) return cr; var v = figma.createFrame(); v.layoutMode = 'VERTICAL'; v.primaryAxisSizingMode = 'AUTO'; v.counterAxisSizingMode = 'AUTO'; v.itemSpacing = 4; v.fills = []; v.appendChild(makeAliasBlock(own, chain)); v.appendChild(cr); return v; }
  if (type === 'FLOAT' && typeof res === 'number') { var ur = makeUnitsRow(res, u); if (!has) return ur; var vf = figma.createFrame(); vf.layoutMode = 'VERTICAL'; vf.primaryAxisSizingMode = 'AUTO'; vf.counterAxisSizingMode = 'AUTO'; vf.itemSpacing = 4; vf.fills = []; vf.appendChild(makeAliasBlock(own, chain)); vf.appendChild(ur); return vf; }
  var label = '—'; if (typeof res === 'string') label = res; else if (typeof res === 'boolean') label = res ? 'true' : 'false'; else if (typeof res === 'number') label = String(round3(res)); var single = makeText(label, { fontSize: 11, opacity: 0.9 }); if (!has) return single; var vs = figma.createFrame(); vs.layoutMode = 'VERTICAL'; vs.primaryAxisSizingMode = 'AUTO'; vs.counterAxisSizingMode = 'AUTO'; vs.itemSpacing = 4; vs.fills = []; vs.appendChild(makeAliasBlock(own, chain)); vs.appendChild(single); return vs;
}

async function buildTable(selected, u) {
  var page = figma.currentPage;
  var allCollections = await figma.variables.getLocalVariableCollectionsAsync();
  var allVars = await figma.variables.getLocalVariablesAsync();
  var collectionsById = {}; for (var i = 0; i < allCollections.length; i++) collectionsById[allCollections[i].id] = allCollections[i];
  var selectedSet = new Set(selected || []);
  var collections = allCollections.filter(function (col) { return selectedSet.size === 0 || selectedSet.has(col.id); });
  var allById = {}; for (var j = 0; j < allVars.length; j++) allById[allVars[j].id] = allVars[j];

  var table = figma.createFrame(); table.name = 'Variables Table (' + new Date().toLocaleDateString() + ')'; table.layoutMode = 'VERTICAL'; table.itemSpacing = 0; table.primaryAxisSizingMode = 'AUTO'; table.counterAxisSizingMode = 'AUTO'; table.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]; table.strokes = [{ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.9 } }]; table.strokeWeight = 1; table.paddingLeft = table.paddingRight = 16; table.paddingTop = table.paddingBottom = 16; page.appendChild(table);

  var title = makeText('Variables – Canvas Table', { bold: true, fontSize: 24 }); var subtitle = makeText('Generated: ' + new Date().toLocaleDateString(), { fontSize: 11, opacity: 0.6 });
  var headerBox = figma.createFrame(); headerBox.layoutMode = 'VERTICAL'; headerBox.itemSpacing = 4; headerBox.primaryAxisSizingMode = 'AUTO'; headerBox.counterAxisSizingMode = 'AUTO'; headerBox.fills = []; headerBox.appendChild(title); headerBox.appendChild(subtitle); table.appendChild(headerBox);

  var modeNameSet = {}; for (var c = 0; c < collections.length; c++) { var cl = collections[c]; for (var m = 0; m < cl.modes.length; m++) { modeNameSet[cl.modes[m].name] = true; } }
  var modeNames = Object.keys(modeNameSet); var preferred = ['light', 'Light', 'dark', 'Dark']; modeNames.sort(function (a, b) { var ia = preferred.indexOf(a), ib = preferred.indexOf(b); if (ia !== -1 && ib !== -1) return ia - ib; if (ia !== -1) return -1; if (ib !== -1) return 1; return a.localeCompare(b); });

  var header = makeRow([makeCell(makeText('Type', { bold: true, opacity: 0.8 }), 80), makeCell(makeText('Token name', { bold: true, opacity: 0.8 }), 280)]
    .concat(modeNames.map(function (n) { return makeCell(makeText(n, { bold: true, opacity: 0.8 }), 260); }))
    .concat([makeCell(makeText('Description', { bold: true, opacity: 0.8 }), 360)]));
  header.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }]; header.strokeWeight = 1; table.appendChild(header);

  for (var cix = 0; cix < collections.length; cix++) {
    var collection = collections[cix];
    var sectionTitle = makeText(collection.name, { bold: true, fontSize: 16 }); var sectionRow = figma.createFrame(); sectionRow.layoutMode = 'HORIZONTAL'; sectionRow.primaryAxisSizingMode = 'AUTO'; sectionRow.counterAxisSizingMode = 'AUTO'; sectionRow.fills = []; sectionRow.appendChild(sectionTitle);
    var sectionWrapper = makeRow([makeCell(makeText(''), 80), makeCell(sectionRow, 280)].concat(modeNames.map(function () { return makeCell(makeText(''), 260); })).concat([makeCell(makeText(''), 360)]));
    sectionWrapper.strokes = [{ type: 'SOLID', color: { r: 0.96, g: 0.96, b: 0.96 } }]; sectionWrapper.strokeWeight = 1; table.appendChild(sectionWrapper);

    var modes = collection.modes; var varsInCollection = allVars.filter(function (v) { return v.variableCollectionId === collection.id; });

    for (var k = 0; k < varsInCollection.length; k++) {
      var vobj = varsInCollection[k];
      var typeLabel = makeText(vobj.resolvedType || '—', { fontSize: 11, opacity: 0.7 }); var tokenName = makeText(cssTokenNameFromVarName(vobj.name), { fontSize: 12 }); var ownDot = dotNameFromVarName(vobj.name);
      var modeCells = [];
      for (var mn = 0; mn < modeNames.length; mn++) {
        var modeName = modeNames[mn]; var modeInCol = null; for (var mm = 0; mm < modes.length; mm++) { if (modes[mm].name === modeName) { modeInCol = modes[mm]; break; } }
        if (!modeInCol) { modeCells.push(makeCell(makeText('—', { opacity: 0.5 }), 260)); continue; }
        var raw = vobj.valuesByMode[modeInCol.modeId]; var chain = getAliasChainByModeName(allById, collectionsById, modeName, raw); var resolved = chain.final;
        var valueNode = makeValueNode(raw, resolved, chain.names, vobj.resolvedType, u, ownDot); modeCells.push(makeCell(valueNode, 260));
      }
      var desc = makeText(vobj.description || '', { fontSize: 11, opacity: 0.8 });
      var row = makeRow([makeCell(typeLabel, 80), makeCell(tokenName, 280)].concat(modeCells).concat([makeCell(desc, 360)])); table.appendChild(row);
    }
  }
  table.x = 120; table.y = 120; figma.viewport.scrollAndZoomIntoView([table]); figma.notify('Variables printed to canvas ✅'); figma.closePlugin();
}

figma.ui.onmessage = async function (msg) {
  if (!msg || !msg.type) return;
  if (msg.type === 'PRINT_SELECTED') {
    var u = msg.unitCfg || {}; await loadFonts(); await buildTable(msg.selected || [], u);
  }
};

(async function init() {
  var allVars = await figma.variables.getLocalVariablesAsync();
  var allCols = await figma.variables.getLocalVariableCollectionsAsync();
  var varCountByCol = {}; for (var i = 0; i < allVars.length; i++) { var id = allVars[i].variableCollectionId; varCountByCol[id] = (varCountByCol[id] || 0) + 1; }
  var cols = allCols.map(function (c) { return { id: c.id, name: c.name, modes: c.modes.map(function (m) { return m.name; }), count: varCountByCol[c.id] || 0 }; });
  figma.showUI(__html__, { width: 480, height: 560 });
  figma.ui.postMessage({ type: 'COLLECTIONS', collections: cols });
})();