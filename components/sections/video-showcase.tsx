"use client";

import { ScrollVideoScrub } from "@/components/ui/scroll-video-scrub";
import { Badge } from "@/components/ui/badge";

/**
 * Scroll-scrubbed kitchen cinema — fully self-hosted.
 * The clip was rendered from Altra's own food cutouts (Ken Burns shots,
 * 24fps, keyframe on every frame for frame-accurate scrubbing) and lives
 * in /public/videos/kitchen-scrub.mp4 — no third-party CDN can break it.
 */
export function VideoShowcase() {
  return (
    <ScrollVideoScrub
      src="/videos/kitchen-scrub.mp4"
      poster="/videos/kitchen-scrub-poster.jpg"
      scrollLength="+=350%"
      tone="light"
    >
      <Badge>From our kitchens</Badge>
      <h2 className="mt-6 font-display text-5xl font-semibold text-charcoal sm:text-6xl md:text-7xl">
        Watch us cook<span className="text-accent">.</span>
      </h2>
      <p className="mt-4 max-w-md text-charcoal/70">
        Keep scrolling — every frame is made fresh, just like your order.
      </p>
    </ScrollVideoScrub>
  );
}
