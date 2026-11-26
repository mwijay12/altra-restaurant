# Altra 🔥

**Bold flavour, delivered fast.** A premium, award-tier food delivery experience for Dar es Salaam — built as a living showcase of modern interaction design.

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 15 (App Router) + TypeScript |
| Styling | Tailwind CSS v4 (CSS-first `@theme`) + shadcn-style UI primitives |
| Animation | GSAP 3 (ScrollTrigger + SplitText + DrawSVG + MotionPath), Framer Motion, tw-animate-css |
| Smooth scroll | Lenis (wired into the GSAP ticker) |
| Scroll cinema | Pinned scroll-scrubbed video section (GSAP animates `video.currentTime`) |
| SVG motion | Self-drawing curves, section dividers and food icons (DrawSVG + MotionPath) |
| Carousel | Swiper (fade + autoplay) |
| Fonts | Playfair Display Variable + Inter Variable via Fontsource (no external font CDN) |

## Pages

- **/** — FlavourHero full-viewport flavour slider (pastel flood colours, giant Playfair word behind the dish, bobbing cut-out food at parallax depths, measured 970ms panel-wipe transitions, autoplay/swipe/tabs) + crossing marquee strips, bento features with self-drawing SVG icons + scroll-drawn wave, pinned horizontal dish scroller, scroll-scrubbed "Watch us cook" video section, testimonial carousel
- **/menu** — filterable animated dish grid (layout animations, TZS pricing)
- **/about** — parallax brand story, count-up stats, values, CTA

## Signature details

- **Orange curtain page transitions** — two Framer Motion panels wipe over every internal navigation (App-Router-native take on the Barba.js pattern — Barba targets classic MPAs, so we reproduce the wipe with `router.push()` + animation controls).
- **GSAP SplitText** letter-by-letter hero reveal, timed to `document.fonts.ready`.
- **Magnetic buttons**, **3D tilt glass cards**, **image parallax** — all GSAP `quickTo`.
- **DrawSVG motion** — curvy wave/swoop/infinity lines draw themselves on scroll (with a MotionPath dot riding along), section dividers self-draw, and the feature icons (clock/leaf/store) sketch themselves in stroke-by-stroke.
- **Scroll-scrubbed video** — the "Watch us cook" section pins to the viewport; scrolling plays the clip frame by frame and rewinds on scroll-up. Licensed clips are hotlinked from Mixkit's CDN (Stock Video Free License, commercial use).
- **`prefers-reduced-motion`** respected everywhere; Lenis skipped entirely for reduced-motion users; scrub video freezes on its poster frame.
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
  sections/             flavour-hero (full-viewport slider), navbar, hero (legacy), marquee, features, popular-dishes,
                        testimonials, sticky-cta, footer, menu-grid, about-content
  three/                (removed — particle field dropped for a cleaner hero)
  layout/               smooth-scroll (Lenis), transition-provider, transition-link
lib/                    gsap (registered plugins), lenis singleton, data, utils
```

## Scripts

```bash
npm run dev      # local dev
npm run build    # production build
npm start        # serve the production build
```
