// src/App.js
import React, { useEffect, useState, useMemo } from 'react'
import { flattenTokens, resolveAlias, getAliasChain } from './utils/tokenUtils'
import TokenTable from './components/TokenTable'
import Sidebar from './components/Sidebar'
import './App.css'

export default function App() {
  const [tables, setTables] = useState([])

  useEffect(() => {
    async function loadAll() {
      const manifest = await (await fetch('/tokens/manifest.json')).json()

      // 1) gather all global files
      const allFiles = [
        ...Object.values(manifest.collections).flatMap(c =>
          Object.values(c.modes).flat()
        ),
        ...Object.values(manifest.styles).flat(),
      ]

      // 2) fetch & flatten global tokens
      const globalData = await Promise.all(
        allFiles.map(f => fetch(`/tokens/${f}`).then(r => r.json()))
      )
      const globalFlat = flattenTokens(Object.assign({}, ...globalData))

      // 3) build per-collection tables
      const result = []
      for (const [collectionName, collection] of Object.entries(manifest.collections)) {
        const modes = {}
        for (const [modeName, files] of Object.entries(collection.modes)) {
          const localData = await Promise.all(
            files.map(f => fetch(`/tokens/${f}`).then(r => r.json()))
          )
          const localFlat = flattenTokens(
            Object.assign({}, ...localData),
            [],
            { collection: collectionName, mode: modeName }
          )

          // 4) resolve aliases
          for (const key in localFlat) {
            const raw = localFlat[key].value
            localFlat[key].resolved = resolveAlias(raw, globalFlat)
            localFlat[key].aliasChain = getAliasChain(raw, globalFlat)
            localFlat[key].description ||= ''
          }

          modes[modeName] = localFlat
        }
        result.push({ collectionName, modes })
      }

      setTables(result)
    }
    loadAll()
  }, [])

  // Build sidebar outline based on token branches (unchanged)
  const outline = useMemo(() => {
    return tables.map(({ collectionName, modes }) => {
      const keys = Object.keys(modes[Object.keys(modes)[0]] || {})
      const map = {}
      keys.forEach(k => {
        const parts = k.split('.')
        let cursor = map
        parts.forEach((p, i) => {
          if (!cursor[p]) cursor[p] = { path: parts.slice(0, i + 1).join('.'), children: {} }
          cursor = cursor[p].children
        })
      })
      const makeNodes = o =>
        Object.entries(o).map(([label, { path, children }]) => ({
          label,
          id: path,
          children: makeNodes(children),
        }))
      return {
        id: collectionName,
        label: collectionName,
        children: makeNodes(map),
      }
    })
  }, [tables])

  return (
    <div className="layout">
      <Sidebar items={outline} name='Unik Design Tokens' />

      <main className="content">
        <div className="app">
          <h1>🎨 Design Tokens Viewer</h1>
          {tables.map(({ collectionName, modes }) => (
            <section
              key={collectionName}
              id={collectionName}
              style={{ marginBottom: '2rem' }}
            >
              <h2>{collectionName}</h2>

              {/* ← **Only one** TokenTable per collection */}
              <TokenTable title={collectionName} modes={modes} />
            </section>
          ))}
        </div>
      </main>
    </div>
  )
}
