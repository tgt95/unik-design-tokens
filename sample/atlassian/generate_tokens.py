#!/usr/bin/env python3
import json
from pathlib import Path
from collections import defaultdict

# Load data
with open('/Users/admin/Documents/Coding/unik-design-tokens/sample/atlassian/figma_data.json', 'r') as f:
    data = json.load(f)

# Build primitive lookup: name -> {light, dark}
primitive_map = {}
for item in data['primitives']:
    _, name, light, dark = item
    primitive_map[name] = {'light': light, 'dark': dark}

# Determine category for a token path
def get_category(path):
    if path.startswith('background/'):
        return 'Background'
    if path.startswith('text/'):
        return 'Text'
    if path.startswith('border/'):
        return 'Border'
    if path.startswith('icon/'):
        return 'Icon'
    if path.startswith('interaction/'):
        return 'Interaction'
    if path.startswith('link/'):
        return 'Link'
    if path.startswith('chart/'):
        return 'Chart'
    if path.startswith('surface/'):
        return 'Surface'
    if path.startswith('skeleton/'):
        return 'Skeleton'
    if path.startswith('blanket/'):
        return 'Blanket'
    if path.startswith('shadow/'):
        return 'Shadow'
    if path.startswith('opacity/'):
        return 'Opacity'
    if path.startswith('elevation/'):
        return 'Elevation'
    if path.startswith('UNSAFE/'):
        return 'UNSAFE'
    return 'Other'

# Resolve a semantic value to (resolved_display, hex_or_value, is_primitive_name)
def resolve(val):
    if isinstance(val, str) and val in primitive_map:
        return val, primitive_map[val]['light'], True
    # Some tokens might have values like '#00000029' which are also primitive names
    if isinstance(val, str) and val.startswith('#'):
        # Check if it's literally a primitive name
        if val in primitive_map:
            return val, primitive_map[val]['light'], True
        return '—', val, False
    if isinstance(val, str):
        if val in primitive_map:
            return val, primitive_map[val]['light'], True
        return '—', val, False
    if isinstance(val, (int, float)):
        return '—', str(val), False
    return '—', str(val), False

# Process semantic tokens
categories = defaultdict(list)
aliased_count = 0
raw_count = 0
adaptive_count = 0

for item in data['semantic']:
    name, typ, light_val, dark_val = item
    cat = get_category(name)
    
    prim_light, raw_light, is_prim_light = resolve(light_val)
    prim_dark, raw_dark, is_prim_dark = resolve(dark_val)
    
    # If light is a primitive but dark is a different primitive, resolve raw_dark from prim_dark map
    if is_prim_dark and prim_dark in primitive_map:
        raw_dark = primitive_map[prim_dark]['dark']
    if is_prim_light and prim_light in primitive_map:
        raw_light = primitive_map[prim_light]['light']
    
    # Special case: if light and dark point to different primitives, the "raw" for dark should come from that primitive's dark value
    # Actually, we already have raw values for primitives from the map. For semantic tokens that alias to primitives,
    # the "raw" we want is the hex of the primitive in that mode.
    # The resolve function currently returns primitive_map[val]['light'] regardless. Let's fix this.
    # We'll rebuild resolve to accept a mode.
    pass

# Re-process with proper mode-aware resolution
def resolve_mode(val, mode):
    if isinstance(val, str) and val in primitive_map:
        return val, primitive_map[val][mode], True
    if isinstance(val, str) and val.startswith('#'):
        if val in primitive_map:
            return val, primitive_map[val][mode], True
        return '—', val, False
    if isinstance(val, str):
        if val in primitive_map:
            return val, primitive_map[val][mode], True
        return '—', val, False
    if isinstance(val, (int, float)):
        return '—', str(val), False
    return '—', str(val), False

semantic_rows = []
for item in data['semantic']:
    name, typ, light_val, dark_val = item
    cat = get_category(name)
    
    prim_light, raw_light, is_prim_light = resolve_mode(light_val, 'light')
    prim_dark, raw_dark, is_prim_dark = resolve_mode(dark_val, 'dark')
    
    # Determine primitive column display
    if is_prim_light and is_prim_dark:
        if prim_light == prim_dark:
            prim_display = prim_light
        else:
            prim_display = f"{prim_light} → {prim_dark}"
        aliased_count += 1
    elif is_prim_light:
        prim_display = f"{prim_light} → Raw"
        aliased_count += 1
    elif is_prim_dark:
        prim_display = f"Raw → {prim_dark}"
        aliased_count += 1
    else:
        prim_display = '—'
        raw_count += 1
    
    # Adaptive detection
    is_adaptive = raw_light != raw_dark or (is_prim_light and is_prim_dark and prim_light != prim_dark)
    if is_adaptive:
        adaptive_count += 1
    
    adaptive_mapping = f'"light": "{light_val}" | "dark": "{dark_val}"'
    
    categories[cat].append({
        'path': name,
        'type': typ,
        'primitive': prim_display,
        'raw_light': raw_light,
        'raw_dark': raw_dark,
        'adaptive': adaptive_mapping
    })

# Order categories
order = ['Background', 'Text', 'Border', 'Icon', 'Interaction', 'Link', 'Surface', 'Blanket', 'Shadow', 'Opacity', 'Elevation', 'Chart', 'Skeleton', 'UNSAFE', 'Other']

