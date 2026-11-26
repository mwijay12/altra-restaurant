"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { TransitionLink } from "@/components/layout/transition-link";

/**
 * Flavour hero — Altra's take on the Blendy-style full-viewport slider,
 * flooded with the site's OWN brand colours (orange / charcoal / cream /
 * pink). Desktop draws on a 1440×900 design frame; mobile recomposes
 * everything on a 640×700 frame that always fits the viewport — nothing
 * exceeds the screen. Flavour changes play a measured 970ms panel wipe
 * with per-layer parallax. Autoplay 2.6s, paused 6s after interaction.
 */

/* ── Cut-out assets generated & keyed in-sandbox (public/images/food/slides) ── */
const BUILT = new Set([
  "chipsi-hero",
  "chipsi-fry",
  "chipsi-ketchup",
  "chipsi-egg",
  "pilau-hero",
  "pilau-cinnamon",
  "pilau-star-anise",
  "pilau-coriander",
  "wali-hero",
  "wali-tomato",
  "wali-onion",
  "wali-chili",
  "mishkaki-hero",
  "mishkaki-skewer",
  "mishkaki-lemon",
  "mishkaki-pepper",
]);

/* intrinsic pixel sizes of the generated cut-outs (must match the files on disk) */
const DIMS: Record<string, { w: number; h: number }> = {
  "chipsi-hero": { w: 555, h: 730 },
  "chipsi-fry": { w: 560, h: 136 },
  "chipsi-ketchup": { w: 560, h: 551 },
  "chipsi-egg": { w: 560, h: 528 },
  "pilau-hero": { w: 900, h: 448 },
  "pilau-cinnamon": { w: 560, h: 284 },
  "pilau-star-anise": { w: 560, h: 503 },
  "pilau-coriander": { w: 429, h: 559 },
  "wali-hero": { w: 643, h: 643 },
  "wali-tomato": { w: 539, h: 560 },
  "wali-onion": { w: 560, h: 282 },
  "wali-chili": { w: 413, h: 411 },
  "mishkaki-hero": { w: 900, h: 411 },
  "mishkaki-skewer": { w: 560, h: 307 },
  "mishkaki-lemon": { w: 560, h: 291 },
  "mishkaki-pepper": { w: 560, h: 334 },
};

interface Piece {
  n: string;
  x: number;
  y: number;
  w: number;
  rot?: number;
  mirror?: boolean;
}

interface Layout {
  heroW: number;
  floaters: Piece[];
  corners: Piece[];
}

interface SlideDef {
  key: string;
  word: string;
  /** flood colour — always one of Altra's own brand colours */
  bg: string;
  /** text/UI ink on top of the flood (white on dark floods, charcoal on light) */
  ink: string;
  /** colour of the logo dot */
  dot: string;
  layout: Layout;
  /** compact recomposition on the 640×700 mobile frame — everything fits */
  mobile: Layout;
}

