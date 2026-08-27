# Fluent UI Design System Token Architecture

## 6-Tier Token Hierarchy

```
Raw Value → Primitive → Semantic → Component → Computational → Adaptive
```

- **Raw**: Fundamental hex / rgba values
- **Primitive**: Named color ramps and base values (grey, brand, alpha, white, black)
- **Semantic**: Contextual meaning (background, foreground, stroke, shadow) with Light/Dark modes
- **Component**: UI component-specific tokens (button, input, card, etc.)
- **Computational**: Derived values (hover offset, contrast ratios, state combinations)
- **Adaptive**: User-preference overrides (high contrast, reduced motion, brand theming)

---

## Collections in Figma

| Collection | Variables | Modes | Description |
|------------|-----------|-------|-------------|
| **Fluent Primitive** | 88 | Single | Raw hex values for all foundational colors |
| **Fluent Semantic** | 265 | Light / Dark | Contextual aliases + non-color tokens |
| **Fluent Component** | 75 | Light / Dark | Component-specific semantic aliases |

---

## Tier 1: Raw Values

Raw values are the base hex and rgba strings from the Fluent UI source code.

---

## Tier 2: Primitive Tokens

### Grey Ramp

| Token | Hex | Token | Hex | Token | Hex |
|-------|-----|-------|-----|-------|-----|
grey-2 | #050505 | grey-4 | #0a0a0a | grey-6 | #0f0f0f |
grey-8 | #141414 | grey-10 | #1a1a1a | grey-12 | #1f1f1f |
grey-14 | #242424 | grey-16 | #292929 | grey-18 | #2e2e2e |
grey-20 | #333333 | grey-22 | #383838 | grey-24 | #3d3d3d |
grey-26 | #424242 | grey-28 | #474747 | grey-30 | #4d4d4d |
grey-32 | #525252 | grey-34 | #575757 | grey-36 | #5c5c5c |
grey-38 | #616161 | grey-40 | #666666 | grey-42 | #6b6b6b |
grey-44 | #707070 | grey-46 | #757575 | grey-48 | #7a7a7a |
grey-50 | #808080 | grey-52 | #858585 | grey-54 | #8a8a8a |
grey-56 | #8f8f8f | grey-58 | #949494 | grey-60 | #999999 |
grey-62 | #9e9e9e | grey-64 | #a3a3a3 | grey-66 | #a8a8a8 |
grey-68 | #adadad | grey-70 | #b3b3b3 | grey-72 | #b8b8b8 |
grey-74 | #bdbdbd | grey-76 | #c2c2c2 | grey-78 | #c7c7c7 |
grey-80 | #cccccc | grey-82 | #d1d1d1 | grey-84 | #d6d6d6 |
grey-86 | #dbdbdb | grey-88 | #e0e0e0 | grey-90 | #e6e6e6 |
grey-92 | #ebebeb | grey-94 | #f0f0f0 | grey-96 | #f5f5f5 |
grey-98 | #fafafa | grey-99 | #fcfcfc |

### Brand Ramp (Web)

| Token | Hex | Token | Hex |
|-------|-----|-------|-----|
brand-10 | #061724 | brand-20 | #082338 |
brand-30 | #0a2e4a | brand-40 | #0c3b5e |
brand-50 | #0e4775 | brand-60 | #0f548c |
brand-70 | #115ea3 | brand-80 | #0f6cbd |
brand-90 | #2886de | brand-100 | #479ef5 |
brand-110 | #62abf5 | brand-120 | #77b7f7 |
brand-130 | #96c6fa | brand-140 | #b4d6fa |
brand-150 | #cfe4fa | brand-160 | #ebf3fc |

### Alpha Tokens

