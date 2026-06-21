# Rana Faraz Ahmed — Portfolio

An extraordinary, animation-rich single-page portfolio for **Rana Faraz Ahmed**
— Head of AI & Engineering Leader · CTO · AI/ML Architect.

Built as a static site that deploys to **GitHub Pages** at
<https://ranafaraz.github.io/>.

## ✨ Highlights

- **Interactive 3D hero** — a live neural-network particle constellation
  (React Three Fiber) that drifts and parallaxes toward the cursor.
- **3D skill knowledge-graph** — a rotating cluster cloud (AI/ML, Cloud,
  Engineering, Leadership) with hover highlighting; animated bar fallback on
  touch / reduced-motion.
- **Scroll-storytelling** — GSAP ScrollTrigger timeline, Framer Motion reveals,
  parallax depth, and a scroll-progress indicator.
- **Project case studies** — 3D tilt cards with hover spotlight + animated
  problem → approach → result modals.
- **Custom cursor + magnetic buttons**, animated counters, tech marquee,
  illustrative ROC-curve data-viz, polished loading screen.
- **Light/dark toggle** (dark default) and an optional ambient-sound toggle
  (off by default).
- **Accessible & fast** — honors `prefers-reduced-motion`, keyboard-navigable,
  lazy-loaded WebGL that pauses off-screen, complete SEO + Open Graph + JSON-LD.

## 🧱 Tech stack

React 18 · Vite · TypeScript · Tailwind CSS · @react-three/fiber + drei ·
Three.js · GSAP (ScrollTrigger) · Framer Motion · react-parallax-tilt.

## 🚀 Local development

```bash
npm install        # install dependencies
npm run dev        # start the dev server (http://localhost:5173)
npm run build      # type-check + production build to /dist
npm run preview    # preview the production build locally
npm run lint       # ESLint
npm run format     # Prettier
```

## ✏️ Editing content

**All copy lives in [`src/data/profile.ts`](src/data/profile.ts)** — identity,
about text, skills, projects, experience timeline, publications, credentials and
nav. Edit text there without touching components.

## 🖼️ Regenerating the social preview image

The Open Graph / Twitter preview image is generated from an SVG:

```bash
npm run generate:og   # writes public/og-image.png (1200×630)
```

## 📦 Deploying to GitHub Pages

This repo is the **user site** `ranafaraz.github.io`, served from the domain
root (`base: '/'`).

Automatic deploy is wired up via
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

1. In the repo on GitHub, go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Push to `main`. The workflow runs `npm ci && npm run build`, ensures a
   `.nojekyll` marker, and publishes `/dist` to Pages.
4. The site goes live at <https://ranafaraz.github.io/>.

You can also trigger it manually from the **Actions** tab (workflow_dispatch).

> No server runtime is used — everything is static.

## ✅ TODO before launch (drop-in assets)

These are intentionally left for you to provide; the site degrades gracefully
without them:

- [x] **`/public/profile.jpg`** — headshot added.
- [x] **`/public/Rana_Faraz_Ahmed_CV.pdf`** — CV added (generated from real
      profile data via `node scripts/generate-cv.mjs`). Replace with a bespoke
      PDF anytime — the "Download CV" buttons link to this path.
- [ ] **PFAS paper DOI** — the "Read paper" link on the PFAS research project
      is a TODO slot. Provide the DOI/URL in `src/data/profile.ts`
      (`projects` → `pfas-research` → `link.url`, and remove `todo: true`).
- [ ] *(optional)* Re-run `npm run generate:og` if you tweak hero copy so the
      social preview stays in sync.

## ♿ Accessibility & performance notes

- Reduced-motion users get a calm variant: WebGL and auto-motion are disabled,
  animations collapse, and the skill graph becomes a static animated overview.
- WebGL is lazy-loaded, particle counts are capped, DPR is clamped, and the
  render loop pauses when the canvas is off-screen or the tab is hidden.
- Low-power devices (≤2 cores / ≤1GB) skip 3D entirely and get static gradient
  art.

## 📄 License

© Rana Faraz Ahmed. All rights reserved.