const SLIDE_DEFS: SlideDef[] = [
  {
    key: "chipsi",
    word: "Chipsi",
    bg: "#FF5C00", // Altra orange
    ink: "#FFFFFF",
    dot: "#FFF8F0",
    layout: {
      heroW: 330,
      floaters: [
        { n: "chipsi-fry", x: 330, y: 190, w: 205, rot: -24 },
        { n: "chipsi-egg", x: 1105, y: 400, w: 175, rot: 10 },
        { n: "chipsi-ketchup", x: 230, y: 470, w: 160, rot: -12 },
        { n: "chipsi-fry", x: 985, y: 580, w: 215, rot: 18, mirror: true },
      ],
      corners: [
        { n: "chipsi-egg", x: -30, y: 590, w: 250, rot: -25 },
        { n: "chipsi-ketchup", x: 1270, y: 25, w: 225, rot: 15 },
      ],
    },
    mobile: {
      heroW: 225,
      floaters: [
        { n: "chipsi-fry", x: 84, y: 128, w: 118, rot: -24 },
        { n: "chipsi-egg", x: 468, y: 250, w: 96, rot: 10 },
        { n: "chipsi-ketchup", x: 58, y: 392, w: 92, rot: -12 },
        { n: "chipsi-fry", x: 486, y: 468, w: 118, rot: 18, mirror: true },
      ],
      corners: [
        { n: "chipsi-egg", x: -50, y: 540, w: 135, rot: -20 },
        { n: "chipsi-ketchup", x: 552, y: 48, w: 120, rot: 12 },
      ],
    },
  },
  {
    key: "pilau",
    word: "Pilau",
    bg: "#1A1A1A", // Altra charcoal
    ink: "#FFF8F0",
    dot: "#FF5C00",
    layout: {
      heroW: 520,
      floaters: [
        { n: "pilau-star-anise", x: 355, y: 150, w: 125, rot: -15 },
        { n: "pilau-cinnamon", x: 1005, y: 225, w: 195, rot: 8, mirror: true },
        { n: "pilau-coriander", x: 280, y: 455, w: 120, rot: 12 },
        { n: "pilau-star-anise", x: 985, y: 580, w: 115, rot: 25 },
      ],
      corners: [
        { n: "pilau-cinnamon", x: -50, y: 595, w: 280, rot: -30 },
        { n: "pilau-coriander", x: 1285, y: 50, w: 155, rot: 20 },
      ],
    },
    mobile: {
      heroW: 380,
      floaters: [
        { n: "pilau-star-anise", x: 96, y: 150, w: 66, rot: -15 },
        { n: "pilau-cinnamon", x: 470, y: 208, w: 108, rot: 8, mirror: true },
        { n: "pilau-coriander", x: 78, y: 408, w: 72, rot: 12 },
        { n: "pilau-star-anise", x: 486, y: 470, w: 64, rot: 25 },
      ],
      corners: [
        { n: "pilau-cinnamon", x: -56, y: 545, w: 150, rot: -30 },
        { n: "pilau-coriander", x: 560, y: 90, w: 92, rot: 20 },
      ],
    },
  },
  {
    key: "wali",
    word: "Wali",
    bg: "#FFF8F0", // Altra cream
    ink: "#1A1A1A",
    dot: "#FF5C00",
    layout: {
      heroW: 400,
      floaters: [
        { n: "wali-tomato", x: 355, y: 170, w: 150, rot: -8 },
        { n: "wali-tomato", x: 1075, y: 300, w: 125, rot: 15, mirror: true },
        { n: "wali-onion", x: 275, y: 465, w: 135, rot: -18 },
        { n: "wali-chili", x: 1150, y: 470, w: 135, rot: 24 },
      ],
      corners: [
        { n: "wali-tomato", x: -25, y: 585, w: 235, rot: -15 },
        { n: "wali-chili", x: 1290, y: 55, w: 175, rot: 30 },
      ],
    },
    mobile: {
      heroW: 280,
      floaters: [
        { n: "wali-tomato", x: 104, y: 148, w: 86, rot: -8 },
        { n: "wali-tomato", x: 486, y: 235, w: 72, rot: 15, mirror: true },
        { n: "wali-onion", x: 82, y: 400, w: 88, rot: -18 },
        { n: "wali-chili", x: 500, y: 420, w: 78, rot: 24 },
      ],
      corners: [
        { n: "wali-tomato", x: -48, y: 528, w: 130, rot: -15 },
        { n: "wali-chili", x: 556, y: 84, w: 96, rot: 30 },
      ],
    },
  },
  {
    key: "mishkaki",
    word: "Mishkaki",
    bg: "#FFD6C0", // Altra pink
    ink: "#1A1A1A",
    dot: "#FF5C00",
    layout: {
      heroW: 520,
      floaters: [
        { n: "mishkaki-skewer", x: 340, y: 175, w: 190, rot: -20 },
        { n: "mishkaki-lemon", x: 1085, y: 300, w: 135, rot: 12 },
        { n: "mishkaki-pepper", x: 280, y: 465, w: 135, rot: -14 },
        { n: "mishkaki-skewer", x: 990, y: 575, w: 175, rot: 20, mirror: true },
      ],
      corners: [
        { n: "mishkaki-pepper", x: -30, y: 590, w: 240, rot: -25 },
        { n: "mishkaki-lemon", x: 1285, y: 45, w: 180, rot: 28 },
      ],
    },
    mobile: {
      heroW: 360,
      floaters: [
        { n: "mishkaki-skewer", x: 92, y: 140, w: 112, rot: -20 },
        { n: "mishkaki-lemon", x: 492, y: 230, w: 82, rot: 12 },
        { n: "mishkaki-pepper", x: 76, y: 400, w: 80, rot: -14 },
        { n: "mishkaki-skewer", x: 494, y: 460, w: 104, rot: 20, mirror: true },
      ],
      corners: [
        { n: "mishkaki-pepper", x: -52, y: 535, w: 135, rot: -25 },
        { n: "mishkaki-lemon", x: 556, y: 70, w: 105, rot: 28 },
      ],
    },
  },
];

