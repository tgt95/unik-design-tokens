# Atlassian AUI Components - Figma ↔ Code Mapping

## Overview

This document maps the Figma components created in the `DS-Tokens--Atlassian` Figma file to their corresponding source code in the `@atlassian/aui` npm package.

**Figma File:** https://www.figma.com/design/Ba7vj2k88AT53zawtOkvmv/-DS-Tokens--Atlassian
**NPM Package:** `@atlassian/aui` v10.2.1
**Source:** `/src/less/` directory in the package

---

## Component Architecture

Each component in Figma is built as a **Component Set** with variants representing different states. All components use Atlassian Design System tokens from the existing collections:
- **Atlassian Primitive** (166 tokens)
- **Atlassian Semantic** (410 tokens, Light/Dark)
- **Atlassian Component** (183 tokens, Light/Dark)

Token chain:
```
Component Token → Semantic Token → Primitive Token → Raw Hex
```

---

## Components Summary

| Figma Component | Variants | AUI LESS File | AUI Entry File |
|-----------------|----------|---------------|----------------|
| **Button** | 18 | `aui-buttons.less` | `aui.component.button.js` |
| **Input** | 6 | `forms.less`, `forms-current.less` | `aui.component.form.*.js` |
| **Checkbox** | 5 | `forms-radios-and-checkboxes.less` | `aui.component.form.*.js` |
| **Radio** | 3 | `forms-radios-and-checkboxes.less` | `aui.component.form.*.js` |
| **Avatar** | 5 | `aui-avatars.less` | `aui.component.avatar.js` |
| **Badge** | 5 | `aui-badge.less` | `aui.component.badge.js` |
| **Banner** | 3 | `aui-banner.less` | `aui.component.banner.js` |
| **Dialog** | 1 | `dialog.less` | `aui.component.dialog2.js` |
| **Flag** | 4 | `flag.less` | `aui.component.flag.js` |
| **Dropdown** | 1 | `dropdown2.less` | `aui.component.dropdown2.js` |
| **Spinner** | 3 | (spinner component) | `aui.component.spinner.js` |
| **Switch** | 4 | `form.toggle.js` | `aui.component.form.toggle.js` |
| **Tab** | 4 | `tabs.less` | `aui.component.tabs.js` |
| **Tooltip** | 2 | `aui-experimental-tooltip.less` | `aui.component.tooltip.js` |
| **Divider** | 2 | (part of base styles) | `aui.core.js` |
| **ProgressBar** | 2 | `aui-experimental-progress-indicator.less` | `aui.component.progressbar.js` |

**Total: 16 Component Sets, 68 Variants**

---

## Component Details

### Button (`aui-buttons.less`)
The Button component supports 6 types with 3-4 states each:
- **Primary**: Brand background (#1868db) with white text
- **Standard**: White background with neutral border
- **Subtle**: Transparent background with hover state
- **Link**: Text-only button style
- **Warning**: Orange/caution background
- **Danger**: Red background for destructive actions

States per type: Default, Hover, Active/Pressed, Disabled

### Input (`forms.less`)
The Input component represents text fields with states:
- Default (neutral border)
- Hover (darker border)
- Focused (brand-blue border)
- Filled (neutral text)
- Disabled (disabled colors)
- Error (red border)

### Checkbox (`forms-radios-and-checkboxes.less`)
States:
- Unchecked (empty box)
- Checked (filled with brand color + checkmark)
- Mixed/Indeterminate (filled with minus)
- Disabled variants

### Radio (`forms-radios-and-checkboxes.less`)
States:
- Unchecked (empty circle)
- Checked (filled inner dot)
- Disabled

### Avatar (`aui-avatars.less`)
Size variants:
- XSmall (16px), Small (24px), Medium (32px), Large (40px), XLarge (96px)
- Always circular (border-radius: 50%)
- Project avatars have square corners

### Badge (`aui-badge.less`)
Semantic variants:
- Default (neutral grey)
- Primary (brand blue)
- Added (green/lime)
- Removed (red)
- Important (purple)

### Banner / Inline Message (`aui-banner.less`)
Types:
- Announcement (neutral background)
- Warning (yellow-tinted background)
- Error (red-tinted background)

### Dialog (`dialog.less`)
Modal dialog structure:
- Header with title
- Body content area
- Footer with action buttons
- Background overlay (blanket)

### Flag / Toast (`flag.less`)
Toast notification types:
- Info (blue left border)
- Success (green left border)
- Warning (orange left border)
- Error (red left border)

### Dropdown (`dropdown2.less`)
Dropdown menu with:
- List of selectable items
- Section headings
- Checkbox/radio items
- Disabled states

### Spinner (`aui.component.spinner.js`)
Loading indicator sizes:
- Small (16px), Medium (24px), Large (32px)
- Circular track + indicator arc

### Switch / Toggle (`form.toggle.js`)
Toggle states:
- Off (grey track)
- On (brand track)
- Disabled Off
- Disabled On

### Tab (`tabs.less`)
Tab states:
- Default (neutral text)
- Hover (darker text)
- Selected (brand underline + text)
- Disabled (muted text)

### Tooltip (`aui-experimental-tooltip.less`)
Tooltip variants:
- Default (dark background, white text)
- Light (light background, dark text)

### Divider
- Default (subtle grey)
- Strong (darker grey)

### ProgressBar (`aui-experimental-progress-indicator.less`)
- Default appearance (brand blue)
- Success appearance (green)

---

## Token Usage

All components use the existing Atlassian token collections:

| Token Type | Example |
|-----------|---------|
| **Primitive** | `Blue700` → #1868db, `Neutral200` → #dcdfe4 |
| **Semantic** | `background/brand/boldest`, `text/default`, `border/default` |
| **Component** | `button.background.primary`, `input.border.focused` |

---

## Additional AUI Components (Not Yet in Figma)

| AUI Component | LESS File | Entry File |
|---------------|-----------|------------|
| **Accordion / Expander** | `aui-experimental-expander.less` | `aui.component.expander.js` |
| **Date Select** | `aui-date-picker.less` | `aui.component.form.date-select.js` |
| **File Select** | (fancy file input) | `aui.component.form.file-select.js` |
| **Form Label** | `form.label.js` | `aui.component.form.label.js` |
| **Inline Dialog** | (part of layer) | `aui.component.inline-dialog2.js` |
| **Layer / Blanket** | `layer.less` | `aui.component.layer.js` |
| **Message (standalone)** | `message.less` | `aui.component.message.js` |
| **Navigation** | `nav.less` | `aui.component.nav.js` |
| **Restful Table** | `aui-experimental-restfultable.less` | `aui.component.restful-table.js` |
| **Sidebar** | `aui-sidebar.less` | `aui.component.sidebar.js` |
| **Sortable Table** | (table styles) | `aui.component.sortable-table.js` |
| **Toolbar** | `aui-toolbar2.less` | - |
| **Page Header** | `aui-page-header.less` | `aui.component.static-header.js` |
| **Select / Single Select** | `single-select.less` | `aui.component.form.single-select.js` |
| **Select2** | `form.select2.js` | `aui.component.form.select2.js` |
| **Trigger** | `trigger.js` | `aui.component.trigger.js` |

---

## Source References

- **AUI Documentation:** https://aui.atlassian.com
- **NPM Package:** `@atlassian/aui` v10.2.1
- **Bitbucket Repo:** https://bitbucket.org/atlassian/aui
- **Figma File:** https://www.figma.com/design/Ba7vj2k88AT53zawtOkvmv/-DS-Tokens--Atlassian

---

*Generated from @atlassian/aui v10.2.1 source code*
