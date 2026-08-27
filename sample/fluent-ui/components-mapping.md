# Fluent UI Components - Figma ↔ GitHub Mapping

## Overview

This document maps the Figma components created in the `DS-Tokens--Fluent` Figma file to their corresponding React source code in the Microsoft Fluent UI GitHub repository.

**Figma File:** https://www.figma.com/design/k3hCAXCx0MbxtPueAzYklc/-DS-Tokens--Fluent
**GitHub Repo:** https://github.com/microsoft/fluentui/tree/master/packages/react-components

---

## Component Architecture

Each component in Figma is built as a **Component Set** with variants representing different states:
- **Default** - Resting state
- **Hover** - Mouse hover state
- **Pressed** / **Checked** - Active/selected state
- **Disabled** - Non-interactive state
- **Focused** - Keyboard focus state (where applicable)

All components use tokens from the **Fluent Component** collection, which aliases to **Fluent Semantic** tokens, following the 6-tier architecture:
```
Component → Semantic → Primitive → Raw
```

---

## Component Mapping Table

| Figma Component | Figma Node ID | Variants | Fluent UI Package | Source File | Component Name |
|-----------------|---------------|----------|-------------------|-------------|----------------|
| **Button** | 32:27 | 12 (Primary/Secondary/Subtle × Default/Hover/Pressed/Disabled) | `@fluentui/react-button` | [Button.tsx](https://github.com/microsoft/fluentui/tree/master/packages/react-components/react-button/library/src/Button.tsx) | `Button` |
| **Input** | 33:14 | 6 (Default/Hover/Focused/Filled/Disabled/Error) | `@fluentui/react-input` | [Input.ts](https://github.com/microsoft/fluentui/tree/master/packages/react-components/react-input/library/src/Input.ts) | `Input` |
| **Checkbox** | 33:30 | 5 (Unchecked/Checked/Mixed/Disabled) | `@fluentui/react-checkbox` | [Checkbox.tsx](https://github.com/microsoft/fluentui/tree/master/packages/react-components/react-checkbox/library/src/components/Checkbox/Checkbox.tsx) | `Checkbox` |
| **Avatar** | 33:39 | 4 (Size 32/40/48/72) | `@fluentui/react-avatar` | [Avatar.ts](https://github.com/microsoft/fluentui/tree/master/packages/react-components/react-avatar/library/src/Avatar.ts) | `Avatar` |
| **Card** | 33:52 | 4 (Default/Hover/Selected/Disabled) | `@fluentui/react-card` | [Card.tsx](https://github.com/microsoft/fluentui/tree/master/packages/react-components/react-card/library/src/components/Card/Card.tsx) | `Card` |
| **Badge** | 33:59 | 3 (Default/Ghost/Outline) | `@fluentui/react-badge` | [Badge.tsx](https://github.com/microsoft/fluentui/tree/master/packages/react-components/react-badge/library/src/components/Badge/Badge.tsx) | `Badge` |
| **Link** | 33:66 | 3 (Default/Hover/Pressed) | `@fluentui/react-link` | [Link.tsx](https://github.com/microsoft/fluentui/tree/master/packages/react-components/react-link/library/src/components/Link/Link.tsx) | `Link` |
| **Divider** | 33:71 | 2 (Default/Strong) | `@fluentui/react-divider` | [Divider.tsx](https://github.com/microsoft/fluentui/tree/master/packages/react-components/react-divider/library/src/components/Divider/Divider.tsx) | `Divider` |
| **Radio** | 34:12 | 3 (Unchecked/Checked/Disabled) | `@fluentui/react-radio` | [Radio.tsx](https://github.com/microsoft/fluentui/tree/master/packages/react-components/react-radio/library/src/components/Radio/Radio.tsx) | `Radio` |
| **Switch** | 34:25 | 4 (Off/On/Disabled) | `@fluentui/react-switch` | [Switch.tsx](https://github.com/microsoft/fluentui/tree/master/packages/react-components/react-switch/library/src/components/Switch/Switch.tsx) | `Switch` |
| **Tab** | 34:35 | 4 (Default/Hover/Selected/Disabled) | `@fluentui/react-tabs` | [Tab.tsx](https://github.com/microsoft/fluentui/tree/master/packages/react-components/react-tabs/library/src/components/Tab/Tab.tsx) | `Tab` |
| **Spinner** | 34:42 | 2 (Primary/Large) | `@fluentui/react-spinner` | [Spinner.tsx](https://github.com/microsoft/fluentui/tree/master/packages/react-components/react-spinner/library/src/components/Spinner/Spinner.tsx) | `Spinner` |
| **Tooltip** | 34:47 | 2 (Default/Subtle) | `@fluentui/react-tooltip` | [Tooltip.tsx](https://github.com/microsoft/fluentui/tree/master/packages/react-components/react-tooltip/library/src/components/Tooltip/Tooltip.tsx) | `Tooltip` |

---

## Component Details

### Button (`@fluentui/react-button`)
The Button component in Figma supports 3 appearances with 4 states each:
- **Primary**: Brand background with white text
- **Secondary**: White background with neutral text and stroke
- **Subtle**: Transparent background with hover state

Each variant uses component tokens aliased to semantic tokens:
```
button/background/primary → colorBrandBackground
button/background/primary-hover → colorBrandBackgroundHover
button/text/primary → colorNeutralForegroundOnBrand
```

### Input (`@fluentui/react-input`)
The Input component represents a single-line text field with states:
- Default (neutral stroke, placeholder text)
- Hover (slightly darker stroke)
- Focused (compound brand stroke)
- Filled (neutral text)
- Disabled (disabled token colors)
- Error (red accent border)

### Checkbox (`@fluentui/react-checkbox`)
The Checkbox component includes:
- Unchecked state with accessible stroke
- Checked state with compound brand background
- Mixed (indeterminate) state
- Disabled variants for both checked and unchecked

### Avatar (`@fluentui/react-avatar`)
The Avatar component supports multiple sizes:
- 32px, 40px, 48px, 72px
- Circular shape with grey background
- Text initials centered

### Card (`@fluentui/react-card`)
The Card component includes layout with title and body text:
- Default: subtle background
- Hover: white background
- Selected: selected background
- Disabled: disabled background

### Badge (`@fluentui/react-badge`)
The Badge component is a pill-shaped indicator:
- Default: brand background
- Ghost: subtle background
- Outline: white background with border

### Link (`@fluentui/react-link`)
The Link component represents interactive text:
- Default: brand link color
- Hover: darker brand color
- Pressed: darkest brand color

### Divider (`@fluentui/react-divider`)
The Divider component is a horizontal line:
- Default: stroke-2 (subtle)
- Strong: stroke-1 (more prominent)

### Radio (`@fluentui/react-radio`)
The Radio button component:
- Unchecked: empty circle with stroke
- Checked: filled inner circle
- Disabled: greyed out

### Switch (`@fluentui/react-switch`)
The Switch toggle component:
- Off: neutral background track
- On: brand background track with white thumb
- Disabled variants

### Tab (`@fluentui/react-tabs`)
The Tab component:
- Default: neutral foreground-2
- Hover: subtle background hover
- Selected: brand underline + foreground-1
- Disabled: disabled foreground

### Spinner (`@fluentui/react-spinner`)
The Spinner loading indicator:
- Circular track and indicator arcs
- Brand color indicator
- Multiple sizes

### Tooltip (`@fluentui/react-tooltip`)
The Tooltip component:
- Default: inverted background with inverted text
- Subtle: light grey background

---

## Token Usage in Components

All components are styled using the **Fluent Component** token collection, which aliases to **Fluent Semantic** tokens:

```
Component Token → Semantic Token → Primitive Token → Raw Hex
```

Example for Button Primary:
```
button/background/primary → colorBrandBackground → brand-80 → #0078d4
button/text/primary → colorNeutralForegroundOnBrand → white → #ffffff
```

---

## Additional Fluent UI Components (Not Yet in Figma)

| Package | Component | GitHub Source |
|---------|-----------|---------------|
| `@fluentui/react-dialog` | Dialog | [Dialog.tsx](https://github.com/microsoft/fluentui/tree/master/packages/react-components/react-dialog/library/src/components/Dialog/Dialog.tsx) |
| `@fluentui/react-menu` | Menu | [Menu.tsx](https://github.com/microsoft/fluentui/tree/master/packages/react-components/react-menu/library/src/components/Menu/Menu.tsx) |
| `@fluentui/react-popover` | Popover | [Popover.tsx](https://github.com/microsoft/fluentui/tree/master/packages/react-components/react-popover/library/src/components/Popover/Popover.tsx) |
| `@fluentui/react-select` | Select | [Select.tsx](https://github.com/microsoft/fluentui/tree/master/packages/react-components/react-select/library/src/components/Select/Select.tsx) |
| `@fluentui/react-combobox` | Combobox | [Combobox.tsx](https://github.com/microsoft/fluentui/tree/master/packages/react-components/react-combobox/library/src/components/Combobox/Combobox.tsx) |
| `@fluentui/react-slider` | Slider | [Slider.tsx](https://github.com/microsoft/fluentui/tree/master/packages/react-components/react-slider/library/src/components/Slider/Slider.tsx) |
| `@fluentui/react-table` | Table | [Table.tsx](https://github.com/microsoft/fluentui/tree/master/packages/react-components/react-table/library/src/components/Table/Table.tsx) |
| `@fluentui/react-tree` | Tree | [Tree.tsx](https://github.com/microsoft/fluentui/tree/master/packages/react-components/react-tree/library/src/components/Tree/Tree.tsx) |
| `@fluentui/react-drawer` | Drawer | [Drawer.tsx](https://github.com/microsoft/fluentui/tree/master/packages/react-components/react-drawer/library/src/components/Drawer/Drawer.tsx) |
| `@fluentui/react-message-bar` | MessageBar | [MessageBar.tsx](https://github.com/microsoft/fluentui/tree/master/packages/react-components/react-message-bar/library/src/components/MessageBar/MessageBar.tsx) |
| `@fluentui/react-progress` | ProgressBar | [ProgressBar.tsx](https://github.com/microsoft/fluentui/tree/master/packages/react-components/react-progress/library/src/components/ProgressBar/ProgressBar.tsx) |
| `@fluentui/react-field` | Field | [Field.tsx](https://github.com/microsoft/fluentui/tree/master/packages/react-components/react-field/library/src/components/Field/Field.tsx) |
| `@fluentui/react-label` | Label | [Label.tsx](https://github.com/microsoft/fluentui/tree/master/packages/react-components/react-label/library/src/components/Label/Label.tsx) |
| `@fluentui/react-image` | Image | [Image.tsx](https://github.com/microsoft/fluentui/tree/master/packages/react-components/react-image/library/src/components/Image/Image.tsx) |
| `@fluentui/react-text` | Text | [Text.tsx](https://github.com/microsoft/fluentui/tree/master/packages/react-components/react-text/library/src/components/Text/Text.tsx) |
| `@fluentui/react-skeleton` | Skeleton | [Skeleton.tsx](https://github.com/microsoft/fluentui/tree/master/packages/react-components/react-skeleton/library/src/components/Skeleton/Skeleton.tsx) |
| `@fluentui/react-persona` | Persona | [Persona.tsx](https://github.com/microsoft/fluentui/tree/master/packages/react-components/react-persona/library/src/components/Persona/Persona.tsx) |
| `@fluentui/react-nav` | Nav | [Nav.tsx](https://github.com/microsoft/fluentui/tree/master/packages/react-components/react-nav/library/src/components/Nav/Nav.tsx) |
| `@fluentui/react-breadcrumb` | Breadcrumb | [Breadcrumb.tsx](https://github.com/microsoft/fluentui/tree/master/packages/react-components/react-breadcrumb/library/src/components/Breadcrumb/Breadcrumb.tsx) |
| `@fluentui/react-accordion` | Accordion | [Accordion.tsx](https://github.com/microsoft/fluentui/tree/master/packages/react-components/react-accordion/library/src/components/Accordion/Accordion.tsx) |
| `@fluentui/react-calendar-compat` | Calendar | [Calendar.tsx](https://github.com/microsoft/fluentui/tree/master/packages/react-components/react-calendar-compat/library/src/components/Calendar/Calendar.tsx) |
| `@fluentui/react-datepicker-compat` | DatePicker | [DatePicker.tsx](https://github.com/microsoft/fluentui/tree/master/packages/react-components/react-datepicker-compat/library/src/components/DatePicker/DatePicker.tsx) |
| `@fluentui/react-color-picker` | ColorPicker | [ColorPicker.tsx](https://github.com/microsoft/fluentui/tree/master/packages/react-components/react-color-picker/library/src/components/ColorPicker/ColorPicker.tsx) |
| `@fluentui/react-carousel` | Carousel | [Carousel.tsx](https://github.com/microsoft/fluentui/tree/master/packages/react-components/react-carousel/library/src/components/Carousel/Carousel.tsx) |

---

## Note on Code Connect

Code Connect bidirectional mapping between Figma components and GitHub source requires a **Figma Organization/Enterprise Developer seat**. The current account does not have this permission, so Code Connect mappings cannot be programmatically created via the MCP tools.

To manually set up Code Connect:
1. In Figma, open the component
2. Go to Dev Mode → Code Connect
3. Link to the corresponding GitHub source file (see table above)

---

*Generated from @fluentui/react-components source code*