const SLIDES = SLIDE_DEFS.filter((s) => BUILT.has(`${s.key}-hero`));

/* floor shadows (design px: cx, cy, w, h) */
const DESKTOP_SHADOWS: [number, number, number, number][] = [
  [345, 650, 170, 24],
  [720, 690, 340, 30],
  [1180, 638, 160, 22],
  [1000, 715, 150, 22],
];
const MOBILE_SHADOWS: [number, number, number, number][] = [
  [320, 566, 240, 16],
  [130, 560, 90, 10],
  [512, 560, 90, 10],
];

/* measured coverage table for the 970ms wipe (t → c, smoothstep between) */
const COVER: [number, number][] = [
  [0, 0], [0.031, 0.006], [0.134, 0.012], [0.206, 0.023], [0.278, 0.047],
  [0.34, 0.07], [0.412, 0.105], [0.485, 0.158], [0.546, 0.246], [0.583, 0.55],
  [0.62, 0.825], [0.69, 0.9], [0.79, 0.94], [0.85, 0.956], [0.93, 0.975], [1, 1],
];

function cover(t: number): number {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  for (let i = 1; i < COVER.length; i++) {
    if (t <= COVER[i][0]) {
      const [t0, c0] = COVER[i - 1];
      const [t1, c1] = COVER[i];
      const k = (t - t0) / (t1 - t0);
      const s = k * k * (3 - 2 * k);
      return c0 + (c1 - c0) * s;
    }
  }
  return 1;
}

/* deterministic "random" bob timings (SSR-stable, no hydration mismatch) */
function bobTiming(seed: number) {
  return {
    dur: `${(3.2 + ((seed * 37) % 18)) / 10}s`,
    del: `-${((seed * 53) % 40) / 10}s`,
  };
}

const img = (n: string) => `/images/food/slides/${n}.webp`;
const factors = [0.4, 0.3, 0.15, 0.55, 0.75]; // word, shadow, dish, fruit, corner

/* desktop frame 1440×900, mobile frame 640×700 — both fully visible */
const FW = { desktop: 1440, mobile: 640 };
const FH = { desktop: 900, mobile: 700 };
/* cap-line the word is centred on (design px) */
const WORD_CENTER_Y = { desktop: 403.5, mobile: 330 };
/* the dish base line (hero bottoms sit on it) */
const HERO_BASE_Y = { desktop: 640, mobile: 560 };

interface WordStyle {
  fontSize: string;
  top: string;
  letterSpacing: string;
}

