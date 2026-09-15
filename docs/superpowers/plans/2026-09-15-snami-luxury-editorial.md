# Snami Travel Luxury Editorial Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform Marga Photography into an Awwwards-caliber luxury editorial portfolio mirroring the layout, typography, navigation, and cinematic motion of snamitravel.com using authentic Himalayan photography and stories.

**Architecture:** Build a modular Astro component architecture with pure modern CSS tokens (Cormorant Garamond serif, Plus Jakarta Sans, obsidian/alabaster contrast), custom vanilla micro-interactions (cross-fades, hover zooms, drawer transitions), and an asymmetrical editorial storytelling flow.

**Tech Stack:** Astro 5+, Tailwind CSS v4 (@tailwindcss/vite), Modern CSS (backdrop-filter, clamp(), CSS animations), Vanilla TypeScript / Client-side JS.

**Spec:** `docs/superpowers/specs/2026-09-15-snami-luxury-editorial-design.md`

## Global Constraints
- Typography: Display headings must use Cormorant Garamond; body must use Plus Jakarta Sans; metadata must use uppercase mono.
- Navigation: Floating translucent navbar with backdrop blur (`backdrop-filter: blur(16px)`), luxury wordmark, animated hamburger, and full-screen split-drawer overlay.
- Motion: Hover zooms must use `transform: scale(1.03)` with `cubic-bezier(0.16, 1, 0.3, 1)`.
- Content integrity: All imagery and stories must come from Marga Photography's genuine Nepal assets (`public/images/` and `src/content/`).
- Mobile responsiveness: All sections must adapt gracefully from mobile screens (<768px) to wide 4K displays (>1920px).

---

### Task 1: Design System & Editorial Typography Tokens

**Files:**
- Modify: `src/styles/global.css`

**Interfaces:**
- Consumes: Tailwind v4 theme engine.
- Produces: CSS custom properties (`--font-editorial`, `--font-serif`), `.theme-btn-editorial`, `.feather-arrow-link`, `.editorial-img-frame`, and keyframes for cross-fades and pulse indicators.

- [ ] **Step 1: Update `global.css` with Google Fonts and luxury tokens**
Add Google Fonts import for `Cormorant Garamond` (300, 400, 500, 600, italic) and define `--font-heading`, `--font-serif`, Snami-style buttons with animated corner borders (`.theme-btn-editorial`), feathered SVG arrows (`.feather-arrow-link`), and smooth cubic-bezier image zoom frames (`.editorial-img-frame`).

- [ ] **Step 2: Verify CSS builds cleanly**
Run: `npm run build`
Expected: PASS with 0 CSS syntax or font resolution errors.

- [ ] **Step 3: Commit**
```bash
git add src/styles/global.css
git commit -m "style: add Cormorant Garamond typography and Snami-style editorial design tokens"
```

---

### Task 2: Snami-Style Translucent Floating Header & Fullscreen Split Drawer

**Files:**
- Modify: `src/components/navigation/Header.astro`

**Interfaces:**
- Consumes: `src/i18n/ui.ts`, `src/components/navigation/ThemeToggle.astro`, `src/components/navigation/LanguageSwitcher.astro`.
- Produces: Floating glass navbar (`#main-navbar`) with luxury serif branding, animated hamburger toggle (`#hamburger-menu-btn`), luxury outline `INQUIRE` pill button, and split overlay menu (`#fullscreen-menu`) with oversized numbered links and right-hand visual masterclass preview.

- [ ] **Step 1: Refactor `Header.astro` layout and split drawer**
Implement:
1. Floating translucent glass bar (`bg-[#0B0D12]/85 backdrop-blur-xl border-b border-white/10`).
2. Luxury serif wordmark: **MARGA** <span class="font-light italic text-[#D4A359]">PHOTOGRAPHY</span>.
3. Coordinates badge: `27°42' N, 85°19' E · KATHMANDU`.
4. Right side: Language switcher, luxury `INQUIRE` pill button, and 3-line animated hamburger button.
5. Split Fullscreen Drawer:
   - Left: Numbered oversized serif navigation links (`01 EXPEDITIONS`, `02 PORTFOLIOS`, `03 STORIES`, `04 PHILOSOPHY`, `05 ABOUT`, `06 CONTACT`).
   - Right: Curated Masterclass preview frame featuring Patrick Frilet & 2026 departure dates.

- [ ] **Step 2: Verify build and accessibility**
Run: `npm run build`
Expected: PASS with zero Astro compilation errors.

- [ ] **Step 3: Commit**
```bash
git add src/components/navigation/Header.astro
git commit -m "feat: implement Snami-style floating glass header and split-screen navigation drawer"
```

---

### Task 3: "WE FRAME EMOTION" Experiential Slide Showcase

**Files:**
- Create: `src/components/photography/ExperientialShowcase.astro`

