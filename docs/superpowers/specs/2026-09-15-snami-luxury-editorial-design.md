# Marga Photography: Snami Travel Luxury Editorial Redesign Spec

## 1. Overview & Vision
This specification defines the architectural and frontend transformation of Marga Photography (`margaphotography.netlify.app`) to mirror the luxury, cinematic, and editorial design language of `snamitravel.com` (Awwwards-level standard), specifically tailored for a high-end Himalayan photography collective and masterclass expeditions.

The redesign uses genuine Marga Photography content, high-resolution Himalayan assets, and documentary stories, replacing conventional dense photo grids with high-contrast editorial typography, asymmetrical layouts, cinematic view transitions, and interactive experiential showcases.

## 2. Visual & Architectural Foundation

### 2.1 Typography System
- **Display Headings**: `Cormorant Garamond` (Google Fonts: 300 light, 400 regular, 500 medium, 600 semibold, and italics) with deliberate letter spacing (`letter-spacing: -0.01em` to `-0.02em`).
- **Body & Captions**: `Plus Jakarta Sans` (300 light, 400 regular, 500 medium) in neutral muted tones (`#A1A1AA` in dark mode, `#52525B` in light mode).
- **Metadata & Coordinates**: Monospace font (JetBrains Mono / system mono) with uppercase tracking (`letter-spacing: 0.25em` to `0.35em`, `text-[10px]` to `text-xs`).

### 2.2 Color & Surface Palette
- **Canvas Obsidian (Dark Hero & Breaks)**: `#0B0D12` / `#0E0E10` with subtle border lines `rgba(255, 255, 255, 0.08)`.
- **Canvas Warm Alabaster (Editorial Stories)**: `#FAFAF9` / `#F4F4F2` with slate typography `#18181B`.
- **Accent Brand Tones**:
  - Himalayan Amber / Butter Lamp Gold: `#D4A359` / `#EAB308`
  - Deep Himalayan Sky: `#1E73BE` / `#38BDF8`
  - Bone White: `#F4F4F5`

### 2.3 Motion & Interaction Dynamics
- **Smooth View Transitions**: Fast, fluid scrolling dynamics.
- **Image Hover Zoom**: `transform: scale(1.03)` with `transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)`.
- **Entrance Motion**: CSS animations and IntersectionObserver reveals for staggered text and visual elements.
- **Micro-Interactions**: Animated 3-line luxury hamburger menu, animated corner borders on buttons (`.theme-btn-editorial`), and feathered SVG arrow transitions (`.feather-arrow-link`).

## 3. Component Architecture & Page Layout

### 3.1 Luxury Floating Navigation (`src/components/navigation/Header.astro`)
- Floating sticky bar with `backdrop-filter: blur(16px)` and translucent dark obsidian styling.
- **Left**: Clean brand serif wordmark `MARGA` `PHOTOGRAPHY`.
- **Center**: Coordinates badge `27°42' N, 85°19' E · KATHMANDU`.
- **Right**:
  - Language switcher (`EN / FR`).
  - Signature luxury outline/pill CTA: `INQUIRE` / `REQUEST`.
  - Luxury animated hamburger button.
- **Split-Screen Menu Drawer**:
  - Left column: Numbered oversized serif navigation links (`01 EXPEDITIONS`, `02 PORTFOLIOS`, `03 STORIES`, `04 PHILOSOPHY`, `05 ABOUT`, `06 CONTACT`).
  - Right column: Visual masterclass preview card featuring 2026 departure details and Patrick Frilet mentor bio.

### 3.2 Viewport 100vh Hero Section (`src/pages/index.astro`)
- **Fullscreen Cross-fade Slideshow**: Rotating high-resolution backgrounds:
  - `himalaya_dramatic_sunrise.jpg` (High Himalaya Dawn)
  - `tiji_festival_dance.jpg` (Upper Mustang Sacred Mask Dance)
  - `kham_magar_shaman_phephur.jpg` (Kham Magar Shaman Trance)
- **Overlay Elements**:
  - Top meta: `KATHMANDU · MUSTANG · KHUMBU · BARDIA`
  - Main headline: `HIMALAYAN VISUAL STORYTELLING` / *`Redefined.`*
  - Subtitle: *"Masterclass photography expeditions into sacred rituals, wild tiger corridors, and the high Himalayan sanctuaries that no tour operator reaches."*
  - Luxury button with animated corner brackets: `DEFINE YOUR EXPEDITION`.
  - Elegant vertical pulsing scroll indicator.

