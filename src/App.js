// src/App.js
import React, { useEffect, useState, useMemo } from 'react';
import { flattenTokens, resolveAlias, getAliasChain } from './utils/tokenUtils';
import TokenTable from './components/TokenTable';
import Sidebar from './components/Sidebar';
import './App.css';

const apiUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_API_URL
    : process.env.REACT_APP_DEV_API_URL;

export default function App() {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    async function loadAll() {
      const manifest = await (await fetch(`${apiUrl}/tokens/manifest.json`)).json();

      // 1) Gather global files
      const allFiles = [
        ...Object.values(manifest.collections).flatMap(c => Object.values(c.modes).flat()),
        ...Object.values(manifest.styles).flat(),
      ];

      // 2) Fetch & flatten global tokens
      const globalData = await Promise.all(
        allFiles.map(f => fetch(`${apiUrl}/tokens/${f}`).then(r => r.json()))
      );
      const globalFlat = flattenTokens(Object.assign({}, ...globalData));

      // 3) Build each collection’s modes
      const gathered = [];
      for (const [collectionName, collection] of Object.entries(manifest.collections)) {
        const modes = {};
        for (const [modeName, files] of Object.entries(collection.modes)) {
          const localData = await Promise.all(
            files.map(f => fetch(`${apiUrl}/tokens/${f}`).then(r => r.json()))
          );
          const merged = Object.assign({}, ...localData);
          const flat = flattenTokens(merged, [], {
            collection: collectionName,
            mode: modeName,
          });

          // resolve aliases & attach chains/descriptions
          for (const key in flat) {
            const raw = flat[key].value;
            flat[key].resolved = resolveAlias(raw, globalFlat);
            flat[key].aliasChain = getAliasChain(raw, globalFlat);
            flat[key].description ||= '';
          }

          modes[modeName] = flat;
        }
        gathered.push({ collectionName, modes });
      }

      setTables(gathered);
    }
    loadAll();
  }, []);

  // Sort collections alphabetically
  const sortedTables = useMemo(
    () => [...tables].sort((a, b) => a.collectionName.localeCompare(b.collectionName)),
    [tables]
  );

  // Build sidebar outline & also capture the exact DFS key order
  const outline = useMemo(() => {
    return sortedTables.map(({ collectionName, modes }) => {
      // pick first mode to derive branch structure
      const firstMode = Object.keys(modes)[0] || '';
      const keys = Object.keys(modes[firstMode] || {});

      // build a nested map
      const treeMap = {};
      keys.forEach(fullKey => {
        const parts = fullKey.split('.');
        let cursor = treeMap;
        parts.forEach((p, i) => {
          if (!cursor[p]) {
            cursor[p] = { path: parts.slice(0, i + 1).join('.'), children: {} };
          }
          cursor = cursor[p].children;
        });
      });

      // recursively turn into sidebar nodes
      function makeNodes(map) {
        return Object.entries(map)
          .filter(([, data]) => Object.keys(data.children).length > 0)
          .map(([label, data]) => ({
            id: data.path,
            label,
            children: makeNodes(data.children),
          }));
      }

      // now capture the *flattened* key order in that same DFS
      const outlineKeys = [];
      function walkDFS(map) {
        Object.values(map).forEach(({ path, children }) => {
          outlineKeys.push(path);
          walkDFS(children);
        });
      }
      walkDFS(treeMap);

      return {
        id: collectionName,
        label: collectionName,
        children: makeNodes(treeMap),
        outlineKeys,
      };
    });
  }, [sortedTables]);

  return (
    <div className="layout">
      <Sidebar items={outline} />
      <main className="content">
        <div className="app">
          <h1>🎨 Design Tokens Viewer</h1>
          {outline.map(({ id: collectionName, outlineKeys }, i) => {
            const { modes } = sortedTables.find(t => t.collectionName === collectionName);
            return (
              <section key={collectionName} id={collectionName} style={{ marginBottom: '2rem' }}>
                <h2>{collectionName}</h2>
                <TokenTable title={collectionName} modes={modes} keyOrder={outlineKeys} />
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
}
