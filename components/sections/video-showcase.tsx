"use client";

import { ArrowDown } from "lucide-react";
import { ScrollVideoScrub } from "@/components/ui/scroll-video-scrub";
import { Badge } from "@/components/ui/badge";

/**
 * Scroll-scrubbed kitchen cinema — fully self-hosted.
 * The copy sits in the poster's quiet space, not across the food, and moves
 * to the top on narrow screens where the video is cropped to portrait.
 */
export function VideoShowcase() {
  return (
    <ScrollVideoScrub
      src="/videos/kitchen-scrub.mp4"
      poster="/videos/kitchen-scrub-poster.jpg"
      scrollLength="+=350%"
      tone="light"
    >
      <div className="absolute inset-x-0 top-[max(4.25rem,calc(env(safe-area-inset-top)+2vh))] z-10 mx-auto flex w-full max-w-7xl justify-center px-5 text-center md:bottom-[13vh] md:top-auto md:justify-start md:px-10 md:text-left">
        <div className="max-w-[31rem] rounded-[1.75rem] border border-white/75 bg-[#fff8f0]/80 px-5 py-5 shadow-[0_18px_60px_rgba(92,53,25,0.12)] backdrop-blur-xl sm:px-7 sm:py-6 md:rounded-none md:border-0 md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-none">
          <Badge>From our kitchens</Badge>
          <h2 className="mt-3 font-display text-[clamp(2.5rem,10vw,4.5rem)] font-semibold leading-[0.98] tracking-tight text-charcoal md:mt-5 md:text-[clamp(3.5rem,6vw,5.25rem)]">
            Watch us cook<span className="text-accent">.</span>
          </h2>
          <p className="mx-auto mt-3 max-w-[28rem] text-sm leading-relaxed text-charcoal/75 sm:text-base md:mx-0 md:mt-4">
            Keep scrolling — every frame is made fresh, just like your order.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-accent md:justify-start">
            <ArrowDown className="size-4 animate-bounce" aria-hidden="true" />
            <span>Scroll to watch</span>
          </div>
        </div>
      </div>
    </ScrollVideoScrub>
  );
}
