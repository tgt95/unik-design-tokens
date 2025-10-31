// src/components/Sidebar.js
import React from 'react'
import './Sidebar.css'

export default function Sidebar({ items, name='Table of contents' }) {
  // your existing smooth‐scroll handler
  function handleClick(e, id) {
    e.preventDefault()
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav className="sidebar">
      <h2>{name}</h2>
      <ul>
        {items.map(node => (
          <SidebarNode
            key={node.id}
            node={node}
            depth={0}
            prefix={node.id}
            onItemClick={handleClick}
          />
        ))}
      </ul>
    </nav>
  )
}

function SidebarNode({ node, depth, prefix, onItemClick }) {
  const paddingTop = depth === 0 ? 24 : undefined
  return (
    <li style={{ paddingLeft: depth * 4, paddingTop }}>
      <a
        href={`#${prefix}-${node.id}`}
        style={{ fontWeight: depth === 0 ? 'bold' : undefined }}
        onClick={e => onItemClick(e, `${prefix}-${node.id}`)}
      >
        {node.label}
      </a>

      {node.children.length > 0 && (
        <ul>
          {node.children.map(child => (
            <SidebarNode
              key={child.id}
              node={child}
              depth={depth + 1}
              prefix={prefix}
              onItemClick={onItemClick}
            />
          ))}
        </ul>
      )}
    </li>
  )
}
