"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type IconType =
  | "clock"
  | "leaf"
  | "fork"
  | "heart"
  | "star"
  | "pizza"
  | "store";

const strokeProps = {
  stroke: "currentColor",
  fill: "none",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Stroke-only food icons whose paths draw themselves when scrolled into view. */
const ICONS: Record<IconType, ReactNode> = {
  clock: (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle className="draw-path" cx="50" cy="50" r="38" strokeWidth="4" {...strokeProps} />
      <path className="draw-path" d="M50,26 L50,50 L66,58" strokeWidth="4" {...strokeProps} />
    </svg>
  ),
  leaf: (
    <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path className="draw-path" d="M40,90 C10,70 5,30 40,10 C75,30 70,70 40,90 Z" strokeWidth="3" {...strokeProps} />
      <path className="draw-path" d="M40,88 L40,16" strokeWidth="2.5" {...strokeProps} />
      <path className="draw-path" d="M40,68 L26,54" strokeWidth="2" {...strokeProps} />
      <path className="draw-path" d="M40,68 L54,54" strokeWidth="2" {...strokeProps} />
      <path className="draw-path" d="M40,48 L22,36" strokeWidth="2" {...strokeProps} />
      <path className="draw-path" d="M40,48 L58,36" strokeWidth="2" {...strokeProps} />
    </svg>
  ),
  fork: (
    <svg viewBox="0 0 88 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path className="draw-path" d="M30,10 L30,40" strokeWidth="3.5" {...strokeProps} />
      <path className="draw-path" d="M44,10 L44,40" strokeWidth="3.5" {...strokeProps} />
      <path className="draw-path" d="M58,10 L58,40" strokeWidth="3.5" {...strokeProps} />
      <path className="draw-path" d="M30,40 Q30,54 44,54 Q58,54 58,40" strokeWidth="3.5" {...strokeProps} />
      <path className="draw-path" d="M44,54 L44,90" strokeWidth="3.5" {...strokeProps} />
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 100 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        className="draw-path"
        d="M50,80 C50,80 10,55 10,30 C10,15 20,8 30,8 C38,8 45,13 50,20 C55,13 62,8 70,8 C80,8 90,15 90,30 C90,55 50,80 50,80 Z"
        strokeWidth="3.5"
        {...strokeProps}
      />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        className="draw-path"
        d="M50,10 L61,38 L92,38 L67,56 L77,85 L50,67 L23,85 L33,56 L8,38 L39,38 Z"
        strokeWidth="3.5"
        {...strokeProps}
      />
    </svg>
  ),
  pizza: (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path className="draw-path" d="M50,10 L90,82 L10,82 Z" strokeWidth="3.5" {...strokeProps} />
      <path className="draw-path" d="M10,82 Q50,96 90,82" strokeWidth="4" {...strokeProps} />
      <circle className="draw-path" cx="50" cy="54" r="6" strokeWidth="2.5" {...strokeProps} />
      <circle className="draw-path" cx="38" cy="68" r="4" strokeWidth="2.5" {...strokeProps} />
      <circle className="draw-path" cx="62" cy="68" r="4" strokeWidth="2.5" {...strokeProps} />
    </svg>
  ),
  store: (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path className="draw-path" d="M20,46 L20,84 L80,84 L80,46" strokeWidth="3.5" {...strokeProps} />
      <path className="draw-path" d="M14,24 L86,24 L86,40 Q86,46 80,46 L20,46 Q14,46 14,40 Z" strokeWidth="3.5" {...strokeProps} />
      <path className="draw-path" d="M44,84 L44,64 Q50,58 56,64 L56,84" strokeWidth="3" {...strokeProps} />
      <path className="draw-path" d="M28,60 L36,60" strokeWidth="2.5" {...strokeProps} />
    </svg>
  ),
};

interface AnimatedSVGIconProps {
  icon: IconType;
  size?: number;
  className?: string;
  /** stagger delay before the draw begins (seconds) */
  delay?: number;
}

export function AnimatedSVGIcon({
  icon,
  size = 64,
  className,
  delay = 0,
}: AnimatedSVGIconProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const paths = containerRef.current?.querySelectorAll(".draw-path");
      if (!paths?.length) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      gsap.from(paths, {
        drawSVG: "0%",
        duration: 1,
        delay,
        stagger: 0.16,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 84%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      style={{ width: size, height: size }}
      className={cn("inline-block", className)}
      aria-hidden="true"
    >
      {ICONS[icon]}
    </div>
  );
}
