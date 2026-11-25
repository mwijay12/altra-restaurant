"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface ScrollVideoScrubProps {
  src: string;
  poster?: string;
  /** Scroll distance needed to play the whole clip, e.g. "+=350%" */
  scrollLength?: string;
  className?: string;
  children?: ReactNode;
  /**
   * "dark"  → charcoal veil + cream text (for dark/moody footage)
   * "light" → warm cream veil + charcoal text (for bright footage,
   *           e.g. the self-hosted kitchen-scrub clip)
   */
  tone?: "dark" | "light";
}

/**
 * Pinned, scroll-scrubbed cinematic video.
 *
 * GSAP animates `video.currentTime` against a scrubbed ScrollTrigger, so
 * the clip plays forward as you scroll down and rewinds as you scroll up.
 * The overlay text (`[data-scrub-text]`) fades in at the start of the
 * scrub and lifts away near the end — all inside the same master timeline.
 *
 * Accessibility: under `prefers-reduced-motion` the video never plays
 * (poster frame + visible text, no pinning).
 */
export function ScrollVideoScrub({
  src,
  poster,
  scrollLength = "+=350%",
  className,
  children,
  tone = "dark",
}: ScrollVideoScrubProps) {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(
    () => {
      const video = videoRef.current;
      const container = containerRef.current;
      if (!video || !container) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        video.pause();
        return;
      }

      video.pause();
      try {
        video.currentTime = 0;
      } catch {
        // not seekable yet — the timeline init below handles it
      }

      const init = () => {
        const duration =
          Number.isFinite(video.duration) && video.duration > 0
            ? video.duration
            : 10;

        gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: scrollLength,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
          // 10 timeline units map across the full scroll distance
          .fromTo(
            video,
            { currentTime: 0 },
            { currentTime: duration, duration: 10 },
            0,
          )
          .fromTo(
            "[data-scrub-text]",
            { opacity: 0, y: 46, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.4,
              ease: "power2.out",
            },
            0.15,
          )
          .to(
            "[data-scrub-text]",
            { opacity: 0, y: -46, scale: 0.97, duration: 1.2, ease: "power2.in" },
            8.4,
          );
      };

      if (video.readyState >= 1) {
        init();
      } else {
        video.addEventListener("loadedmetadata", init, { once: true });
      }
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className={cn(
        "relative h-svh w-full overflow-hidden bg-charcoal",
        className,
      )}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={src}
        poster={poster}
        muted
        playsInline
        preload="auto"
      />
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0",
          tone === "dark"
            ? "bg-gradient-to-b from-charcoal/55 via-charcoal/25 to-charcoal/65"
            : "bg-gradient-to-b from-background/55 via-transparent to-background/60",
        )}
      />
      <div
        data-scrub-text
        className={cn(
          "absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center",
          tone === "dark" ? "text-cream" : "text-charcoal",
        )}
      >
        {children}
      </div>
    </section>
  );
}
