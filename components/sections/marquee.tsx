"use client";

import { useRef } from "react";
import { Flame } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const items = [
  "Burgers",
  "Pizza",
  "Sushi",
  "Tacos",
  "Ramen",
  "Desserts",
  "Grills",
  "Smoothies",
];

function Strip({
  reverse,
  outline,
  className,
}: {
  reverse?: boolean;
  outline?: boolean;
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const track = trackRef.current;
      if (!track) return;
      if (reverse) {
        gsap.fromTo(
          track,
          { xPercent: -50 },
          { xPercent: 0, duration: 28, ease: "none", repeat: -1 },
        );
      } else {
        gsap.to(track, { xPercent: -50, duration: 24, ease: "none", repeat: -1 });
      }
    },
    { scope: trackRef },
  );

  const group = (key: string) => (
    <div key={key} className="flex shrink-0 items-center">
      {items.map((item) => (
        <span
          key={item}
          className={cn(
            "mx-6 flex items-center gap-10 font-display text-xl font-bold uppercase tracking-wide sm:gap-12 sm:text-2xl md:text-3xl lg:text-4xl",
            outline && "text-outline",
          )}
        >
          {item}
          <Flame
            className="size-5 shrink-0 opacity-80 sm:size-6 md:size-7"
            aria-hidden="true"
          />
        </span>
      ))}
    </div>
  );

  return (
    <div className={cn("overflow-hidden py-4", className)}>
      <div ref={trackRef} className="flex w-max">
        {group("a")}
        {group("b")}
      </div>
    </div>
  );
}

/** Infinite GSAP ticker strips — two crossing marquees for that editorial punch. */
export function Marquee() {
  return (
    <section
      aria-hidden="true"
      className="relative my-8 overflow-x-clip py-10 sm:my-12 sm:py-14"
    >
      <div className="-mx-8 -rotate-2">
        <Strip className="bg-accent text-accent-foreground" />
      </div>
      <div className="-mx-8 -mt-6 rotate-[1.6deg] sm:-mt-10">
        <Strip reverse outline className="bg-charcoal text-cream" />
      </div>
    </section>
  );
}
