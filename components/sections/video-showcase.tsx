"use client";

import { ScrollVideoScrub } from "@/components/ui/scroll-video-scrub";
import { Badge } from "@/components/ui/badge";

/**
 * Scroll-scrubbed kitchen cinema.
 * Clip: "Chef preparing a dessert on a stove" — Mixkit Stock Video Free
 * License (commercial use), mixkit.co/free-stock-video/
 * chef-preparing-a-dessert-on-a-stove-43026
 */
const SCRUB_VIDEO =
  "https://assets.mixkit.co/videos/preview/mixkit-chef-preparing-a-dessert-on-a-stove-43026-large.mp4";
const SCRUB_POSTER =
  "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=1600&q=80&auto=format&fit=crop";

export function VideoShowcase() {
  return (
    <ScrollVideoScrub
      src={SCRUB_VIDEO}
      poster={SCRUB_POSTER}
      scrollLength="+=350%"
    >
      <Badge className="border-accent/40 bg-accent/15 text-orange backdrop-blur-sm">
        From our kitchens
      </Badge>
      <h2 className="mt-6 font-display text-5xl font-semibold text-cream sm:text-6xl md:text-7xl">
        Watch us cook<span className="text-orange">.</span>
      </h2>
      <p className="mt-4 max-w-md text-cream/80">
        Keep scrolling — every frame is made fresh, just like your order.
      </p>
    </ScrollVideoScrub>
  );
}
