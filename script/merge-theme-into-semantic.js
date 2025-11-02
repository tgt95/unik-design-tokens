import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// setup ESM dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// helper: get nested property
function getDeep(obj, pathArr) {
  return pathArr.reduce(
    (acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined),
    obj
  )
}

// deep clone
function deepClone(obj) {
  if (Array.isArray(obj)) return obj.map(deepClone)
  if (obj && typeof obj === 'object') {
    const out = {}
    for (const [k, v] of Object.entries(obj)) out[k] = deepClone(v)
    return out
  }
  return obj
}

// build combined lookup: merge all branches (bg, fg, border, focus-ring)
function buildThemeLookup(theme) {
  const combined = {}
  for (const key of ['bg', 'fg', 'border', 'focus-ring']) {
    if (theme[key]) combined[key] = theme[key]
  }
  return combined
}

// find a token in the theme by parsing {bg.brand.rest.on-dark}
function getThemeValue(themeLookup, refPath, mode) {
  if (!refPath) return null

  // break down {bg.brand.rest.on-dark} -> ['bg','brand','rest','on-dark']
  const pathArr = refPath.replace(/[{}]/g, '').split('.')
  const themeNode = getDeep(themeLookup, pathArr)
  if (themeNode && themeNode.$value) return themeNode.$value

  // fallback: if this level has on-light/on-dark split
  const basePath = pathArr.filter((p) => !p.startsWith('on-'))
  const modeNode = getDeep(themeLookup, [...basePath, mode])
  if (modeNode && modeNode.$value) return modeNode.$value

  return null
}

// recursively replace all $value that match {bg|fg|border|focus-ring.*}
function replaceSemanticValues(node, themeLookup, mode) {
  if (Array.isArray(node)) return node.map((n) => replaceSemanticValues(n, themeLookup, mode))
  if (!node || typeof node !== 'object') return node

  const newNode = {}
  for (const [key, value] of Object.entries(node)) {
    if (key === '$value' && typeof value === 'string' && value.startsWith('{')) {
      const refPath = value.slice(1, -1)
      const newVal = getThemeValue(themeLookup, `{${refPath}}`, mode)
      newNode[key] = newVal || value
    } else if (typeof value === 'object') {
      newNode[key] = replaceSemanticValues(value, themeLookup, mode)
    } else {
      newNode[key] = value
    }
  }
  return newNode
}

function run(themePath, semanticPath, mode) {
  const theme = JSON.parse(fs.readFileSync(themePath, 'utf8'))
  const semantic = JSON.parse(fs.readFileSync(semanticPath, 'utf8'))

  const themeLookup = buildThemeLookup(theme)
  const merged = replaceSemanticValues(deepClone(semantic), themeLookup, mode)

  const distDir = path.join(__dirname, 'dist')
  if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true })

  const semanticBase = path.basename(semanticPath)
  const modeShort = mode.replace('on-', '')
  const outFileName = semanticBase.replace('.json', `.merged.${modeShort}.json`)
  const outputPath = path.join(distDir, outFileName)

  fs.writeFileSync(outputPath, JSON.stringify(merged, null, 2), 'utf8')
  console.log(`✅ Saved merged "${mode}" file to ${outputPath}`)
}

// CLI
const args = process.argv.slice(2)
if (args.length < 3) {
  console.error(
    'Usage: node script/merge-theme-into-semantic.js <theme.json> <semantic.json> <on-light|on-dark>'
  )
  process.exit(1)
}

const [themeFile, semanticFile, mode] = args
run(themeFile, semanticFile, mode)
