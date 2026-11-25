"use client";

import { useRef, type ComponentPropsWithoutRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { AnimatedCurve } from "@/components/ui/animated-curve";
import { AnimatedSVGIcon } from "@/components/ui/animated-svg-icons";

/** Glass card with a GSAP quickTo 3D tilt that follows the cursor. */
function TiltCard({
  children,
  className,
  ...rest
}: ComponentPropsWithoutRef<"div">) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = cardRef.current;
    if (!el) return;
    gsap.set(el, { transformPerspective: 900 });
    const rotateX = gsap.quickTo(el, "rotationX", { duration: 0.5, ease: "power3" });
    const rotateY = gsap.quickTo(el, "rotationY", { duration: 0.5, ease: "power3" });

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      rotateY(px * 10);
      rotateX(-py * 10);
    };
    const onLeave = () => {
      rotateX(0);
      rotateY(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  });

  return (
    <div ref={cardRef} className={className} {...rest}>
      {children}
    </div>
  );
}

const featureIconClass =
  "grid size-14 place-items-center rounded-2xl bg-accent text-accent-foreground shadow-lg shadow-accent/25";

export function Features() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const q = gsap.utils.selector(scope);

      gsap.from(q("[data-feature-heading] > *"), {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: { trigger: q("[data-feature-heading]")[0], start: "top 80%" },
      });

      gsap.from(q("[data-bento-card]"), {
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: { trigger: q("[data-bento-grid]")[0], start: "top 80%" },
      });
    },
    { scope },
  );

  return (
    <div ref={scope} className="mx-auto max-w-6xl px-6 py-24">
      <div data-feature-heading className="mx-auto max-w-2xl text-center">
        <Badge>Why Altra</Badge>
        <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Built for hunger. Designed for speed<span className="text-accent">.</span>
        </h2>
        <p className="mt-4 text-muted-foreground">
          One promise: restaurant-quality food while it&rsquo;s still too hot to
          hurry. Everything we build serves that promise.
        </p>
        <AnimatedCurve
          variant="wave"
          showDot
          className="mx-auto mt-8 max-w-sm text-accent"
        />
      </div>

      <div data-bento-grid className="mt-14 grid gap-4 md:grid-cols-2">
        <TiltCard
          data-bento-card
          className="glass relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-3xl p-8 md:col-span-2"
        >
          <span className={featureIconClass}>
            <AnimatedSVGIcon icon="clock" size={26} />
          </span>
          <div className="relative">
            <h3 className="font-display text-3xl font-semibold">30-minute delivery</h3>
            <p className="mt-2 max-w-md leading-relaxed text-muted-foreground">
              From flame to front door in half an hour — tracked live and
              guaranteed hot. Running late? Your next delivery is on us.
            </p>
          </div>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-10 -right-2 select-none font-display text-[11rem] font-bold leading-none text-accent/15"
          >
            30′
          </span>
        </TiltCard>

        <TiltCard
          data-bento-card
          className="glass flex min-h-[240px] flex-col justify-between gap-6 overflow-hidden rounded-3xl p-8"
        >
          <span className={featureIconClass}>
            <AnimatedSVGIcon icon="leaf" size={26} />
          </span>
          <div>
            <h3 className="font-display text-2xl font-semibold">Fresh ingredients</h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              Kitchens we taste-test ourselves. Local markets, seasonal produce,
              zero freezers.
            </p>
          </div>
        </TiltCard>

        <TiltCard
          data-bento-card
          className="glass flex min-h-[240px] flex-col justify-between gap-6 overflow-hidden rounded-3xl p-8"
        >
          <span className={featureIconClass}>
            <AnimatedSVGIcon icon="store" size={26} />
          </span>
          <div>
            <h3 className="font-display text-2xl font-semibold">1,000+ restaurants</h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              From Mikocheni mansions to Kariakoo street legends — the whole
              city on one menu.
            </p>
          </div>
        </TiltCard>
      </div>
    </div>
  );
}
