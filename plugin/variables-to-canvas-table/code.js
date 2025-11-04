// Figma Plugin: Variables → Canvas Table (v2.7)
// New
// 1) Alias text layout: shows the CURRENT variable dot-name on first line,
//    a line with only "↓", then each alias target on its own line (no braces).
// 2) UI shows the total variable count per collection and clicking the whole
//    collection card toggles selection.
// 3) Keeps Space Mono → Inter fallback and the font write-order fix.
//
// ------------------------------------------------------- Fonts
var FONT_MAIN = { family: "Space Mono", style: "Regular" };
var FONT_BOLD = { family: "Space Mono", style: "Bold" };
var FALLBACK_MAIN = { family: "Inter", style: "Regular" };
var FALLBACK_BOLD = { family: "Inter", style: "Bold" };

async function loadFonts() {
  var okMain = true, okBold = true;
  try { await figma.loadFontAsync(FONT_MAIN); } catch(e){ okMain = false; }
  try { await figma.loadFontAsync(FONT_BOLD); } catch(e){ okBold = false; }
  if (!okMain || !okBold) {
    FONT_MAIN = FALLBACK_MAIN;
    FONT_BOLD = FALLBACK_BOLD;
    try { await figma.loadFontAsync(FONT_MAIN); } catch(e){}
    try { await figma.loadFontAsync(FONT_BOLD); } catch(e){}
  }
}

