import React, { useState } from 'react'
import TokenRow from './TokenRow'
import './TokenTable.css'

/**
 * Build a nested tree from dot-separated token names.
 */
function buildTree(tokenNames) {
  const root = {}
  tokenNames.forEach((fullName) => {
    const parts = fullName.split('.')
    let node = root
    parts.forEach((part, i) => {
      if (!node[part]) {
        node[part] = {
          name: part,
          children: {},
          fullPath: parts.slice(0, i + 1).join('.')
        }
      }
      node = node[part].children
    })
  })
  return root
}

export default function TokenTable({ title, modes = {}, keyOrder = [], filterMode = 'All' }) {
  // your full list of available modes for this collection
  const allModes = Object.keys(modes)

  // decide which modes to actually show
  const displayedModes = filterMode === 'All' ? allModes : allModes.includes(filterMode) ? [filterMode] : []

  const [collapsed, setCollapsed] = useState(new Set())
  const [copiedFolder, setCopiedFolder] = useState(null)

  // Build tree from the DFS keyOrder you passed in
  const tree = buildTree(keyOrder)

  function toggleNode(path) {
    setCollapsed((prev) => {
      const next = new Set(prev)
      next.has(path) ? next.delete(path) : next.add(path)
      return next
    })
  }

  function copyFolder(fullId) {
    navigator.clipboard.writeText(fullId).then(() => {
      setCopiedFolder(fullId)
      setTimeout(() => setCopiedFolder(null), 1000)
    })
  }

  function renderNode(node, depth = 0) {
    const childrenArr = Object.values(node.children)
    const hasChildren = childrenArr.length > 0
    const isLeaf = !hasChildren && allModes.some((m) => modes[m][node.fullPath] !== undefined)

    if (!hasChildren && !isLeaf) return null

    const fullId = `${title}-${node.fullPath}`

    // ── Folder Row ───────────────────────────────────────────────────────
    if (hasChildren) {
      const isCollapsed = collapsed.has(node.fullPath)
      const indentPx = 8 + depth * 16 + 16

      return (
        <React.Fragment key={node.fullPath}>
          <tr className='folder-row' id={fullId}>
            <td className='tree-cell' style={{ '--depth': depth, paddingLeft: `${indentPx}px` }}>
              <button className='node-toggle' onClick={() => toggleNode(node.fullPath)}>
                {isCollapsed ? '+' : '–'}
              </button>
              <span
                className='folder-label'
                style={{ position: 'relative', cursor: 'pointer' }}
                onClick={() => copyFolder(fullId)}
              >
                {node.name}/{copiedFolder === fullId && <span className='copy-tooltip'>Copied!</span>}
              </span>
            </td>
            {/* render empty placeholders for each displayed mode */}
            {displayedModes.map((m) => (
              <React.Fragment key={m}>
                <td colSpan={2} />
              </React.Fragment>
            ))}
            <td />
          </tr>
          {!isCollapsed && childrenArr.map((child) => renderNode(child, depth + 1))}
        </React.Fragment>
      )
    }

    // ── Leaf Row ─────────────────────────────────────────────────────────
    // If filtering a specific mode, and this leaf doesn't exist there, skip it
    if (filterMode !== 'All' && !modes[filterMode]?.[node.fullPath]) {
      return null
    }

    return (
      <TokenRow
        key={node.fullPath}
        tokenName={node.fullPath}
        modes={modes}
        depth={depth}
        collection={title}
        // let TokenRow know which mode(s) we're showing
        displayedModes={displayedModes}
      />
    )
  }

  return (
    <div className='token-table'>
      <div className='table-scroll'>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              {displayedModes.map((m) => (
                <th key={m} colSpan={2}>
                  {m}
                </th>
              ))}
              <th>Description</th>
            </tr>
            <tr>
              <th />
              {displayedModes.map((m) => (
                <th key={m + '_alias'} colSpan={2}>
                  Alias &amp; Value
                </th>
              ))}
              <th />
            </tr>
          </thead>
          <tbody>{Object.values(tree).map((rootNode) => renderNode(rootNode, 0))}</tbody>
        </table>
      </div>
    </div>
  )
}
