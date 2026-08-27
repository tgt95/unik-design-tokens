# Atlassian Component Token Architecture

**Generated:** 2026-06-06  
**Source:** Figma Design System + `@atlaskit/*` npm packages  
**Architecture:** 6-Tier Token System

```
Raw Value → Primitive → Semantic → Component → Computational → Adaptive
```

---

## Architecture Tiers

| Tier | Description | Example |
|------|-------------|---------|
| **1. Raw Value** | Actual computed hex, RGBA, or dimension | `#FEF7C8` |
| **2. Primitive** | Base palette constants (global) | `Yellow100` |
| **3. Semantic** | Contextual meaning (reusable) | `background/warning` |
| **4. Component** | Component-specific bindings | `button/warning/background` |
| **5. Computational** | Derived / calculated values | `shadow/overlay`, `opacity/disabled` |
| **6. Adaptive** | Light/Dark mode resolution | Light: `Yellow700` → Dark: `Yellow400` |

---

## Primitive Palette (166 tokens)

### Neutral Scale
| Token | Light Value | Dark Value |
|-------|-----------|-----------|
| Neutral0 | `#FFFFFF` | `#FFFFFF` |
| Neutral100 | `#F8F8F8` | `#F8F8F8` |
| Neutral200 | `#F0F1F2` | `#F0F1F2` |
| Neutral200A | `#051524` 6% | `#051524` 6% |
| Neutral300 | `#DDDEE1` | `#DDDEE1` |
| Neutral300A | `#0B120E` 14% | `#0B120E` 14% |
| Neutral400 | `#B7B9BE` | `#B7B9BE` |
| Neutral400A | `#080F21` 29% | `#080F21` 29% |
| Neutral500 | `#8C8F97` | `#8C8F97` |
| Neutral500A | `#050C1F` 46% | `#050C1F` 46% |
| Neutral600 | `#7D818A` | `#7D818A` |
| Neutral700 | `#6B6E76` | `#6B6E76` |
| Neutral800 | `#505258` | `#505258` |
| Neutral900 | `#3B3D42` | `#3B3D42` |
| Neutral1000 | `#292A2E` | `#292A2E` |
| Neutral1100 | `#1E1F21` | `#1E1F21` |
| Neutral100A | `#171717` 3% | `#171717` 3% |

### Dark Neutral Scale
| Token | Value |
|-------|-------|
| DarkNeutral-100 | `#111213` |
| DarkNeutral-100A | `#010404` 46% |
| DarkNeutral0 | `#18191A` |
| DarkNeutral100 | `#1F1F21` |
| DarkNeutral100A | `#BDBDBD` 4% |
| DarkNeutral200 | `#242528` |
| DarkNeutral200A | `#CECED9` 7% |
| DarkNeutral250 | `#2B2C2F` |
| DarkNeutral250A | `#D9DAE7` 10% |
| DarkNeutral300 | `#303134` |
| DarkNeutral300A | `#E3E4F2` 12% |
| DarkNeutral350 | `#3D3F43` |
| DarkNeutral350A | `#E8EDFD` 18% |
| DarkNeutral400 | `#4B4D51` |
| DarkNeutral400A | `#E5E9F6` 25% |
| DarkNeutral500 | `#63666B` |
| DarkNeutral500A | `#E9F0FB` 36% |
| DarkNeutral600 | `#7E8188` |
| DarkNeutral700 | `#96999E` |
| DarkNeutral800 | `#A9ABAF` |
| DarkNeutral900 | `#BFC1C4` |
| DarkNeutral1000 | `#CECFD2` |
| DarkNeutral1100 | `#E2E3E4` |

### Color Families (100, 200, 250, 300, 400, 500, 600, 700, 800, 900, 1000)
Available for: Blue, Lime, Red, Orange, Yellow, Green, Teal, Purple, Magenta

---

## Component Token → Semantic → Primitive Mapping

### Button

#### Button / Primary
| Component Token | Semantic Token | Primitive (Light) | Primitive (Dark) | Raw Light | Raw Dark |
|-----------------|----------------|-------------------|------------------|-----------|----------|
| `button/primary/background` | `background/brand/bold` | Blue700 | Blue400 | `#1868DB` | `#669DF1` |
| `button/primary/background/hovered` | `background/brand/bold/hovered` | Blue800 | Blue300 | `#1558BC` | `#8FB8F6` |
| `button/primary/background/pressed` | `background/brand/bold/pressed` | Blue850 | Blue250 | `#144794` | `#ADCBFB` |
| `button/primary/text` | `text/inverse` | Neutral0 | DarkNeutral0 | `#FFFFFF` | `#18191A` |
| `button/primary/icon` | `icon/inverse` | Neutral0 | DarkNeutral0 | `#FFFFFF` | `#18191A` |

