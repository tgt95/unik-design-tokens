// src/components/TokenTable.js
import React, { useState } from 'react';
import TokenRow from './TokenRow';
import './TokenTable.css';

/**
 * Build a nested tree from dot-separated token names.
 */
function buildTree(tokenNames) {
  const root = {};
  tokenNames.forEach(fullName => {
    const parts = fullName.split('.');
    let node = root;
    parts.forEach((part, i) => {
      if (!node[part]) {
        node[part] = {
          name: part,
          children: {},
          fullPath: parts.slice(0, i + 1).join('.'),
        };
      }
      node = node[part].children;
    });
  });
  return root;
}

export default function TokenTable({ title, modes = {}, keyOrder = [] }) {
  const modeNames = Object.keys(modes);
  const [collapsed, setCollapsed] = useState(new Set());
  const [copiedFolder, setCopiedFolder] = useState(null);

  // **Use the keyOrder passed from App** instead of sorting ourselves
  const sortedKeys = keyOrder;
  const tree = buildTree(sortedKeys);

  // toggle folder open/closed
  function toggleNode(path) {
    setCollapsed(prev => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  }

  // copy folder ID + show tooltip
  function copyFolder(fullId) {
    navigator.clipboard.writeText(fullId).then(() => {
      setCopiedFolder(fullId);
      setTimeout(() => setCopiedFolder(null), 1000);
    });
  }

  function renderNode(node, depth = 0) {
    const childrenArr = Object.values(node.children);
    const hasChildren = childrenArr.length > 0;
    const isLeaf =
      !hasChildren && modeNames.some(m => modes[m][node.fullPath] !== undefined);
    if (!hasChildren && !isLeaf) return null;

    // a stable, namespaced id for scrolling / copy
    const fullId = `${title}-${node.fullPath}`;

    if (hasChildren) {
      const isCollapsed = collapsed.has(node.fullPath);
      const indentPx = 8 + depth * 16 + 16;
      return (
        <React.Fragment key={node.fullPath}>
          <tr className="folder-row" id={fullId}>
            <td
              className="tree-cell"
              style={{ '--depth': depth, paddingLeft: `${indentPx}px` }}
            >
              <button
                className="node-toggle"
                onClick={() => toggleNode(node.fullPath)}
              >
                {isCollapsed ? '+' : '–'}
              </button>
              <span
                className="folder-label"
                style={{ position: 'relative', cursor: 'pointer' }}
                onClick={() => copyFolder(fullId)}
              >
                {node.name}/
                {copiedFolder === fullId && (
                  <span className="copy-tooltip">Copied!</span>
                )}
              </span>
            </td>
            {modeNames.map(m => (
              <React.Fragment key={m}>
                <td colSpan={2} />
              </React.Fragment>
            ))}
            <td />
          </tr>
          {!isCollapsed &&
            childrenArr.map(child => renderNode(child, depth + 1))}
        </React.Fragment>
      );
    }

    // leaf row
    return (
      <TokenRow
        key={node.fullPath}
        tokenName={node.fullPath}
        modes={modes}
        depth={depth}
        collection={title}
      />
    );
  }

  return (
    <div className="token-table">
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              {modeNames.map(m => (
                <th key={m} colSpan={2}>
                  {m}
                </th>
              ))}
              <th>Description</th>
            </tr>
            <tr>
              <th />
              {modeNames.map(m => (
                <th key={m + '_alias'} colSpan={2}>
                  Alias &amp; Value
                </th>
              ))}
              <th />
            </tr>
          </thead>
          <tbody>{Object.values(tree).map(n => renderNode(n, 0))}</tbody>
        </table>
      </div>
    </div>
  );
}
