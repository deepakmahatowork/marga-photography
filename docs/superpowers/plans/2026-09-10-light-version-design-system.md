# Light Version & Modern Fine-Art Design System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a warm fine-art exhibition light theme as the default design for Marga Photography, along with a zero-FOUC dark/light theme switcher in the header and comprehensive semantic design token styling across all components.

**Architecture:** A dual-theme semantic token system configured in `src/styles/global.css` using CSS custom properties on `:root` (light default) and `[data-theme="dark"]`, wired to Tailwind CSS v4 `@theme`. An inline script in `BaseLayout.astro` `<head>` prevents FOUC by setting `data-theme` prior to initial paint. A responsive `ThemeToggle.astro` component provides animated toggling and `localStorage` persistence. All layout components, cards, forms, and pages are updated to consume the semantic tokens.

**Tech Stack:** Astro 7.3, Tailwind CSS v4.3, Vanilla CSS custom properties, Node.js test runner.

**Spec:** `docs/superpowers/specs/2026-09-10-light-version-design-system-design.md`

## Global Constraints
- Light mode is the default for new visitors.
- Theme preference persisted in `localStorage` under key `'theme'`.
- Zero flash of unstyled content (FOUC) on load.
- Full-screen Lightbox remains in cinematic dark mode for photo evaluation.
- All tests in `tests/*.test.mjs` must pass.
- `npm run build` must build cleanly without errors.

---

### Task 1: Automated Theme Contract Tests

**Files:**
- Create: `tests/theme.test.mjs`

**Interfaces:**
- Consumes: `src/styles/global.css`, `src/layouts/BaseLayout.astro`, `src/components/navigation/Header.astro`
- Produces: Test assertions validating semantic color tokens, zero-FOUC script presence, and theme toggle element integration.

- [ ] **Step 1: Write the failing test**

```javascript
// tests/theme.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();

test('Theme Tokens — Global CSS defines semantic tokens for light and dark', () => {
  const cssPath = path.join(rootDir, 'src/styles/global.css');
  const css = fs.readFileSync(cssPath, 'utf8');

  // Verify light tokens
  assert.match(css, /--color-canvas-bg:\s*#fcfbf9/);
  assert.match(css, /--color-canvas-surface:\s*#f5f3eb/);
  assert.match(css, /--color-text-primary:\s*#18181b/);

  // Verify dark tokens under [data-theme="dark"]
  assert.match(css, /\[data-theme=["']dark["']\]/);
  assert.match(css, /--color-canvas-bg:\s*#0b0d10/);
});

test('Theme Architecture — BaseLayout contains zero-FOUC script', () => {
  const layoutPath = path.join(rootDir, 'src/layouts/BaseLayout.astro');
  const layout = fs.readFileSync(layoutPath, 'utf8');

  assert.match(layout, /localStorage\.getItem\(['"]theme['"]\)/);
  assert.match(layout, /document\.documentElement\.setAttribute\(['"]data-theme['"]/);
});

test('Theme Toggle — Header component includes theme toggle button', () => {
  const headerPath = path.join(rootDir, 'src/components/navigation/Header.astro');
  const header = fs.readFileSync(headerPath, 'utf8');

  assert.match(header, /ThemeToggle/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL on `tests/theme.test.mjs` because tokens and scripts are not yet implemented.

- [ ] **Step 3: Commit test file**

```bash
git add tests/theme.test.mjs
git commit -m "test: add automated assertions for theme tokens and layout integration"
```

---

### Task 2: Core Semantic Design System & Tokens in `global.css`

**Files:**
- Modify: `src/styles/global.css`

**Interfaces:**
- Consumes: Tailwind v4 `@import "tailwindcss";`
- Produces: CSS custom properties for canvas, text, borders, glass surfaces, and editorial styling in both Light and Dark themes.

- [ ] **Step 1: Implement semantic token palette in `src/styles/global.css`**

Replace `src/styles/global.css` with:

```css
@import "tailwindcss";

