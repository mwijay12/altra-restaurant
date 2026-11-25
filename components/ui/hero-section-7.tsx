"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
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
 *  - videoSrc / videoPoster: optional cinematic background video wash
 * Optional extras: eyebrow + primary/secondary actions.
 *
 * `images` are transparent PNG cutouts: `className` carries position,
 * size and a static Tailwind rotation; the component applies the float
 * animation on a nested wrapper so GSAP intro transforms never clash
 * with the CSS keyframes.
 */
export interface FloatingImageProps {
  src: string;
  alt: string;
  /** Tailwind classes for position + size + rotation, e.g. "w-40 top-10 left-4 -rotate-6" */
  className?: string;
  /** Intrinsic pixel dimensions of the cutout (for next/image CLS) */
  width: number;
  height: number;
}

export interface FloatingFoodHeroProps {
  title: string;
  description: string;
  images: FloatingImageProps[];
  className?: string;
  eyebrow?: string;
  videoSrc?: string;
  videoPoster?: string;
  primaryAction?: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
}

export function FloatingFoodHero({
  title,
  description,
  images,
  className,
  eyebrow,
  videoSrc,
  videoPoster,
  primaryAction,
  secondaryAction,
}: FloatingFoodHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Respect prefers-reduced-motion: freeze the background video on its poster.
  useEffect(() => {
    if (!videoSrc) return;
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      try {
        video.currentTime = 0;
      } catch {
        // poster frame is fine
      }
    }
  }, [videoSrc]);

  return (
    <section
      className={cn(
        "relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 pb-20 pt-28",
        className,
      )}
    >
      {/* ── Background video wash ── */}
      {videoSrc ? (
        <div aria-hidden="true" className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            className="h-full w-full object-cover opacity-[0.16] dark:opacity-10"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={videoPoster}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
          {/* readability overlay — keeps the cream/dark theme on top */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/75 via-background/45 to-background/75 dark:from-background/80 dark:via-background/60 dark:to-background/80" />
        </div>
      ) : null}

      {/* Ambient glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
      >
        <div className="absolute -left-32 -top-32 size-[28rem] rounded-full bg-orange/15 blur-3xl" />
        <div className="absolute -right-24 top-1/3 size-[26rem] rounded-full bg-pink/50 blur-3xl dark:bg-pink/10" />
        <div className="absolute bottom-0 left-1/3 size-72 rounded-full bg-orange/10 blur-3xl" />
      </div>

      {/* Floating food cutouts (transparent PNGs, painted under the copy) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2]"
      >
        {images.map((image, i) => (
          <div
            key={`${image.src}-${i}`}
            data-float-img
            className={cn("absolute drop-shadow-2xl", image.className)}
          >
            <div
              className="animate-float"
              style={{ animationDelay: `${(i * 0.45).toFixed(2)}s` }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                priority={i < 2}
                sizes="(max-width: 640px) 180px, (max-width: 768px) 260px, 380px"
                className="h-auto w-full object-contain"
              />
            </div>
          </div>
        ))}
      </div>

      {eyebrow ? (
        <span
          data-hero-eyebrow
          className="relative z-10 inline-flex items-center gap-2.5 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-accent backdrop-blur-sm"
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
        className="relative z-10 mt-6 max-w-5xl text-balance text-center font-display text-[clamp(2.75rem,7.2vw,6.75rem)] font-semibold leading-[1.04] tracking-tight"
      >
        {title}
      </h1>

      <p
        data-hero-description
        className="relative z-10 mt-6 max-w-xl text-balance text-center text-base leading-relaxed text-muted-foreground sm:text-lg"
      >
        {description}
      </p>

      {primaryAction || secondaryAction ? (
        <div
          data-hero-actions
          className="relative z-10 mt-10 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-center sm:gap-4"
        >
          {primaryAction ? (
            <Magnetic className="w-full sm:w-auto">
              <TransitionLink href={primaryAction.href} className="block w-full sm:w-auto">
                <Button size="lg" className="group w-full sm:w-auto">
                  {primaryAction.label}
                  <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </TransitionLink>
            </Magnetic>
          ) : null}
          {secondaryAction ? (
            <TransitionLink href={secondaryAction.href} className="block w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                {secondaryAction.label}
              </Button>
            </TransitionLink>
          ) : null}
        </div>
      ) : null}

      <div
        data-hero-scroll
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground"
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
