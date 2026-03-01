# VØID — Wear The Silence

A cinematic, story-driven luxury fashion brand website. Built for dark aesthetics, editorial pacing, and immersive scroll experiences.

---

## Overview

VØID is a high-fidelity marketing website for a premium clothing label. Every section is driven by scroll-triggered animation, with a focus on typographic restraint, parallax depth, and a distinctly editorial tone.

**Live sections:**

- Cinematic hero with parallax background and animated headline
- Infinite marquee ticker
- Scrub-reveal manifesto statement
- 5-product collection grid with stagger animation
- Horizontally-scrolling brand story (4 chapters, pinned)
- Craft / philosophy section with parallax image and animated stats
- Newsletter / contact section
- Full footer

---

## Tech Stack

| Package                  | Version | Role                                     |
| ------------------------ | ------- | ---------------------------------------- |
| **React**                | 18.3.1  | Component framework                      |
| **Vite**                 | 5.4.1   | Build tool and dev server                |
| **GSAP + ScrollTrigger** | 3.12.5  | All animations, scroll-pinning, parallax |
| **@gsap/react**          | 2.1.1   | GSAP context and React integration       |
| **Lenis**                | 1.1.14  | Smooth inertia scrolling                 |
| **SplitType**            | 0.3.4   | Character and word-level text splitting  |

### Typography (Google Fonts)

| Font                   | Use                                     |
| ---------------------- | --------------------------------------- |
| **Cinzel**             | Display headings — architectural, roman |
| **Cormorant Garamond** | Body and editorial italic               |
| **Space Mono**         | Labels, counters, monospace UI          |

### Color System

```css
--void-black: #080808 /* Page background              */ --cream: #f0ebe0
  /* Primary text                 */ --gold: #c9a96e
  /* Accent — borders, highlights */ --scarlet: #b5302a
  /* Secondary accent             */;
```

---

## Project Structure

```
void-brand-v2/
├── index.html                  # Google Fonts, root mount
├── vite.config.js
├── public/
└── src/
    ├── main.jsx                # Vite entry
    ├── App.jsx                 # Lenis init, section composition
    ├── index.css               # All global styles (~1300 lines)
    ├── assets/
    ├── components/
    │   ├── Cursor.jsx          # Custom cursor — diamond dot, gold ring, royal accents
    │   ├── Loader.jsx          # Intro loader with progress bar
    │   ├── Navbar.jsx          # Fixed nav — glassmorphism on scroll, hamburger menu
    │   └── Footer.jsx
    └── sections/
        ├── Hero.jsx            # Parallax hero, SplitType char animation, CTA
        ├── Marquee.jsx         # Infinite GSAP ticker
        ├── Manifesto.jsx       # Scrubbed word-by-word reveal
        ├── Collection.jsx      # 5-product grid with stagger
        ├── Story.jsx           # Horizontal scroll — 4 brand story panels
        ├── Philosophy.jsx      # Craft section — parallax image, animated stats
        └── Newsletter.jsx      # Email capture section
```

---

## Getting Started

**Prerequisites:** Node.js 18+, npm 9+

```bash
# Install dependencies
npm install

# Start development server (http://localhost:5173)
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview
```

---

## Animation Architecture

```
Page Load
└── Loader fades in → progress bar fills over ~2s
    └── Loader slides up → Hero and site fade in
        └── ScrollTrigger.refresh() called after mount

Hero
├── Eyebrow line slides up
├── Headline characters cascade in (SplitType)
├── Sub-copy fades up, CTA buttons rise
├── Image panel clips in from the right
└── Parallax on scroll (GSAP ScrollTrigger)

Marquee
└── GSAP infinite horizontal loop — pauses on hover

Manifesto
└── Each word transitions from 0.08 → 1 opacity as you scrub

Collection
└── Cards stagger into viewport with fade + translate

Story (Horizontal Scroll)
├── GSAP ScrollTrigger pins the section
├── 4 panels advance horizontally
├── Background images animate with opposing xPercent parallax
└── Title and body copy animate per panel

Philosophy
├── Image moves at ~0.3x scroll speed (parallax)
└── Stats count up on viewport entry

Navbar
├── Transparent on top of page
├── Glassmorphism (backdrop-filter blur) kicks in past 80px scroll
└── Hamburger menu → fullscreen overlay with clip-path reveal (mobile)

Cursor
├── Diamond-shaped center dot — snappy follow
├── Thin gold outer ring — graceful lag
├── Rotating inner ring with cardinal diamond accents
└── Cinzel label appears on interactive elements
```

---

## Customization

### Brand Identity

| Item         | File                       | What to change        |
| ------------ | -------------------------- | --------------------- |
| Brand name   | All files                  | Find & replace `VØID` |
| Tagline      | `Navbar.jsx`, `Footer.jsx` | `"Wear The Silence"`  |
| Accent color | `index.css` `:root`        | `--gold`              |
| Background   | `index.css` `:root`        | `--void-black`        |

### Content

| Section    | File             | Editable data                                      |
| ---------- | ---------------- | -------------------------------------------------- |
| Hero       | `Hero.jsx`       | Headline, sub-copy, background image URL           |
| Manifesto  | `Manifesto.jsx`  | Brand statement copy                               |
| Collection | `Collection.jsx` | `products` array — name, price, tag, image URL     |
| Story      | `Story.jsx`      | `panels` array — title, body, background image URL |
| Philosophy | `Philosophy.jsx` | `stats` array, craft copy, image URL               |

### Fonts

1. Update the Google Fonts URL in `index.html`
2. Update `--font-display`, `--font-body`, `--font-mono` in `index.css`

---

## Deployment

The output is a fully static site with no server requirements.

```bash
npm run build
# Outputs to /dist — deploy to any static host
```

Tested on: **Vercel**, **Netlify**, **Cloudflare Pages**

For Vercel and Netlify, set the build command to `npm run build` and the publish directory to `dist`. No additional configuration required.

---

## Browser Support

| Feature           | Requirement                            |
| ----------------- | -------------------------------------- |
| `backdrop-filter` | Chrome 76+, Safari 9+, Firefox 103+    |
| `clip-path`       | All modern browsers                    |
| Custom cursor     | Desktop only (hidden on touch devices) |

---

## License

Private client project. All rights reserved.
