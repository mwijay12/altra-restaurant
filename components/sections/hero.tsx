"use client";

import { useRef } from "react";
import FloatingFoodHeroDemo from "@/components/demo/hero-section-7-demo";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

/**
 * Home hero: page-load GSAP timeline over the FloatingFoodHero.
 * Load order: eyebrow → floating cutouts pop → SplitText letter reveal
 * on the heading → description → CTAs → scroll cue.
 */
export function Hero() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const q = gsap.utils.selector(scope);
      let started = false;

      const play = () => {
        if (started) return;
        started = true;

        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        tl.from(q("[data-hero-eyebrow]"), { y: 26, opacity: 0, duration: 0.6 }, 0.1);
        tl.from(
          q("[data-float-img]"),
          {
            scale: 0.4,
            opacity: 0,
            duration: 0.8,
            stagger: 0.09,
            ease: "back.out(1.8)",
          },
          0.35,
        );

        const title = q("[data-hero-title]")[0] as HTMLElement | undefined;
        if (title) {
          try {
            const split = new SplitText(title, {
              type: "chars,words",
              mask: "chars",
            });
            tl.from(split.chars, { yPercent: 115, duration: 0.9, stagger: 0.02 }, 0.3);
          } catch {
            // SplitText failure should never block the intro
          }
        }

        tl.from(q("[data-hero-description]"), { y: 26, opacity: 0, duration: 0.6 }, "-=0.45");
        tl.from(
          q("[data-hero-actions] > *"),
          { y: 26, opacity: 0, duration: 0.5, stagger: 0.12 },
          "-=0.35",
        );
        tl.from(q("[data-hero-scroll]"), { opacity: 0, duration: 0.6 }, "-=0.2");
      };

      // Start once fonts are ready so SplitText measures real glyphs
      const safety = setTimeout(play, 900);
      if (document.fonts?.ready) {
        document.fonts.ready.then(() => {
          clearTimeout(safety);
          play();
        });
      }
    },
    { scope },
  );

  return (
    <div ref={scope} className="relative">
      <FloatingFoodHeroDemo />
    </div>
  );
}