| Token | Hex | Token | Hex |
|-------|-----|-------|-----|
whiteAlpha-5 | #ffffff0d | whiteAlpha-10 | #ffffff1a |
whiteAlpha-20 | #ffffff33 | whiteAlpha-30 | #ffffff4d |
whiteAlpha-40 | #ffffff66 | whiteAlpha-50 | #ffffff80 |
whiteAlpha-60 | #ffffff99 | whiteAlpha-70 | #ffffffb3 |
whiteAlpha-80 | #ffffffcc | whiteAlpha-90 | #ffffffe6 |
blackAlpha-5 | #0000000d | blackAlpha-10 | #0000001a |
blackAlpha-20 | #00000033 | blackAlpha-30 | #0000004d |
blackAlpha-40 | #00000066 | blackAlpha-50 | #00000080 |
blackAlpha-60 | #00000099 | blackAlpha-70 | #000000b3 |
blackAlpha-80 | #000000cc | blackAlpha-90 | #000000e6 |

### Base Colors

| Token | Hex |
|-------|-----|
| white | #ffffff |
| black | #000000 |

---

## Tier 3: Semantic Tokens

Semantic tokens bridge meaning (background, foreground, stroke) with Light/Dark mode values.

### Semantic Color Tokens

| Token | Light | Dark | Primitive Alias (Light) |
|-------|-------|------|-------------------------|
| colorBackgroundOverlay | rgba(0, 0, 0, 0.4) | rgba(0, 0, 0, 0.5) | - |
| colorBrandBackground | #0078d4 | #106ebe | - |
| colorBrandBackground2 | #eff6fc | #002848 | - |
| colorBrandBackground2Hover | #deecf9 | #004578 | - |
| colorBrandBackground2Pressed | #82c7ff | #001526 | - |
| colorBrandBackground3Static | #005a9e | #005a9e | - |
| colorBrandBackground4Static | #004578 | #004578 | - |
| colorBrandBackgroundHover | #106ebe | #0078d4 | - |
| colorBrandBackgroundInverted | #ffffff | #ffffff | - |
| colorBrandBackgroundInvertedHover | #eff6fc | #eff6fc | - |
| colorBrandBackgroundInvertedPressed | #c7e0f4 | #c7e0f4 | - |
| colorBrandBackgroundInvertedSelected | #deecf9 | #deecf9 | - |
| colorBrandBackgroundPressed | #004578 | #004578 | - |
| colorBrandBackgroundSelected | #005a9e | #005a9e | - |
| colorBrandBackgroundStatic | #0078d4 | #0078d4 | - |
| colorBrandForeground1 | #0078d4 | #2899f5 | - |
| colorBrandForeground2 | #106ebe | #3aa0f3 | - |
| colorBrandForeground2Hover | #005a9e | #82c7ff | - |
| colorBrandForeground2Pressed | #043862 | #eff6fc | - |
| colorBrandForegroundInverted | #2899f5 | #0078d4 | - |
| colorBrandForegroundInvertedHover | #3aa0f3 | #106ebe | - |
| colorBrandForegroundInvertedPressed | #2899f5 | #005a9e | - |
| colorBrandForegroundLink | #106ebe | #2899f5 | - |
| colorBrandForegroundLinkHover | #005a9e | #3aa0f3 | - |
| colorBrandForegroundLinkPressed | #004578 | #1890f1 | - |
| colorBrandForegroundLinkSelected | #106ebe | #2899f5 | - |
| colorBrandForegroundOnLight | #0078d4 | #0078d4 | - |
| colorBrandForegroundOnLightHover | #106ebe | #106ebe | - |
| colorBrandForegroundOnLightPressed | #004c87 | #004c87 | - |
| colorBrandForegroundOnLightSelected | #005a9e | #005a9e | - |
| colorBrandShadowAmbient | rgba(0,0,0,0.30) | rgba(0,0,0,0.30) | - |
| colorBrandShadowKey | rgba(0,0,0,0.25) | rgba(0,0,0,0.25) | - |
| colorBrandStroke1 | #0078d4 | #2899f5 | - |
| colorBrandStroke2 | #c7e0f4 | #004c87 | - |
| colorBrandStroke2Contrast | #c7e0f4 | #004c87 | - |
| colorBrandStroke2Hover | #6cb8f6 | #004c87 | - |
| colorBrandStroke2Pressed | #0078d4 | #043862 | - |
| colorCompoundBrandBackground | #0078d4 | #2899f5 | - |
| colorCompoundBrandBackgroundHover | #106ebe | #3aa0f3 | - |
| colorCompoundBrandBackgroundPressed | #005a9e | #1890f1 | - |
| colorCompoundBrandForeground1 | #0078d4 | #2899f5 | - |
| colorCompoundBrandForeground1Hover | #106ebe | #3aa0f3 | - |
| colorCompoundBrandForeground1Pressed | #005a9e | #1890f1 | - |
| colorCompoundBrandStroke | #0078d4 | #2899f5 | - |
| colorCompoundBrandStrokeHover | #106ebe | #3aa0f3 | - |
| colorCompoundBrandStrokePressed | #005a9e | #1890f1 | - |
| colorNeutralBackground1 | #ffffff | #292929 | - |
| colorNeutralBackground1Hover | #f5f5f5 | #3d3d3d | grey-96 |
| colorNeutralBackground1Pressed | #e0e0e0 | #1f1f1f | grey-88 |
| colorNeutralBackground1Selected | #ebebeb | #383838 | grey-92 |
| colorNeutralBackground2 | #fafafa | #1f1f1f | grey-98 |
| colorNeutralBackground2Hover | #f0f0f0 | #333333 | grey-94 |
| colorNeutralBackground2Pressed | #dbdbdb | #141414 | grey-86 |
| colorNeutralBackground2Selected | #e6e6e6 | #2e2e2e | grey-90 |
| colorNeutralBackground3 | #f5f5f5 | #141414 | grey-96 |
| colorNeutralBackground3Hover | #ebebeb | #292929 | grey-92 |
| colorNeutralBackground3Pressed | #d6d6d6 | #0a0a0a | grey-84 |
| colorNeutralBackground3Selected | #e0e0e0 | #242424 | grey-88 |
| colorNeutralBackground4 | #f0f0f0 | #0a0a0a | grey-94 |
| colorNeutralBackground4Hover | #fafafa | #1f1f1f | grey-98 |
| colorNeutralBackground4Pressed | #f5f5f5 | #000000 | grey-96 |
| colorNeutralBackground4Selected | #ffffff | #1a1a1a | - |
| colorNeutralBackground5 | #ebebeb | #000000 | grey-92 |
| colorNeutralBackground5Hover | #f5f5f5 | #141414 | grey-96 |
| colorNeutralBackground5Pressed | #f0f0f0 | #050505 | grey-94 |
| colorNeutralBackground5Selected | #fafafa | #0f0f0f | grey-98 |
| colorNeutralBackground6 | #e6e6e6 | #333333 | grey-90 |
| colorNeutralBackground7 | transparent | transparent | - |
| colorNeutralBackground7Hover | #ebebeb | #1a1a1a | grey-92 |
| colorNeutralBackground7Pressed | #d6d6d6 | #0a0a0a | grey-84 |
| colorNeutralBackground7Selected | transparent | transparent | - |
| colorNeutralBackground8 | #fcfcfc | #292929 | grey-99 |
| colorNeutralBackgroundAlpha | rgba(255, 255, 255, 0.5) | rgba(26, 26, 26, 0.5) | - |
| colorNeutralBackgroundAlpha2 | rgba(255, 255, 255, 0.8) | rgba(31, 31, 31, 0.7) | - |
| colorNeutralBackgroundDisabled | #f0f0f0 | #141414 | grey-94 |
| colorNeutralBackgroundDisabled2 | #ffffff | #292929 | - |
| colorNeutralBackgroundInverted | #292929 | #ffffff | grey-16 |
| colorNeutralBackgroundInvertedDisabled | rgba(255, 255, 255, 0.1) | rgba(255, 255, 255, 0.1) | - |
| colorNeutralBackgroundInvertedHover | #3d3d3d | #f5f5f5 | grey-24 |
| colorNeutralBackgroundInvertedPressed | #1f1f1f | #e0e0e0 | grey-12 |
| colorNeutralBackgroundInvertedSelected | #383838 | #ebebeb | grey-22 |
| colorNeutralBackgroundStatic | #333333 | #3d3d3d | grey-20 |
| colorNeutralCardBackground | #fafafa | #333333 | grey-98 |
| colorNeutralCardBackgroundDisabled | #f0f0f0 | #141414 | grey-94 |
| colorNeutralCardBackgroundHover | #ffffff | #3d3d3d | - |
| colorNeutralCardBackgroundPressed | #f5f5f5 | #2e2e2e | grey-96 |
| colorNeutralCardBackgroundSelected | #ebebeb | #383838 | grey-92 |
| colorNeutralForeground1 | #242424 | #ffffff | grey-14 |
| colorNeutralForeground1Hover | #242424 | #ffffff | grey-14 |
| colorNeutralForeground1Pressed | #242424 | #ffffff | grey-14 |
| colorNeutralForeground1Selected | #242424 | #ffffff | grey-14 |
| colorNeutralForeground1Static | #242424 | #242424 | grey-14 |
| colorNeutralForeground2 | #424242 | #d6d6d6 | grey-26 |
| colorNeutralForeground2BrandHover | #0078d4 | #2899f5 | - |
| colorNeutralForeground2BrandPressed | #106ebe | #1890f1 | - |
| colorNeutralForeground2BrandSelected | #0078d4 | #2899f5 | - |
| colorNeutralForeground2Hover | #242424 | #ffffff | grey-14 |
| colorNeutralForeground2Link | #424242 | #d6d6d6 | grey-26 |
| colorNeutralForeground2LinkHover | #242424 | #ffffff | grey-14 |
| colorNeutralForeground2LinkPressed | #242424 | #ffffff | grey-14 |
| colorNeutralForeground2LinkSelected | #242424 | #ffffff | grey-14 |
| colorNeutralForeground2Pressed | #242424 | #ffffff | grey-14 |
| colorNeutralForeground2Selected | #242424 | #ffffff | grey-14 |
| colorNeutralForeground3 | #616161 | #adadad | grey-38 |
| colorNeutralForeground3BrandHover | #0078d4 | #2899f5 | - |
| colorNeutralForeground3BrandPressed | #106ebe | #1890f1 | - |
| colorNeutralForeground3BrandSelected | #0078d4 | #2899f5 | - |
| colorNeutralForeground3Hover | #424242 | #d6d6d6 | grey-26 |
| colorNeutralForeground3Pressed | #424242 | #d6d6d6 | grey-26 |
| colorNeutralForeground3Selected | #424242 | #d6d6d6 | grey-26 |
| colorNeutralForeground4 | #707070 | #999999 | grey-44 |
| colorNeutralForeground5 | #616161 | #adadad | grey-38 |
| colorNeutralForeground5Hover | #242424 | #ffffff | grey-14 |
| colorNeutralForeground5Pressed | #242424 | #ffffff | grey-14 |
| colorNeutralForeground5Selected | #242424 | #ffffff | grey-14 |
| colorNeutralForegroundDisabled | #bdbdbd | #5c5c5c | grey-74 |
| colorNeutralForegroundInverted | #ffffff | #242424 | - |
| colorNeutralForegroundInverted2 | #ffffff | #242424 | - |
| colorNeutralForegroundInvertedDisabled | rgba(255, 255, 255, 0.4) | rgba(255, 255, 255, 0.4) | - |
| colorNeutralForegroundInvertedHover | #ffffff | #242424 | - |
| colorNeutralForegroundInvertedLink | #ffffff | #ffffff | - |
| colorNeutralForegroundInvertedLinkHover | #ffffff | #ffffff | - |
| colorNeutralForegroundInvertedLinkPressed | #ffffff | #ffffff | - |
| colorNeutralForegroundInvertedLinkSelected | #ffffff | #ffffff | - |
| colorNeutralForegroundInvertedPressed | #ffffff | #242424 | - |
| colorNeutralForegroundInvertedSelected | #ffffff | #242424 | - |
| colorNeutralForegroundOnBrand | #ffffff | #ffffff | - |
| colorNeutralForegroundStaticInverted | #ffffff | #ffffff | - |
| colorNeutralShadowAmbient | rgba(0,0,0,0.12) | rgba(0,0,0,0.24) | - |
| colorNeutralShadowAmbientDarker | rgba(0,0,0,0.20) | rgba(0,0,0,0.40) | - |
| colorNeutralShadowAmbientLighter | rgba(0,0,0,0.06) | rgba(0,0,0,0.12) | - |
| colorNeutralShadowKey | rgba(0,0,0,0.14) | rgba(0,0,0,0.28) | - |
| colorNeutralShadowKeyDarker | rgba(0,0,0,0.24) | rgba(0,0,0,0.48) | - |
| colorNeutralShadowKeyLighter | rgba(0,0,0,0.07) | rgba(0,0,0,0.14) | - |
| colorNeutralStencil1 | #e6e6e6 | #575757 | grey-90 |
| colorNeutralStencil1Alpha | rgba(0, 0, 0, 0.1) | rgba(255, 255, 255, 0.1) | - |
| colorNeutralStencil2 | #fafafa | #333333 | grey-98 |
| colorNeutralStencil2Alpha | rgba(0, 0, 0, 0.05) | rgba(255, 255, 255, 0.05) | - |
| colorNeutralStroke1 | #d1d1d1 | #666666 | grey-82 |
| colorNeutralStroke1Hover | #c7c7c7 | #757575 | grey-78 |
| colorNeutralStroke1Pressed | #b3b3b3 | #6b6b6b | grey-70 |
| colorNeutralStroke1Selected | #bdbdbd | #707070 | grey-74 |
| colorNeutralStroke2 | #e0e0e0 | #525252 | grey-88 |
| colorNeutralStroke3 | #f0f0f0 | #3d3d3d | grey-94 |
| colorNeutralStroke4 | #ebebeb | #3d3d3d | grey-92 |
| colorNeutralStroke4Hover | #e0e0e0 | #2e2e2e | grey-88 |
| colorNeutralStroke4Pressed | #d6d6d6 | #242424 | grey-84 |
| colorNeutralStroke4Selected | #ebebeb | #3d3d3d | grey-92 |
| colorNeutralStrokeAccessible | #616161 | #adadad | grey-38 |
| colorNeutralStrokeAccessibleHover | #575757 | #bdbdbd | grey-34 |
| colorNeutralStrokeAccessiblePressed | #4d4d4d | #b3b3b3 | grey-30 |
| colorNeutralStrokeAccessibleSelected | #0078d4 | #2899f5 | - |
| colorNeutralStrokeAlpha | rgba(0, 0, 0, 0.05) | rgba(255, 255, 255, 0.1) | - |
| colorNeutralStrokeAlpha2 | rgba(255, 255, 255, 0.2) | rgba(255, 255, 255, 0.2) | - |
| colorNeutralStrokeDisabled | #e0e0e0 | #424242 | grey-88 |
| colorNeutralStrokeDisabled2 | #ebebeb | #3d3d3d | grey-92 |
| colorNeutralStrokeInvertedDisabled | rgba(255, 255, 255, 0.4) | rgba(255, 255, 255, 0.4) | - |
| colorNeutralStrokeOnBrand | #ffffff | #292929 | - |
| colorNeutralStrokeOnBrand2 | #ffffff | #ffffff | - |
| colorNeutralStrokeOnBrand2Hover | #ffffff | #ffffff | - |
| colorNeutralStrokeOnBrand2Pressed | #ffffff | #ffffff | - |
| colorNeutralStrokeOnBrand2Selected | #ffffff | #ffffff | - |
| colorNeutralStrokeSubtle | #e0e0e0 | #0a0a0a | grey-88 |
| colorScrollbarOverlay | rgba(0, 0, 0, 0.5) | rgba(255, 255, 255, 0.6) | - |
| colorStrokeFocus1 | #ffffff | #000000 | - |
| colorStrokeFocus2 | #000000 | #ffffff | - |
| colorSubtleBackground | transparent | transparent | - |
| colorSubtleBackgroundHover | #f5f5f5 | #383838 | grey-96 |
| colorSubtleBackgroundInverted | transparent | transparent | - |
| colorSubtleBackgroundInvertedHover | rgba(0, 0, 0, 0.1) | rgba(0, 0, 0, 0.1) | - |
| colorSubtleBackgroundInvertedPressed | rgba(0, 0, 0, 0.3) | rgba(0, 0, 0, 0.3) | - |
| colorSubtleBackgroundInvertedSelected | rgba(0, 0, 0, 0.2) | rgba(0, 0, 0, 0.2) | - |
| colorSubtleBackgroundLightAlphaHover | rgba(255, 255, 255, 0.7) | rgba(36, 36, 36, 0.8) | - |
| colorSubtleBackgroundLightAlphaPressed | rgba(255, 255, 255, 0.5) | rgba(36, 36, 36, 0.5) | - |
| colorSubtleBackgroundLightAlphaSelected | transparent | transparent | - |
| colorSubtleBackgroundPressed | #e0e0e0 | #2e2e2e | grey-88 |
| colorSubtleBackgroundSelected | #ebebeb | #333333 | grey-92 |
| colorTransparentBackground | transparent | transparent | - |
| colorTransparentBackgroundHover | transparent | transparent | - |
| colorTransparentBackgroundPressed | transparent | transparent | - |
| colorTransparentBackgroundSelected | transparent | transparent | - |
| colorTransparentStroke | transparent | transparent | - |
| colorTransparentStrokeDisabled | transparent | transparent | - |
| colorTransparentStrokeInteractive | transparent | transparent | - |

