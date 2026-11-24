"use client";

import { useCallback, useMemo, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { motion, useAnimationControls, type Variants } from "framer-motion";
import { ScrollTrigger } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";
import { TransitionContextProvider } from "./transition-context";

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

/**
 * `custom` value per panel:
 *  - pink panel (i = 0): arrives first, leaves last
 *  - orange panel (i = 1): arrives last, leaves first
 */
const panelVariants: Variants = {
  hidden: (i: number) => ({
    y: "-100%",
    transition: { duration: 0, delay: i * 0.08 },
  }),
  cover: (i: number) => ({
    y: "0%",
    transition: { duration: 0.55, ease: EASE, delay: i * 0.08 },
  }),
  reveal: (i: number) => ({
    y: "100%",
    transition: { duration: 0.65, ease: EASE, delay: (1 - i) * 0.08 },
  }),
};

const logoVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
  cover: {
    opacity: 1,
    scale: 1,
    transition: { delay: 0.5, duration: 0.35, ease: "backOut" },
  },
  reveal: { opacity: 0, scale: 0.92, transition: { duration: 0.18 } },
};

export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const controls = useAnimationControls();

  const navigate = useCallback(
    async (href: string) => {
      await controls.start("cover");
      router.push(href);
      // give the new route a beat to mount before revealing it
      await new Promise((resolve) => setTimeout(resolve, 220));
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(0, { immediate: true, force: true });
      } else {
        window.scrollTo(0, 0);
      }
      ScrollTrigger.refresh();
      await controls.start("reveal");
      controls.set("hidden");
    },
    [controls, router],
  );

  const childrenWithNav = useMemo(() => children, [children]);

  return (
    <TransitionContextProvider navigate={navigate}>
      {childrenWithNav}

      {/* Full-screen curtain (pink lead panel + orange main panel) */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90]">
        <motion.div
          variants={panelVariants}
          custom={0}
          initial="hidden"
          animate={controls}
          className="absolute inset-0 bg-pink"
        />
        <motion.div
          variants={panelVariants}
          custom={1}
          initial="hidden"
          animate={controls}
          className="absolute inset-0 flex items-center justify-center bg-accent"
        >
          <motion.span
            variants={logoVariants}
            className="font-display text-4xl font-bold tracking-tight text-accent-foreground sm:text-6xl"
          >
            Altra<span className="text-pink">.</span>
          </motion.span>
        </motion.div>
      </div>
    </TransitionContextProvider>
  );
}
