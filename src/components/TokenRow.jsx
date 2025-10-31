// src/components/TokenRow.js
import React, { useState } from 'react'
import './TokenRow.css'

export default function TokenRow({
  tokenName,
  modes = {},
  depth = 0,
  collection,
}) {
  const [copiedKey, setCopiedKey] = useState(null)
  const modeNames = Object.keys(modes)

  // first non-empty description
  const description =
    modeNames
      .map((m) => modes[m][tokenName]?.description)
      .find(Boolean) || ''

  // build the alias/value chain (unchanged)
  function getFullChain(mode, startName) {
    const chain = []
    const seen = new Set()
    let current = startName

    while (current && !seen.has(current)) {
      seen.add(current)
      const tk = modes[mode][current]
      if (!tk) break

      const aliasChain = tk.aliasChain || []
      if (aliasChain.length) {
        aliasChain.forEach((a) => chain.push(a))
        const last = aliasChain[aliasChain.length - 1]
        const m = last.match(/^\{(.+)\}$/)
        if (m) {
          current = m[1]
          continue
        }
      }

      const raw = tk.resolved ?? tk.value
      if (raw) chain.push(raw)
      break
    }

    if (
      chain.length >= 2 &&
      chain[chain.length - 1] === chain[chain.length - 2]
    ) {
      chain.pop()
    }

    // px→rem or font-weight
    if (chain.length) {
      const last = chain[chain.length - 1]
      const pxMatch = last.match(/^(\d+(?:\.\d+)?)px$/)
      if (pxMatch) {
        const px = parseFloat(pxMatch[1])
        chain[chain.length - 1] = `${px}px — ${(px / 16).toFixed(2)}rem`
      } else {
        const weightMap = {
          100: 'Thin (Hairline)',
          200: 'Extra Light (Ultra Light)',
          300: 'Light',
          400: 'Normal (Regular)',
          500: 'Medium',
          600: 'Semi Bold (Demi Bold)',
          700: 'Bold',
          800: 'Extra Bold (Ultra Bold)',
          900: 'Black (Heavy)',
          950: 'Extra Black (Ultra Black)',
        }
        if (weightMap[last]) {
          chain[chain.length - 1] = `${last} — ${weightMap[last]}`
        }
      }
    }

    return chain
  }

  // generic copy + tooltip
  function handleCopy(text, key) {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedKey(key)
      setTimeout(() => setCopiedKey(null), 1000)
    })
  }

  // copy just the tokenName
  const nameKey = `name-${tokenName}`
  function copyTokenName() {
    handleCopy(tokenName, nameKey)
  }

  return (
    <tr id={`${collection}-${tokenName}`} className="token-row">
      {/* Name cell */}
      <td
        className="tree-cell"
        style={{
          '--depth': depth,
          paddingLeft: `${8 + depth * 16 + 16}px`,
        }}
      >
        <span
          className="name-token"
          onClick={copyTokenName}
          title="Click to copy token name"
        >
          {tokenName}
          {copiedKey === nameKey && (
            <span className="copy-tooltip">Copied!</span>
          )}
        </span>
      </td>

      {modeNames.map((mode) => {
        const fullChain = getFullChain(mode, tokenName)
        const final = fullChain[fullChain.length - 1]

        return (
          <React.Fragment key={mode}>
            <td>
              {/^.*/.test(final) && /^#/.test(final) ? (
                <span
                  className="color-box"
                  style={{ backgroundColor: final }}
                  title={final}
                />
              ) : (
                '—'
              )}
            </td>
            <td className="alias-stack">
              {fullChain.flatMap((item, i) => {
                const isLast = i === fullChain.length - 1
                const key = `${tokenName}-${mode}-${i}`

                // px/rem split
                if (isLast && item.includes(' — ')) {
                  const [px, rem] = item.split(' — ')
                  const pxKey = `${key}-px`
                  const remKey = `${key}-rem`
                  return [
                    <React.Fragment key={pxKey}>
                      <div
                        className="alias-token"
                        onClick={() => handleCopy(px, pxKey)}
                        style={{ cursor: 'pointer', position: 'relative' }}
                      >
                        {px}
                        {copiedKey === pxKey && (
                          <span className="copy-tooltip">Copied!</span>
                        )}
                      </div>
                      <div className="alias-arrow">↓</div>
                    </React.Fragment>,
                    <React.Fragment key={remKey}>
                      <div
                        className="alias-token"
                        onClick={() => handleCopy(rem, remKey)}
                        style={{ cursor: 'pointer', position: 'relative' }}
                      >
                        {rem}
                        {copiedKey === remKey && (
                          <span className="copy-tooltip">Copied!</span>
                        )}
                      </div>
                    </React.Fragment>,
                  ]
                }

                // normal
                return (
                  <React.Fragment key={key}>
                    <div
                      className="alias-token"
                      onClick={() => handleCopy(item, key)}
                      style={{ cursor: 'pointer', position: 'relative' }}
                    >
                      {item}
                      {copiedKey === key && (
                        <span className="copy-tooltip">Copied!</span>
                      )}
                    </div>
                    {!isLast && <div className="alias-arrow">↓</div>}
                  </React.Fragment>
                )
              })}
            </td>
          </React.Fragment>
        )
      })}

      <td>{description}</td>
    </tr>
  )
}
