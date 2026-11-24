"use client";

import Image from "next/image";
import { ArrowDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { TransitionLink } from "@/components/layout/transition-link";

/**
 * FloatingFoodHero — the signature Altra hero.
 *
 * Props contract (per the integration guide):
 *  - title, description, images[], className
 * Optional extras: eyebrow + primary/secondary actions.
 */
export interface FloatingImageProps {
  src: string;
  alt: string;
  /** Tailwind classes for position + size + animation, e.g. "w-40 top-10 left-4 animate-float" */
  className?: string;
}

export interface FloatingFoodHeroProps {
  title: string;
  description: string;
  images: FloatingImageProps[];
  className?: string;
  eyebrow?: string;
  primaryAction?: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
}

export function FloatingFoodHero({
  title,
  description,
  images,
  className,
  eyebrow,
  primaryAction,
  secondaryAction,
}: FloatingFoodHeroProps) {
  return (
    <section
      className={cn(
        "relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 pb-20 pt-28",
        className,
      )}
    >
      {/* Ambient glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 size-[28rem] rounded-full bg-orange/15 blur-3xl" />
        <div className="absolute -right-24 top-1/3 size-[26rem] rounded-full bg-pink/50 blur-3xl dark:bg-pink/10" />
        <div className="absolute bottom-0 left-1/3 size-72 rounded-full bg-orange/10 blur-3xl" />
      </div>

      {/* Floating imagery (painted underneath the copy) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {images.map((image, i) => (
          <div
            key={`${image.src}-${i}`}
            data-float-img
            className={cn("absolute animate-float", image.className)}
            style={{ animationDelay: `${(i * 0.45).toFixed(2)}s` }}
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-full shadow-2xl shadow-orange/25 ring-4 ring-white/70 dark:ring-white/10">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority={i < 2}
                sizes="(max-width: 640px) 120px, (max-width: 768px) 220px, 300px"
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      {eyebrow ? (
        <span
          data-hero-eyebrow
          className="inline-flex items-center gap-2.5 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-accent"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
          {eyebrow}
        </span>
      ) : null}

      <h1
        data-hero-title
        className="mt-6 max-w-5xl text-balance text-center font-display text-5xl font-semibold leading-[1.04] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
      >
        {title}
      </h1>

      <p
        data-hero-description
        className="mt-6 max-w-xl text-balance text-center text-base leading-relaxed text-muted-foreground sm:text-lg"
      >
        {description}
      </p>

      {primaryAction || secondaryAction ? (
        <div
          data-hero-actions
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          {primaryAction ? (
            <Magnetic>
              <TransitionLink href={primaryAction.href}>
                <Button size="lg" className="group">
                  {primaryAction.label}
                  <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </TransitionLink>
            </Magnetic>
          ) : null}
          {secondaryAction ? (
            <TransitionLink href={secondaryAction.href}>
              <Button size="lg" variant="outline">
                {secondaryAction.label}
              </Button>
            </TransitionLink>
          ) : null}
        </div>
      ) : null}

      <div
        data-hero-scroll
        className="absolute bottom-8 flex flex-col items-center gap-2 text-muted-foreground"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em]">
          Scroll
        </span>
        <ArrowDown className="size-4 animate-bounce" />
      </div>
    </section>
  );
}

export default FloatingFoodHero;