:root {
  /* Canvas & Surfaces (Warm Fine-Art Gallery Light) */
  --color-canvas-bg: #fcfbf9;
  --color-canvas-surface: #f5f3eb;
  --color-canvas-elevated: #ffffff;
  --color-canvas-border: rgba(28, 25, 23, 0.09);
  --color-canvas-subtle: rgba(28, 25, 23, 0.03);

  /* Accents */
  --color-accent-himalaya: #a67728;
  --color-accent-amber: #c97720;
  --color-accent-prayer-red: #9e2a2b;
  --color-accent-ochre: #b37e33;

  /* Typography */
  --color-text-primary: #18181b;
  --color-text-secondary: #52525b;
  --color-text-muted: #71717a;

  /* Glassmorphic & Shadows */
  --color-glass-bg: rgba(252, 251, 249, 0.88);
  --color-glass-border: rgba(28, 25, 23, 0.08);
  --card-shadow: 0 4px 20px -2px rgba(28, 25, 23, 0.05);

  --font-serif: "Cormorant Garamond", Georgia, serif;
  --font-sans: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

[data-theme="dark"] {
  /* Canvas & Surfaces (Midnight Obsidian Dark) */
  --color-canvas-bg: #0b0d10;
  --color-canvas-surface: #12151b;
  --color-canvas-elevated: #1a1e26;
  --color-canvas-border: rgba(255, 255, 255, 0.08);
  --color-canvas-subtle: rgba(255, 255, 255, 0.03);

  /* Accents */
  --color-accent-himalaya: #d4a359;
  --color-accent-amber: #e89838;
  --color-accent-prayer-red: #b9382e;
  --color-accent-ochre: #c58f46;

  /* Typography */
  --color-text-primary: #f8fafc;
  --color-text-secondary: #94a3b8;
  --color-text-muted: #64748b;

  /* Glassmorphic & Shadows */
  --color-glass-bg: rgba(18, 21, 27, 0.85);
  --color-glass-border: rgba(255, 255, 255, 0.08);
  --card-shadow: none;
}

@theme {
  --color-canvas-bg: var(--color-canvas-bg);
  --color-canvas-surface: var(--color-canvas-surface);
  --color-canvas-elevated: var(--color-canvas-elevated);
  --color-canvas-border: var(--color-canvas-border);
  --color-canvas-subtle: var(--color-canvas-subtle);

  --color-accent-himalaya: var(--color-accent-himalaya);
  --color-accent-amber: var(--color-accent-amber);
  --color-accent-prayer-red: var(--color-accent-prayer-red);
  --color-accent-ochre: var(--color-accent-ochre);

  --color-text-primary: var(--color-text-primary);
  --color-text-secondary: var(--color-text-secondary);
  --color-text-muted: var(--color-text-muted);

  --font-serif: var(--font-serif);
  --font-sans: var(--font-sans);
}

@layer base {
  html {
    color-scheme: light dark;
    background-color: var(--color-canvas-bg);
    color: var(--color-text-primary);
    font-family: var(--font-sans);
    scroll-behavior: smooth;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    transition: background-color 0.25s ease, color 0.25s ease;
  }

  ::selection {
    background-color: rgba(166, 119, 40, 0.25);
    color: var(--color-text-primary);
  }

  [data-theme="dark"] ::selection {
    background-color: rgba(212, 163, 89, 0.3);
    color: #f8fafc;
  }

  /* Custom subtle scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    background: var(--color-canvas-bg);
  }
  ::-webkit-scrollbar-thumb {
    background: var(--color-canvas-border);
    border-radius: 3px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: var(--color-accent-himalaya);
  }
}

/* Editorial typography utilities */
.font-editorial {
  font-family: var(--font-serif);
}

.text-gold-gradient {
  background: linear-gradient(135deg, var(--color-text-primary) 30%, var(--color-accent-himalaya) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.glass-panel {
  background: var(--color-glass-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--color-glass-border);
}

.card-hover-border {
  transition: border-color 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
  box-shadow: var(--card-shadow);
}

.card-hover-border:hover {
  border-color: var(--color-accent-himalaya);
  transform: translateY(-2px);
}
```

- [ ] **Step 2: Commit changes to `global.css`**

```bash
git add src/styles/global.css
git commit -m "feat(styles): implement dual-mode semantic design tokens for light and dark"
```

---

### Task 3: Zero-FOUC BaseLayout & ThemeToggle Component

**Files:**
- Create: `src/components/navigation/ThemeToggle.astro`
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/components/navigation/Header.astro`

**Interfaces:**
- Consumes: `localStorage.getItem('theme')`
- Produces: Interactive theme toggle element `#theme-toggle-btn` (and mobile duplicate `#mobile-theme-toggle-btn`) with smooth icon state transition and zero FOUC on page load.

- [ ] **Step 1: Create `src/components/navigation/ThemeToggle.astro`**

```astro
---
interface Props {
  id?: string;
  class?: string;
}

const { id = 'theme-toggle-btn', class: className = '' } = Astro.props;
---

<button
  type="button"
  id={id}
  class={`p-2 rounded-full border border-canvas-border bg-canvas-surface/80 hover:bg-canvas-elevated text-text-secondary hover:text-text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-accent-himalaya flex items-center justify-center ${className}`}
  aria-label="Toggle color theme"
  title="Switch between Light and Dark mode"
>
  <!-- Sun Icon (visible in Dark mode to switch to Light) -->
  <svg
    class="w-4 h-4 hidden dark-icon"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="4" />
    <path stroke-linecap="round" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41m14.14-14.14l-1.41 1.41" />
  </svg>

  <!-- Moon Icon (visible in Light mode to switch to Dark) -->
  <svg
    class="w-4 h-4 block light-icon"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M21.752 15.002A9.72 9.72 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
    />
  </svg>
</button>

<script>
  function setupThemeToggle(btnId: string) {
    const btn = document.getElementById(btnId);
    if (!btn) return;

    function updateIcons() {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const darkIcons = btn.querySelectorAll('.dark-icon');
      const lightIcons = btn.querySelectorAll('.light-icon');

      if (currentTheme === 'dark') {
        darkIcons.forEach((el) => el.classList.remove('hidden'));
        lightIcons.forEach((el) => el.classList.add('hidden'));
      } else {
        darkIcons.forEach((el) => el.classList.add('hidden'));
        lightIcons.forEach((el) => el.classList.remove('hidden'));
      }
    }

    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('theme', nextTheme);
      window.dispatchEvent(new CustomEvent('theme-change', { detail: { theme: nextTheme } }));
      updateIcons();
    });

    window.addEventListener('theme-change', updateIcons);
    updateIcons();
  }

  setupThemeToggle('theme-toggle-btn');
  setupThemeToggle('mobile-theme-toggle-btn');
</script>
```

- [ ] **Step 2: Update `src/layouts/BaseLayout.astro`**

In `src/layouts/BaseLayout.astro`:
- Add the inline script in `<head>`.
- Update `<body>` classes from hardcoded `#0b0d10` to `bg-canvas-bg text-text-primary`.

```astro
---
import Header from '../components/navigation/Header.astro';
import Footer from '../components/navigation/Footer.astro';
import SEOHead from '../components/seo/SEOHead.astro';
import '../styles/global.css';

interface Props {
  title: string;
  description: string;
  image?: string;
  canonicalURL?: string;
  type?: 'website' | 'article' | 'product';
  jsonLd?: Record<string, any>;
}

const { title, description, image, canonicalURL, type, jsonLd } = Astro.props;
---

<!doctype html>
<html lang="en" class="scroll-smooth">
  <head>
    <meta name="color-scheme" content="light dark" />
    <script is:inline>
      {
        const saved = localStorage.getItem('theme');
        const theme = saved ? saved : 'light';
        document.documentElement.setAttribute('data-theme', theme);
      }
    </script>
    <SEOHead
      title={title}
      description={description}
      image={image}
      canonicalURL={canonicalURL}
      type={type}
      jsonLd={jsonLd}
    />
  </head>
  <body class="bg-canvas-bg text-text-primary font-sans antialiased min-h-screen flex flex-col">
    <!-- Accessibility Skip Link -->
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-accent-himalaya text-white font-semibold text-xs tracking-wider uppercase rounded"
    >
      Skip to main content
    </a>

    <Header />

    <main id="main-content" class="flex-grow pt-20">
      <slot />
    </main>

    <Footer />
  </body>
</html>
```

- [ ] **Step 3: Update `src/components/navigation/Header.astro`**

Integrate `ThemeToggle` component into desktop header actions and mobile menu drawer; replace hardcoded border/background classes with semantic tokens (`glass-panel`, `border-canvas-border`, `text-text-primary`, `text-text-secondary`).

- [ ] **Step 4: Run test to verify Task 1 tests pass**

Run: `npm test`
Expected: PASS on all tests in `tests/theme.test.mjs` and `tests/validation.test.mjs`.

- [ ] **Step 5: Commit changes**

```bash
git add src/components/navigation/ThemeToggle.astro src/layouts/BaseLayout.astro src/components/navigation/Header.astro
git commit -m "feat(theme): add zero-FOUC theme switcher and responsive header integration"
```

---

### Task 4: Card Components Refactoring (Expeditions, Stories, Photography, Footer)

**Files:**
- Modify: `src/components/expeditions/ExpeditionCard.astro`
- Modify: `src/components/stories/StoryCard.astro`
- Modify: `src/components/photography/PhotoGrid.astro`
- Modify: `src/components/navigation/Footer.astro`

**Interfaces:**
- Consumes: `--color-canvas-elevated`, `--color-canvas-border`, `--color-text-primary`, `--color-text-secondary`, `--color-text-muted`
- Produces: Fine-art gallery card presentations with elevated surfaces, tactile hover micro-interactions, and clear contrast in both light and dark.

- [ ] **Step 1: Refactor `ExpeditionCard.astro`**
  - Update card container from `bg-[#12151b] border-white/5` to `bg-canvas-elevated border border-canvas-border card-hover-border`.
  - Update headings to `text-text-primary`, descriptions to `text-text-secondary`.
  - Update pills (difficulty, season, group size) to `bg-canvas-surface text-text-secondary border-canvas-border`.

- [ ] **Step 2: Refactor `StoryCard.astro`**
  - Update card container to `bg-canvas-elevated border border-canvas-border card-hover-border`.
  - Update typography and metadata badges to semantic colors.

- [ ] **Step 3: Refactor `PhotoGrid.astro`**
  - Update caption overlays and hover vignette.
  - In light mode, ensure photographer badges and EXIF tags are crisp and legible.

- [ ] **Step 4: Refactor `Footer.astro`**
  - Update footer wrapper from `bg-[#08090b] border-white/5` to `bg-canvas-surface border-t border-canvas-border`.
  - Ensure links and brand marks use `text-text-secondary hover:text-text-primary`.

- [ ] **Step 5: Run validation and commit**

```bash
npm test
git add src/components/expeditions/ExpeditionCard.astro src/components/stories/StoryCard.astro src/components/photography/PhotoGrid.astro src/components/navigation/Footer.astro
git commit -m "feat(components): adapt cards, photo grid, and footer to fine-art light design"
```

---

### Task 5: Interactive Forms & Commercial Calculator Refactoring

**Files:**
- Modify: `src/components/forms/InquiryForm.astro`
- Modify: `src/components/commercial/LicensingCalculator.astro`

**Interfaces:**
- Consumes: Form inputs, selects, radio groups, sliders.
- Produces: Theme-adaptive interactive tools with clear borders, accessible focus outlines, and fine-art summary cards.

- [ ] **Step 1: Refactor `InquiryForm.astro`**
  - Replace `bg-[#12151b] border-white/10 text-white` on inputs and selects with `bg-canvas-surface border border-canvas-border text-text-primary focus:ring-accent-himalaya`.
  - Ensure placeholder text uses `text-text-muted`.
  - Success message banner styled cleanly in both modes.

- [ ] **Step 2: Refactor `LicensingCalculator.astro`**
  - Replace dark container boxes with `bg-canvas-elevated border border-canvas-border`.
  - Style tier selector options and summary quote cards with clear light/dark contrast.

- [ ] **Step 3: Run validation and commit**

```bash
npm test
git add src/components/forms/InquiryForm.astro src/components/commercial/LicensingCalculator.astro
git commit -m "feat(ui): update inquiry forms and licensing calculator for dual theme"
```

---

### Task 6: Page Templates Polishing (Home, Expeditions, Stories, Explore, About, Contact)

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/pages/expeditions/index.astro`
- Modify: `src/pages/expeditions/[slug].astro`
- Modify: `src/pages/stories/index.astro`
- Modify: `src/pages/stories/[slug].astro`
- Modify: `src/pages/explore/[category].astro`
- Modify: `src/pages/explore/photograph/[id].astro`
- Modify: `src/pages/commercial/index.astro`
- Modify: `src/pages/about.astro`
- Modify: `src/pages/contact.astro`
- Modify: `src/pages/404.astro`

**Interfaces:**
- Consumes: Semantic tokens and page components.
- Produces: Consistent fine-art gallery aesthetic across every route.

- [ ] **Step 1: Update `src/pages/index.astro`**
  - Section 1 (Hero): Retain photography power, update subtitle and tags.
  - Section 2 (Portfolio): Change `bg-[#0b0d10]` to `bg-canvas-bg border-canvas-border`. Category filter pills adapt to `bg-canvas-surface border-canvas-border text-text-secondary`.
  - Section 3 (Stories): Change `bg-[#0e1117]` to `bg-canvas-surface border-canvas-border`.
  - Section 4 (The Marga Method): Change `bg-[#0b0d10]` to `bg-canvas-bg`. Numbered value cards change to `bg-canvas-elevated border-canvas-border`.
  - Section 5 (Flagship Expeditions): Change `bg-[#0e1117]` to `bg-canvas-surface`.
  - Section 6 (Inquiry): Change `bg-[#0b0d10]` to `bg-canvas-bg`.

- [ ] **Step 2: Update remaining pages**
  - Update `about.astro`, `contact.astro`, `commercial/index.astro`, `expeditions/index.astro`, `expeditions/[slug].astro`, `stories/index.astro`, `stories/[slug].astro`, `explore/[category].astro`, `explore/photograph/[id].astro`, and `404.astro`.
  - Replace hardcoded `bg-[#0b0d10]`, `bg-[#12151b]`, `bg-[#0e1117]`, `border-white/5` with semantic utility classes `bg-canvas-bg`, `bg-canvas-surface`, `bg-canvas-elevated`, `border-canvas-border`.

- [ ] **Step 3: Run validation and build**

```bash
npm test
npm run build
```
Expected: Build succeeds with 0 errors.

- [ ] **Step 4: Commit changes**

```bash
git add src/pages/
git commit -m "feat(pages): upgrade all page templates with fine-art design system and semantic tokens"
```

---

### Task 7: End-to-End Visual Verification in Browser

**Files:**
- None (verification task)

- [ ] **Step 1: Start Astro server in background**

```bash
astro dev --background
```

- [ ] **Step 2: Use browser subagent to verify visual aesthetics**
  - Verify default Light mode on homepage: check hero, photography grid, method cards, expedition cards, stories, and footer.
  - Click theme toggle button in header: confirm smooth switch to dark mode.
  - Reload page in dark mode: verify zero-FOUC and state persistence.
  - Toggle back to light mode.
  - Check `/expeditions/gokyo-everest-high-himalaya` and `/commercial`.
  - Verify full-screen Lightbox retains cinematic dark presentation.

- [ ] **Step 3: Clean up dev server**

```bash
astro dev stop
```
