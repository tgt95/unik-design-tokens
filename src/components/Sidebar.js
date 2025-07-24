import React from 'react';
import './Sidebar.css';

export default function Sidebar({ items, name = 'Menu' }) {
  return (
    <nav className="sidebar">
      <h2>{name}</h2>
      <ul>
        {items.map(node => (
          <SidebarNode key={node.id} node={node} depth={0} />
        ))}
      </ul>
    </nav>
  );
}

function SidebarNode({ node, depth }) {
  return (
    <li style={{ paddingLeft: depth * 6 }}>
      <a href={`#${node.id}`}>{node.label}</a>
      {node.children.length > 0 && (
        <ul>
          {node.children.map(child => (
            <SidebarNode key={child.id} node={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}
