"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import FloatingFoodHeroDemo from "@/components/demo/hero-section-7-demo";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

const ParticleField = dynamic(
  () => import("@/components/three/particle-field"),
  { ssr: false },
);

/**
 * Home hero: Three.js particle backdrop + page-load GSAP timeline.
 * Load order: eyebrow → floating images pop → SplitText letter reveal
 * on the heading → description → CTAs → scroll cue.
 */
export function Hero() {
  const scope = useRef<HTMLDivElement>(null);
  const [enable3d, setEnable3d] = useState(false);

  // Heavy 3D: desktop only + respect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnable3d(mq.matches && !reduced.matches);
    update();
    mq.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      mq.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

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
      {enable3d ? <ParticleField /> : null}
      <FloatingFoodHeroDemo />
    </div>
  );
}
