# Marga Photography

Specialist Nepal photography expeditions, masterclasses, and fine art visual storytelling collective supported by the logistical infrastructure of [Marga Adventure](https://margaadventure.com).

---

## 🌟 Key Features

- **Modern Theme & Typography**: Custom design system styled to mirror `margaadventure.com` featuring `Plus Jakarta Sans` display headings, `Montserrat` body copy, and signature Azure Blue (`#1e73be`).
- **Bilingual Internationalization (i18n)**: Native Astro i18n routing (`/` for English, `/fr` for French) with an interactive `EN | FR` toggle in both the top navbar and the full-screen drawer.
- **Marga Adventure Signature Navigation**:
  - Transparent-to-frosted glass scroll header.
  - Staggered animated hamburger icon.
  - Full-screen split overlay menu with interactive expedition highlight card.
- **Zero Pricing / Curated Inquiries**: Clean, luxury presentation without transactional pricing tags—direct dispatch inquiry workflows for bespoke private fixers and small-group masterclasses (strictly 4–6 photographers).
- **Dark / Light Mode**: Instant zero-FOUC theme switching with curated color tokens.
- **Accessibility & Performance**: 100% responsive down to 375px mobile viewports, semantic HTML5, Schema.org JSON-LD structured data.

---

## 🛠️ Tech Stack

- **Framework**: [Astro 5](https://astro.build)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) + Custom Semantic CSS Design Tokens
- **Adapter**: `@astrojs/node`
- **Testing**: Node.js native test runner (`node --test`)

---

## 🚀 Quick Start

### Development

```bash
npm install
npm run dev
```

The site will start locally at `http://localhost:4321`.

### Build & Preview

```bash
npm run build
npm run preview
```

### Run Tests

```bash
npm test
```

---

## 📁 Project Structure

```text
├── public/
│   ├── images/          # Curated high-resolution photography assets
│   ├── favicon.svg      # Mountain aperture brand icon
│   └── robots.txt       # SEO crawler rules
├── src/
│   ├── components/      # Navigation, forms, photography, expeditions
│   ├── content/         # Markdown collections (expeditions, stories, photographers)
│   ├── i18n/            # Translation dictionary and language helpers
│   ├── layouts/         # BaseLayout with theme tokens & metadata
│   ├── pages/           # Static routes (English default, /fr for French)
│   └── styles/          # Global styles & design system tokens
└── tests/               # Unit, contract, and validation tests
```

---

## 📄 License

All photographs and visual media are rights-reserved by their respective contributing artists. Code is maintained by Marga Photography & Marga Adventure.
