"use client";

import { useCallback, useMemo, useRef, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { motion, useAnimationControls, type Variants } from "framer-motion";
import { Flame } from "lucide-react";
import { ScrollTrigger } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";
import { TransitionContextProvider } from "./transition-context";

const EASE: [number, number, number, number] = [0.72, 0, 0.24, 1];

// Two broad SVG brush strokes draw over the old route, then retract in the
// opposite order. The palette stays within Altra's cream, pink and orange.
const strokeVariants: Variants = {
  hidden: { pathLength: 0, strokeWidth: 0, opacity: 0 },
  cover: (layer: number) => ({
    pathLength: 1,
    strokeWidth: 1800,
    opacity: 1,
    transition: { duration: 0.36, ease: EASE, delay: layer * 0.055 },
  }),
  reveal: (layer: number) => ({
    pathLength: 0,
    strokeWidth: 0,
    opacity: 0,
    transition: { duration: 0.32, ease: EASE, delay: (1 - layer) * 0.045 },
  }),
};

const logoVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94, transition: { duration: 0.1 } },
  cover: { opacity: 1, scale: 1, transition: { delay: 0.12, duration: 0.18, ease: "easeOut" } },
  reveal: { opacity: 0, scale: 0.96, transition: { duration: 0.1 } },
};

const brushPaths = [
  "M -160 760 C 80 660 80 300 300 350 S 470 760 655 615 S 820 210 1160 300",
  "M -140 190 C 90 290 170 690 365 630 S 650 200 805 380 S 955 780 1160 680",
];

export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const controls = useAnimationControls();
  const transitioning = useRef(false);

  const navigate = useCallback(
    async (href: string) => {
      if (transitioning.current) return;
      transitioning.current = true;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) {
        router.push(href);
        window.scrollTo(0, 0);
        transitioning.current = false;
        return;
      }

      try {
        await controls.start("cover");
        router.push(href);

        // Two paint frames let App Router commit the destination without the
        // old fixed 220ms pause that made simple navigation feel sluggish.
        await new Promise<void>((resolve) => {
          requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
        });

        const lenis = getLenis();
        if (lenis) {
          lenis.scrollTo(0, { immediate: true, force: true });
        } else {
          window.scrollTo(0, 0);
        }
        ScrollTrigger.refresh();
        await controls.start("reveal");
      } finally {
        controls.set("hidden");
        transitioning.current = false;
      }
    },
    [controls, router],
  );

  const childrenWithNav = useMemo(() => children, [children]);

  return (
    <TransitionContextProvider navigate={navigate}>
      {childrenWithNav}

      {/* SVG stroke wipe inspired by the reference, redrawn in Altra's palette. */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90] overflow-hidden">
        <svg
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          fill="none"
        >
          {brushPaths.map((path, index) => (
            <motion.path
              key={path}
              d={path}
              custom={index}
              variants={strokeVariants}
              initial="hidden"
              animate={controls}
              stroke={index === 0 ? "#ffd6c0" : "#ff5c00"}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </svg>
        <motion.div
          variants={logoVariants}
          initial="hidden"
          animate={controls}
          className="absolute inset-0 flex items-center justify-center gap-2 font-display text-3xl font-bold tracking-tight text-cream sm:text-4xl"
        >
          <Flame className="size-7 text-cream sm:size-8" fill="currentColor" aria-hidden="true" />
          Altra<span className="text-pink">.</span>
        </motion.div>
      </div>
    </TransitionContextProvider>
  );
}