**Interfaces:**
- Consumes: High-resolution images from `public/images/`.
- Produces: Full-bleed interactive slider with 4 curated thematic slides:
  - Slide 1: `WE FRAME EMOTION` — *"Because feeling is the finest luxury"* (`/images/shaman_apprentice_trance.jpeg`)
  - Slide 2: `SACRED RITUALS UNSEEN` — *"Where time slows and the ancient awakens"* (`/images/bhaktapur_heritage_lamps.jpg`)
  - Slide 3: `THE WILD BENGAL CORRIDORS` — *"In the deep silence of Bardia's riverine forests"* (`/images/bardia_tiger_morning.jpg`)
  - Slide 4: `SOLITUDE AT 5,000 METERS` — *"Light and stone stripped of noise"* (`/images/gokyo_himalaya_sunrise.jpg`)

- [ ] **Step 1: Implement `ExperientialShowcase.astro`**
Create the component with responsive touch/drag and arrow navigation, slide indicators, backdrop blur layer, and Cormorant Garamond typography.

- [ ] **Step 2: Verify component build**
Run: `npm run build`
Expected: PASS with 0 errors.

- [ ] **Step 3: Commit**
```bash
git add src/components/photography/ExperientialShowcase.astro
git commit -m "feat: add 'WE FRAME EMOTION' full-bleed experiential slider component"
```

---

### Task 4: Asymmetrical Editorial Portfolio Grid

**Files:**
- Create: `src/components/photography/EditorialGrid.astro`

**Interfaces:**
- Consumes: `photographs` collection data.
- Produces: Asymmetrical editorial layout with alternating portrait and landscape pairings, full-width break image, smooth hover zoom (`scale(1.03)` with cubic-bezier), Cormorant Garamond serif title, uppercase mono location, EXIF tags, and Lightbox triggers.

- [ ] **Step 1: Create `EditorialGrid.astro`**
Implement the asymmetrical grid architecture with alternating rhythms (1 large vertical + 2 staggered horizontals + 1 full-bleed break) giving photos generous breathing room, hover overlay reveals, and lightbox accessibility tags.

- [ ] **Step 2: Verify component build**
Run: `npm run build`
Expected: PASS.

- [ ] **Step 3: Commit**
```bash
git add src/components/photography/EditorialGrid.astro
git commit -m "feat: create asymmetrical editorial portfolio grid component"
```

---

### Task 5: Interactive Sacred Regions Explorer ("DISCOVER MORE DESTINATIONS")

**Files:**
- Create: `src/components/expeditions/RegionsExplorer.astro`

**Interfaces:**
- Consumes: Regional imagery and expedition routes.
- Produces: Interactive regional list (Upper Mustang, Solukhumbu, Bardia Corridors, Kathmandu Valley, Dhorpatan) where hovering dynamically cross-fades the visual backdrop, reveals coordinates, elevation, and direct expedition links.

- [ ] **Step 1: Create `RegionsExplorer.astro`**
Implement the interactive region list with client-side image swap on hover, graceful fallback for touch devices, and smooth opacity transitions.

- [ ] **Step 2: Verify component build**
Run: `npm run build`
Expected: PASS.

- [ ] **Step 3: Commit**
```bash
git add src/components/expeditions/RegionsExplorer.astro
git commit -m "feat: add interactive sacred regions explorer component"
```

---

### Task 6: Homepage Orchestration & Integration

**Files:**
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `Header.astro`, `EditorialGrid.astro`, `ExperientialShowcase.astro`, `RegionsExplorer.astro`, `Lightbox.astro`, `InquiryForm.astro`.
- Produces: Complete luxury editorial homepage sequence:
  1. 100vh Fullscreen Hero with cross-fade carousel, high-contrast serif title `HIMALAYAN STORYTELLING REDEFINED`, GPS coordinates, bordered CTA `DEFINE YOUR EXPEDITION`, and pulsing scroll line.
  2. Manifesto 1: "BORN IN THE HIMALAYAS. DEFINED BY LIGHT." (Asymmetric dual column with tall portrait on left + narrative and feathered arrow link on right).
  3. Manifesto 2: "FOR THOSE WHO SEE DIFFERENTLY" (Staggered dual portraits flanking centered manifesto).
  4. "WE FRAME EMOTION" Experiential Slide Showcase.
  5. Curated Portfolios (Asymmetrical Editorial Grid).
  6. 2026 Masterclass Expeditions Dossier (Staggered cards for the 4 core expeditions).
  7. "EXPLORE SACRED REGIONS" Interactive Reveal.
  8. Editorial Inquiry Section & Lightbox.

- [ ] **Step 1: Rewrite `src/pages/index.astro` with the complete Snami narrative structure**
Implement all 8 sections with refined typography, responsive layout, and intersection entrance animations.

- [ ] **Step 2: Run automated verification**
Run: `npm run build && npm test`
Expected: Build succeeds with 0 errors and all unit tests pass.

- [ ] **Step 3: Commit**
```bash
git add src/pages/index.astro
git commit -m "feat: assemble Snami-style luxury editorial homepage for Marga Photography"
```