let measureCtx: CanvasRenderingContext2D | null = null;
function displayFamily(): string {
  if (typeof window === "undefined") return '"Playfair Display Variable"';
  // --font-display holds a full stack; canvas + fonts.load want ONE family
  const v = getComputedStyle(document.documentElement)
    .getPropertyValue("--font-display")
    .trim();
  return v.split(",")[0]?.trim() || '"Playfair Display Variable"';
}
function inkWidth(word: string, lsPx100: number): number {
  if (!measureCtx) {
    const c = document.createElement("canvas");
    measureCtx = c.getContext("2d");
    if (!measureCtx) return 100;
  }
  const ctx = measureCtx;
  ctx.font = `700 100px ${displayFamily()}, Georgia, serif`;
  if ("letterSpacing" in ctx) {
    ctx.letterSpacing = `${lsPx100}px`;
  }
  const m = ctx.measureText(word);
  const ink = (m.actualBoundingBoxLeft ?? 0) + (m.actualBoundingBoxRight ?? 0);
  return ink > 0 ? ink : m.width;
}

export function FlavourHero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);

  const curRef = useRef(0);
  const animRef = useRef(false);
  const rafRef = useRef(0);
  const lastInteract = useRef(0);
  const frameW = useRef(1152);
  const reducedRef = useRef(false);

  const [cur, setCur] = useState(0);
  const [ready, setReady] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [wordStyles, setWordStyles] = useState<(WordStyle | null)[]>(
    SLIDES.map(() => null),
  );
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("altra-theme", next ? "dark" : "light");
    } catch {
      /* private mode */
    }
  };

  /* ── sizing: --u/--fw/--fh + word fitting, desktop & mobile frames ── */
  useEffect(() => {
    const measure = () => {
      const st = stageRef.current;
      if (!st) return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const isMobile = vw <= 820 || vh > vw;
      setMobile(isMobile);

      let u: number;
      if (isMobile) {
        // compact 640×700 frame — never wider than the viewport, and
        // never smaller than the plain fit-scale (odd sizes stay sane)
        u = Math.max(
          Math.min(vw / FW.mobile, (vh - 220) / FH.mobile),
          Math.min(vw / FW.desktop, vh / FH.desktop),
        );
      } else {
        u = Math.min(vw / FW.desktop, vh / FH.desktop);
      }
      st.style.setProperty("--u", `${u}px`);
      st.style.setProperty("--fw", String(isMobile ? FW.mobile : FW.desktop));
      st.style.setProperty("--fh", String(isMobile ? FH.mobile : FH.desktop));
      frameW.current = (isMobile ? FW.mobile : FW.desktop) * u;

      const designW = isMobile ? FW.mobile : FW.desktop;
      const target = designW * 0.94;
      const fMax = isMobile ? 230 : 445;
      const yC = isMobile ? WORD_CENTER_Y.mobile : WORD_CENTER_Y.desktop;

      setWordStyles(
        SLIDES.map(({ word }) => {
          const ink = inkWidth(word, 0.5); // +0.005em at 100px
          let size: number;
          let ls = "0.005em";
          if (ink * 4.45 > 1330) {
            const inkTight = inkWidth(word, -3.5); // −0.035em at 100px
            ls = "-0.035em";
            size = Math.min(fMax, (target / inkTight) * 100);
          } else {
            size = fMax;
          }
          const baseline = yC + (0.698 * size) / 2;
          const top = baseline - 0.85 * size;
          return {
            fontSize: `${(size * u).toFixed(2)}px`,
            top: `${(top * u).toFixed(2)}px`,
            letterSpacing: ls,
          };
        }),
      );
    };

    measure();
    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    window.addEventListener("resize", onResize);

    let mounted = true;
    const reveal = () => {
      if (!mounted || animRef.current) return;
      setReady(true);
      // opening wipe: first slide's layers settle from the right
      const first = slideRefs.current[0];
      first?.querySelectorAll("[data-l]").forEach((el, i) => {
        (el as HTMLElement).animate(
          [
            { transform: `translateX(${factors[i] * frameW.current}px)` },
            { transform: "translateX(0px)" },
          ],
          { duration: 900, easing: "cubic-bezier(0.22, 0.8, 0.3, 1)" },
        );
      });
    };

    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
    if (fonts) {
      Promise.all([
        fonts.load(`700 100px ${displayFamily()}`).catch(() => []),
        fonts.ready,
      ])
        .then(reveal)
        .catch(reveal);
    } else {
      reveal();
    }
    const failsafe = window.setTimeout(reveal, 3000);

    return () => {
      mounted = false;
      window.clearTimeout(failsafe);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, [SLIDES]);

  /* idle-preload every slide's art so the first wipe never pops in */
  useEffect(() => {
    if (!ready) return;
    const handle = window.setTimeout(() => {
      for (const s of SLIDES) {
        const all = [`${s.key}-hero`, ...s.layout.floaters.map((p) => p.n), ...s.layout.corners.map((p) => p.n)];
        for (const n of new Set(all)) {
          if (!BUILT.has(n)) continue;
          const im = new Image();
          im.src = img(n);
        }
      }
    }, 1200);
    return () => window.clearTimeout(handle);
  }, [ready]);

  /* keep slide visibility in sync outside transitions */
  useEffect(() => {
    if (animRef.current) return;
    slideRefs.current.forEach((el, i) => {
      if (!el) return;
      el.dataset.state = i === curRef.current ? "current" : "hidden";
    });
  }, [cur, ready]);

  /* underline follows the active tab */
  useEffect(() => {
    const nav = tabsRef.current;
    const ul = underlineRef.current;
    if (!nav || !ul) return;
    const active = nav.querySelector<HTMLElement>(`[data-tab="${cur}"]`);
    if (!active) return;
    ul.style.width = `${active.offsetWidth}px`;
    ul.style.transform = `translateX(${active.offsetLeft}px)`;
  }, [cur, ready]);

  /* ── the measured 970ms wipe ── */
  const go = useCallback((nextIdx: number, dir: 1 | -1) => {
    const slides = slideRefs.current;
    const st = stageRef.current;
    if (!st || animRef.current) return;
    const A = slides[curRef.current];
    const B = slides[nextIdx];
    if (!A || !B || nextIdx === curRef.current) return;
    lastInteract.current = performance.now();
    setCur(nextIdx);

    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedRef.current) {
      A.dataset.state = "hidden";
      B.dataset.state = "current";
      curRef.current = nextIdx;
      return;
    }

    animRef.current = true;
    B.dataset.state = "under";
    const layersA = Array.from(A.querySelectorAll<HTMLElement>("[data-l]"));
    const layersB = Array.from(B.querySelectorAll<HTMLElement>("[data-l]"));
    const fw = frameW.current;
    const start = performance.now();
    const D = 970;

    const step = (now: number) => {
      const tRaw = (now - start) / D;
      const t = Math.min(tRaw, 1);
      const c = cover(t);
      A.style.clipPath =
        dir > 0
          ? `inset(0 ${(c * 100).toFixed(3)}% 0 0)`
          : `inset(0 0 0 ${(c * 100).toFixed(3)}%)`;
      const drift = -dir * c * 0.14 * fw;
      for (const el of layersA) el.style.transform = `translateX(${drift}px)`;

      const k = Math.min(Math.max((tRaw - 0.5) / 0.42, 0), 1);
      const e = 1 - (1 - k) * (1 - k);
      for (let i = 0; i < layersB.length; i++) {
        const f = factors[i] ?? 0.4;
        layersB[i].style.transform = `translateX(${(dir * (1 - e) * f * fw).toFixed(2)}px)`;
      }

      if (tRaw < 1.02) {
        rafRef.current = requestAnimationFrame(step);
        return;
      }
      // finish
      A.style.clipPath = "";
      for (const el of layersA) el.style.transform = "";
      for (const el of layersB) el.style.transform = "";
      A.dataset.state = "hidden";
      B.dataset.state = "current";
      curRef.current = nextIdx;
      animRef.current = false;
    };
    rafRef.current = requestAnimationFrame(step);
  }, []);

  const goTo = useCallback(
    (idx: number) => {
      const dir: 1 | -1 = idx > curRef.current ? 1 : -1;
      go(idx, dir);
    },
    [go],
  );

  /* autoplay + keyboard */
  useEffect(() => {
    // don't autoplay during the opening sequence
    lastInteract.current = performance.now();
    const iv = window.setInterval(() => {
      if (
        !document.hidden &&
        !animRef.current &&
        performance.now() - lastInteract.current > 6000
      ) {
        go((curRef.current + 1) % SLIDES.length, 1);
      }
    }, 2600);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        lastInteract.current = performance.now();
        go((curRef.current + 1) % SLIDES.length, 1);
      } else if (e.key === "ArrowLeft") {
        lastInteract.current = performance.now();
        go((curRef.current - 1 + SLIDES.length) % SLIDES.length, -1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearInterval(iv);
      window.removeEventListener("keydown", onKey);
      cancelAnimationFrame(rafRef.current);
    };
  }, [go]);

  /* swipe / drag */
  useEffect(() => {
    const st = stageRef.current;
    if (!st) return;
    let sx = 0;
    let sy = 0;
    let tracking = false;
    const onDown = (e: PointerEvent) => {
      tracking = true;
      sx = e.clientX;
      sy = e.clientY;
    };
    const onUp = (e: PointerEvent) => {
      if (!tracking) return;
      tracking = false;
      const dx = e.clientX - sx;
      const dy = e.clientY - sy;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
        lastInteract.current = performance.now();
        if (dx < 0) go((curRef.current + 1) % SLIDES.length, 1);
        else go((curRef.current - 1 + SLIDES.length) % SLIDES.length, -1);
      }
    };
    st.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      st.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [go]);

  const active = SLIDES[cur] ?? SLIDES[0];
  const shadows = mobile ? MOBILE_SHADOWS : DESKTOP_SHADOWS;

  const renderPiece = (p: Piece, seed: number, corner: boolean) => {
    if (!BUILT.has(p.n)) return null;
    const d = DIMS[p.n];
    if (!d) return null;
    const h = (p.w * d.h) / d.w;
    const t = bobTiming(seed);
    return (
      <div
        key={`${p.n}-${p.x}-${p.y}`}
        className={`al-piece-wrap${corner ? " al-corner" : ""}`}
        style={{
          left: `${p.x}px`,
          top: `${p.y}px`,
          width: `${p.w}px`,
          height: `${h.toFixed(1)}px`,
          transform: p.mirror ? "scaleX(-1)" : undefined,
        }}
      >
        <div
          className="al-piece"
          style={{
            backgroundImage: `url(${img(p.n)})`,
            ["--rot" as string]: `${p.rot ?? 0}deg`,
            ["--dur" as string]: t.dur,
            ["--del" as string]: t.del,
          }}
        />
      </div>
    );
  };

  const renderLayout = (s: SlideDef, si: number) => {
    const lay = mobile ? s.mobile : s.layout;
    const d = DIMS[`${s.key}-hero`];
    const hw = lay.heroW;
    const hh = (hw * d.h) / d.w;
    const hx = (mobile ? FW.mobile : FW.desktop) / 2 - hw / 2;
    const hy = (mobile ? HERO_BASE_Y.mobile : HERO_BASE_Y.desktop) - hh;
    const ws = wordStyles[si];
    const wordShadow = s.ink === "#FFFFFF" || s.ink === "#FFF8F0"
      ? "0 6px 60px rgba(0,0,0,0.10)"
      : "none";
    return (
      <>
        {/* word layer */}
        <div className="al-layer" data-l>
          <div
            className="al-word"
            aria-hidden="true"
            style={{
              fontSize: ws?.fontSize ?? "calc(445 * var(--u))",
              top: ws?.top ?? "calc(181 * var(--u))",
              letterSpacing: ws?.letterSpacing ?? "0.005em",
              textShadow: wordShadow,
            }}
          >
            {s.word}
          </div>
        </div>
        {/* shadow layer */}
        <div className="al-layer" data-l>
          {shadows.map(([cx, cy, w, h]) => (
            <div
              key={`${cx}-${cy}`}
              className="al-shadow"
              style={{
                left: `${cx - w / 2}px`,
                top: `${cy - h / 2}px`,
                width: `${w}px`,
                height: `${h}px`,
              }}
            />
          ))}
        </div>
        {/* dish layer */}
        <div className="al-layer" data-l>
          <div
            className="al-piece-wrap"
            style={{
              left: `${hx}px`,
              top: `${hy.toFixed(1)}px`,
              width: `${hw}px`,
              height: `${hh.toFixed(1)}px`,
            }}
          >
            <div
              className="al-piece"
              style={{
                backgroundImage: `url(${img(`${s.key}-hero`)})`,
                ["--rot" as string]: "0deg",
                filter: "drop-shadow(0 18px 30px rgba(40, 25, 10, 0.18))",
              }}
            />
          </div>
        </div>
        {/* fruit layer */}
        <div className="al-layer" data-l>
          {lay.floaters.map((p, i) => renderPiece(p, i + p.x, false))}
        </div>
        {/* corner layer */}
        <div className="al-layer" data-l>
          {lay.corners.map((p, i) => renderPiece(p, i + 7 + p.y, true))}
        </div>
      </>
    );
  };

  return (
    <section className="relative h-svh overflow-hidden" aria-label="Altra flavour slider">
      <h1 className="sr-only">
        Altra — chakula kitambo kilichotengenezwa kwa mapendo, Dar es Salaam
      </h1>
      <div
        ref={stageRef}
        className={`al-stage${ready ? " is-in" : ""}`}
        style={{
          background: active.bg,
          color: active.ink,
          transition: "background-color 0.45s ease, color 0.45s ease",
        }}
      >
        {SLIDES.map((s, si) => (
          <section
            key={s.key}
            ref={(el) => {
              slideRefs.current[si] = el;
            }}
            className="al-slide"
            data-state={si === 0 ? "current" : "hidden"}
            style={{ background: s.bg, color: s.ink }}
            aria-hidden={si !== cur}
          >
            <div className="al-frame">{renderLayout(s, si)}</div>
          </section>
        ))}

        {/* fixed UI — ink follows the active slide's colour */}
        <div className="al-ui al-textshadow">
          <header className="al-head">
            <TransitionLink href="/" className="al-logo al-rise d1">
              Altra
              <span className="dot" style={{ color: active.dot }}>
                .
              </span>
            </TransitionLink>
            <div className="al-account">
              <TransitionLink href="/menu" className="al-rise d3">
                Menu
              </TransitionLink>
              <span className="sep" aria-hidden="true">
                |
              </span>
              <TransitionLink href="/about" className="al-rise d3">
                About
              </TransitionLink>
              <button
                type="button"
                onClick={toggleTheme}
                className="al-theme-btn al-rise d3"
                aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
              >
                {dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
              </button>
            </div>
          </header>

          <div className="al-tabs al-rise d2" ref={tabsRef} role="tablist" aria-label="Flavours">
            {SLIDES.map((s, i) => (
              <button
                key={s.key}
                type="button"
                role="tab"
                data-tab={i}
                aria-current={i === cur}
                aria-selected={i === cur}
                className="al-tab"
                onClick={() => goTo(i)}
              >
                {s.word}
              </button>
            ))}
            <span ref={underlineRef} className="al-underline" aria-hidden="true" />
          </div>

          <TransitionLink href="/menu" className="al-shop al-rise d5" ariaLabel="Order now from Altra">
            ORDER NOW
          </TransitionLink>

          <button
            type="button"
            className="al-arrow prev al-rise d4"
            aria-label="Previous flavour"
            onClick={() => {
              lastInteract.current = performance.now();
              go((curRef.current - 1 + SLIDES.length) % SLIDES.length, -1);
            }}
          >
            <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M24 14H4" />
              <path d="M12 6l-8 8 8 8" />
            </svg>
          </button>
          <button
            type="button"
            className="al-arrow next al-rise d6"
            aria-label="Next flavour"
            onClick={() => {
              lastInteract.current = performance.now();
              go((curRef.current + 1) % SLIDES.length, 1);
            }}
          >
            <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 14h20" />
              <path d="M16 6l8 8-8 8" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