### Non-Color Semantic Tokens

| Category | Token | Value | Type |
|----------|-------|-------|------|
| Border Radius | border-radius-none | 0 | FLOAT |
| Border Radius | border-radius-small | 2px | FLOAT |
| Border Radius | border-radius-medium | 4px | FLOAT |
| Border Radius | border-radius-large | 6px | FLOAT |
| Border Radius | border-radius-xlarge | 8px | FLOAT |
| Border Radius | border-radius-2xlarge | 12px | FLOAT |
| Border Radius | border-radius-3xlarge | 16px | FLOAT |
| Border Radius | border-radius-4xlarge | 24px | FLOAT |
| Border Radius | border-radius-5xlarge | 32px | FLOAT |
| Border Radius | border-radius-6xlarge | 40px | FLOAT |
| Border Radius | border-radius-circular | 10000px | FLOAT |
| Spacing | spacing-none | 0 | FLOAT |
| Spacing | spacing-xxs | 2px | FLOAT |
| Spacing | spacing-xs | 4px | FLOAT |
| Spacing | spacing-s-nudge | 6px | FLOAT |
| Spacing | spacing-s | 8px | FLOAT |
| Spacing | spacing-m-nudge | 10px | FLOAT |
| Spacing | spacing-m | 12px | FLOAT |
| Spacing | spacing-l | 16px | FLOAT |
| Spacing | spacing-xl | 20px | FLOAT |
| Spacing | spacing-xxl | 24px | FLOAT |
| Spacing | spacing-xxxl | 32px | FLOAT |
| Stroke Width | stroke-width-thin | 1px | FLOAT |
| Stroke Width | stroke-width-thick | 2px | FLOAT |
| Stroke Width | stroke-width-thicker | 3px | FLOAT |
| Stroke Width | stroke-width-thickest | 4px | FLOAT |
| Typography | font-size-base-100 | 10px | FLOAT |
| Typography | font-size-base-200 | 12px | FLOAT |
| Typography | font-size-base-300 | 14px | FLOAT |
| Typography | font-size-base-400 | 16px | FLOAT |
| Typography | font-size-base-500 | 20px | FLOAT |
| Typography | font-size-base-600 | 24px | FLOAT |
| Typography | font-size-hero-700 | 28px | FLOAT |
| Typography | font-size-hero-800 | 32px | FLOAT |
| Typography | font-size-hero-900 | 40px | FLOAT |
| Typography | font-size-hero-1000 | 68px | FLOAT |
| Typography | font-weight-regular | 400 | FLOAT |
| Typography | font-weight-medium | 500 | FLOAT |
| Typography | font-weight-semibold | 600 | FLOAT |
| Typography | font-weight-bold | 700 | FLOAT |
| Motion | duration-ultra-fast | 50ms | STRING |
| Motion | duration-faster | 100ms | STRING |
| Motion | duration-fast | 150ms | STRING |
| Motion | duration-normal | 200ms | STRING |
| Motion | duration-gentle | 250ms | STRING |
| Motion | duration-slow | 300ms | STRING |
| Motion | duration-slower | 400ms | STRING |
| Motion | duration-ultra-slow | 500ms | STRING |
| Shadow | shadow-2 | 0px 1px 2px rgba(0,0,0,0.12)... | STRING |
| Shadow | shadow-4 | 0px 2px 4px rgba(0,0,0,0.12)... | STRING |
| Shadow | shadow-8 | 0px 4px 8px rgba(0,0,0,0.12)... | STRING |
| Shadow | shadow-16 | 0px 8px 16px rgba(0,0,0,0.12)... | STRING |
| Shadow | shadow-28 | 0px 14px 28px rgba(0,0,0,0.12)... | STRING |
| Shadow | shadow-64 | 0px 32px 64px rgba(0,0,0,0.12)... | STRING |