### 3.3 Manifesto 1: "BORN IN THE HIMALAYAS. DEFINED BY LIGHT."
- Asymmetric layout with generous vertical margins (`padding: 8rem 0`).
- **Left Frame**: Tall vertical portrait of Mustang Elder (`mustang_monk_portrait.jpg`).
- **Right Column**:
  - Eyebrow: `OUR ETHOS · NEPAL FIELD CRAFT`
  - Headline: High-contrast Cormorant Garamond serif: `BORN IN THE HIMALAYAS.` / `DEFINED BY LIGHT.`
  - Narrative: Devotion to light, patience, and unhurried access rather than fast tourism.
  - Feathered SVG arrow link: `our philosophy →`.

### 3.4 Manifesto 2: "FOR THOSE WHO SEE DIFFERENTLY"
- Staggered dual portraits (Field Master & Wildlife Tracker) flanking a centered poetic manifesto.
- Left image: Patrick Frilet portrait.
- Right image: Senior Shaman practitioner portrait (`burtibang_shaman_dhyangro_elder.jpg`).
- Centered narrative on noticing light, mountain monastery silence, and documentary depth.

### 3.5 "WE FRAME EMOTION" Experiential Slide Showcase
- Full-bleed experiential slider translating Snami Travel's signature feature:
  - Slide 1: `WE FRAME EMOTION` — *"Because feeling is the finest luxury"* (`shaman_apprentice_trance.jpeg`)
  - Slide 2: `SACRED RITUALS UNSEEN` — *"Where time slows and the ancient awakens"* (`bhaktapur_heritage_lamps.jpg`)
  - Slide 3: `THE WILD BENGAL CORRIDORS` — *"In the deep silence of Bardia's riverine forests"* (`bardia_tiger_morning.jpg`)
  - Slide 4: `SOLITUDE AT 5,000 METERS` — *"Light and stone stripped of noise"* (`gokyo_himalaya_sunrise.jpg`)
- Smooth interactive navigation arrows and pagination.

### 3.6 Curated Portfolios (Asymmetrical Editorial Grid)
- Replaces uniform grid with an asymmetrical editorial layout:
  - Staggered portrait and landscape pairs with generous vertical spacing.
  - Full-width break image (`dhorpatan_valley_landscape.jpg` or `annapurna_range.jpg`).
  - Subtle hover zoom and metadata overlay (title in Cormorant serif, location in mono, camera EXIF tag).
  - Lightbox integration preserved.

### 3.7 2026 Masterclass Expeditions Dossier
- Staggered editorial cards highlighting the 4 core itineraries:
  - Upper Mustang Tiji Festival
  - Sacred Shamans of Western Nepal
  - Royal Bengal Wildlife Safari (Bardia & Chitwan)
  - Gokyo & Everest High Himalaya Sanctuary
- Tags: `Strictly 4–6 Photographers`, departure dates, and direct inquiry link.

### 3.8 "EXPLORE SACRED REGIONS" Interactive Reveal
- Interactive regional explorer (Upper Mustang, Solukhumbu, Bardia Corridors, Kathmandu Valley, Dhorpatan).
- Hovering smoothly cross-fades the background visuals and displays geographic coordinates and elevation.

### 3.9 Editorial Inquiry & Footer
- Luxury inquiry form and contact channels with refined typography and understated luxury aesthetics.

## 4. Implementation Details & File Modifications

1. `src/styles/global.css`:
   - Add Google Fonts import for `Cormorant Garamond`.
   - Configure luxury font family tokens (`--font-serif`, `--font-heading`).
   - Add custom animations and utilities (`.theme-btn-editorial`, `.feather-arrow-link`, `.editorial-img-frame`, scroll animations).
2. `src/layouts/BaseLayout.astro`:
   - Integrate preloaded fonts and ensure smooth scroll configuration.
3. `src/components/navigation/Header.astro`:
   - Update navbar layout to floating glass bar with luxury wordmark and updated styling.
4. `src/components/photography/EditorialGrid.astro`:
   - New component for asymmetrical editorial photo curation with staggered frames.
5. `src/components/photography/ExperientialShowcase.astro`:
   - New component for the "WE FRAME EMOTION" full-bleed interactive slider.
6. `src/components/expeditions/RegionsExplorer.astro`:
   - New interactive component for regional exploration on hover.
7. `src/pages/index.astro`:
   - Redesigned homepage orchestrating the entire Snami-style flow.

## 5. Verification & Testing
- Run `npm run build` / `astro check` to ensure zero compilation or TypeScript errors.
- Test responsive layout across mobile (<768px), tablet (768px–1024px), and desktop (>1024px).
- Verify smooth hover transitions, lightbox interactions, and full-screen menu drawer open/close.