# Build markdown
md_lines = []
md_lines.append("# Atlassian Design System Token Mapping")
md_lines.append("")
md_lines.append(f"**Generated:** 2026-06-06")
md_lines.append("")
md_lines.append("**Source:** [Atlassian Design System Figma File](https://www.figma.com/design/Ba7vj2k88AT53zawtOkvmv) + `@atlaskit/tokens`")
md_lines.append("")
md_lines.append("## Architecture Overview")
md_lines.append("")
md_lines.append("The Atlassian Design System uses a tiered token architecture:")
md_lines.append("")
md_lines.append("1. **Raw Value**: The actual computed hex color, opacity, or dimension.")
md_lines.append("2. **Primitive (Global Constant)**: Base palette tokens (e.g., `Blue700`, `Neutral1000`) that hold raw values.")
md_lines.append("3. **Semantic**: Contextual tokens (e.g., `background/selected`, `text/danger`) that map primitives to meaning.")
md_lines.append("4. **Component**: Component-specific overrides (e.g., `background/disabled` in Future collection, `border/input` in New Input Border collection).")
md_lines.append("5. **Computational**: Calculated or derived values such as `opacity/disabled`, box-shadow `STRING` tokens, and shape radii.")
md_lines.append("6. **Adaptive**: Each semantic token defines both a Light and Dark mode value, allowing a single token path to resolve to different primitives depending on the theme.")
md_lines.append("")
md_lines.append("---")
md_lines.append("")

# Summary
md_lines.append("## Summary")
md_lines.append("")
md_lines.append(f"- **Total Primitive Tokens:** {len(data['primitives'])}")
md_lines.append(f"- **Total Semantic Tokens:** {len(data['semantic'])}")
md_lines.append(f"- **Aliased to Primitive:** {aliased_count}")
md_lines.append(f"- **Raw / Direct Value:** {raw_count}")
md_lines.append(f"- **Adaptive (Light ≠ Dark):** {adaptive_count}")
md_lines.append("")
md_lines.append("---")
md_lines.append("")

# Semantic token tables
def make_table(rows):
    lines = []
    lines.append("| Token Path | Primitive | Raw Value (Light) | Raw Value (Dark) | Adaptive Mapping |")
    lines.append("|------------|-----------|-------------------|------------------|------------------|")
    for r in rows:
        raw_light_escaped = r['raw_light'].replace('|', '\\|')
        raw_dark_escaped = r['raw_dark'].replace('|', '\\|')
        lines.append(f"| `{r['path']}` | {r['primitive']} | {raw_light_escaped} | {raw_dark_escaped} | {r['adaptive']} |")
    return '\n'.join(lines)

for cat in order:
    if cat not in categories or not categories[cat]:
        continue
    md_lines.append(f"## {cat} Tokens")
    md_lines.append("")
    md_lines.append(f"*{len(categories[cat])} tokens*")
    md_lines.append("")
    md_lines.append(make_table(categories[cat]))
    md_lines.append("")
    md_lines.append("---")
    md_lines.append("")

# Component tokens section
md_lines.append("## Component-Specific Tokens")
md_lines.append("")
md_lines.append("These tokens live in smaller collections outside the main semantic set.")
md_lines.append("")

# Future
if data['component'].get('future'):
    md_lines.append("### Atlassian Future")
    md_lines.append("")
    md_lines.append("| Token Path | Type | Light | Dark |")
    md_lines.append("|------------|------|-------|------|")
    for item in data['component']['future']:
        name, typ, light, dark = item
        md_lines.append(f"| `{name}` | {typ} | {light} | {dark} |")
    md_lines.append("")

# New Input Border
if data['component'].get('inputBorder'):
    md_lines.append("### Atlassian New Input Border")
    md_lines.append("")
    md_lines.append("| Token Path | Type | Light | Dark |")
    md_lines.append("|------------|------|-------|------|")
    for item in data['component']['inputBorder']:
        name, typ, light, dark = item
        md_lines.append(f"| `{name}` | {typ} | {light} | {dark} |")
    md_lines.append("")

# Shape
if data['component'].get('shape'):
    md_lines.append("### Atlassian Shape")
    md_lines.append("")
    md_lines.append("| Token Path | Type | Values |")
    md_lines.append("|------------|------|--------|")
    for item in data['component']['shape']:
        name, typ, vals = item
        val_str = json.dumps(vals)
        md_lines.append(f"| `{name}` | {typ} | {val_str} |")
    md_lines.append("")

# AUI Compatibility Aliases
if data['component'].get('aui'):
    md_lines.append("### Atlassian AUI Compatibility Aliases")
    md_lines.append("")
    md_lines.append("| Token Path | Type | Value |")
    md_lines.append("|------------|------|-------|")
    for item in data['component']['aui']:
        name, typ, vals = item
        val_str = json.dumps(vals)
        md_lines.append(f"| `{name}` | {typ} | {val_str} |")
    md_lines.append("")

md_lines.append("---")
md_lines.append("")
md_lines.append("*End of Document*")

# Write output
out_path = Path('/Users/admin/Documents/Coding/unik-design-tokens/sample/atlassian/tokens-mapping.md')
out_path.parent.mkdir(parents=True, exist_ok=True)
out_path.write_text('\n'.join(md_lines), encoding='utf-8')
print(f"Wrote {out_path}")
