// src/components/TokenRow.js
import React from 'react'
import './TokenRow.css'

export default function TokenRow({ tokenName, modes = {}, depth = 0 }) {
  const modeNames = Object.keys(modes)

  // pull description from the first mode that has one
  const description =
    modeNames
      .map(m => modes[m][tokenName]?.description)
      .find(Boolean) || ''

  // Given a mode and starting tokenName, follow aliasChain/value
  // until you land on a non-braced string (e.g. a hex), returning the full chain.
  // function getFullChain(mode, startName) {
  //   const chain = []
  //   const seen = new Set()

  //   let current = startName
  //   while (current && !seen.has(current)) {
  //     seen.add(current)
  //     const tk = modes[mode][current]
  //     if (!tk) break

  //     const aliasChain = tk.aliasChain || []
  //     if (aliasChain.length) {
  //       // push each alias step
  //       aliasChain.forEach(a => chain.push(a))
  //       // look at the last alias—if it’s a braced token, follow it
  //       const last = aliasChain[aliasChain.length - 1]
  //       const m = last.match(/^\{(.+)\}$/)
  //       if (m) {
  //         current = m[1]
  //         continue
  //       }
  //     }

  //     // no aliasChain (or last alias was not a token), fall back to tk.value or tk.resolved
  //     const raw = tk.resolved ?? tk.value
  //     if (raw) {
  //       chain.push(raw)
  //     }
  //     break
  //   }

  //   return chain
  // }


  // function getFullChain(mode, startName) {
  //   const chain = [];
  //   const seen = new Set();

  //   let current = startName;
  //   while (current && !seen.has(current)) {
  //     seen.add(current);
  //     const tk = modes[mode][current];
  //     if (!tk) break;

  //     const aliasChain = tk.aliasChain || [];
  //     if (aliasChain.length) {
  //       aliasChain.forEach(a => chain.push(a));
  //       const last = aliasChain[aliasChain.length - 1];
  //       const m = last.match(/^\{(.+)\}$/);
  //       if (m) {
  //         current = m[1];
  //         continue;
  //       }
  //     }

  //     const raw = tk.resolved ?? tk.value;
  //     if (raw) {
  //       chain.push(raw);
  //     }
  //     break;
  //   }

  //   // ** New: remove a trailing duplicate if the last two items match **
  //   if (chain.length >= 2 && chain[chain.length - 1] === chain[chain.length - 2]) {
  //     chain.pop();
  //   }

  //   return chain;
  // }


  function getFullChain(mode, startName) {
    const chain = [];
    const seen = new Set();

    let current = startName;
    while (current && !seen.has(current)) {
      seen.add(current);
      const tk = modes[mode][current];
      if (!tk) break;

      const aliasChain = tk.aliasChain || [];
      if (aliasChain.length) {
        aliasChain.forEach(a => chain.push(a));
        const last = aliasChain[aliasChain.length - 1];
        const m = last.match(/^\{(.+)\}$/);
        if (m) {
          current = m[1];
          continue;
        }
      }

      const raw = tk.resolved ?? tk.value;
      if (raw) {
        chain.push(raw);
      }
      break;
    }

    // dedupe trailing duplicates
    if (chain.length >= 2 && chain[chain.length - 1] === chain[chain.length - 2]) {
      chain.pop();
    }

    // —— NEW: post-process the final entry for px/rem or font-weight labels
    if (chain.length) {
      const last = chain[chain.length - 1];

      // 1) px → rem
      const pxMatch = last.match(/^(\d+(?:\.\d+)?)px$/);
      if (pxMatch) {
        const px = parseFloat(pxMatch[1]);
        const rem = (px / 16).toFixed(2);
        chain[chain.length - 1] = `${px}px —— ${rem}rem`;

      } else {
        // 2) font-weight → common name
        const weightMap = {
          '100': 'Thin (Hairline)',
          '200': 'Extra Light (Ultra Light)',
          '300': 'Light',
          '400': 'Normal (Regular)',
          '500': 'Medium',
          '600': 'Semi Bold (Demi Bold)',
          '700': 'Bold',
          '800': 'Extra Bold (Ultra Bold)',
          '900': 'Black (Heavy)',
          '950': 'Extra Black (Ultra Black)',
        };
        if (weightMap[last]) {
          chain[chain.length - 1] = `${last} —— ${weightMap[last]}`;
        }
      }
    }

    return chain;
  }




  return (
    <tr id={tokenName}>
      {/* Name column with tree indent */}
      <td
        className="tree-cell"
        style={{
          '--depth': depth,
          paddingLeft: `${8 + depth * 16 + 16}px`
        }}
      >
        {tokenName}
      </td>

      {modeNames.map(mode => {
        // build the full alias/value chain for this mode & token
        const fullChain = getFullChain(mode, tokenName)

        // first element might be a pure hex; we'll show swatch only for the last
        const final = fullChain[fullChain.length - 1]
        const showSwatch = /^#/.test(final)

        return (
          <React.Fragment key={mode}>
            {/* Preview swatch */}
            <td>
              {showSwatch ? (
                <span
                  className="color-box"
                  style={{ backgroundColor: final }}
                  title={final}
                />
              ) : (
                '—'
              )}
            </td>

            {/* Alias & Value stack */}
            <td className="alias-stack">
              {fullChain.map((item, i) => (
                <React.Fragment key={i}>
                  <div className="alias-token">{item}</div>
                  {/* show arrow if not last */}
                  {i < fullChain.length - 1 && (
                    <div className="alias-arrow">↓</div>
                  )}
                </React.Fragment>
              ))}
            </td>
          </React.Fragment>
        )
      })}

      {/* Description column */}
      <td>{description}</td>
    </tr>
  )
}