#### Button / Standard
| Component Token | Semantic Token | Primitive (Light) | Primitive (Dark) | Raw Light | Raw Dark |
|-----------------|----------------|-------------------|------------------|-----------|----------|
| `button/standard/background` | `background/neutral` | Neutral200A | DarkNeutral200A | `#051524` 6% | `#CECED9` 7% |
| `button/standard/background/hovered` | `background/neutral/hovered` | Neutral300A | DarkNeutral300A | `#0B120E` 14% | `#E3E4F2` 12% |
| `button/standard/background/pressed` | `background/neutral/pressed` | Neutral400A | DarkNeutral400A | `#080F21` 29% | `#E5E9F6` 25% |
| `button/standard/text` | `text` | Neutral1000 | DarkNeutral1000 | `#292A2E` | `#CECFD2` |
| `button/standard/icon` | `icon` | Neutral1000 | DarkNeutral1000 | `#292A2E` | `#CECFD2` |
| `button/standard/border` | `border` | Neutral300A | DarkNeutral300A | `#0B120E` 14% | `#E3E4F2` 12% |

#### Button / Subtle
| Component Token | Semantic Token | Primitive (Light) | Primitive (Dark) | Raw Light | Raw Dark |
|-----------------|----------------|-------------------|------------------|-----------|----------|
| `button/subtle/background` | `background/neutral/subtle` | transparent | transparent | `#000000` 0% | `#000000` 0% |
| `button/subtle/background/hovered` | `background/neutral/subtle/hovered` | Neutral200A | DarkNeutral200A | `#051524` 6% | `#CECED9` 7% |
| `button/subtle/background/pressed` | `background/neutral/subtle/pressed` | Neutral300A | DarkNeutral300A | `#0B120E` 14% | `#E3E4F2` 12% |
| `button/subtle/text` | `text/subtle` | Neutral700 | DarkNeutral700 | `#6B6E76` | `#96999E` |
| `button/subtle/icon` | `icon/subtle` | Neutral700 | DarkNeutral700 | `#6B6E76` | `#96999E` |

#### Button / Danger
| Component Token | Semantic Token | Primitive (Light) | Primitive (Dark) | Raw Light | Raw Dark |
|-----------------|----------------|-------------------|------------------|-----------|----------|
| `button/danger/background` | `background/danger/bold` | Red700 | Red400 | `#C9372C` | `#F87168` |
| `button/danger/background/hovered` | `background/danger/bold/hovered` | Red800 | Red300 | `#AE2E24` | `#FD9891` |
| `button/danger/background/pressed` | `background/danger/bold/pressed` | Red850 | Red250 | `#872821` | `#FFB8B2` |
| `button/danger/text` | `text/inverse` | Neutral0 | DarkNeutral0 | `#FFFFFF` | `#18191A` |
| `button/danger/icon` | `icon/inverse` | Neutral0 | DarkNeutral0 | `#FFFFFF` | `#18191A` |

#### Button / Warning
| Component Token | Semantic Token | Primitive (Light) | Primitive (Dark) | Raw Light | Raw Dark |
|-----------------|----------------|-------------------|------------------|-----------|----------|
| `button/warning/background` | `background/warning/bold` | Orange300 | Orange300 | `#FBC828` | `#FBC828` |
| `button/warning/text` | `text/warning/inverse` | Neutral1000 | Neutral0 | `#292A2E` | `#FFFFFF` |
| `button/warning/icon` | `icon/warning/inverse` | Neutral1000 | Neutral0 | `#292A2E` | `#FFFFFF` |

#### Button / Link
| Component Token | Semantic Token | Primitive (Light) | Primitive (Dark) | Raw Light | Raw Dark |
|-----------------|----------------|-------------------|------------------|-----------|----------|
| `button/link/text` | `link` | Blue700 | Blue400 | `#1868DB` | `#4688EC` |
| `button/link/text/hovered` | `link/pressed` | Blue800 | Blue300 | `#1558BC` | `#357DE8` |
| `button/link/text/visited` | `link/visited` | Purple700 | Purple400 | `#964AC0` | `#C97CF4` |

