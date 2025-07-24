import React from 'react';
import TokenRow from './TokenRow';

function groupByBranch(flattenedTokens) {
  const grouped = {};
  for (const key in flattenedTokens) {
    const [branch] = key.split('.');
    if (!grouped[branch]) grouped[branch] = {};
    grouped[branch][key] = flattenedTokens[key];
  }
  return grouped;
}

function TokenGroup({ mode, tokens }) {
  const grouped = groupByBranch(tokens);

  return (
    <div className="token-mode">
      <h3>{mode}</h3>
      {Object.entries(grouped).map(([branch, branchTokens]) => (
        <div key={branch} className="token-branch">
          <h4>{branch}/</h4>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Value</th>
                <th>Alias</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(branchTokens).map(([name, token]) => (
                <TokenRow key={name} name={name} token={token} />
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default TokenGroup;
