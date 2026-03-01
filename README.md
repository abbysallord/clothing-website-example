# VØID — Clothing Brand Website

A story-driven, cinematic clothing brand website built with React + Vite + GSAP.

## Tech Stack

| Tool | Purpose |
|------|---------|
| **React 18** | Component framework |
| **GSAP 3 + ScrollTrigger** | All animations, scroll-pinning, parallax |
| **Lenis** | Ultra-smooth scroll |
| **SplitType** | Text splitting for character/word animations |
| **Vite** | Build tool |

## Setup

```bash
# 1. Copy these files into your Vite project (or use as-is)
npm install

# 2. Start dev server
npm run dev

# 3. Build for production
npm run build
```

## Adding Your Images

The site uses placeholder divs where images go. Replace them as follows:

### Hero Image
In `src/sections/Hero.jsx`, find:
```jsx
<div className="hero__image-placeholder">
  {/* Replace with: <img src="/your-model-photo.jpg" alt="VØID Collection" /> */}
```
Replace the comment with your actual image tag. Use a portrait-orientation photo of your model/product.

### Product Images
In `src/sections/Collection.jsx`, each card has:
```jsx
{/* Drop in: <img src={`/products/product-${index+1}.jpg`} alt={product.name} /> */}
```
Place your product photos in `/public/products/` named `product-1.jpg` through `product-5.jpg`.

### Philosophy Image
In `src/sections/Philosophy.jsx`:
```jsx
{/* Replace with: <img src="/philosophy.jpg" alt="VØID Craft" /> */}
```

## Customization

### Brand Name
Find & replace `VØID` with your brand name throughout. The Ø is intentional — swap it out.

### Colors
Edit `src/index.css` `:root` variables:
```css
:root {
  --void-black: #080808;    /* Background */
  --cream: #f0ebe0;          /* Primary text */
  --gold: #c9a96e;           /* Accent color — change this first */
  --scarlet: #b5302a;        /* Secondary accent */
}
```

### Products
Edit the `products` array in `src/sections/Collection.jsx`.

### Story Panels
Edit the `panels` array in `src/sections/Story.jsx`.

### Fonts
Currently uses:
- **Playfair Display** — Headlines (dramatic, luxury serif)
- **Cormorant Garamond** — Body (elegant, editorial)
- **Space Mono** — Labels/UI (technical contrast)

Change in `index.html` (Google Fonts link) and `index.css` font variables.

## Animation Architecture

```
Page Load
  └── Loader (2s progress bar)
      └── Slide up exit → site fades in

Hero Section
  └── Eyebrow slides in → Title chars cascade → Sub fades → CTA rises
  └── Visual panel clips in from right
  └── Continuous parallax on scroll

Marquee
  └── GSAP infinite loop (pauses on hover)

Manifesto
  └── Words fade in as you scroll (scrubbed)

Collection Grid
  └── Cards stagger in as they enter viewport

Story (Horizontal Scroll)
  └── GSAP ScrollTrigger pins section
  └── 4 panels scroll horizontally
  └── Title/body animate per panel

Philosophy
  └── Image parallax (moves at 0.15x scroll speed)
  └── Stats count up on enter

Newsletter
  └── Title chars cascade in on scroll
```

## Deployment

Works out of the box on Vercel, Netlify, or any static host.

```bash
npm run build
# Deploy /dist folder
```

## Replacing "Mock" Brand with Yours

1. **Name**: Replace all `VØID` instances
2. **Tagline**: Change "Wear The Silence" in `Navbar.jsx` and `Footer.jsx`
3. **Collections**: Update product names/prices in `Collection.jsx`
4. **Manifesto**: Rewrite copy in `Manifesto.jsx`
5. **Story panels**: Rewrite the 4 brand story chapters in `Story.jsx`
6. **Philosophy**: Update stats and copy in `Philosophy.jsx`
