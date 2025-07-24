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

export default function TokenTable({ title, modes = {} }) {
  const modeNames = Object.keys(modes);
  const [collapsed, setCollapsed] = useState(new Set());

  // Gather and sort all token keys
  const allKeys = new Set(
    Object.values(modes).flatMap(m => Object.keys(m))
  );
  const sortedKeys = Array.from(allKeys).sort();
  const tree = buildTree(sortedKeys);

  // Toggle a folder’s collapsed state
  function toggleNode(path) {
    setCollapsed(prev => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  }

  // Recursively render folders & leaves
  function renderNode(node, depth = 0) {
    const childrenArr = Object.values(node.children);
    const hasChildren = childrenArr.length > 0;
    const isLeaf = !hasChildren && modeNames.some(
      m => modes[m][node.fullPath] !== undefined
    );
    if (!hasChildren && !isLeaf) return null;

    // Folder
    if (hasChildren) {
      const isCollapsed = collapsed.has(node.fullPath);
      // indent + extra 16px so toggle & text never overlap
      const indentPx = 8 + depth * 16 + 16;

      return (
        <React.Fragment key={node.fullPath}>
          <tr className="folder-row" id={node.path}>
            <td
              className="tree-cell"
              style={{
                '--depth': depth,
                paddingLeft: `${indentPx}px`,
              }}
            >
              <button
                className="node-toggle"
                onClick={() => toggleNode(node.fullPath)}
              >
                {isCollapsed ? '+' : '–'}
              </button>
              {/* ⬅︎ make sure this line is here */}
              <span className="folder-label">{node.name}/</span>
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

    // Leaf
    return (
      <TokenRow
        key={node.fullPath}
        tokenName={node.fullPath}
        modes={modes}
        depth={depth}
      />
    );
  }

  return (
    <div className="token-table">
      {/* {title && <h2>{title}</h2>} */}
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              {modeNames.map(m => (
                <th key={m} colSpan={2}>{m}</th>
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
          <tbody>
            {Object.values(tree).map(rootNode => renderNode(rootNode, 0))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
