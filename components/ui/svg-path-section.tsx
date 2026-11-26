"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/** Slim section connectors that draw themselves on scroll. */
const DIVIDER_LINES = {
  wave: { h: 140, d: "M0,90 C200,20 400,160 600,80 C800,0 1000,140 1200,70" },
  concave: { h: 120, d: "M0,0 Q600,120 1200,0" },
};

type Variant = keyof typeof DIVIDER_LINES;

interface SVGPathSectionProps {
  variant?: Variant;
  className?: string;
  strokeWidth?: number;
}

export function SVGPathSection({
  variant = "wave",
  className,
  strokeWidth = 2.5,
}: SVGPathSectionProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const { h, d } = DIVIDER_LINES[variant];

  useGSAP(
    () => {
      const line = lineRef.current;
      if (!line) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      gsap.from(line, {
        drawSVG: "0%",
        ease: "none",
        scrollTrigger: {
          trigger: svgRef.current,
          start: "top 92%",
          end: "top 30%",
          scrub: 1.5,
        },
      });
    },
    { scope: svgRef },
  );

  return (
    <div
      className={cn("relative w-full overflow-hidden py-6", className)}
      aria-hidden="true"
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 1200 ${h}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-auto w-full text-accent"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          ref={lineRef}
          d={d}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity={0.9}
        />
      </svg>
    </div>
  );
}
