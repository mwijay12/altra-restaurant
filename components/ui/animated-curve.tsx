"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type CurveVariant = "wave" | "swoop" | "infinity";

/** Curvy, stroke-only paths that draw themselves as you scroll. */
const PATHS: Record<CurveVariant, { viewBox: string; d: string }> = {
  wave: {
    viewBox: "0 0 1200 200",
    d: "M0,100 C150,20 300,180 450,100 C600,20 750,180 900,100 C1050,20 1150,80 1200,100",
  },
  swoop: {
    viewBox: "0 0 1200 400",
    d: "M-50,350 C100,350 200,50 400,50 C600,50 700,350 900,350 C1100,350 1150,100 1250,50",
  },
  infinity: {
    viewBox: "0 0 600 300",
    d: "M300,150 C300,80 240,40 180,60 C120,80 80,140 100,190 C120,240 180,260 240,230 C300,200 300,150 300,150 C300,100 360,70 420,90 C480,110 520,170 500,220 C480,270 420,280 360,250 C300,220 300,150 300,150",
  },
};

interface AnimatedCurveProps {
  variant?: CurveVariant;
  className?: string;
  strokeWidth?: number;
  /** Orange dot that rides along the path while it draws */
  showDot?: boolean;
  /** "center" expands the stroke outward from the middle */
  drawFrom?: "start" | "center";
  /** scrub catch-up lag (seconds); higher = smoother, floatier */
  scrub?: number;
}

export function AnimatedCurve({
  variant = "wave",
  className,
  strokeWidth = 2.5,
  showDot = false,
  drawFrom = "start",
  scrub = 1.5,
}: AnimatedCurveProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const { viewBox, d } = PATHS[variant];

  useGSAP(
    () => {
      const path = pathRef.current;
      const dot = dotRef.current;
      if (!path) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: svgRef.current,
          start: "top 88%",
          end: "bottom 12%",
          scrub,
        },
      });

      if (drawFrom === "center") {
        tl.fromTo(
          path,
          { drawSVG: "50% 50%" },
          { drawSVG: "0% 100%", duration: 1, ease: "power1.inOut" },
        );
      } else {
        tl.from(path, { drawSVG: "0%", duration: 1 });
      }

      if (showDot && dot) {
        tl.to(
          dot,
          {
            motionPath: {
              path,
              align: path,
              alignOrigin: [0.5, 0.5],
            },
            duration: 1,
          },
          0,
        );
      }
    },
    { scope: svgRef },
  );

  return (
    <svg
      ref={svgRef}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-auto w-full", className)}
      aria-hidden="true"
    >
      {/* soft glow underlay */}
      <path
        d={d}
        stroke="currentColor"
        strokeWidth={strokeWidth * 3}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.08}
        style={{ filter: "blur(6px)" }}
      />
      {/* the drawing path */}
      <path
        ref={pathRef}
        d={d}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {showDot ? (
        <circle ref={dotRef} r={strokeWidth * 2.6} fill="currentColor" />
      ) : null}
    </svg>
  );
}