#### Button / Selected
| Component Token | Semantic Token | Primitive (Light) | Primitive (Dark) | Raw Light | Raw Dark |
|-----------------|----------------|-------------------|------------------|-----------|----------|
| `button/selected/background` | `background/selected` | Blue100 | Blue1000 | `#E9F2FE` | `#1C2B42` |
| `button/selected/background/hovered` | `background/selected/hovered` | Blue200 | Blue900 | `#CFE1FD` | `#123263` |
| `button/selected/background/pressed` | `background/selected/pressed` | Blue300 | Blue800 | `#8FB8F6` | `#1558BC` |
| `button/selected/text` | `text/selected` | Blue700 | Blue400 | `#1868DB` | `#4688EC` |
| `button/selected/border` | `border/selected` | Blue700 | Blue400 | `#1868DB` | `#4688EC` |

#### Button / Disabled
| Component Token | Semantic Token | Primitive (Light) | Primitive (Dark) | Raw Light | Raw Dark |
|-----------------|----------------|-------------------|------------------|-----------|----------|
| `button/disabled/background` | `background/disabled` | Neutral100A | DarkNeutral100A | `#171717` 3% | `#BDBDBD` 4% |
| `button/disabled/text` | `text/disabled` | Neutral400A | DarkNeutral400A | `#080F21` 29% | `#E5E9F6` 25% |
| `button/disabled/icon` | `icon/disabled` | Neutral400A | DarkNeutral400A | `#080F21` 29% | `#E5E9F6` 25% |
| `button/disabled/border` | `border/disabled` | Neutral200A | DarkNeutral200A | `#051524` 6% | `#CECED9` 7% |

---

### Toggle
| Component Token | Semantic Token | Primitive (Light) | Primitive (Dark) | Raw Light | Raw Dark |
|-----------------|----------------|-------------------|------------------|-----------|----------|
| `toggle/background/unchecked` | `background/neutral/bold` | Neutral1000 | DarkNeutral1000 | `#292A2E` | `#CECFD2` |
| `toggle/background/unchecked/hovered` | `background/neutral/bold/hovered` | Neutral900 | DarkNeutral900 | `#3B3D42` | `#BFC1C4` |
| `toggle/background/checked` | `background/success/bold` | Lime700 | Lime400 | `#5B7F24` | `#94C748` |
| `toggle/background/checked/hovered` | `background/success/bold/hovered` | Lime800 | Lime300 | `#4C6B1F` | `#B3DF72` |
| `toggle/icon` | `icon/inverse` | Neutral0 | DarkNeutral0 | `#FFFFFF` | `#18191A` |
| `toggle/icon/disabled` | `icon/disabled` | Neutral400A | DarkNeutral400A | `#080F21` 29% | `#E5E9F6` 25% |

---

### Input / Text Input
| Component Token | Semantic Token | Primitive (Light) | Primitive (Dark) | Raw Light | Raw Dark |
|-----------------|----------------|-------------------|------------------|-----------|----------|
| `input/background` | `background/input` | Neutral0 | DarkNeutral200 | `#FFFFFF` | `#242528` |
| `input/background/hovered` | `background/input/hovered` | Neutral100 | DarkNeutral250 | `#F8F8F8` | `#2B2C2F` |
| `input/background/pressed` | `background/input/pressed` | Neutral0 | DarkNeutral200 | `#FFFFFF` | `#242528` |
| `input/border` | `border/input` | Neutral500 | DarkNeutral500 | `#8C8F97` | `#63666B` |
| `input/border/focused` | `border/focused` | Blue600 | Blue600 | `#4688EC` | `#4688EC` |
| `input/border/danger` | `border/danger` | Red600 | Red600 | `#E2483D` | `#E2483D` |
| `input/text` | `text` | Neutral1000 | DarkNeutral1000 | `#292A2E` | `#CECFD2` |
| `input/text/subtlest` | `text/subtlest` | Neutral700 | DarkNeutral700 | `#6B6E76` | `#96999E` |
| `input/text/disabled` | `text/disabled` | Neutral400A | DarkNeutral400A | `#080F21` 29% | `#E5E9F6` 25% |

---