---

## Tier 4: Component Tokens

Component tokens alias directly to Semantic tokens, maintaining the chain:
```
Component → Semantic → Primitive → Raw
```

### Button

| Token | Semantic Alias |
|-------|----------------|
| button/background/primary | colorBrandBackground |
| button/background/primary-hover | colorBrandBackgroundHover |
| button/background/primary-pressed | colorBrandBackgroundPressed |
| button/text/primary | colorNeutralForegroundOnBrand |
| button/border/primary | colorTransparentStroke |
| button/background/secondary | colorNeutralBackground1 |
| button/background/secondary-hover | colorNeutralBackground1Hover |
| button/background/secondary-pressed | colorNeutralBackground1Pressed |
| button/text/secondary | colorNeutralForeground1 |
| button/border/secondary | colorNeutralStroke1 |
| button/background/subtle | colorSubtleBackground |
| button/background/subtle-hover | colorSubtleBackgroundHover |
| button/background/subtle-pressed | colorSubtleBackgroundPressed |
| button/text/subtle | colorNeutralForeground2 |
| button/border/subtle | colorTransparentStroke |
| button/background/disabled | colorNeutralBackgroundDisabled |
| button/text/disabled | colorNeutralForegroundDisabled |
| button/border/disabled | colorNeutralStrokeDisabled |

