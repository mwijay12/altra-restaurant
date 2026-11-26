"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Flame } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";
import { TransitionContextProvider } from "./transition-context";

// Long, hand-drawn strokes adapted from the SVG transition reference. The
// scribble draws on, swells to cover the viewport, then erases to reveal the
// destination route.
const brushPaths = [
  "M227.549 1818.76C227.549 1818.76 406.016 2207.75 569.049 2130.26C843.431 1999.85 -264.104 1002.3 227.549 876.262C552.918 792.849 773.647 2456.11 1342.05 2130.26C1885.43 1818.76 14.9644 455.772 760.548 137.262C1342.05 -111.152 1663.5 2266.35 2209.55 1972.76C2755.6 1679.18 1536.63 384.467 1826.55 137.262C2013.5 -22.1463 2209.55 381.262 2209.55 381.262",
  "M1661.28 2255.51C1661.28 2255.51 2311.09 1960.37 2111.78 1817.01C1944.47 1696.67 718.456 2870.17 499.781 2255.51C308.969 1719.17 2457.51 1613.83 2111.78 963.512C1766.05 313.198 427.949 2195.17 132.281 1455.51C-155.219 736.292 2014.78 891.514 1708.78 252.012C1437.81 -314.29 369.471 909.169 132.281 566.512C18.1772 401.672 244.781 193.012 244.781 193.012",
];

const COVER_DURATION = 0.56;
const REVEAL_DURATION = 0.48;

type Direction = "cover" | "reveal";

export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathsRef = useRef<SVGPathElement[]>([]);
  const logoRef = useRef<HTMLDivElement>(null);
  const transitioning = useRef(false);

  useEffect(() => {
    pathsRef.current.forEach((path) => {
      const length = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        attr: { "stroke-width": 200 },
      });
    });
  }, []);

  const animateCurtain = useCallback((direction: Direction) => {
    const paths = pathsRef.current.filter(Boolean);
    if (!paths.length) return Promise.resolve();

    return new Promise<void>((resolve) => {
      const timeline = gsap.timeline({ onComplete: resolve });
      if (direction === "cover") {
        paths.forEach((path, index) => {
          timeline.to(path, {
            strokeDashoffset: 0,
            attr: { "stroke-width": 700 },
            duration: COVER_DURATION,
            ease: "power1.inOut",
          }, index * 0.045);
        });
        if (logoRef.current) {
          timeline.fromTo(logoRef.current,
            { autoAlpha: 0, y: 12, scale: 0.9, rotate: -3 },
            { autoAlpha: 1, y: 0, scale: 1, rotate: 0, duration: 0.28, ease: "back.out(1.7)" },
            0.26,
          );
        }
      } else {
        if (logoRef.current) {
          timeline.to(logoRef.current, {
            autoAlpha: 0,
            y: -8,
            scale: 0.96,
            duration: 0.16,
            ease: "power1.in",
          }, 0);
        }
        paths.forEach((path, index) => {
          const length = path.getTotalLength();
          timeline.to(path, {
            strokeDashoffset: -length,
            attr: { "stroke-width": 200 },
            duration: REVEAL_DURATION,
            ease: "power1.inOut",
            onComplete: () => gsap.set(path, { strokeDashoffset: length }),
          }, index * 0.035);
        });
      }
    });
  }, []);

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
        await animateCurtain("cover");
        router.push(href);

        // Let the App Router commit before the fast scribble reveals the page.
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
        await animateCurtain("reveal");
      } finally {
        transitioning.current = false;
        if (logoRef.current) gsap.set(logoRef.current, { autoAlpha: 0, clearProps: "transform" });
        pathsRef.current.forEach((path) => {
          const length = path.getTotalLength();
          gsap.set(path, { strokeDashoffset: length, attr: { "stroke-width": 200 } });
        });
      }
    },
    [animateCurtain, router],
  );

  return (
    <TransitionContextProvider navigate={navigate}>
      {children}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90] overflow-hidden">
        <svg
          viewBox="0 0 2453 2535"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          fill="none"
        >
          {brushPaths.map((path, index) => (
            <path
              key={path}
              ref={(element) => {
                if (element) pathsRef.current[index] = element;
              }}
              d={path}
              stroke={index === 0 ? "#ffd6c0" : "#ff5c00"}
              strokeWidth="200"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </svg>
        <div
          ref={logoRef}
          className="invisible absolute inset-0 flex items-center justify-center gap-2 font-display text-3xl font-bold tracking-tight text-[#fff8f0] sm:text-4xl"
        >
          <Flame className="size-7 text-[#fff8f0] sm:size-8" fill="currentColor" aria-hidden="true" />
          Altra<span className="text-[#ff8c5a]">.</span>
        </div>
      </div>
    </TransitionContextProvider>
  );
}