### Checkbox
| Component Token | Semantic Token | Primitive (Light) | Primitive (Dark) | Raw Light | Raw Dark |
|-----------------|----------------|-------------------|------------------|-----------|----------|
| `checkbox/background/input` | `background/input` | Neutral0 | DarkNeutral200 | `#FFFFFF` | `#242528` |
| `checkbox/background/hovered` | `background/input/hovered` | Neutral100 | DarkNeutral250 | `#F8F8F8` | `#2B2C2F` |
| `checkbox/background/selected` | `background/selected/bold` | Blue700 | Blue400 | `#1868DB` | `#4688EC` |
| `checkbox/background/selected/hovered` | `background/selected/bold/hovered` | Blue800 | Blue300 | `#1558BC` | `#357DE8` |
| `checkbox/background/disabled` | `background/disabled` | Neutral100A | DarkNeutral100A | `#171717` 3% | `#BDBDBD` 4% |
| `checkbox/border` | `border/input` | Neutral500 | DarkNeutral500 | `#8C8F97` | `#63666B` |
| `checkbox/border/danger` | `border/danger` | Red600 | Red600 | `#E2483D` | `#E2483D` |
| `checkbox/border/focused` | `border/focused` | Blue600 | Blue600 | `#4688EC` | `#4688EC` |
| `checkbox/icon/tick` | `icon/inverse` | Neutral0 | DarkNeutral0 | `#FFFFFF` | `#18191A` |
| `checkbox/icon/disabled` | `icon/disabled` | Neutral400A | DarkNeutral400A | `#080F21` 29% | `#E5E9F6` 25% |
| `checkbox/text` | `text` | Neutral1000 | DarkNeutral1000 | `#292A2E` | `#CECFD2` |
| `checkbox/text/disabled` | `text/disabled` | Neutral400A | DarkNeutral400A | `#080F21` 29% | `#E5E9F6` 25% |
| `checkbox/text/danger` | `text/danger` | Red700 | Red400 | `#AE2E24` | `#F87168` |

---

### Radio
| Component Token | Semantic Token | Primitive (Light) | Primitive (Dark) | Raw Light | Raw Dark |
|-----------------|----------------|-------------------|------------------|-----------|----------|
| `radio/background/input` | `background/input` | Neutral0 | DarkNeutral200 | `#FFFFFF` | `#242528` |
| `radio/background/hovered` | `background/input/hovered` | Neutral100 | DarkNeutral250 | `#F8F8F8` | `#2B2C2F` |
| `radio/background/selected` | `background/selected/bold` | Blue700 | Blue400 | `#1868DB` | `#4688EC` |
| `radio/background/selected/hovered` | `background/selected/bold/hovered` | Blue800 | Blue300 | `#1558BC` | `#357DE8` |
| `radio/background/disabled` | `background/disabled` | Neutral100A | DarkNeutral100A | `#171717` 3% | `#BDBDBD` 4% |
| `radio/border` | `border/input` | Neutral500 | DarkNeutral500 | `#8C8F97` | `#63666B` |
| `radio/border/disabled` | `border/disabled` | Neutral200A | DarkNeutral200A | `#051524` 6% | `#CECED9` 7% |
| `radio/border/danger` | `border/danger` | Red600 | Red600 | `#E2483D` | `#E2483D` |
| `radio/border/focused` | `border/focused` | Blue600 | Blue600 | `#4688EC` | `#4688EC` |
| `radio/icon/dot` | `icon/inverse` | Neutral0 | DarkNeutral0 | `#FFFFFF` | `#18191A` |
| `radio/icon/disabled` | `icon/disabled` | Neutral400A | DarkNeutral400A | `#080F21` 29% | `#E5E9F6` 25% |
| `radio/text` | `text` | Neutral1000 | DarkNeutral1000 | `#292A2E` | `#CECFD2` |
| `radio/text/disabled` | `text/disabled` | Neutral400A | DarkNeutral400A | `#080F21` 29% | `#E5E9F6` 25% |

---

