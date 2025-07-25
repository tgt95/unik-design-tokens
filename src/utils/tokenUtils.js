/**
 * Flatten a nested DTCG token structure into a flat map:
 * {
 *   "bg.surface.level-1": {
 *     type: string,
 *     value: string,
 *     description: string,
 *     ...meta
 *   },
 *   ...
 * }
 */
export function flattenTokens(tokens, path = [], meta = {}) {
  const result = {};

  for (const key in tokens) {
    const item = tokens[key];
    const currentPath = [...path, key];

    // Only process objects (skip arrays / primitives)
    if (item && typeof item === 'object' && !Array.isArray(item)) {
      if ('value' in item || '$value' in item) {
        // Leaf token
        result[currentPath.join('.')] = {
          ...meta,
          type: item.type ?? item.$type,
          value: item.value ?? item.$value,
          // Wrap nullish coalesce in () before || to satisfy Babel
          description: (item.description ?? item.$description) || ''
        };
      } else {
        // Nested group: recurse
        Object.assign(
          result,
          flattenTokens(item, currentPath, meta)
        );
      }
    }
  }

  return result;
}

/**
 * Resolve a token’s value that may be an alias string "{a.b.c}".
 * First tries a flat lookup (tokens[key]), then falls back to nested.
 */
export function resolveAlias(value, flatTokens, seen = new Set()) {
  // If it’s not an alias reference, return as-is
  if (typeof value !== 'string' || !value.startsWith('{')) {
    return value;
  }

  const key = value.replace(/[{}]/g, '');
  if (seen.has(key)) {
    // Circular reference guard
    return value;
  }
  seen.add(key);

  // 1) Try flat lookup
  let target = flatTokens[key];
  // 2) Fallback to nested lookup
  if (!target) {
    target = key.split('.').reduce((obj, part) => obj?.[part], flatTokens);
  }
  if (!target) {
    return value;
  }

  const next = target.value ?? target.$value;
  return resolveAlias(next, flatTokens, seen);
}

/**
 * Build a full alias chain array for a given alias string.
 * E.g. initial="{a.b}", flatTokens contains { "a.b": { value: "{c.d}" }, "c.d": { value: "#fff" } }
 * returns ["{a.b}", "{c.d}", "#fff"]
 */
export function getAliasChain(initialValue, flatTokens) {
  const chain = [];
  let current = initialValue;
  const seen = new Set();

  while (typeof current === 'string' && current.startsWith('{')) {
    if (seen.has(current)) {
      break;
    }
    seen.add(current);
    chain.push(current);

    const key = current.replace(/[{}]/g, '');
    const target = flatTokens[key];
    if (!target) break;

    const next = target.value ?? target.$value;
    if (typeof next !== 'string') break;
    current = next;
  }

  // Append final literal if not an alias
  if (typeof current === 'string' && !current.startsWith('{')) {
    chain.push(current);
  }

  return chain;
}

/**
 * Build a nested tree from dot-separated token names,
 * preserving the exact order of the incoming `tokenNames` array.
 */
export function buildTree(tokenNames) {
  const root = {};
  tokenNames.forEach(fullName => {
    const parts = fullName.split('.');
    let node = root;
    parts.forEach((part, i) => {
      if (!node[part]) {
        node[part] = {
          name: part,
          fullPath: parts.slice(0, i + 1).join('.'),
          children: {}
        };
      }
      node = node[part].children;
    });
  });
  return root;
}