### Input

| Token | Semantic Alias |
|-------|----------------|
| input/background | colorTransparentBackground |
| input/text | colorNeutralForeground1 |
| input/text-disabled | colorNeutralForegroundDisabled |
| input/border | colorNeutralStroke1 |
| input/border-hover | colorNeutralStroke1Hover |
| input/border-focused | colorCompoundBrandStroke |
| input/border-disabled | colorNeutralStrokeDisabled |
| input/placeholder | colorNeutralForeground4 |

### Card

| Token | Semantic Alias |
|-------|----------------|
| card/background | colorNeutralBackground1 |
| card/background-hover | colorNeutralBackground1Hover |
| card/border | colorNeutralStroke1 |
| card/text | colorNeutralForeground1 |
| card/text-secondary | colorNeutralForeground2 |

### Link

| Token | Semantic Alias |
|-------|----------------|
| link/text | colorBrandForegroundLink |
| link/text-hover | colorBrandForegroundLinkHover |
| link/text-pressed | colorBrandForegroundLinkPressed |

### Dialog

| Token | Semantic Alias |
|-------|----------------|
| dialog/background | colorNeutralBackground1 |
| dialog/backdrop | colorBackgroundOverlay |
| dialog/text | colorNeutralForeground1 |
| dialog/text-secondary | colorNeutralForeground2 |