### Select / Dropdown
| Component Token | Semantic Token | Primitive (Light) | Primitive (Dark) | Raw Light | Raw Dark |
|-----------------|----------------|-------------------|------------------|-----------|----------|
| `select/background/option` | `background/neutral` | Neutral200A | DarkNeutral200A | `#051524` 6% | `#CECED9` 7% |
| `select/background/selected` | `background/selected/bold` | Blue700 | Blue400 | `#1868DB` | `#4688EC` |
| `select/background/menu` | `surface/raised` | Neutral0 | DarkNeutral100 | `#FFFFFF` | `#1F1F21` |
| `select/text` | `text` | Neutral1000 | DarkNeutral1000 | `#292A2E` | `#CECFD2` |
| `select/text/placeholder` | `text/subtlest` | Neutral700 | DarkNeutral700 | `#6B6E76` | `#96999E` |
| `select/border` | `border` | Neutral300A | DarkNeutral300A | `#0B120E` 14% | `#E3E4F2` 12% |
| `select/icon` | `icon/subtle` | Neutral700 | DarkNeutral700 | `#6B6E76` | `#96999E` |
| `select/shadow` | `shadow/overlay` | *(STRING)* | *(STRING)* | `0 8px 12px...` | `0 8px 12px...` |

---

### Tag
| Component Token | Semantic Token | Primitive (Light) | Primitive (Dark) | Raw Light | Raw Dark |
|-----------------|----------------|-------------------|------------------|-----------|----------|
| `tag/background/default` | `background/neutral` | Neutral200A | DarkNeutral200A | `#051524` 6% | `#CECED9` 7% |
| `tag/background/default/hovered` | `background/neutral/hovered` | Neutral300A | DarkNeutral300A | `#0B120E` 14% | `#E3E4F2` 12% |
| `tag/background/selected` | `background/selected` | Blue100 | Blue1000 | `#E9F2FE` | `#1C2B42` |
| `tag/background/selected/hovered` | `background/selected/hovered` | Blue200 | Blue900 | `#CFE1FD` | `#123263` |
| `tag/text` | `text` | Neutral1000 | DarkNeutral1000 | `#292A2E` | `#CECFD2` |
| `tag/text/selected` | `text/selected` | Blue700 | Blue400 | `#1868DB` | `#4688EC` |
| `tag/border` | `border` | Neutral300A | DarkNeutral300A | `#0B120E` 14% | `#E3E4F2` 12% |
| `tag/border/selected` | `border/selected` | Blue700 | Blue400 | `#1868DB` | `#4688EC` |
| `tag/border/focused` | `border/focused` | Blue600 | Blue600 | `#4688EC` | `#4688EC` |

---

### Badge
| Component Token | Semantic Token | Primitive (Light) | Primitive (Dark) | Raw Light | Raw Dark |
|-----------------|----------------|-------------------|------------------|-----------|----------|
| `badge/background/danger` | `background/danger` | Red100 | Red1000 | `#FFECEB` | `#42221F` |
| `badge/background/success` | `background/success` | Lime100 | Lime1000 | `#EFFFD6` | `#28311B` |
| `badge/background/warning` | `background/warning` | Orange100 | Orange1000 | `#FFF5DB` | `#3A2C1F` |
| `badge/background/information` | `background/information` | Blue100 | Blue1000 | `#E9F2FE` | `#1C2B42` |
| `badge/background/discovery` | `background/discovery` | Purple100 | Purple1000 | `#F8EEFE` | `#35243F` |
| `badge/background/neutral` | `background/neutral` | Neutral200A | DarkNeutral200A | `#051524` 6% | `#CECED9` 7% |
| `badge/text` | `text` | Neutral1000 | DarkNeutral1000 | `#292A2E` | `#CECFD2` |
| `badge/text/danger` | `text/danger/bolder` | Red900 | Red400 | `#5D1F1A` | `#F87168` |
| `badge/text/success` | `text/success/bolder` | Lime900 | Lime400 | `#37471F` | `#94C748` |
| `badge/text/warning` | `text/warning/bolder` | Orange900 | Orange400 | `#693200` | `#FCA700` |
| `badge/text/information` | `text/information/bolder` | Blue900 | Blue400 | `#123263` | `#669DF1` |
| `badge/text/discovery` | `text/discovery/bolder` | Purple900 | Purple400 | `#48245D` | `#C97CF4` |

---

