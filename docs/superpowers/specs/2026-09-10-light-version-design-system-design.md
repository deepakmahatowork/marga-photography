# Design Spec: Light Version & Modern Fine-Art Design System

**Date:** 2026-09-10  
**Status:** Approved  
**Topic:** Light Version (Warm Fine-Art Gallery Aesthetic) & Dual-Theme System for Marga Photography  

---

## 1. Overview & Objectives
Marga Photography is a specialist high-end photography expedition and documentary collective in Nepal.
The goal of this upgrade is to elevate the visual design and introduce a dedicated **Light Version** with a seamless theme switcher, defaulting to a warm fine-art exhibition aesthetic while retaining full support for dark mode.

### Key Goals
- Implement a **Warm Fine-Art Gallery / Museum Monograph** light theme as the default presentation.
- Provide an intuitive, animated **Theme Switcher** in the navigation header (desktop & mobile) to toggle between Light and Dark modes.
- Persist theme choice in `localStorage` with **Zero Flash of Unstyled Content (FOUC)**.
- Establish a semantic CSS variable system that adapts typography, surfaces, borders, and shadows seamlessly across all components and pages.
- Keep media viewports (such as the full-screen photo Lightbox) cinematic dark for optimal color appraisal.

---

## 2. Design Token System

In `src/styles/global.css`:

### 2.1 Color Tokens
| Token | Light (Default) | Dark | Description |
| :--- | :--- | :--- | :--- |
| `--color-canvas-bg` | `#fcfbf9` (warm alabaster) | `#0b0d10` (obsidian) | Page background |
| `--color-canvas-surface` | `#f5f3eb` (fine-art paper) | `#12151b` (charcoal surface) | Section alternate background |
| `--color-canvas-elevated` | `#ffffff` (crisp matte) | `#1a1e26` (elevated card) | Cards, modals, drawers |
| `--color-canvas-border` | `rgba(28, 25, 23, 0.09)` | `rgba(255, 255, 255, 0.08)` | Dividers, card borders |
| `--color-canvas-subtle` | `rgba(28, 25, 23, 0.03)` | `rgba(255, 255, 255, 0.03)` | Subtle card backgrounds |
| `--color-text-primary` | `#18181b` (deep soot ink) | `#f8fafc` (pure white text) | Primary headings & copy |
| `--color-text-secondary` | `#52525b` (warm charcoal) | `#94a3b8` (cool slate) | Subheadings & metadata |
| `--color-text-muted` | `#71717a` (stone gray) | `#64748b` (muted slate) | Secondary labels, dates |
| `--color-accent-himalaya` | `#a67728` (antique brass) | `#d4a359` (radiant gold) | Primary brand accent |
| `--color-accent-amber` | `#c97720` | `#e89838` | Warm highlight |
| `--color-accent-prayer-red`| `#9e2a2b` | `#b9382e` | Ritual red accent |
| `--color-glass-bg` | `rgba(252, 251, 249, 0.88)` | `rgba(18, 21, 27, 0.85)` | Glassmorphic headers |
| `--color-glass-border` | `rgba(28, 25, 23, 0.08)` | `rgba(255, 255, 255, 0.08)` | Header glass border |
| `--card-shadow` | `0 4px 20px -2px rgba(28, 25, 23, 0.05)` | `none` | Card ambient depth |

### 2.2 Native Integration
- Set `color-scheme: light dark;` to ensure system scrollbars, form controls, and browser UI adapt.
- Subtle custom scrollbar tuned for both modes.
- Selection colors: `rgba(166, 119, 40, 0.25)` in light mode, `rgba(212, 163, 89, 0.3)` in dark mode.

---

## 3. Component Updates

### 3.1 Header & Theme Switcher (`Header.astro`)
- Add a Theme Toggle component (sun/moon SVG icon morph with smooth CSS rotation).
- Include `aria-label="Toggle color theme"` for screen readers.
- Position the switcher prominently in desktop actions and inside the mobile menu drawer.
- Ensure the header glass backdrop blur blends seamlessly in both light and dark.

### 3.2 Base Layout (`BaseLayout.astro`)
- Insert zero-FOUC inline script in `<head>`:
  ```html
  <script is:inline>
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', theme);
  </script>
  ```
- Remove hardcoded `bg-[#0b0d10] text-[#f8fafc]` on `<body>`; replace with semantic utility or CSS variables.

### 3.3 Cards & Lists (`ExpeditionCard.astro`, `StoryCard.astro`, `PhotoGrid.astro`)
- Replace fixed dark hex colors with semantic classes (`bg-[var(--color-canvas-elevated)]`, `text-[var(--color-text-primary)]`, `border-[var(--color-canvas-border)]`).
- Apply subtle shadows in light mode to give cards physical depth on the canvas surface.
- Ensure badges (e.g. Difficulty, Group Size, Date, Region) have clear contrast in light mode.

### 3.4 Interactive Forms & Tools
- `InquiryForm.astro`: Update form inputs, selects, and textareas with adaptive backgrounds, high-contrast borders, and Himalayan gold focus rings.
- `LicensingCalculator.astro`: Style range inputs, checkboxes, pricing summary panels, and preset selectors to adapt cleanly to light mode.
- `Lightbox.astro`: Keep full-screen image viewer in cinematic dark mode (`rgba(5, 7, 10, 0.96)`) so photo tonal range is viewed accurately.

### 3.5 Pages
- Update `index.astro`, `about.astro`, `contact.astro`, `commercial/index.astro`, `expeditions/index.astro`, `expeditions/[slug].astro`, `stories/index.astro`, `stories/[slug].astro`, `explore/[category].astro`, `explore/photograph/[id].astro`, and `404.astro` to ensure all section backgrounds and editorial typography use semantic tokens.

---

## 4. State Management & Zero-FOUC Architecture
1. **Initial Paint**: Script in `<head>` executes before rendering, reading `localStorage` (default `'light'`), setting `data-theme` attribute on `<html>`.
2. **Toggle Event**: Clicking the theme switcher:
   - Reads current `data-theme`.
   - Inverts value (`light` <-> `dark`).
   - Sets `data-theme` attribute on `<html>`.
   - Stores new value into `localStorage.setItem('theme', newTheme)`.
   - Dispatches a `theme-change` CustomEvent.

---

## 5. Verification Plan
- **Content & Collections Validation**: Run `npm test` (`node --test tests/*.test.mjs`).
- **Build Verification**: Run `npm run build` to confirm Astro SSG/SSR builds with zero errors.
- **Browser Subagent Testing**:
  - Test homepage in default light mode.
  - Test theme toggle interaction: click switcher, verify dark mode transition.
  - Test reload: ensure preference persists with zero FOUC.
  - Test subpages: `/expeditions`, `/commercial`, `/stories`, `/about`, `/contact`.
