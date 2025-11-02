// merge-theme-into-semantic.js
// Usage:
//   node merge-theme-into-semantic.js ./09_theme.brand_1.tokens.json ./04_semantic.light.tokens.json on-light ./04_semantic.light.merged.json
//   node merge-theme-into-semantic.js ./09_theme.brand_1.tokens.json ./04_semantic.dark.tokens.json  on-dark  ./04_semantic.dark.merged.json

import fs from 'node:fs'

// get nested object by path array
function getDeep(obj, pathArr) {
  return pathArr.reduce(
    (acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined),
    obj
  )
}

// deep clone so we don't mutate the original semantic object
function deepClone(obj) {
  if (Array.isArray(obj)) return obj.map(deepClone)
  if (obj && typeof obj === 'object') {
    const out = {}
    for (const [k, v] of Object.entries(obj)) {
      out[k] = deepClone(v)
    }
    return out
  }
  return obj
}

/**
 * Walk semantic tree and whenever we hit a token-like node (has $value / $type / $description),
 * we try to pull the actual $value from theme[pathSoFar][mode].$value
 *
 * Example mapping rule:
 *   semantic path: bg.selected.rest
 *   mode: "on-dark"
 *   we pull: theme.bg.selected.rest["on-dark"].$value
 */
function injectValuesFromTheme({ semanticNode, themeRoot, mode, pathSoFar = [] }) {
  if (!semanticNode || typeof semanticNode !== 'object') {
    return semanticNode
  }

  const isLeafToken =
    Object.prototype.hasOwnProperty.call(semanticNode, '$value') ||
    Object.prototype.hasOwnProperty.call(semanticNode, '$type') ||
    Object.prototype.hasOwnProperty.call(semanticNode, '$description')

  if (isLeafToken) {
    const themeStateNode = getDeep(themeRoot, pathSoFar)

    let replacementValue

    // Normal case: themeStateNode = { "on-light": {...}, "on-dark": {...} }
    if (
      themeStateNode &&
      typeof themeStateNode === 'object' &&
      themeStateNode[mode] &&
      typeof themeStateNode[mode] === 'object' &&
      themeStateNode[mode].$value
    ) {
      replacementValue = themeStateNode[mode].$value
    }
    // Fallback: theme node itself is already a flat token (no modes)
    else if (
      themeStateNode &&
      typeof themeStateNode === 'object' &&
      themeStateNode.$value
    ) {
      replacementValue = themeStateNode.$value
    }

    const newNode = { ...semanticNode }
    if (replacementValue) {
      newNode.$value = replacementValue
    }
    return newNode
  }

  // Otherwise recurse into children
  const out = {}
  for (const [key, child] of Object.entries(semanticNode)) {
    out[key] = injectValuesFromTheme({
      semanticNode: child,
      themeRoot,
      mode,
      pathSoFar: [...pathSoFar, key]
    })
  }
  return out
}

function run(themePath, semanticPath, mode, outPath) {
  const theme = JSON.parse(fs.readFileSync(themePath, 'utf8'))
  const semantic = JSON.parse(fs.readFileSync(semanticPath, 'utf8'))

  const merged = injectValuesFromTheme({
    semanticNode: deepClone(semantic),
    themeRoot: theme,
    mode,
    pathSoFar: []
  })

  fs.writeFileSync(outPath, JSON.stringify(merged, null, 2), 'utf8')

  console.log(`✅ Merged "${mode}" values from ${themePath} → ${outPath}`)
}

// ------- CLI handling --------
const args = process.argv.slice(2)
// args[0] themeFile
// args[1] semanticFile
// args[2] mode ("on-dark" | "on-light")
// args[3] outFile

if (args.length < 4) {
  console.error(
    'Usage: node merge-theme-into-semantic.js <theme.json> <semantic.json> <on-dark|on-light> <out.json>'
  )
  process.exit(1)
}

const [themeFile, semanticFile, mode, outFile] = args
run(themeFile, semanticFile, mode, outFile)