### Lozenge
| Component Token | Semantic Token | Primitive (Light) | Primitive (Dark) | Raw Light | Raw Dark |
|-----------------|----------------|-------------------|------------------|-----------|----------|
| `lozenge/background/neutral` | `background/neutral` | Neutral200A | DarkNeutral200A | `#051524` 6% | `#CECED9` 7% |
| `lozenge/background/success` | `background/success/subtler` | Lime200 | Lime900 | `#D3F1A7` | `#28311B` |
| `lozenge/background/danger` | `background/danger/subtler` | Red200 | Red900 | `#FFD5D2` | `#42221F` |
| `lozenge/background/warning` | `background/warning/subtler` | Orange200 | Orange900 | `#FCE4A6` | `#3A2C1F` |
| `lozenge/background/information` | `background/information/subtler` | Blue200 | Blue900 | `#CFE1FD` | `#123263` |
| `lozenge/background/discovery` | `background/discovery/subtler` | Purple200 | Purple900 | `#EED7FC` | `#35243F` |
| `lozenge/text` | `text` | Neutral1000 | DarkNeutral1000 | `#292A2E` | `#CECFD2` |
| `lozenge/text/success` | `text/success/bolder` | Lime900 | Lime400 | `#37471F` | `#94C748` |
| `lozenge/text/danger` | `text/danger/bolder` | Red900 | Red400 | `#5D1F1A` | `#F87168` |
| `lozenge/text/warning` | `text/warning/bolder` | Orange900 | Orange400 | `#693200` | `#FCA700` |
| `lozenge/text/information` | `text/information/bolder` | Blue900 | Blue400 | `#123263` | `#669DF1` |
| `lozenge/text/discovery` | `text/discovery/bolder` | Purple900 | Purple400 | `#48245D` | `#C97CF4` |
| `lozenge/border/success` | `border/success` | Lime600 | Green500 | `#6A9A23` | `#2ABB7F` |
| `lozenge/border/danger` | `border/danger` | Red600 | Red500 | `#E2483D` | `#F15B50` |
| `lozenge/border/warning` | `border/warning` | Orange600 | Orange500 | `#E06C00` | `#F68909` |
| `lozenge/border/information` | `border/information` | Blue600 | Blue500 | `#357DE8` | `#4688EC` |
| `lozenge/border/discovery` | `border/discovery` | Purple600 | Purple500 | `#AF59E1` | `#BF63F3` |

---

### Modal Dialog
| Component Token | Semantic Token | Primitive (Light) | Primitive (Dark) | Raw Light | Raw Dark |
|-----------------|----------------|-------------------|------------------|-----------|----------|
| `modal/background` | `blanket` | Neutral500A | *(raw)* | `#050C1F` 46% | `#010404` 80% |
| `modal/surface` | `surface/raised` | Neutral0 | DarkNeutral100 | `#FFFFFF` | `#1F1F21` |
| `modal/text` | `text` | Neutral1000 | DarkNeutral1000 | `#292A2E` | `#CECFD2` |
| `modal/shadow` | `shadow/overlay` | *(STRING)* | *(STRING)* | `0 8px 12px...` | `0 8px 12px...` |
| `modal/border` | `border` | Neutral300A | DarkNeutral300A | `#0B120E` 14% | `#E3E4F2` 12% |
| `modal/icon/danger` | `icon/danger` | Red700 | Red400 | `#C9372C` | `#F87168` |
| `modal/icon/warning` | `icon/warning` | Orange700 | Orange400 | `#E06C00` | `#FCA700` |

---

### Inline Dialog
| Component Token | Semantic Token | Primitive (Light) | Primitive (Dark) | Raw Light | Raw Dark |
|-----------------|----------------|-------------------|------------------|-----------|----------|
| `inline-dialog/background` | `surface/raised` | Neutral0 | DarkNeutral100 | `#FFFFFF` | `#1F1F21` |
| `inline-dialog/text` | `text` | Neutral1000 | DarkNeutral1000 | `#292A2E` | `#CECFD2` |
| `inline-dialog/shadow` | `shadow/overlay` | *(STRING)* | *(STRING)* | `0 8px 12px...` | `0 8px 12px...` |

---

### Tabs
| Component Token | Semantic Token | Primitive (Light) | Primitive (Dark) | Raw Light | Raw Dark |
|-----------------|----------------|-------------------|------------------|-----------|----------|
| `tabs/text` | `text/subtle` | Neutral700 | DarkNeutral700 | `#6B6E76` | `#96999E` |
| `tabs/text/selected` | `text/selected` | Blue700 | Blue400 | `#1868DB` | `#4688EC` |
| `tabs/border` | `border` | Neutral300A | DarkNeutral300A | `#0B120E` 14% | `#E3E4F2` 12% |
| `tabs/border/selected` | `border/selected` | Blue700 | Blue400 | `#1868DB` | `#4688EC` |
| `tabs/border/focused` | `border/focused` | Blue600 | Blue600 | `#4688EC` | `#4688EC` |

---

