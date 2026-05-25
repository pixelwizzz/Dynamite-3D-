# 🌶️ Doritos Dinamita — Fiery Lime and Chilli | Cinematic Scroll Showcase

> A hyper-immersive, scroll-driven cinematic product showcase built with **Next.js 16**, **Lenis**, and **HTML5 Canvas**. Scroll through 64 frames of the Dinamita cinematic advertisement — like controlling a live commercial.

---

## 🎬 Preview

The experience consists of **5 cinematic chapters**, each triggered by scroll position:

| Chapter | Theme | Color |
|---------|-------|-------|
| **Hero** | DINAMITA — Dark opener | 🔴 Fire red |
| **Ignite Your Senses** | Product explosion reveal | 🟢 Neon lime |
| **Flavor Experience** | Macro chip texture | 🟣 Electric purple |
| **Crunch Showcase** | Sound wave + roll anatomy | 🟠 Fiery orange |
| **Unleash the Crunch** | Final CTA billboard | 🔴🟢 Fire + lime |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install & Run

```bash
# Navigate to the app directory
cd app

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

---

## ✨ Features

### 🎞️ Scroll-Driven Frame Animation
- **64 JPG frames** preloaded into memory on mount for zero-latency playback
- Scroll progress linearly maps to frame index — smooth, stutter-free
- **Cover-fit scaling** adapts to any viewport, with subtle parallax X-shift
- Cinematic **vignette overlay** rendered via `createRadialGradient`

### 🔥 Particle System (3 Types)
| Type | Color | Trigger |
|------|-------|---------|
| **Ember sparks** | Orange/Red with white hot core | Scroll velocity |
| **Lime mist** | Neon green glow | Ambient |
| **Seasoning dust** | Gold rectangles | Ambient |

### 📖 Section Text Overlays
- 5 independently animated overlay panels
- Each fades in (0→20%), holds (20→80%), fades out (80→100%) of its section range
- Alternating left / right / center layouts for cinematic storytelling rhythm

### 🌊 Smooth Scrolling
- **Lenis** v1.3 for buttery smooth momentum scroll (duration: 1.4s)
- Exponential easing curve for cinematic deceleration

### 📊 Progress Bar
- Fire-gradient (red → orange → gold) bar at canvas bottom
- Updates with a passive scroll listener for performance

### 🔊 Sound Wave Visualizer
- Multi-frequency animated canvas waveform in the Crunch section
- Color zones: red → orange → lime across 80 animated bars

---

## 🎨 Design System

### Color Palette

| Token | Hex | Use |
|-------|-----|-----|
| `--fiery-red` | `#FF2D00` | Primary brand, sparks |
| `--fiery-orange` | `#FF6B1A` | Secondary heat |
| `--lime-green` | `#39FF14` | Lime flavor, neon accents |
| `--electric-yellow` | `#FFD700` | Seasoning dust, gold accents |
| `--vivid-purple` | `#A855F7` | Flavor section accent |
| `--dark-bg` | `#050508` | Page background |

### Typography

| Role | Font | Weight |
|------|------|--------|
| Display | Bebas Neue | 400 |
| Heading | Barlow Condensed | 900 |
| Body | Inter | 300–500 |

---

## 🛠️ Tech Stack

| Technology | Version | Role |
|-----------|---------|------|
| [Next.js](https://nextjs.org/) | 16.2.6 | React framework + routing |
| [React](https://react.dev/) | 19.2 | UI layer |
| [Lenis](https://lenis.darkroom.engineering/) | 1.3.23 | Smooth scroll |
| [Tailwind CSS](https://tailwindcss.com/) | v4 | Utility styling |
| [TypeScript](https://www.typescriptlang.org/) | 5 | Type safety |
| HTML5 Canvas | — | Frame playback + particles |
| Three.js / R3F | 0.184 / 9.6 | Available for 3D extensions |
| Framer Motion | 12.40 | Available for micro-animations |
| GSAP | 3.15 | Available for timeline animations |

---

## 📋 Scripts

```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## 📸 Frame Sequence Info

| Property | Value |
|----------|-------|
| Total Frames | 64 |
| Format | JPG |
| Source | Doritos Dinamita cinematic advertisement |
| Naming | `ezgif-frame-001.jpg` → `ezgif-frame-064.jpg` |
| Location | `public/frames/` |

**Scroll timeline mapping:**
- Frames 1–10 → Dark moody opener (product reveal)
- Frames 10–32 → Product explosion with fire embers
- Frames 32–50 → Macro chip texture close-ups
- Frames 50–58 → Flying chips with lime mist
- Frames 58–64 → "UNLEASH THE FIERY CRUNCH" finale

---

## 📄 License

This project is created for demonstration and portfolio purposes.  
Doritos® and Dinamita® are registered trademarks of Frito-Lay, Inc.

---

*Built with 🌶️ and a lot of scroll testing.*