### Checkbox

| Token | Semantic Alias |
|-------|----------------|
| checkbox/background | colorNeutralBackground1 |
| checkbox/background-checked | colorCompoundBrandBackground |
| checkbox/border | colorNeutralStrokeAccessible |
| checkbox/border-checked | colorCompoundBrandStroke |
| checkbox/icon | colorNeutralForegroundOnBrand |
| checkbox/text | colorNeutralForeground1 |
| checkbox/text-disabled | colorNeutralForegroundDisabled |

### Radio

| Token | Semantic Alias |
|-------|----------------|
| radio/background | colorNeutralBackground1 |
| radio/background-checked | colorCompoundBrandBackground |
| radio/border | colorNeutralStrokeAccessible |
| radio/border-checked | colorCompoundBrandStroke |
| radio/dot | colorNeutralForegroundOnBrand |
| radio/text | colorNeutralForeground1 |
| radio/text-disabled | colorNeutralForegroundDisabled |

### Avatar / Badge / Tab / Toast / Dropdown / Tooltip / Divider / Spinner / Switch

See the Figma file `Fluent Component` collection for the full list of 75 component tokens.

---

## Tier 5: Computational Tokens

Computational tokens are derived at runtime from the semantic tier. Examples:

| Concept | Computation |
|---------|-------------|
| Hover offset | `background-hover` = lighter/darker step from base background |
| Focus ring | `stroke-focus-2` + `stroke-focus-1` (2px black on white, or white on dark) |
| Disabled opacity | Multiply foreground by `colorNeutralForegroundDisabled` |
| Compound brand | Morph between `brand[80]` and `brand[100]` across hover/pressed |

---

## Tier 6: Adaptive Tokens

Adaptive tokens respond to user preferences and themes:

| Context | Behavior |
|---------|----------|
| **Light / Dark** | Full mode switch via Figma variable modes |
| **Brand Theme** | Swap `brand-10`..`brand-160` ramp (Web, Teams, Office) |
| **High Contrast** | Override with `hcCanvas`, `hcCanvasText`, `hcHighlight` primitives |
| **Reduced Motion** | Override `duration-*` tokens to `0ms` or `1ms` |
| **RTL** | Swap `spacingHorizontal*` alias directions |

---

## Source Reference

- **Fluent UI React v9 Storybook**: https://storybooks.fluentui.dev/react/?path=/docs/theme-colors--docs
- **GitHub source**: https://github.com/microsoft/fluentui/tree/master/packages/tokens
- **Figma file**: https://www.figma.com/design/k3hCAXCx0MbxtPueAzYklc/-DS-Tokens--Fluent

---

*Generated automatically from @fluentui/react-components source code.*