### Banner
| Component Token | Semantic Token | Primitive (Light) | Primitive (Dark) | Raw Light | Raw Dark |
|-----------------|----------------|-------------------|------------------|-----------|----------|
| `banner/background/warning` | `background/warning/bold` | Orange300 | Orange300 | `#FBC828` | `#FBC828` |
| `banner/background/error` | `background/danger/bold` | Red700 | Red400 | `#C9372C` | `#F87168` |
| `banner/background/announcement` | `background/neutral/bold` | Neutral1000 | DarkNeutral1000 | `#292A2E` | `#CECFD2` |
| `banner/text/warning` | `text/warning/inverse` | Neutral1000 | Neutral0 | `#292A2E` | `#FFFFFF` |
| `banner/text/error` | `text/inverse` | Neutral0 | DarkNeutral0 | `#FFFFFF` | `#18191A` |
| `banner/text/announcement` | `text/inverse` | Neutral0 | DarkNeutral0 | `#FFFFFF` | `#18191A` |

---

### Section Message
| Component Token | Semantic Token | Primitive (Light) | Primitive (Dark) | Raw Light | Raw Dark |
|-----------------|----------------|-------------------|------------------|-----------|----------|
| `section-message/background/information` | `background/information` | Blue100 | Blue1000 | `#E9F2FE` | `#1C2B42` |
| `section-message/background/warning` | `background/warning` | Orange100 | Orange1000 | `#FFF5DB` | `#3A2C1F` |
| `section-message/background/danger` | `background/danger` | Red100 | Red1000 | `#FFECEB` | `#42221F` |
| `section-message/background/success` | `background/success` | Lime100 | Lime1000 | `#EFFFD6` | `#28311B` |
| `section-message/background/discovery` | `background/discovery` | Purple100 | Purple1000 | `#F8EEFE` | `#35243F` |
| `section-message/text` | `text` | Neutral1000 | DarkNeutral1000 | `#292A2E` | `#CECFD2` |
| `section-message/link` | `link` | Blue700 | Blue400 | `#1868DB` | `#4688EC` |
| `section-message/icon/information` | `icon/information` | Blue700 | Blue400 | `#357DE8` | `#669DF1` |
| `section-message/icon/warning` | `icon/warning` | Orange700 | Orange400 | `#E06C00` | `#FCA700` |
| `section-message/icon/danger` | `icon/danger` | Red700 | Red400 | `#C9372C` | `#F87168` |
| `section-message/icon/success` | `icon/success` | Lime700 | Lime400 | `#6A9A23` | `#94C748` |
| `section-message/icon/discovery` | `icon/discovery` | Purple700 | Purple400 | `#AF59E1` | `#C97CF4` |

---

### Progress Bar
| Component Token | Semantic Token | Primitive (Light) | Primitive (Dark) | Raw Light | Raw Dark |
|-----------------|----------------|-------------------|------------------|-----------|----------|
| `progress-bar/background/track` | `background/neutral` | Neutral200A | DarkNeutral200A | `#051524` 6% | `#CECED9` 7% |
| `progress-bar/background/track-bold` | `background/neutral/bold` | Neutral1000 | DarkNeutral1000 | `#292A2E` | `#CECFD2` |
| `progress-bar/background/progress` | `background/success/bold` | Lime700 | Lime400 | `#5B7F24` | `#94C748` |
| `progress-bar/background/surface` | `surface` | Neutral0 | DarkNeutral100 | `#FFFFFF` | `#1F1F21` |

---

### Avatar
| Component Token | Semantic Token | Primitive (Light) | Primitive (Dark) | Raw Light | Raw Dark |
|-----------------|----------------|-------------------|------------------|-----------|----------|
| `avatar/background/skeleton` | `background/accent-gray-subtler` | Neutral300 | DarkNeutral400 | `#DDDEE1` | `#4B4D51` |
| `avatar/text` | `text` | Neutral1000 | DarkNeutral1000 | `#292A2E` | `#CECFD2` |
| `avatar/text/subtlest` | `text/subtlest` | Neutral700 | DarkNeutral700 | `#6B6E76` | `#96999E` |
| `avatar/icon` | `icon/subtle` | Neutral700 | DarkNeutral700 | `#6B6E76` | `#96999E` |
| `avatar/icon/success` | `icon/success` | Lime700 | Lime400 | `#6A9A23` | `#94C748` |
| `avatar/icon/danger` | `icon/danger` | Red700 | Red400 | `#C9372C` | `#F87168` |
| `avatar/icon/warning` | `icon/warning` | Orange700 | Orange400 | `#E06C00` | `#FCA700` |

