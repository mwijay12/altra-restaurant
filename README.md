# Altra 🔥

**Bold flavour, delivered fast.** A premium, award-tier food delivery experience for Dar es Salaam — built as a living showcase of modern interaction design.

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 15 (App Router) + TypeScript |
| Styling | Tailwind CSS v4 (CSS-first `@theme`) + shadcn-style UI primitives |
| Animation | GSAP 3 (ScrollTrigger + SplitText), Framer Motion, tw-animate-css |
| Smooth scroll | Lenis (wired into the GSAP ticker) |
| 3D | Three.js / React Three Fiber — lazy-loaded particle field |
| Carousel | Swiper (fade + autoplay) |
| Fonts | Playfair Display Variable + Inter Variable via Fontsource (no external font CDN) |

## Pages

- **/** — FloatingFoodHero + particle field, crossing marquee strips, bento features (tilt glass cards), pinned horizontal-scroll dishes with image parallax, testimonial carousel, sticky CTA
- **/menu** — filterable animated dish grid (layout animations, TZS pricing)
- **/about** — parallax brand story, count-up stats, values, CTA

## Signature details

- **Orange curtain page transitions** — two Framer Motion panels wipe over every internal navigation (App-Router-native take on the Barba.js pattern — Barba targets classic MPAs, so we reproduce the wipe with `router.push()` + animation controls).
- **GSAP SplitText** letter-by-letter hero reveal, timed to `document.fonts.ready`.
- **Magnetic buttons**, **3D tilt glass cards**, **image parallax** — all GSAP `quickTo`.
- **`prefers-reduced-motion`** respected everywhere; particle field disabled on mobile + reduced motion; Lenis skipped entirely for reduced-motion users.
- **Dark mode** via class strategy with a no-flash inline boot script.
- Prices in **TZS** (`Intl.NumberFormat("en-TZ")`), Tanzanian neighbourhoods, local flavour throughout.

## Structure

```
app/
  layout.tsx            Lenis + transition provider + fonts + metadata
  page.tsx              Home
  menu/page.tsx         Menu
  about/page.tsx        About
  globals.css           Tailwind v4 theme, keyframes, utilities
components/
  ui/                   button, badge, magnetic, hero-section-7 (FloatingFoodHero)
  demo/                 hero-section-7-demo (content wiring for the hero)
  sections/             navbar, hero, marquee, features, popular-dishes,
                        testimonials, sticky-cta, footer, menu-grid, about-content
  three/                particle-field (R3F canvas)
  layout/               smooth-scroll (Lenis), transition-provider, transition-link
lib/                    gsap (registered plugins), lenis singleton, data, utils
```

## Scripts

```bash
npm run dev      # local dev
npm run build    # production build
npm start        # serve the production build
```