// ------------------------------------------------------- Utils
function rgbaToPaint(rgba) {
  var opacity = (rgba && typeof rgba.a === 'number') ? rgba.a : 1;
  return [{ type: 'SOLID', color: { r: rgba.r, g: rgba.g, b: rgba.b }, opacity: opacity }];
}
function isRGBA(v) { return v && typeof v === 'object' && 'r' in v && 'g' in v && 'b' in v; }
function rgbaToHex(v) {
  var r = Math.round(v.r * 255), g = Math.round(v.g * 255), b = Math.round(v.b * 255);
  return '#' + [r,g,b].map(function(n){return n.toString(16).padStart(2,'0');}).join('').toUpperCase();
}
function cssTokenNameFromVarName(name) { return '--' + String(name || '').replace(/\//g, '-'); }
function dotNameFromVarName(name) { return String(name || '').replace(/\//g, '.'); }
function round3(n){ return Math.round(n*1000)/1000; }

function makeText(str, opts){
  opts = opts || {};
  var t = figma.createText();
  t.fontName = opts.bold ? FONT_BOLD : FONT_MAIN;              // set font first
  t.fontSize = (typeof opts.fontSize === 'number') ? opts.fontSize : 12;
  t.fills = [{ type: 'SOLID', color: { r: 0.12, g: 0.12, b: 0.12 }}];
  t.opacity = (typeof opts.opacity === 'number') ? opts.opacity : 1;
  t.textAutoResize = opts.textAutoResize || 'WIDTH_AND_HEIGHT';
  t.characters = (str == null) ? '' : String(str);             // then characters
  return t;
}
function makeRow(columns) {
  columns = columns || [];
  var row = figma.createFrame();
  row.name = 'row';
  row.layoutMode = 'HORIZONTAL';
  row.itemSpacing = 16;
  row.counterAxisAlignItems = 'CENTER';
  row.primaryAxisSizingMode = 'AUTO';
  row.counterAxisSizingMode = 'AUTO';
  row.paddingLeft = row.paddingRight = 16;
  row.paddingTop = row.paddingBottom = 10;
  row.strokes = [{ type:'SOLID', color: { r:0.92, g:0.92, b:0.92 } }];
  row.strokeWeight = 1;
  row.strokeTopWeight = 0;
  for (var i=0;i<columns.length;i++){ if (columns[i]) row.appendChild(columns[i]); }
  return row;
}
function makeCell(contentNode, width, align) {
  width = (typeof width === 'number') ? width : 220;
  align = align || 'MIN';
  var cell = figma.createFrame();
  cell.name = 'cell';
  cell.layoutMode = 'HORIZONTAL';
  cell.counterAxisAlignItems = 'CENTER';
  cell.primaryAxisSizingMode = 'FIXED';
  cell.counterAxisSizingMode = 'AUTO';
  cell.resizeWithoutConstraints(width, 32);
  cell.fills = [];
  if (contentNode) cell.appendChild(contentNode);
  if (align === 'CENTER') cell.primaryAxisAlignItems = 'CENTER';
  if (align === 'MAX') cell.primaryAxisAlignItems = 'MAX';
  return cell;
}

// ------------------------------------------------------- Alias resolution
function getAliasChainByModeName(allById, collectionsById, startModeName, initialValue) {
  var names = [];
  var current = initialValue;
  var guard = 0;
  function getModeIdForCollectionByName(collectionId, modeName) {
    var col = collectionsById[collectionId];
    if (!col) return null;
    for (var i=0;i<col.modes.length;i++){
      if (col.modes[i].name === modeName) return col.modes[i].modeId;
    }
    return col.modes.length ? col.modes[0].modeId : null;
  }
  while (current && typeof current === 'object' && current.type === 'VARIABLE_ALIAS' && guard < 100) {
    var targetVar = allById[current.id];
    if (!targetVar) break;
    names.push(dotNameFromVarName(targetVar.name));
    var targetCollectionId = targetVar.variableCollectionId;
    var targetModeId = getModeIdForCollectionByName(targetCollectionId, startModeName);
    if (!targetModeId) break;
    current = targetVar.valuesByMode[targetModeId];
    guard++;
  }
  return { names: names, final: current };
}

// ------------------------------------------------------- Value renderers
function floatUnitsList(n, unitCfg) {
  var out = [];
  var base = (unitCfg && typeof unitCfg.basePxForRemEm === 'number') ? unitCfg.basePxForRemEm : 16;
  var pctDen = (unitCfg && typeof unitCfg.percentOf === 'number') ? unitCfg.percentOf : 1;
  if (unitCfg && unitCfg.showPx) out.push(round3(n) + 'px');
  if (unitCfg && unitCfg.showRem) out.push(round3(n / base) + 'rem');
  if (unitCfg && unitCfg.showEm) out.push(round3(n / base) + 'em');
  if (unitCfg && unitCfg.showPercent) out.push(round3((n / pctDen) * 100) + '%');
  if (unitCfg && unitCfg.showMs) out.push(round3(n) + 'ms');
  if (unitCfg && unitCfg.showS) out.push(round3(n / 1000) + 's');
  out.push(String(round3(n))); // raw
  return out;
}
function makeUnitsRow(val, unitCfg) {
  var row = figma.createFrame();
  row.layoutMode = 'HORIZONTAL';
  row.counterAxisAlignItems = 'CENTER';
  row.primaryAxisSizingMode = 'AUTO';
  row.counterAxisSizingMode = 'AUTO';
  row.itemSpacing = 12;
  row.fills = [];
  var arr = floatUnitsList(val, unitCfg);
  for (var i=0;i<arr.length;i++) row.appendChild(makeText(arr[i], { fontSize: 11, opacity: 0.9 }));
  return row;
}
function makeColorRow(rawValue, resolvedValue) {
  var row = figma.createFrame();
  row.layoutMode = 'HORIZONTAL';
  row.counterAxisAlignItems = 'CENTER';
  row.primaryAxisSizingMode = 'AUTO';
  row.counterAxisSizingMode = 'AUTO';
  row.itemSpacing = 8;
  row.fills = [];
  var rect = figma.createRectangle();
  rect.resize(18, 12);
  if (isRGBA(resolvedValue)) rect.fills = rgbaToPaint(resolvedValue);
  else if (isRGBA(rawValue)) rect.fills = rgbaToPaint(rawValue);
  else rect.fills = [{ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.9 } }];
  row.appendChild(rect);
  var lbl = makeText(isRGBA(resolvedValue) ? rgbaToHex(resolvedValue) : '—', { fontSize: 11, opacity: 0.9 });
  row.appendChild(lbl);
  return row;
}

// Build alias label with desired line breaks: ownName, '↓', alias1, '↓', alias2,...
function makeAliasBlock(ownDotName, aliasChainNames) {
  var lines = [];
  if (ownDotName) lines.push(ownDotName);
  if (aliasChainNames && aliasChainNames.length) {
    for (var i=0;i<aliasChainNames.length;i++) {
      lines.push('↓');
      lines.push(aliasChainNames[i]);
    }
  }
  return makeText(lines.join('\n'), { fontSize: 11, opacity: 0.9 });
}

function makeValueNode(rawValue, resolvedValue, aliasChainNames, resolvedType, unitCfg, ownDotName) {
  var hasAliasOrOwn = (ownDotName && ownDotName.length) || (aliasChainNames && aliasChainNames.length);
  if (resolvedType === 'COLOR') {
    var colorRow = makeColorRow(rawValue, resolvedValue);
    if (!hasAliasOrOwn) return colorRow;
    var v = figma.createFrame();
    v.layoutMode = 'VERTICAL';
    v.primaryAxisSizingMode = 'AUTO';
    v.counterAxisSizingMode = 'AUTO';
    v.itemSpacing = 4;
    v.fills = [];
    v.appendChild(makeAliasBlock(ownDotName, aliasChainNames));
    v.appendChild(colorRow);
    return v;
  }
  if (resolvedType === 'FLOAT' && typeof resolvedValue === 'number') {
    var unitsRow = makeUnitsRow(resolvedValue, unitCfg);
    if (!hasAliasOrOwn) return unitsRow;
    var vf = figma.createFrame();
    vf.layoutMode = 'VERTICAL';
    vf.primaryAxisSizingMode = 'AUTO';
    vf.counterAxisSizingMode = 'AUTO';
    vf.itemSpacing = 4;
    vf.fills = [];
    vf.appendChild(makeAliasBlock(ownDotName, aliasChainNames));
    vf.appendChild(unitsRow);
    return vf;
  }
  // STRING / BOOLEAN / OTHER
  var label = '—';
  if (typeof resolvedValue === 'string') label = resolvedValue;
  else if (typeof resolvedValue === 'boolean') label = resolvedValue ? 'true' : 'false';
  else if (typeof resolvedValue === 'number') label = String(round3(resolvedValue));
  var single = makeText(label, { fontSize: 11, opacity: 0.9 });
  if (!hasAliasOrOwn) return single;
  var vs = figma.createFrame();
  vs.layoutMode = 'VERTICAL';
  vs.primaryAxisSizingMode = 'AUTO';
  vs.counterAxisSizingMode = 'AUTO';
  vs.itemSpacing = 4;
  vs.fills = [];
  vs.appendChild(makeAliasBlock(ownDotName, aliasChainNames));
  vs.appendChild(single);
  return vs;
}

// ------------------------------------------------------- Build Table
function buildTable(selectedCollectionIds, unitCfg) {
  var page = figma.currentPage;
  var allCollections = figma.variables.getLocalVariableCollections();
  var allVars = figma.variables.getLocalVariables();

  var collectionsById = {};
  for (var c=0;c<allCollections.length;c++) collectionsById[allCollections[c].id] = allCollections[c];

  var selectedMap = {};
  if (selectedCollectionIds && selectedCollectionIds.length) {
    for (var i=0;i<selectedCollectionIds.length;i++) selectedMap[selectedCollectionIds[i]] = true;
  }
  var collections = [];
  for (var j=0;j<allCollections.length;j++){
    var col = allCollections[j];
    if (!selectedCollectionIds || selectedCollectionIds.length === 0 || selectedMap[col.id]) collections.push(col);
  }

  var allById = {};
  for (var v=0; v<allVars.length; v++) allById[allVars[v].id] = allVars[v];

  var table = figma.createFrame();
  table.name = 'Variables Table (' + new Date().toLocaleDateString() + ')';
  table.layoutMode = 'VERTICAL';
  table.itemSpacing = 0;
  table.primaryAxisSizingMode = 'AUTO';
  table.counterAxisSizingMode = 'AUTO';
  table.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  table.strokes = [{ type:'SOLID', color: { r:0.9, g:0.9, b:0.9 } }];
  table.strokeWeight = 1;
  table.paddingLeft = table.paddingRight = 16;
  table.paddingTop = table.paddingBottom = 16;
  page.appendChild(table);

  var title = makeText('Variables – Canvas Table', { bold:true, fontSize: 24 });
  var subtitle = makeText('Generated: ' + new Date().toLocaleDateString(), { fontSize: 11, opacity: 0.6 });
  var headerBox = figma.createFrame();
  headerBox.layoutMode = 'VERTICAL';
  headerBox.itemSpacing = 4;
  headerBox.primaryAxisSizingMode = 'AUTO';
  headerBox.counterAxisSizingMode = 'AUTO';
  headerBox.fills = [];
  headerBox.appendChild(title);
  headerBox.appendChild(subtitle);
  table.appendChild(headerBox);

  // Modes union
  var modeNameSet = {};
  for (var ci=0;ci<collections.length;ci++) {
    var cl = collections[ci];
    for (var m=0;m<cl.modes.length;m++) modeNameSet[cl.modes[m].name] = true;
  }
  var modeNames = Object.keys(modeNameSet);
  var preferred = ['light','Light','dark','Dark'];
  modeNames.sort(function(a,b){
    var ia = preferred.indexOf(a);
    var ib = preferred.indexOf(b);
    if (ia !== -1 && ib !== -1) return ia - ib;
    if (ia !== -1) return -1;
    if (ib !== -1) return 1;
    return a.localeCompare(b);
  });

  var header = makeRow([
    makeCell(makeText('Type', { bold:true, opacity: 0.8}), 80),
    makeCell(makeText('Token name', { bold:true, opacity: 0.8}), 280)
  ].concat(modeNames.map(function(n){ return makeCell(makeText(n, { bold:true, opacity: 0.8}), 260); }))
   .concat([ makeCell(makeText('Description', { bold:true, opacity: 0.8}), 360) ]));
  header.strokes = [{ type:'SOLID', color: { r:0, g:0, b:0 } }];
  header.strokeWeight = 1;
  table.appendChild(header);

  for (var cix=0; cix<collections.length; cix++) {
    var collection = collections[cix];

    var sectionTitle = makeText(collection.name, { bold:true, fontSize: 16 });
    var sectionRow = figma.createFrame();
    sectionRow.layoutMode = 'HORIZONTAL';
    sectionRow.primaryAxisSizingMode = 'AUTO';
    sectionRow.counterAxisSizingMode = 'AUTO';
    sectionRow.fills = [];
    sectionRow.appendChild(sectionTitle);
    var sectionWrapper = makeRow([
      makeCell(makeText(''), 80),
      makeCell(sectionRow, 280)
    ].concat(modeNames.map(function(){ return makeCell(makeText(''), 260); }))
     .concat([ makeCell(makeText(''), 360) ]));
    sectionWrapper.strokes = [{ type:'SOLID', color: { r:0.96, g:0.96, b:0.96 } }];
    sectionWrapper.strokeWeight = 1;
    table.appendChild(sectionWrapper);

    var modes = collection.modes;
    var varsInCollection = [];
    for (var x=0; x<allVars.length; x++) {
      if (allVars[x].variableCollectionId === collection.id) varsInCollection.push(allVars[x]);
    }

    for (var j=0; j<varsInCollection.length; j++) {
      var vobj = varsInCollection[j];
      var typeLabel = makeText(vobj.resolvedType || '—', { fontSize: 11, opacity: 0.7 });
      var tokenCss = cssTokenNameFromVarName(vobj.name);
      var tokenName = makeText(tokenCss, { fontSize: 12 });

      var ownDot = dotNameFromVarName(vobj.name);

      var modeCells = [];
      for (var mn=0; mn<modeNames.length; mn++) {
        var modeName = modeNames[mn];
        var modeInCol = null;
        for (var mm=0; mm<modes.length; mm++) { if (modes[mm].name === modeName) { modeInCol = modes[mm]; break; } }
        if (!modeInCol) { modeCells.push(makeCell(makeText('—', { opacity: 0.5 }), 260)); continue; }

        var raw = vobj.valuesByMode[modeInCol.modeId];
        var chain = getAliasChainByModeName(allById, collectionsById, modeName, raw);
        var resolved = chain.final;

        var valueNode = makeValueNode(raw, resolved, chain.names, vobj.resolvedType, unitCfg, ownDot);
        modeCells.push(makeCell(valueNode, 260));
      }

      var descText = '';
      try { descText = vobj.description || ''; } catch(e) { descText = ''; }
      var desc = makeText(descText, { fontSize: 11, opacity: 0.8 });

      var row = makeRow([
        makeCell(typeLabel, 80),
        makeCell(tokenName, 280)
      ].concat(modeCells).concat([ makeCell(desc, 360) ]));
      table.appendChild(row);
    }
  }

  table.x = 120;
  table.y = 120;
  figma.viewport.scrollAndZoomIntoView([table]);
  figma.notify('Variables printed to canvas ✅');
  figma.closePlugin();
}

// ------------------------------------------------------- UI wire
figma.ui.onmessage = function(msg) {
  if (!msg || !msg.type) return;
  if (msg.type === 'PRINT_SELECTED') {
    var unitCfg = msg.unitCfg || {};
    loadFonts().then(function(){ buildTable(msg.selected || [], unitCfg); });
  }
};

// Send collections + counts
(function init(){
  var allVars = figma.variables.getLocalVariables();
  var varCountByCol = {};
  for (var i=0;i<allVars.length;i++) {
    var id = allVars[i].variableCollectionId;
    varCountByCol[id] = (varCountByCol[id] || 0) + 1;
  }
  var cols = figma.variables.getLocalVariableCollections().map(function(c){
    return { id: c.id, name: c.name, modes: c.modes.map(function(m){return m.name;}), count: varCountByCol[c.id] || 0 };
  });
  figma.showUI(__html__, { width: 480, height: 560 });
  figma.ui.postMessage({ type: 'COLLECTIONS', collections: cols });
})();