---

### Skeleton
| Component Token | Semantic Token | Primitive (Light) | Primitive (Dark) | Raw Light | Raw Dark |
|-----------------|----------------|-------------------|------------------|-----------|----------|
| `skeleton/background` | `skeleton` | Neutral200A | DarkNeutral200A | `#051524` 6% | `#CECED9` 7% |
| `skeleton/background/subtle` | `skeleton/subtle` | Neutral100A | DarkNeutral100A | `#171717` 3% | `#BDBDBD` 4% |

---

### Link (Standalone)
| Component Token | Semantic Token | Primitive (Light) | Primitive (Dark) | Raw Light | Raw Dark |
|-----------------|----------------|-------------------|------------------|-----------|----------|
| `link/text` | `link` | Blue700 | Blue400 | `#1868DB` | `#4688EC` |
| `link/text/hovered` | `link/pressed` | Blue800 | Blue300 | `#1558BC` | `#357DE8` |
| `link/text/visited` | `link/visited` | Purple700 | Purple400 | `#964AC0` | `#C97CF4` |
| `link/text/visited/hovered` | `link/visited/pressed` | Purple850 | Purple250 | `#673286` | `#E3BDFA` |

---

### Surface / Elevation
| Component Token | Semantic Token | Primitive (Light) | Primitive (Dark) | Raw Light | Raw Dark |
|-----------------|----------------|-------------------|------------------|-----------|----------|
| `surface/background` | `surface` | Neutral0 | DarkNeutral100 | `#FFFFFF` | `#1F1F21` |
| `surface/background/raised` | `surface/raised` | Neutral0 | DarkNeutral100 | `#FFFFFF` | `#1F1F21` |
| `surface/background/overlay` | `surface/overlay` | Neutral0 | DarkNeutral100 | `#FFFFFF` | `#1F1F21` |
| `surface/background/sunken` | `surface/sunken` | Neutral100 | DarkNeutral200 | `#F8F8F8` | `#242528` |

---

### Blanket
| Component Token | Semantic Token | Primitive (Light) | Primitive (Dark) | Raw Light | Raw Dark |
|-----------------|----------------|-------------------|------------------|-----------|----------|
| `blanket/background` | `blanket` | Neutral500A | *(raw)* | `#050C1F` 46% | `#010404` 80% |
| `blanket/background/selected` | `blanket/selected` | Blue600 | Blue600 | `#1D7AFC` 8% | `#1D7AFC` 8% |
| `blanket/background/danger` | `blanket/danger` | Red600 | Red600 | `#E34935` 8% | `#E34935` 8% |

---

## Token Counts by Collection

| Collection | Count | Type |
|-----------|-------|------|
| Atlassian Primitive | 166 | Color palette |
| Atlassian (Semantic) | 410 | Contextual tokens |
| Atlassian Component | 183+ | Component bindings |
| Atlassian AUI Compatibility Aliases | 102 | String aliases |
| Atlassian spacing | 23 | Dimension |
| Atlassian typography | 23 | String/Font |
| Atlassian motion | 49 | String |
| Atlassian shape | 11 | Float/Dimension |

---

## How to Read This Document

1. **Component tokens** point to **semantic tokens** via aliases
2. **Semantic tokens** point to **primitive tokens** via aliases
3. **Primitive tokens** contain the actual **raw hex values**
4. **Adaptive** means the Light and Dark values resolve to different primitives
5. **Computational** tokens (shadows, opacity) are stored as STRING type variables

## Source Code References

Component token patterns verified from:
- `@atlaskit/button` v23.11.8
- `@atlaskit/toggle` v16.1.0
- `@atlaskit/tag` v14.15.0
- `@atlaskit/badge` v18.6.0
- `@atlaskit/modal-dialog` v15.2.5
- `@atlaskit/inline-dialog` v18.1.9
- `@atlaskit/lozenge` v13.8.4
- `@atlaskit/section-message` v8.13.0
- `@atlaskit/avatar` v25.15.1
- `@atlaskit/checkbox` v17.3.12
- `@atlaskit/radio` v8.6.2
- `@atlaskit/select` v21.12.10
- `@atlaskit/tabs` v19.1.0
- `@atlaskit/banner` v14.1.0
- `@atlaskit/progress-bar` v4.2.0
