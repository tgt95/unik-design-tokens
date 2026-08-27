# Atlassian Design System Token Mapping

**Generated:** 2026-06-06

**Source:** [Atlassian Design System Figma File](https://www.figma.com/design/Ba7vj2k88AT53zawtOkvmv) + `@atlaskit/tokens`

## Architecture Overview

The Atlassian Design System uses a tiered token architecture:

1. **Raw Value**: The actual computed hex color, opacity, or dimension.
2. **Primitive (Global Constant)**: Base palette tokens (e.g., `Blue700`, `Neutral1000`) that hold raw values.
3. **Semantic**: Contextual tokens (e.g., `background/selected`, `text/danger`) that map primitives to meaning.
4. **Component**: Component-specific overrides (e.g., `background/disabled` in Future collection, `border/input` in New Input Border collection).
5. **Computational**: Calculated or derived values such as `opacity/disabled`, box-shadow `STRING` tokens, and shape radii.
6. **Adaptive**: Each semantic token defines both a Light and Dark mode value, allowing a single token path to resolve to different primitives depending on the theme.

---

## Summary

- **Total Primitive Tokens:** 166
- **Total Semantic Tokens:** 410
- **Aliased to Primitive:** 401
- **Raw / Direct Value:** 9
- **Adaptive (Light ≠ Dark):** 396

---

## Background Tokens

*196 tokens*

| Token Path | Primitive | Raw Value (Light) | Raw Value (Dark) | Adaptive Mapping |
|------------|-----------|-------------------|------------------|------------------|
| `background/accent/blue/bolder` | Blue700 → Blue400 | #1868db | #669df1 | "light": "Blue700" | "dark": "Blue400" |
| `background/accent/blue/bolder/hovered` | Blue800 → Blue300 | #1558bc | #8fb8f6 | "light": "Blue800" | "dark": "Blue300" |
| `background/accent/blue/bolder/pressed` | Blue850 → Blue250 | #144794 | #adcbfb | "light": "Blue850" | "dark": "Blue250" |
| `background/accent/blue/subtle` | Blue400 → Blue800 | #669df1 | #1558bc | "light": "Blue400" | "dark": "Blue800" |
| `background/accent/blue/subtle/hovered` | Blue300 → Blue850 | #8fb8f6 | #144794 | "light": "Blue300" | "dark": "Blue850" |
| `background/accent/blue/subtle/pressed` | Blue250 → Blue900 | #adcbfb | #123263 | "light": "Blue250" | "dark": "Blue900" |
| `background/accent/blue/subtler` | Blue200 → Blue900 | #cfe1fd | #123263 | "light": "Blue200" | "dark": "Blue900" |
| `background/accent/blue/subtler/hovered` | Blue250 → Blue850 | #adcbfb | #144794 | "light": "Blue250" | "dark": "Blue850" |
| `background/accent/blue/subtler/pressed` | Blue300 → Blue800 | #8fb8f6 | #1558bc | "light": "Blue300" | "dark": "Blue800" |
| `background/accent/blue/subtlest` | Blue100 → Blue1000 | #e9f2fe | #1c2b42 | "light": "Blue100" | "dark": "Blue1000" |
| `background/accent/blue/subtlest/hovered` | Blue200 → Blue900 | #cfe1fd | #123263 | "light": "Blue200" | "dark": "Blue900" |
| `background/accent/blue/subtlest/pressed` | Blue250 → Blue850 | #adcbfb | #144794 | "light": "Blue250" | "dark": "Blue850" |
| `background/accent/gray/bolder` | Neutral700 → DarkNeutral700 | #6b6e76 | #96999e | "light": "Neutral700" | "dark": "DarkNeutral700" |
| `background/accent/gray/bolder/hovered` | Neutral800 → DarkNeutral800 | #505258 | #a9abaf | "light": "Neutral800" | "dark": "DarkNeutral800" |
| `background/accent/gray/bolder/pressed` | Neutral900 → DarkNeutral900 | #3b3d42 | #bfc1c4 | "light": "Neutral900" | "dark": "DarkNeutral900" |
| `background/accent/gray/subtle` | Neutral500 → DarkNeutral500 | #8c8f97 | #63666b | "light": "Neutral500" | "dark": "DarkNeutral500" |
| `background/accent/gray/subtle/hovered` | Neutral400 → DarkNeutral400 | #b7b9be | #4b4d51 | "light": "Neutral400" | "dark": "DarkNeutral400" |
| `background/accent/gray/subtle/pressed` | Neutral300 → DarkNeutral350 | #dddee1 | #3d3f43 | "light": "Neutral300" | "dark": "DarkNeutral350" |
| `background/accent/gray/subtler` | Neutral300 → DarkNeutral400 | #dddee1 | #4b4d51 | "light": "Neutral300" | "dark": "DarkNeutral400" |
| `background/accent/gray/subtler/hovered` | Neutral400 → DarkNeutral500 | #b7b9be | #63666b | "light": "Neutral400" | "dark": "DarkNeutral500" |
| `background/accent/gray/subtler/pressed` | Neutral500 → DarkNeutral600 | #8c8f97 | #7e8188 | "light": "Neutral500" | "dark": "DarkNeutral600" |
| `background/accent/gray/subtlest` | Neutral200 → DarkNeutral300 | #f0f1f2 | #303134 | "light": "Neutral200" | "dark": "DarkNeutral300" |
| `background/accent/gray/subtlest/hovered` | Neutral300 → DarkNeutral350 | #dddee1 | #3d3f43 | "light": "Neutral300" | "dark": "DarkNeutral350" |
| `background/accent/gray/subtlest/pressed` | Neutral400 → DarkNeutral400 | #b7b9be | #4b4d51 | "light": "Neutral400" | "dark": "DarkNeutral400" |
| `background/accent/green/bolder` | Green700 → Green400 | #1f845a | #4bce97 | "light": "Green700" | "dark": "Green400" |
| `background/accent/green/bolder/hovered` | Green800 → Green300 | #216e4e | #7ee2b8 | "light": "Green800" | "dark": "Green300" |
| `background/accent/green/bolder/pressed` | Green850 → Green250 | #19573d | #97edc9 | "light": "Green850" | "dark": "Green250" |
| `background/accent/green/subtle` | Green400 → Green800 | #4bce97 | #216e4e | "light": "Green400" | "dark": "Green800" |
| `background/accent/green/subtle/hovered` | Green300 → Green850 | #7ee2b8 | #19573d | "light": "Green300" | "dark": "Green850" |
| `background/accent/green/subtle/pressed` | Green250 → Green900 | #97edc9 | #164b35 | "light": "Green250" | "dark": "Green900" |
| `background/accent/green/subtler` | Green200 → Green900 | #baf3db | #164b35 | "light": "Green200" | "dark": "Green900" |
| `background/accent/green/subtler/hovered` | Green250 → Green850 | #97edc9 | #19573d | "light": "Green250" | "dark": "Green850" |
| `background/accent/green/subtler/pressed` | Green300 → Green800 | #7ee2b8 | #216e4e | "light": "Green300" | "dark": "Green800" |
| `background/accent/green/subtlest` | Green100 → Green1000 | #dcfff1 | #1c3329 | "light": "Green100" | "dark": "Green1000" |
| `background/accent/green/subtlest/hovered` | Green200 → Green900 | #baf3db | #164b35 | "light": "Green200" | "dark": "Green900" |
| `background/accent/green/subtlest/pressed` | Green250 → Green850 | #97edc9 | #19573d | "light": "Green250" | "dark": "Green850" |
| `background/accent/lime/bolder` | Lime700 → Lime400 | #5b7f24 | #94c748 | "light": "Lime700" | "dark": "Lime400" |
| `background/accent/lime/bolder/hovered` | Lime800 → Lime300 | #4c6b1f | #b3df72 | "light": "Lime800" | "dark": "Lime300" |
| `background/accent/lime/bolder/pressed` | Lime850 → Lime250 | #3f5224 | #bde97c | "light": "Lime850" | "dark": "Lime250" |
| `background/accent/lime/subtle` | Lime400 → Lime800 | #94c748 | #4c6b1f | "light": "Lime400" | "dark": "Lime800" |
| `background/accent/lime/subtle/hovered` | Lime300 → Lime850 | #b3df72 | #3f5224 | "light": "Lime300" | "dark": "Lime850" |
| `background/accent/lime/subtle/pressed` | Lime250 → Lime900 | #bde97c | #37471f | "light": "Lime250" | "dark": "Lime900" |
| `background/accent/lime/subtler` | Lime200 → Lime900 | #d3f1a7 | #37471f | "light": "Lime200" | "dark": "Lime900" |
| `background/accent/lime/subtler/hovered` | Lime250 → Lime850 | #bde97c | #3f5224 | "light": "Lime250" | "dark": "Lime850" |
| `background/accent/lime/subtler/pressed` | Lime300 → Lime800 | #b3df72 | #4c6b1f | "light": "Lime300" | "dark": "Lime800" |
| `background/accent/lime/subtlest` | Lime100 → Lime1000 | #efffd6 | #28311b | "light": "Lime100" | "dark": "Lime1000" |
| `background/accent/lime/subtlest/hovered` | Lime200 → Lime900 | #d3f1a7 | #37471f | "light": "Lime200" | "dark": "Lime900" |
| `background/accent/lime/subtlest/pressed` | Lime250 → Lime850 | #bde97c | #3f5224 | "light": "Lime250" | "dark": "Lime850" |
| `background/accent/magenta/bolder` | Magenta700 → Magenta400 | #ae4787 | #e774bb | "light": "Magenta700" | "dark": "Magenta400" |
| `background/accent/magenta/bolder/hovered` | Magenta800 → Magenta300 | #943d73 | #f797d2 | "light": "Magenta800" | "dark": "Magenta300" |
| `background/accent/magenta/bolder/pressed` | Magenta850 → Magenta250 | #77325b | #fcb6e1 | "light": "Magenta850" | "dark": "Magenta250" |
| `background/accent/magenta/subtle` | Magenta400 → Magenta800 | #e774bb | #943d73 | "light": "Magenta400" | "dark": "Magenta800" |
| `background/accent/magenta/subtle/hovered` | Magenta300 → Magenta850 | #f797d2 | #77325b | "light": "Magenta300" | "dark": "Magenta850" |
| `background/accent/magenta/subtle/pressed` | Magenta250 → Magenta900 | #fcb6e1 | #50253f | "light": "Magenta250" | "dark": "Magenta900" |
| `background/accent/magenta/subtler` | Magenta200 → Magenta900 | #fdd0ec | #50253f | "light": "Magenta200" | "dark": "Magenta900" |
| `background/accent/magenta/subtler/hovered` | Magenta250 → Magenta850 | #fcb6e1 | #77325b | "light": "Magenta250" | "dark": "Magenta850" |
| `background/accent/magenta/subtler/pressed` | Magenta300 → Magenta800 | #f797d2 | #943d73 | "light": "Magenta300" | "dark": "Magenta800" |
| `background/accent/magenta/subtlest` | Magenta100 → Magenta1000 | #ffecf8 | #3d2232 | "light": "Magenta100" | "dark": "Magenta1000" |
| `background/accent/magenta/subtlest/hovered` | Magenta200 → Magenta900 | #fdd0ec | #50253f | "light": "Magenta200" | "dark": "Magenta900" |
| `background/accent/magenta/subtlest/pressed` | Magenta250 → Magenta850 | #fcb6e1 | #77325b | "light": "Magenta250" | "dark": "Magenta850" |
| `background/accent/orange/bolder` | Orange700 → Orange400 | #bd5b00 | #fca700 | "light": "Orange700" | "dark": "Orange400" |
| `background/accent/orange/bolder/hovered` | Orange800 → Orange300 | #9e4c00 | #fbc828 | "light": "Orange800" | "dark": "Orange300" |
| `background/accent/orange/bolder/pressed` | Orange850 → Orange250 | #7a3b00 | #fbd779 | "light": "Orange850" | "dark": "Orange250" |
| `background/accent/orange/subtle` | Orange400 → Orange800 | #fca700 | #9e4c00 | "light": "Orange400" | "dark": "Orange800" |
| `background/accent/orange/subtle/hovered` | Orange300 → Orange850 | #fbc828 | #7a3b00 | "light": "Orange300" | "dark": "Orange850" |
| `background/accent/orange/subtle/pressed` | Orange250 → Orange900 | #fbd779 | #693200 | "light": "Orange250" | "dark": "Orange900" |
| `background/accent/orange/subtler` | Orange200 → Orange900 | #fce4a6 | #693200 | "light": "Orange200" | "dark": "Orange900" |
| `background/accent/orange/subtler/hovered` | Orange250 → Orange850 | #fbd779 | #7a3b00 | "light": "Orange250" | "dark": "Orange850" |
| `background/accent/orange/subtler/pressed` | Orange300 → Orange800 | #fbc828 | #9e4c00 | "light": "Orange300" | "dark": "Orange800" |
| `background/accent/orange/subtlest` | Orange100 → Orange1000 | #fff5db | #3a2c1f | "light": "Orange100" | "dark": "Orange1000" |
| `background/accent/orange/subtlest/hovered` | Orange200 → Orange900 | #fce4a6 | #693200 | "light": "Orange200" | "dark": "Orange900" |
| `background/accent/orange/subtlest/pressed` | Orange250 → Orange850 | #fbd779 | #7a3b00 | "light": "Orange250" | "dark": "Orange850" |
| `background/accent/purple/bolder` | Purple700 → Purple400 | #964ac0 | #c97cf4 | "light": "Purple700" | "dark": "Purple400" |
| `background/accent/purple/bolder/hovered` | Purple800 → Purple300 | #803fa5 | #d8a0f7 | "light": "Purple800" | "dark": "Purple300" |
| `background/accent/purple/bolder/pressed` | Purple850 → Purple250 | #673286 | #e3bdfa | "light": "Purple850" | "dark": "Purple250" |
| `background/accent/purple/subtle` | Purple400 → Purple800 | #c97cf4 | #803fa5 | "light": "Purple400" | "dark": "Purple800" |
| `background/accent/purple/subtle/hovered` | Purple300 → Purple850 | #d8a0f7 | #673286 | "light": "Purple300" | "dark": "Purple850" |
| `background/accent/purple/subtle/pressed` | Purple250 → Purple900 | #e3bdfa | #48245d | "light": "Purple250" | "dark": "Purple900" |
| `background/accent/purple/subtler` | Purple200 → Purple900 | #eed7fc | #48245d | "light": "Purple200" | "dark": "Purple900" |
| `background/accent/purple/subtler/hovered` | Purple250 → Purple850 | #e3bdfa | #673286 | "light": "Purple250" | "dark": "Purple850" |
| `background/accent/purple/subtler/pressed` | Purple300 → Purple800 | #d8a0f7 | #803fa5 | "light": "Purple300" | "dark": "Purple800" |
| `background/accent/purple/subtlest` | Purple100 → Purple1000 | #f8eefe | #35243f | "light": "Purple100" | "dark": "Purple1000" |
| `background/accent/purple/subtlest/hovered` | Purple200 → Purple900 | #eed7fc | #48245d | "light": "Purple200" | "dark": "Purple900" |
| `background/accent/purple/subtlest/pressed` | Purple250 → Purple850 | #e3bdfa | #673286 | "light": "Purple250" | "dark": "Purple850" |
| `background/accent/red/bolder` | Red700 → Red400 | #c9372c | #f87168 | "light": "Red700" | "dark": "Red400" |
| `background/accent/red/bolder/hovered` | Red800 → Red300 | #ae2e24 | #fd9891 | "light": "Red800" | "dark": "Red300" |
| `background/accent/red/bolder/pressed` | Red850 → Red250 | #872821 | #ffb8b2 | "light": "Red850" | "dark": "Red250" |
| `background/accent/red/subtle` | Red400 → Red800 | #f87168 | #ae2e24 | "light": "Red400" | "dark": "Red800" |
| `background/accent/red/subtle/hovered` | Red300 → Red850 | #fd9891 | #872821 | "light": "Red300" | "dark": "Red850" |
| `background/accent/red/subtle/pressed` | Red250 → Red900 | #ffb8b2 | #5d1f1a | "light": "Red250" | "dark": "Red900" |
| `background/accent/red/subtler` | Red200 → Red900 | #ffd5d2 | #5d1f1a | "light": "Red200" | "dark": "Red900" |
| `background/accent/red/subtler/hovered` | Red250 → Red850 | #ffb8b2 | #872821 | "light": "Red250" | "dark": "Red850" |
| `background/accent/red/subtler/pressed` | Red300 → Red800 | #fd9891 | #ae2e24 | "light": "Red300" | "dark": "Red800" |
| `background/accent/red/subtlest` | Red100 → Red1000 | #ffeceb | #42221f | "light": "Red100" | "dark": "Red1000" |
| `background/accent/red/subtlest/hovered` | Red200 → Red900 | #ffd5d2 | #5d1f1a | "light": "Red200" | "dark": "Red900" |
| `background/accent/red/subtlest/pressed` | Red250 → Red850 | #ffb8b2 | #872821 | "light": "Red250" | "dark": "Red850" |
| `background/accent/teal/bolder` | Teal700 → Teal400 | #227d9b | #6cc3e0 | "light": "Teal700" | "dark": "Teal400" |
| `background/accent/teal/bolder/hovered` | Teal800 → Teal300 | #206a83 | #9dd9ee | "light": "Teal800" | "dark": "Teal300" |
| `background/accent/teal/bolder/pressed` | Teal850 → Teal250 | #1a5265 | #b1e4f7 | "light": "Teal850" | "dark": "Teal250" |
| `background/accent/teal/subtle` | Teal400 → Teal800 | #6cc3e0 | #206a83 | "light": "Teal400" | "dark": "Teal800" |
| `background/accent/teal/subtle/hovered` | Teal300 → Teal850 | #9dd9ee | #1a5265 | "light": "Teal300" | "dark": "Teal850" |
| `background/accent/teal/subtle/pressed` | Teal250 → Teal900 | #b1e4f7 | #164555 | "light": "Teal250" | "dark": "Teal900" |
| `background/accent/teal/subtler` | Teal200 → Teal900 | #c6edfb | #164555 | "light": "Teal200" | "dark": "Teal900" |
| `background/accent/teal/subtler/hovered` | Teal250 → Teal850 | #b1e4f7 | #1a5265 | "light": "Teal250" | "dark": "Teal850" |
| `background/accent/teal/subtler/pressed` | Teal300 → Teal800 | #9dd9ee | #206a83 | "light": "Teal300" | "dark": "Teal800" |
| `background/accent/teal/subtlest` | Teal100 → Teal1000 | #e7f9ff | #1e3137 | "light": "Teal100" | "dark": "Teal1000" |
| `background/accent/teal/subtlest/hovered` | Teal200 → Teal900 | #c6edfb | #164555 | "light": "Teal200" | "dark": "Teal900" |
| `background/accent/teal/subtlest/pressed` | Teal250 → Teal850 | #b1e4f7 | #1a5265 | "light": "Teal250" | "dark": "Teal850" |
| `background/accent/yellow/bolder` | Yellow700 → Yellow400 | #946f00 | #ddb30e | "light": "Yellow700" | "dark": "Yellow400" |
| `background/accent/yellow/bolder/hovered` | Yellow800 → Yellow300 | #7f5f01 | #eed12b | "light": "Yellow800" | "dark": "Yellow300" |
| `background/accent/yellow/bolder/pressed` | Yellow850 → Yellow250 | #614a05 | #efdd4e | "light": "Yellow850" | "dark": "Yellow250" |
| `background/accent/yellow/subtle` | Yellow300 → Yellow800 | #eed12b | #7f5f01 | "light": "Yellow300" | "dark": "Yellow800" |
| `background/accent/yellow/subtle/hovered` | Yellow400 → Yellow850 | #ddb30e | #614a05 | "light": "Yellow400" | "dark": "Yellow850" |
| `background/accent/yellow/subtle/pressed` | Yellow250 → Yellow900 | #efdd4e | #533f04 | "light": "Yellow250" | "dark": "Yellow900" |
| `background/accent/yellow/subtler` | Yellow200 → Yellow900 | #f5e989 | #533f04 | "light": "Yellow200" | "dark": "Yellow900" |
| `background/accent/yellow/subtler/hovered` | Yellow250 → Yellow850 | #efdd4e | #614a05 | "light": "Yellow250" | "dark": "Yellow850" |
| `background/accent/yellow/subtler/pressed` | Yellow300 → Yellow800 | #eed12b | #7f5f01 | "light": "Yellow300" | "dark": "Yellow800" |
| `background/accent/yellow/subtlest` | Yellow100 → Yellow1000 | #fef7c8 | #332e1b | "light": "Yellow100" | "dark": "Yellow1000" |
| `background/accent/yellow/subtlest/hovered` | Yellow200 → Yellow900 | #f5e989 | #533f04 | "light": "Yellow200" | "dark": "Yellow900" |
| `background/accent/yellow/subtlest/pressed` | Yellow250 → Yellow850 | #efdd4e | #614a05 | "light": "Yellow250" | "dark": "Yellow850" |
| `background/brand/bold` | Blue700 → Blue400 | #1868db | #669df1 | "light": "Blue700" | "dark": "Blue400" |
| `background/brand/bold/hovered` | Blue800 → Blue300 | #1558bc | #8fb8f6 | "light": "Blue800" | "dark": "Blue300" |
| `background/brand/bold/pressed` | Blue850 → Blue250 | #144794 | #adcbfb | "light": "Blue850" | "dark": "Blue250" |
| `background/brand/boldest` | Blue1000 → Blue100 | #1c2b42 | #e9f2fe | "light": "Blue1000" | "dark": "Blue100" |
| `background/brand/boldest/hovered` | Blue900 → Blue200 | #123263 | #cfe1fd | "light": "Blue900" | "dark": "Blue200" |
| `background/brand/boldest/pressed` | Blue850 → Blue250 | #144794 | #adcbfb | "light": "Blue850" | "dark": "Blue250" |
| `background/brand/subtlest` | Blue100 → Blue1000 | #e9f2fe | #1c2b42 | "light": "Blue100" | "dark": "Blue1000" |
| `background/brand/subtlest/hovered` | Blue200 → Blue900 | #cfe1fd | #123263 | "light": "Blue200" | "dark": "Blue900" |
| `background/brand/subtlest/pressed` | Blue250 → Blue850 | #adcbfb | #144794 | "light": "Blue250" | "dark": "Blue850" |
| `background/danger` | Red100 → Red1000 | #ffeceb | #42221f | "light": "Red100" | "dark": "Red1000" |
| `background/danger/bold` | Red700 → Red400 | #c9372c | #f87168 | "light": "Red700" | "dark": "Red400" |
| `background/danger/bold/hovered` | Red800 → Red300 | #ae2e24 | #fd9891 | "light": "Red800" | "dark": "Red300" |
| `background/danger/bold/pressed` | Red850 → Red250 | #872821 | #ffb8b2 | "light": "Red850" | "dark": "Red250" |
| `background/danger/hovered` | Red200 → Red900 | #ffd5d2 | #5d1f1a | "light": "Red200" | "dark": "Red900" |
| `background/danger/pressed` | Red250 → Red850 | #ffb8b2 | #872821 | "light": "Red250" | "dark": "Red850" |
| `background/danger/subtler` | Red200 → Red900 | #ffd5d2 | #5d1f1a | "light": "Red200" | "dark": "Red900" |
| `background/danger/subtler/hovered` | Red250 → Red850 | #ffb8b2 | #872821 | "light": "Red250" | "dark": "Red850" |
| `background/danger/subtler/pressed` | Red300 → Red800 | #fd9891 | #ae2e24 | "light": "Red300" | "dark": "Red800" |
| `background/disabled` | Neutral100A → DarkNeutral100A | #17171708 | #bdbdbd0a | "light": "Neutral100A" | "dark": "DarkNeutral100A" |
| `background/discovery` | Purple100 → Purple1000 | #f8eefe | #35243f | "light": "Purple100" | "dark": "Purple1000" |
| `background/discovery/bold` | Purple700 → Purple400 | #964ac0 | #c97cf4 | "light": "Purple700" | "dark": "Purple400" |
| `background/discovery/bold/hovered` | Purple800 → Purple300 | #803fa5 | #d8a0f7 | "light": "Purple800" | "dark": "Purple300" |
| `background/discovery/bold/pressed` | Purple850 → Purple250 | #673286 | #e3bdfa | "light": "Purple850" | "dark": "Purple250" |
| `background/discovery/hovered` | Purple200 → Purple900 | #eed7fc | #48245d | "light": "Purple200" | "dark": "Purple900" |
| `background/discovery/pressed` | Purple250 → Purple850 | #e3bdfa | #673286 | "light": "Purple250" | "dark": "Purple850" |
| `background/discovery/subtler` | Purple200 → Purple900 | #eed7fc | #48245d | "light": "Purple200" | "dark": "Purple900" |
| `background/discovery/subtler/hovered` | Purple250 → Purple850 | #e3bdfa | #673286 | "light": "Purple250" | "dark": "Purple850" |
| `background/discovery/subtler/pressed` | Purple300 → Purple800 | #d8a0f7 | #803fa5 | "light": "Purple300" | "dark": "Purple800" |
| `background/information` | Blue100 → Blue1000 | #e9f2fe | #1c2b42 | "light": "Blue100" | "dark": "Blue1000" |
| `background/information/bold` | Blue700 → Blue400 | #1868db | #669df1 | "light": "Blue700" | "dark": "Blue400" |
| `background/information/bold/hovered` | Blue800 → Blue300 | #1558bc | #8fb8f6 | "light": "Blue800" | "dark": "Blue300" |
| `background/information/bold/pressed` | Blue850 → Blue250 | #144794 | #adcbfb | "light": "Blue850" | "dark": "Blue250" |
| `background/information/hovered` | Blue200 → Blue900 | #cfe1fd | #123263 | "light": "Blue200" | "dark": "Blue900" |
| `background/information/pressed` | Blue250 → Blue850 | #adcbfb | #144794 | "light": "Blue250" | "dark": "Blue850" |
| `background/information/subtler` | Blue200 → Blue900 | #cfe1fd | #123263 | "light": "Blue200" | "dark": "Blue900" |
| `background/information/subtler/hovered` | Blue250 → Blue850 | #adcbfb | #144794 | "light": "Blue250" | "dark": "Blue850" |
| `background/information/subtler/pressed` | Blue300 → Blue800 | #8fb8f6 | #1558bc | "light": "Blue300" | "dark": "Blue800" |
| `background/input` | Neutral0 → DarkNeutral200 | #ffffff | #242528 | "light": "Neutral0" | "dark": "DarkNeutral200" |
| `background/input/hovered` | Neutral100 → DarkNeutral250 | #f8f8f8 | #2b2c2f | "light": "Neutral100" | "dark": "DarkNeutral250" |
| `background/input/pressed` | Neutral0 → DarkNeutral200 | #ffffff | #242528 | "light": "Neutral0" | "dark": "DarkNeutral200" |
| `background/inverse/subtle` | #00000029 → Raw | #000000 | #ffffff29 | "light": "#00000029" | "dark": "#ffffff29" |
| `background/inverse/subtle/hovered` | — | #0000003d | #ffffff3d | "light": "#0000003d" | "dark": "#ffffff3d" |
| `background/inverse/subtle/pressed` | #00000052 → Raw | #000000 | #ffffff52 | "light": "#00000052" | "dark": "#ffffff52" |
| `background/neutral` | Neutral200A → DarkNeutral200A | #0515240f | #ceced912 | "light": "Neutral200A" | "dark": "DarkNeutral200A" |
| `background/neutral/bold` | Neutral1000 → DarkNeutral1000 | #292a2e | #cecfd2 | "light": "Neutral1000" | "dark": "DarkNeutral1000" |
| `background/neutral/bold/hovered` | Neutral900 → DarkNeutral900 | #3b3d42 | #bfc1c4 | "light": "Neutral900" | "dark": "DarkNeutral900" |
| `background/neutral/bold/pressed` | Neutral800 → DarkNeutral800 | #505258 | #a9abaf | "light": "Neutral800" | "dark": "DarkNeutral800" |
| `background/neutral/hovered` | Neutral300A → DarkNeutral300A | #0b120e24 | #e3e4f21f | "light": "Neutral300A" | "dark": "DarkNeutral300A" |
| `background/neutral/pressed` | Neutral400A → DarkNeutral400A | #080f214a | #e5e9f640 | "light": "Neutral400A" | "dark": "DarkNeutral400A" |
| `background/neutral/subtle` | — | #00000000 | #00000000 | "light": "#00000000" | "dark": "#00000000" |
| `background/neutral/subtle/hovered` | Neutral200A → DarkNeutral200A | #0515240f | #ceced912 | "light": "Neutral200A" | "dark": "DarkNeutral200A" |
| `background/neutral/subtle/pressed` | Neutral300A → DarkNeutral300A | #0b120e24 | #e3e4f21f | "light": "Neutral300A" | "dark": "DarkNeutral300A" |
| `background/selected` | Blue100 → Blue1000 | #e9f2fe | #1c2b42 | "light": "Blue100" | "dark": "Blue1000" |
| `background/selected/bold` | Blue700 → Blue400 | #1868db | #669df1 | "light": "Blue700" | "dark": "Blue400" |
| `background/selected/bold/hovered` | Blue800 → Blue300 | #1558bc | #8fb8f6 | "light": "Blue800" | "dark": "Blue300" |
| `background/selected/bold/pressed` | Blue900 → Blue200 | #123263 | #cfe1fd | "light": "Blue900" | "dark": "Blue200" |
| `background/selected/hovered` | Blue200 → Blue900 | #cfe1fd | #123263 | "light": "Blue200" | "dark": "Blue900" |
| `background/selected/pressed` | Blue300 → Blue800 | #8fb8f6 | #1558bc | "light": "Blue300" | "dark": "Blue800" |
| `background/success` | Lime100 → Lime1000 | #efffd6 | #28311b | "light": "Lime100" | "dark": "Lime1000" |
| `background/success/bold` | Lime700 → Lime400 | #5b7f24 | #94c748 | "light": "Lime700" | "dark": "Lime400" |
| `background/success/bold/hovered` | Lime800 → Lime300 | #4c6b1f | #b3df72 | "light": "Lime800" | "dark": "Lime300" |
| `background/success/bold/pressed` | Lime850 → Lime250 | #3f5224 | #bde97c | "light": "Lime850" | "dark": "Lime250" |
| `background/success/hovered` | Lime200 → Lime900 | #d3f1a7 | #37471f | "light": "Lime200" | "dark": "Lime900" |
| `background/success/pressed` | Lime250 → Lime850 | #bde97c | #3f5224 | "light": "Lime250" | "dark": "Lime850" |
| `background/success/subtler` | Lime200 → Lime900 | #d3f1a7 | #37471f | "light": "Lime200" | "dark": "Lime900" |
| `background/success/subtler/hovered` | Lime250 → Lime850 | #bde97c | #3f5224 | "light": "Lime250" | "dark": "Lime850" |
| `background/success/subtler/pressed` | Lime300 → Lime800 | #b3df72 | #4c6b1f | "light": "Lime300" | "dark": "Lime800" |
| `background/warning` | Orange100 → Orange1000 | #fff5db | #3a2c1f | "light": "Orange100" | "dark": "Orange1000" |
| `background/warning/bold` | Orange300 | #fbc828 | #fbc828 | "light": "Orange300" | "dark": "Orange300" |
| `background/warning/bold/hovered` | Orange400 | #fca700 | #fca700 | "light": "Orange400" | "dark": "Orange400" |
| `background/warning/bold/pressed` | Orange500 | #f68909 | #f68909 | "light": "Orange500" | "dark": "Orange500" |
| `background/warning/hovered` | Orange200 → Orange900 | #fce4a6 | #693200 | "light": "Orange200" | "dark": "Orange900" |
| `background/warning/pressed` | Orange250 → Orange850 | #fbd779 | #7a3b00 | "light": "Orange250" | "dark": "Orange850" |
| `background/warning/subtler` | Orange200 → Orange900 | #fce4a6 | #693200 | "light": "Orange200" | "dark": "Orange900" |
| `background/warning/subtler/hovered` | Orange250 → Orange850 | #fbd779 | #7a3b00 | "light": "Orange250" | "dark": "Orange850" |
| `background/warning/subtler/pressed` | Orange300 → Orange800 | #fbc828 | #9e4c00 | "light": "Orange300" | "dark": "Orange800" |

---

## Text Tokens

*37 tokens*

| Token Path | Primitive | Raw Value (Light) | Raw Value (Dark) | Adaptive Mapping |
|------------|-----------|-------------------|------------------|------------------|
| `text/accent/blue` | Blue800 → Blue300 | #1558bc | #8fb8f6 | "light": "Blue800" | "dark": "Blue300" |
| `text/accent/blue/bolder` | Blue900 → Blue200 | #123263 | #cfe1fd | "light": "Blue900" | "dark": "Blue200" |
| `text/accent/gray` | Neutral800 → DarkNeutral800 | #505258 | #a9abaf | "light": "Neutral800" | "dark": "DarkNeutral800" |
| `text/accent/gray/bolder` | Neutral1100 → DarkNeutral1100 | #1e1f21 | #e2e3e4 | "light": "Neutral1100" | "dark": "DarkNeutral1100" |
| `text/accent/green` | Green800 → Green300 | #216e4e | #7ee2b8 | "light": "Green800" | "dark": "Green300" |
| `text/accent/green/bolder` | Green900 → Green200 | #164b35 | #baf3db | "light": "Green900" | "dark": "Green200" |
| `text/accent/lime` | Lime800 → Lime300 | #4c6b1f | #b3df72 | "light": "Lime800" | "dark": "Lime300" |
| `text/accent/lime/bolder` | Lime900 → Lime200 | #37471f | #d3f1a7 | "light": "Lime900" | "dark": "Lime200" |
| `text/accent/magenta` | Magenta800 → Magenta300 | #943d73 | #f797d2 | "light": "Magenta800" | "dark": "Magenta300" |
| `text/accent/magenta/bolder` | Magenta900 → Magenta200 | #50253f | #fdd0ec | "light": "Magenta900" | "dark": "Magenta200" |
| `text/accent/orange` | Orange800 → Orange300 | #9e4c00 | #fbc828 | "light": "Orange800" | "dark": "Orange300" |
| `text/accent/orange/bolder` | Orange900 → Orange200 | #693200 | #fce4a6 | "light": "Orange900" | "dark": "Orange200" |
| `text/accent/purple` | Purple800 → Purple300 | #803fa5 | #d8a0f7 | "light": "Purple800" | "dark": "Purple300" |
| `text/accent/purple/bolder` | Purple900 → Purple200 | #48245d | #eed7fc | "light": "Purple900" | "dark": "Purple200" |
| `text/accent/red` | Red800 → Red300 | #ae2e24 | #fd9891 | "light": "Red800" | "dark": "Red300" |
| `text/accent/red/bolder` | Red900 → Red200 | #5d1f1a | #ffd5d2 | "light": "Red900" | "dark": "Red200" |
| `text/accent/teal` | Teal800 → Teal300 | #206a83 | #9dd9ee | "light": "Teal800" | "dark": "Teal300" |
| `text/accent/teal/bolder` | Teal900 → Teal200 | #164555 | #c6edfb | "light": "Teal900" | "dark": "Teal200" |
| `text/accent/yellow` | Yellow800 → Yellow300 | #7f5f01 | #eed12b | "light": "Yellow800" | "dark": "Yellow300" |
| `text/accent/yellow/bolder` | Yellow900 → Yellow200 | #533f04 | #f5e989 | "light": "Yellow900" | "dark": "Yellow200" |
| `text/brand` | Blue700 → Blue400 | #1868db | #669df1 | "light": "Blue700" | "dark": "Blue400" |
| `text/danger` | Red800 → Red300 | #ae2e24 | #fd9891 | "light": "Red800" | "dark": "Red300" |
| `text/danger/bolder` | Red900 → Red200 | #5d1f1a | #ffd5d2 | "light": "Red900" | "dark": "Red200" |
| `text/disabled` | Neutral400A → DarkNeutral400A | #080f214a | #e5e9f640 | "light": "Neutral400A" | "dark": "DarkNeutral400A" |
| `text/discovery` | Purple800 → Purple300 | #803fa5 | #d8a0f7 | "light": "Purple800" | "dark": "Purple300" |
| `text/discovery/bolder` | Purple900 → Purple200 | #48245d | #eed7fc | "light": "Purple900" | "dark": "Purple200" |
| `text/information` | Blue800 → Blue300 | #1558bc | #8fb8f6 | "light": "Blue800" | "dark": "Blue300" |
| `text/information/bolder` | Blue900 → Blue200 | #123263 | #cfe1fd | "light": "Blue900" | "dark": "Blue200" |
| `text/inverse` | Neutral0 → DarkNeutral100 | #ffffff | #1f1f21 | "light": "Neutral0" | "dark": "DarkNeutral100" |
| `text/selected` | Blue700 → Blue400 | #1868db | #669df1 | "light": "Blue700" | "dark": "Blue400" |
| `text/subtle` | Neutral800 → DarkNeutral800 | #505258 | #a9abaf | "light": "Neutral800" | "dark": "DarkNeutral800" |
| `text/subtlest` | Neutral700 → DarkNeutral700 | #6b6e76 | #96999e | "light": "Neutral700" | "dark": "DarkNeutral700" |
| `text/success` | Lime800 → Lime300 | #4c6b1f | #b3df72 | "light": "Lime800" | "dark": "Lime300" |
| `text/success/bolder` | Lime900 → Lime200 | #37471f | #d3f1a7 | "light": "Lime900" | "dark": "Lime200" |
| `text/warning` | Orange800 → Orange300 | #9e4c00 | #fbc828 | "light": "Orange800" | "dark": "Orange300" |
| `text/warning/bolder` | Orange900 → Orange200 | #693200 | #fce4a6 | "light": "Orange900" | "dark": "Orange200" |
| `text/warning/inverse` | Neutral1000 → DarkNeutral100 | #292a2e | #1f1f21 | "light": "Neutral1000" | "dark": "DarkNeutral100" |

---

## Border Tokens

*22 tokens*

| Token Path | Primitive | Raw Value (Light) | Raw Value (Dark) | Adaptive Mapping |
|------------|-----------|-------------------|------------------|------------------|
| `border/accent/blue` | Blue600 → Blue500 | #357de8 | #4688ec | "light": "Blue600" | "dark": "Blue500" |
| `border/accent/gray` | Neutral600 → DarkNeutral600 | #7d818a | #7e8188 | "light": "Neutral600" | "dark": "DarkNeutral600" |
| `border/accent/green` | Green600 → Green500 | #22a06b | #2abb7f | "light": "Green600" | "dark": "Green500" |
| `border/accent/lime` | Lime600 → Lime500 | #6a9a23 | #82b536 | "light": "Lime600" | "dark": "Lime500" |
| `border/accent/magenta` | Magenta600 → Magenta500 | #cd519d | #da62ac | "light": "Magenta600" | "dark": "Magenta500" |
| `border/accent/orange` | Orange600 → Orange500 | #e06c00 | #f68909 | "light": "Orange600" | "dark": "Orange500" |
| `border/accent/purple` | Purple600 → Purple500 | #af59e1 | #bf63f3 | "light": "Purple600" | "dark": "Purple500" |
| `border/accent/red` | Red600 → Red500 | #e2483d | #f15b50 | "light": "Red600" | "dark": "Red500" |
| `border/accent/teal` | Teal600 → Teal500 | #2898bd | #42b2d7 | "light": "Teal600" | "dark": "Teal500" |
| `border/accent/yellow` | Yellow600 → Yellow500 | #b38600 | #cf9f02 | "light": "Yellow600" | "dark": "Yellow500" |
| `border/bold` | Neutral600 → DarkNeutral600 | #7d818a | #7e8188 | "light": "Neutral600" | "dark": "DarkNeutral600" |
| `border/brand` | Blue700 → Blue400 | #1868db | #669df1 | "light": "Blue700" | "dark": "Blue400" |
| `border/danger` | Red600 → Red500 | #e2483d | #f15b50 | "light": "Red600" | "dark": "Red500" |
| `border/disabled` | Neutral200A → DarkNeutral200A | #0515240f | #ceced912 | "light": "Neutral200A" | "dark": "DarkNeutral200A" |
| `border/discovery` | Purple600 → Purple500 | #af59e1 | #bf63f3 | "light": "Purple600" | "dark": "Purple500" |
| `border/focused` | Blue500 → Blue300 | #4688ec | #8fb8f6 | "light": "Blue500" | "dark": "Blue300" |
| `border/information` | Blue600 → Blue500 | #357de8 | #4688ec | "light": "Blue600" | "dark": "Blue500" |
| `border/input` | Neutral500 → DarkNeutral600 | #8c8f97 | #7e8188 | "light": "Neutral500" | "dark": "DarkNeutral600" |
| `border/inverse` | Neutral0 → DarkNeutral0 | #ffffff | #18191a | "light": "Neutral0" | "dark": "DarkNeutral0" |
| `border/selected` | Blue700 → Blue400 | #1868db | #669df1 | "light": "Blue700" | "dark": "Blue400" |
| `border/success` | Lime600 → Lime500 | #6a9a23 | #82b536 | "light": "Lime600" | "dark": "Lime500" |
| `border/warning` | Orange600 → Orange500 | #e06c00 | #f68909 | "light": "Orange600" | "dark": "Orange500" |

---

## Icon Tokens

*22 tokens*

| Token Path | Primitive | Raw Value (Light) | Raw Value (Dark) | Adaptive Mapping |
|------------|-----------|-------------------|------------------|------------------|
| `icon/accent/blue` | Blue600 → Blue500 | #357de8 | #4688ec | "light": "Blue600" | "dark": "Blue500" |
| `icon/accent/gray` | Neutral600 → DarkNeutral600 | #7d818a | #7e8188 | "light": "Neutral600" | "dark": "DarkNeutral600" |
| `icon/accent/green` | Green600 → Green500 | #22a06b | #2abb7f | "light": "Green600" | "dark": "Green500" |
| `icon/accent/lime` | Lime600 → Lime500 | #6a9a23 | #82b536 | "light": "Lime600" | "dark": "Lime500" |
| `icon/accent/magenta` | Magenta600 → Magenta500 | #cd519d | #da62ac | "light": "Magenta600" | "dark": "Magenta500" |
| `icon/accent/orange` | Orange600 → Orange500 | #e06c00 | #f68909 | "light": "Orange600" | "dark": "Orange500" |
| `icon/accent/purple` | Purple600 → Purple500 | #af59e1 | #bf63f3 | "light": "Purple600" | "dark": "Purple500" |
| `icon/accent/red` | Red700 → Red600 | #c9372c | #e2483d | "light": "Red700" | "dark": "Red600" |
| `icon/accent/teal` | Teal600 → Teal500 | #2898bd | #42b2d7 | "light": "Teal600" | "dark": "Teal500" |
| `icon/accent/yellow` | Yellow600 → Yellow300 | #b38600 | #eed12b | "light": "Yellow600" | "dark": "Yellow300" |
| `icon/brand` | Blue700 → Blue400 | #1868db | #669df1 | "light": "Blue700" | "dark": "Blue400" |
| `icon/danger` | Red700 → Red500 | #c9372c | #f15b50 | "light": "Red700" | "dark": "Red500" |
| `icon/disabled` | Neutral400A → DarkNeutral400A | #080f214a | #e5e9f640 | "light": "Neutral400A" | "dark": "DarkNeutral400A" |
| `icon/discovery` | Purple600 → Purple500 | #af59e1 | #bf63f3 | "light": "Purple600" | "dark": "Purple500" |
| `icon/information` | Blue600 → Blue500 | #357de8 | #4688ec | "light": "Blue600" | "dark": "Blue500" |
| `icon/inverse` | Neutral0 → DarkNeutral100 | #ffffff | #1f1f21 | "light": "Neutral0" | "dark": "DarkNeutral100" |
| `icon/selected` | Blue700 → Blue400 | #1868db | #669df1 | "light": "Blue700" | "dark": "Blue400" |
| `icon/subtle` | Neutral800 → DarkNeutral800 | #505258 | #a9abaf | "light": "Neutral800" | "dark": "DarkNeutral800" |
| `icon/subtlest` | Neutral700 → DarkNeutral700 | #6b6e76 | #96999e | "light": "Neutral700" | "dark": "DarkNeutral700" |
| `icon/success` | Lime600 → Lime500 | #6a9a23 | #82b536 | "light": "Lime600" | "dark": "Lime500" |
| `icon/warning` | Orange600 → Orange300 | #e06c00 | #fbc828 | "light": "Orange600" | "dark": "Orange300" |
| `icon/warning/inverse` | Neutral1000 → DarkNeutral100 | #292a2e | #1f1f21 | "light": "Neutral1000" | "dark": "DarkNeutral100" |

---

## Interaction Tokens

*2 tokens*

| Token Path | Primitive | Raw Value (Light) | Raw Value (Dark) | Adaptive Mapping |
|------------|-----------|-------------------|------------------|------------------|
| `interaction/hovered` | #00000029 → #ffffff33 | #000000 | #000000 | "light": "#00000029" | "dark": "#ffffff33" |
| `interaction/pressed` | #00000052 → #ffffff5c | #000000 | #000000 | "light": "#00000052" | "dark": "#ffffff5c" |

---

## Link Tokens

*3 tokens*

| Token Path | Primitive | Raw Value (Light) | Raw Value (Dark) | Adaptive Mapping |
|------------|-----------|-------------------|------------------|------------------|
| `link/pressed` | Blue800 → Blue300 | #1558bc | #8fb8f6 | "light": "Blue800" | "dark": "Blue300" |
| `link/visited` | Purple800 → Purple300 | #803fa5 | #d8a0f7 | "light": "Purple800" | "dark": "Purple300" |
| `link/visited/pressed` | Purple900 → Purple200 | #48245d | #eed7fc | "light": "Purple900" | "dark": "Purple200" |

---

## Surface Tokens

*9 tokens*

| Token Path | Primitive | Raw Value (Light) | Raw Value (Dark) | Adaptive Mapping |
|------------|-----------|-------------------|------------------|------------------|
| `surface/hovered` | Neutral200 → DarkNeutral200 | #f0f1f2 | #242528 | "light": "Neutral200" | "dark": "DarkNeutral200" |
| `surface/overlay` | Neutral0 → DarkNeutral250 | #ffffff | #2b2c2f | "light": "Neutral0" | "dark": "DarkNeutral250" |
| `surface/overlay/hovered` | Neutral200 → DarkNeutral300 | #f0f1f2 | #303134 | "light": "Neutral200" | "dark": "DarkNeutral300" |
| `surface/overlay/pressed` | Neutral300 → DarkNeutral350 | #dddee1 | #3d3f43 | "light": "Neutral300" | "dark": "DarkNeutral350" |
| `surface/pressed` | Neutral300 → DarkNeutral250 | #dddee1 | #2b2c2f | "light": "Neutral300" | "dark": "DarkNeutral250" |
| `surface/raised` | Neutral0 → DarkNeutral200 | #ffffff | #242528 | "light": "Neutral0" | "dark": "DarkNeutral200" |
| `surface/raised/hovered` | Neutral200 → DarkNeutral250 | #f0f1f2 | #2b2c2f | "light": "Neutral200" | "dark": "DarkNeutral250" |
| `surface/raised/pressed` | Neutral300 → DarkNeutral300 | #dddee1 | #303134 | "light": "Neutral300" | "dark": "DarkNeutral300" |
| `surface/sunken` | Neutral100 → DarkNeutral0 | #f8f8f8 | #18191a | "light": "Neutral100" | "dark": "DarkNeutral0" |

---

## Blanket Tokens

*2 tokens*

| Token Path | Primitive | Raw Value (Light) | Raw Value (Dark) | Adaptive Mapping |
|------------|-----------|-------------------|------------------|------------------|
| `blanket/danger` | — | #ef5c4814 | #e3493514 | "light": "#ef5c4814" | "dark": "#e3493514" |
| `blanket/selected` | — | #388bff14 | #1d7afc14 | "light": "#388bff14" | "dark": "#1d7afc14" |

---

## Shadow Tokens

*5 tokens*

| Token Path | Primitive | Raw Value (Light) | Raw Value (Dark) | Adaptive Mapping |
|------------|-----------|-------------------|------------------|------------------|
| `shadow/overflow` | — | 0px 0px 8px #1E1F2129, 0px 0px 1px #1E1F211F | 0px 0px 12px #0104048F, 0px 0px 1px #01040480 | "light": "0px 0px 8px #1E1F2129, 0px 0px 1px #1E1F211F" | "dark": "0px 0px 12px #0104048F, 0px 0px 1px #01040480" |
| `shadow/overflow/perimeter` | Neutral1100 → #01040480 | #1e1f21 | #000000 | "light": "Neutral1100" | "dark": "#01040480" |
| `shadow/overflow/spread` | Neutral1100 → #0104048f | #1e1f21 | #000000 | "light": "Neutral1100" | "dark": "#0104048f" |
| `shadow/overlay` | — | 0px 8px 12px #1E1F2126, 0px 0px 1px #1E1F214F | 0px 0px 0px 1px #BDBDBD1F, 0px 8px 12px #0104045C, 0px 0px 1px 1px #01040480 | "light": "0px 8px 12px #1E1F2126, 0px 0px 1px #1E1F214F" | "dark": "0px 0px 0px 1px #BDBDBD1F, 0px 8px 12px #0104045C, 0px 0px 1px 1px #01040480" |
| `shadow/raised` | — | 0px 1px 1px #1E1F2140, 0px 0px 1px #1E1F214F | 0px 0px 0px 1px #00000000, 0px 1px 1px #01040480, 0px 0px 1px #01040480 | "light": "0px 1px 1px #1E1F2140, 0px 0px 1px #1E1F214F" | "dark": "0px 0px 0px 1px #00000000, 0px 1px 1px #01040480, 0px 0px 1px #01040480" |

---

## Opacity Tokens

*2 tokens*

| Token Path | Primitive | Raw Value (Light) | Raw Value (Dark) | Adaptive Mapping |
|------------|-----------|-------------------|------------------|------------------|
| `opacity/disabled` | — | 0.4000000059604645 | 0.4000000059604645 | "light": "0.4000000059604645" | "dark": "0.4000000059604645" |
| `opacity/loading` | — | 0.20000000298023224 | 0.20000000298023224 | "light": "0.20000000298023224" | "dark": "0.20000000298023224" |

---

## Elevation Tokens

*1 tokens*

| Token Path | Primitive | Raw Value (Light) | Raw Value (Dark) | Adaptive Mapping |
|------------|-----------|-------------------|------------------|------------------|
| `elevation/surface/current` | Neutral0 → DarkNeutral100 | #ffffff | #1f1f21 | "light": "Neutral0" | "dark": "DarkNeutral100" |

---

## Chart Tokens

*100 tokens*

| Token Path | Primitive | Raw Value (Light) | Raw Value (Dark) | Adaptive Mapping |
|------------|-----------|-------------------|------------------|------------------|
| `chart/blue/bold` | Blue500 → Blue600 | #4688ec | #357de8 | "light": "Blue500" | "dark": "Blue600" |
| `chart/blue/bold/hovered` | Blue600 → Blue500 | #357de8 | #4688ec | "light": "Blue600" | "dark": "Blue500" |
| `chart/blue/bolder` | Blue600 → Blue500 | #357de8 | #4688ec | "light": "Blue600" | "dark": "Blue500" |
| `chart/blue/bolder/hovered` | Blue700 → Blue400 | #1868db | #669df1 | "light": "Blue700" | "dark": "Blue400" |
| `chart/blue/boldest` | Blue800 → Blue300 | #1558bc | #8fb8f6 | "light": "Blue800" | "dark": "Blue300" |
| `chart/blue/boldest/hovered` | Blue900 → Blue200 | #123263 | #cfe1fd | "light": "Blue900" | "dark": "Blue200" |
| `chart/brand` | Blue600 → Blue500 | #357de8 | #4688ec | "light": "Blue600" | "dark": "Blue500" |
| `chart/brand/hovered` | Blue700 → Blue400 | #1868db | #669df1 | "light": "Blue700" | "dark": "Blue400" |
| `chart/categorical/1` | Blue600 → Blue500 | #357de8 | #4688ec | "light": "Blue600" | "dark": "Blue500" |
| `chart/categorical/1/hovered` | Blue700 → Blue400 | #1868db | #669df1 | "light": "Blue700" | "dark": "Blue400" |
| `chart/categorical/2` | Lime500 → Lime400 | #82b536 | #94c748 | "light": "Lime500" | "dark": "Lime400" |
| `chart/categorical/2/hovered` | Lime600 → Lime300 | #6a9a23 | #b3df72 | "light": "Lime600" | "dark": "Lime300" |
| `chart/categorical/3` | Purple500 → Purple400 | #bf63f3 | #c97cf4 | "light": "Purple500" | "dark": "Purple400" |
| `chart/categorical/3/hovered` | Purple600 → Purple300 | #af59e1 | #d8a0f7 | "light": "Purple600" | "dark": "Purple300" |
| `chart/categorical/4` | Orange500 → Orange400 | #f68909 | #fca700 | "light": "Orange500" | "dark": "Orange400" |
| `chart/categorical/4/hovered` | Orange600 → Orange300 | #e06c00 | #fbc828 | "light": "Orange600" | "dark": "Orange300" |
| `chart/categorical/5` | Blue800 | #1558bc | #1558bc | "light": "Blue800" | "dark": "Blue800" |
| `chart/categorical/5/hovered` | Blue900 → Blue700 | #123263 | #1868db | "light": "Blue900" | "dark": "Blue700" |
| `chart/categorical/6` | Purple700 | #964ac0 | #964ac0 | "light": "Purple700" | "dark": "Purple700" |
| `chart/categorical/6/hovered` | Purple800 → Purple600 | #803fa5 | #af59e1 | "light": "Purple800" | "dark": "Purple600" |
| `chart/categorical/7` | Teal500 | #42b2d7 | #42b2d7 | "light": "Teal500" | "dark": "Teal500" |
| `chart/categorical/7/hovered` | Teal600 → Teal400 | #2898bd | #6cc3e0 | "light": "Teal600" | "dark": "Teal400" |
| `chart/categorical/8` | Orange700 → Orange600 | #bd5b00 | #e06c00 | "light": "Orange700" | "dark": "Orange600" |
| `chart/categorical/8/hovered` | Orange850 → Orange250 | #7a3b00 | #fbd779 | "light": "Orange850" | "dark": "Orange250" |
| `chart/danger` | Red600 | #e2483d | #e2483d | "light": "Red600" | "dark": "Red600" |
| `chart/danger/bold` | Red850 → Red250 | #872821 | #ffb8b2 | "light": "Red850" | "dark": "Red250" |
| `chart/danger/bold/hovered` | Red900 → Red300 | #5d1f1a | #fd9891 | "light": "Red900" | "dark": "Red300" |
| `chart/danger/hovered` | Red700 → Red500 | #c9372c | #f15b50 | "light": "Red700" | "dark": "Red500" |
| `chart/discovery` | Purple500 | #bf63f3 | #bf63f3 | "light": "Purple500" | "dark": "Purple500" |
| `chart/discovery/bold` | Purple800 → Purple300 | #803fa5 | #d8a0f7 | "light": "Purple800" | "dark": "Purple300" |
| `chart/discovery/bold/hovered` | Purple700 → Purple200 | #964ac0 | #eed7fc | "light": "Purple700" | "dark": "Purple200" |
| `chart/discovery/hovered` | Purple600 → Purple400 | #af59e1 | #c97cf4 | "light": "Purple600" | "dark": "Purple400" |
| `chart/gray/bold` | Neutral500 → DarkNeutral600 | #8c8f97 | #7e8188 | "light": "Neutral500" | "dark": "DarkNeutral600" |
| `chart/gray/bold/hovered` | Neutral600 → DarkNeutral700 | #7d818a | #96999e | "light": "Neutral600" | "dark": "DarkNeutral700" |
| `chart/gray/bolder` | Neutral600 → DarkNeutral700 | #7d818a | #96999e | "light": "Neutral600" | "dark": "DarkNeutral700" |
| `chart/gray/bolder/hovered` | Neutral700 → DarkNeutral800 | #6b6e76 | #a9abaf | "light": "Neutral700" | "dark": "DarkNeutral800" |
| `chart/gray/boldest` | Neutral800 → DarkNeutral800 | #505258 | #a9abaf | "light": "Neutral800" | "dark": "DarkNeutral800" |
| `chart/gray/boldest/hovered` | Neutral900 → DarkNeutral900 | #3b3d42 | #bfc1c4 | "light": "Neutral900" | "dark": "DarkNeutral900" |
| `chart/green/bold` | Green600 → Green500 | #22a06b | #2abb7f | "light": "Green600" | "dark": "Green500" |
| `chart/green/bold/hovered` | Green700 → Green400 | #1f845a | #4bce97 | "light": "Green700" | "dark": "Green400" |
| `chart/green/bolder` | Green700 → Green400 | #1f845a | #4bce97 | "light": "Green700" | "dark": "Green400" |
| `chart/green/bolder/hovered` | Green800 → Green300 | #216e4e | #7ee2b8 | "light": "Green800" | "dark": "Green300" |
| `chart/green/boldest` | Green800 → Green300 | #216e4e | #7ee2b8 | "light": "Green800" | "dark": "Green300" |
| `chart/green/boldest/hovered` | Green900 → Green200 | #164b35 | #baf3db | "light": "Green900" | "dark": "Green200" |
| `chart/information` | Blue600 → Blue500 | #357de8 | #4688ec | "light": "Blue600" | "dark": "Blue500" |
| `chart/information/bold` | Blue800 → Blue300 | #1558bc | #8fb8f6 | "light": "Blue800" | "dark": "Blue300" |
| `chart/information/bold/hovered` | Blue900 → Blue200 | #123263 | #cfe1fd | "light": "Blue900" | "dark": "Blue200" |
| `chart/information/hovered` | Blue700 → Blue400 | #1868db | #669df1 | "light": "Blue700" | "dark": "Blue400" |
| `chart/lime/bold` | Lime600 → Lime500 | #6a9a23 | #82b536 | "light": "Lime600" | "dark": "Lime500" |
| `chart/lime/bold/hovered` | Lime700 → Lime400 | #5b7f24 | #94c748 | "light": "Lime700" | "dark": "Lime400" |
| `chart/lime/bolder` | Lime700 → Lime400 | #5b7f24 | #94c748 | "light": "Lime700" | "dark": "Lime400" |
| `chart/lime/bolder/hovered` | Lime800 → Lime300 | #4c6b1f | #b3df72 | "light": "Lime800" | "dark": "Lime300" |
| `chart/lime/boldest` | Lime800 → Lime300 | #4c6b1f | #b3df72 | "light": "Lime800" | "dark": "Lime300" |
| `chart/lime/boldest/hovered` | Lime900 → Lime200 | #37471f | #d3f1a7 | "light": "Lime900" | "dark": "Lime200" |
| `chart/magenta/bold` | Magenta500 → Magenta600 | #da62ac | #cd519d | "light": "Magenta500" | "dark": "Magenta600" |
| `chart/magenta/bold/hovered` | Magenta600 → Magenta500 | #cd519d | #da62ac | "light": "Magenta600" | "dark": "Magenta500" |
| `chart/magenta/bolder` | Magenta600 → Magenta500 | #cd519d | #da62ac | "light": "Magenta600" | "dark": "Magenta500" |
| `chart/magenta/bolder/hovered` | Magenta700 → Magenta400 | #ae4787 | #e774bb | "light": "Magenta700" | "dark": "Magenta400" |
| `chart/magenta/boldest` | Magenta800 → Magenta300 | #943d73 | #f797d2 | "light": "Magenta800" | "dark": "Magenta300" |
| `chart/magenta/boldest/hovered` | Magenta900 → Magenta200 | #50253f | #fdd0ec | "light": "Magenta900" | "dark": "Magenta200" |
| `chart/neutral` | Neutral500 → DarkNeutral600 | #8c8f97 | #7e8188 | "light": "Neutral500" | "dark": "DarkNeutral600" |
| `chart/neutral/hovered` | Neutral600 → DarkNeutral700 | #7d818a | #96999e | "light": "Neutral600" | "dark": "DarkNeutral700" |
| `chart/orange/bold` | Orange600 → Orange500 | #e06c00 | #f68909 | "light": "Orange600" | "dark": "Orange500" |
| `chart/orange/bold/hovered` | Orange700 → Orange400 | #bd5b00 | #fca700 | "light": "Orange700" | "dark": "Orange400" |
| `chart/orange/bolder` | Orange700 → Orange400 | #bd5b00 | #fca700 | "light": "Orange700" | "dark": "Orange400" |
| `chart/orange/bolder/hovered` | Orange800 → Orange300 | #9e4c00 | #fbc828 | "light": "Orange800" | "dark": "Orange300" |
| `chart/orange/boldest` | Orange850 → Orange250 | #7a3b00 | #fbd779 | "light": "Orange850" | "dark": "Orange250" |
| `chart/orange/boldest/hovered` | Orange900 → Orange200 | #693200 | #fce4a6 | "light": "Orange900" | "dark": "Orange200" |
| `chart/purple/bold` | Purple500 → Purple600 | #bf63f3 | #af59e1 | "light": "Purple500" | "dark": "Purple600" |
| `chart/purple/bold/hovered` | Purple600 → Purple500 | #af59e1 | #bf63f3 | "light": "Purple600" | "dark": "Purple500" |
| `chart/purple/bolder` | Purple600 → Purple500 | #af59e1 | #bf63f3 | "light": "Purple600" | "dark": "Purple500" |
| `chart/purple/bolder/hovered` | Purple700 → Purple400 | #964ac0 | #c97cf4 | "light": "Purple700" | "dark": "Purple400" |
| `chart/purple/boldest` | Purple800 → Purple300 | #803fa5 | #d8a0f7 | "light": "Purple800" | "dark": "Purple300" |
| `chart/purple/boldest/hovered` | Purple900 → Purple200 | #48245d | #eed7fc | "light": "Purple900" | "dark": "Purple200" |
| `chart/red/bold` | Red500 → Red600 | #f15b50 | #e2483d | "light": "Red500" | "dark": "Red600" |
| `chart/red/bold/hovered` | Red600 → Red500 | #e2483d | #f15b50 | "light": "Red600" | "dark": "Red500" |
| `chart/red/bolder` | Red600 → Red500 | #e2483d | #f15b50 | "light": "Red600" | "dark": "Red500" |
| `chart/red/bolder/hovered` | Red700 → Red400 | #c9372c | #f87168 | "light": "Red700" | "dark": "Red400" |
| `chart/red/boldest` | Red800 → Red300 | #ae2e24 | #fd9891 | "light": "Red800" | "dark": "Red300" |
| `chart/red/boldest/hovered` | Red900 → Red200 | #5d1f1a | #ffd5d2 | "light": "Red900" | "dark": "Red200" |
| `chart/success` | Lime500 | #82b536 | #82b536 | "light": "Lime500" | "dark": "Lime500" |
| `chart/success/bold` | Lime700 → Lime300 | #5b7f24 | #b3df72 | "light": "Lime700" | "dark": "Lime300" |
| `chart/success/bold/hovered` | Lime800 → Lime200 | #4c6b1f | #d3f1a7 | "light": "Lime800" | "dark": "Lime200" |
| `chart/success/hovered` | Lime600 → Lime400 | #6a9a23 | #94c748 | "light": "Lime600" | "dark": "Lime400" |
| `chart/teal/bold` | Teal600 → Teal500 | #2898bd | #42b2d7 | "light": "Teal600" | "dark": "Teal500" |
| `chart/teal/bold/hovered` | Teal700 → Teal400 | #227d9b | #6cc3e0 | "light": "Teal700" | "dark": "Teal400" |
| `chart/teal/bolder` | Teal700 → Teal400 | #227d9b | #6cc3e0 | "light": "Teal700" | "dark": "Teal400" |
| `chart/teal/bolder/hovered` | Teal800 → Teal300 | #206a83 | #9dd9ee | "light": "Teal800" | "dark": "Teal300" |
| `chart/teal/boldest` | Teal800 → Teal300 | #206a83 | #9dd9ee | "light": "Teal800" | "dark": "Teal300" |
| `chart/teal/boldest/hovered` | Teal900 → Teal200 | #164555 | #c6edfb | "light": "Teal900" | "dark": "Teal200" |
| `chart/warning` | Orange500 | #f68909 | #f68909 | "light": "Orange500" | "dark": "Orange500" |
| `chart/warning/bold` | Orange700 → Orange300 | #bd5b00 | #fbc828 | "light": "Orange700" | "dark": "Orange300" |
| `chart/warning/bold/hovered` | Orange800 → Orange200 | #9e4c00 | #fce4a6 | "light": "Orange800" | "dark": "Orange200" |
| `chart/warning/hovered` | Orange600 → Orange400 | #e06c00 | #fca700 | "light": "Orange600" | "dark": "Orange400" |
| `chart/yellow/bold` | Yellow600 → Yellow500 | #b38600 | #cf9f02 | "light": "Yellow600" | "dark": "Yellow500" |
| `chart/yellow/bold/hovered` | Yellow700 → Yellow400 | #946f00 | #ddb30e | "light": "Yellow700" | "dark": "Yellow400" |
| `chart/yellow/bolder` | Yellow700 → Yellow400 | #946f00 | #ddb30e | "light": "Yellow700" | "dark": "Yellow400" |
| `chart/yellow/bolder/hovered` | Yellow800 → Yellow300 | #7f5f01 | #eed12b | "light": "Yellow800" | "dark": "Yellow300" |
| `chart/yellow/boldest` | Yellow800 → Yellow300 | #7f5f01 | #eed12b | "light": "Yellow800" | "dark": "Yellow300" |
| `chart/yellow/boldest/hovered` | Yellow900 → Yellow200 | #533f04 | #f5e989 | "light": "Yellow900" | "dark": "Yellow200" |

---

## Skeleton Tokens

*1 tokens*

| Token Path | Primitive | Raw Value (Light) | Raw Value (Dark) | Adaptive Mapping |
|------------|-----------|-------------------|------------------|------------------|
| `skeleton/subtle` | Neutral100A → DarkNeutral100A | #17171708 | #bdbdbd0a | "light": "Neutral100A" | "dark": "DarkNeutral100A" |

---

## UNSAFE Tokens

*1 tokens*

| Token Path | Primitive | Raw Value (Light) | Raw Value (Dark) | Adaptive Mapping |
|------------|-----------|-------------------|------------------|------------------|
| `UNSAFE/transparent` | transparent | #000000 | #000000 | "light": "transparent" | "dark": "transparent" |

---

## Other Tokens

*7 tokens*

| Token Path | Primitive | Raw Value (Light) | Raw Value (Dark) | Adaptive Mapping |
|------------|-----------|-------------------|------------------|------------------|
| `blanket` | Neutral500A → #10121499 | #050c1f75 | #000000 | "light": "Neutral500A" | "dark": "#10121499" |
| `border` | Neutral300A → DarkNeutral300A | #0b120e24 | #e3e4f21f | "light": "Neutral300A" | "dark": "DarkNeutral300A" |
| `icon` | Neutral1000 → DarkNeutral1000 | #292a2e | #cecfd2 | "light": "Neutral1000" | "dark": "DarkNeutral1000" |
| `link` | Blue700 → Blue400 | #1868db | #669df1 | "light": "Blue700" | "dark": "Blue400" |
| `skeleton` | Neutral200A → DarkNeutral200A | #0515240f | #ceced912 | "light": "Neutral200A" | "dark": "DarkNeutral200A" |
| `surface` | Neutral0 → DarkNeutral100 | #ffffff | #1f1f21 | "light": "Neutral0" | "dark": "DarkNeutral100" |
| `text` | Neutral1000 → DarkNeutral1000 | #292a2e | #cecfd2 | "light": "Neutral1000" | "dark": "DarkNeutral1000" |

---

## Component-Specific Tokens

These tokens live in smaller collections outside the main semantic set.

### Atlassian Future

| Token Path | Type | Light | Dark |
|------------|------|-------|------|
| `background/disabled` | COLOR | #28311b | Lime300 |

### Atlassian New Input Border

| Token Path | Type | Light | Dark |
|------------|------|-------|------|
| `border/input` | COLOR | #8590a2 | #738496 |

### Atlassian Shape

| Token Path | Type | Values |
|------------|------|--------|
| `border/width` | FLOAT | {"Default": 1, "Rounder": 1, "Roundest": 1} |
| `border/width/focused` | FLOAT | {"Default": 2, "Rounder": 2, "Roundest": 2} |
| `border/width/selected` | FLOAT | {"Default": 2, "Rounder": 2, "Roundest": 2} |
| `radius/full` | FLOAT | {"Default": 9999, "Rounder": 9999, "Roundest": 9999} |
| `radius/large` | FLOAT | {"Default": 8, "Rounder": 12, "Roundest": 16} |
| `radius/medium` | FLOAT | {"Default": 6, "Rounder": 6, "Roundest": 12} |
| `radius/small` | FLOAT | {"Default": 4, "Rounder": 4, "Roundest": 4} |
| `radius/tile` | STRING | {"Default": "25%", "Rounder": "25%", "Roundest": "25%"} |
| `radius/xlarge` | FLOAT | {"Default": 12, "Rounder": 16, "Roundest": 20} |
| `radius/xsmall` | FLOAT | {"Default": 2, "Rounder": 2, "Roundest": 2} |
| `radius/xxlarge` | FLOAT | {"Default": 16, "Rounder": 16, "Roundest": 16} |

### Atlassian AUI Compatibility Aliases

| Token Path | Type | Value |
|------------|------|-------|
| `text/highEmphasis` | STRING | {"Value": "var(--ds-text)"} |
| `text/link/pressed` | STRING | {"Value": "var(--ds-link-pressed)"} |
| `text/link/resting` | STRING | {"Value": "var(--ds-link)"} |
| `text/lowEmphasis` | STRING | {"Value": "var(--ds-text-subtlest)"} |
| `text/mediumEmphasis` | STRING | {"Value": "var(--ds-text-subtle)"} |

---

*End of Document*