"use client";

import { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { Quote, Star } from "lucide-react";
import { testimonials } from "@/lib/data";
import { gsap, useGSAP } from "@/lib/gsap";
import { Badge } from "@/components/ui/badge";

/** Auto-playing testimonial carousel (Swiper, fade + crossfade). */
export function Testimonials() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const q = gsap.utils.selector(scope);
      gsap.from(q("[data-testimonial-heading] > *"), {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: { trigger: scope.current, start: "top 75%" },
      });
    },
    { scope },
  );

  return (
    <section ref={scope} className="bg-charcoal py-24 text-cream">
      <div className="mx-auto max-w-7xl px-6">
        <div data-testimonial-heading className="mx-auto max-w-2xl text-center">
          <Badge className="border-accent/40 bg-accent/15 text-orange">
            Wall of love
          </Badge>
          <h2 className="mt-5 font-display text-[clamp(1.95rem,4.6vw,3.25rem)] font-semibold tracking-tight">
            Dar es Salaam is talking<span className="text-accent">.</span>
          </h2>
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <Swiper
            modules={[Autoplay, EffectFade, Pagination]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            autoplay={{ delay: 5200, disableOnInteraction: false }}
            loop
            pagination={{ clickable: true }}
            className="testimonials-swiper !pb-14"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.name}>
                <figure className="flex min-h-[260px] flex-col items-center justify-center text-center">
                  <Quote aria-hidden="true" className="mb-6 size-8 text-orange" />
                  <blockquote className="text-balance font-display text-[clamp(1.3rem,2.8vw,1.875rem)] leading-snug">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-8 flex items-center justify-center gap-3">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      width={44}
                      height={44}
                      className="rounded-full object-cover ring-2 ring-orange/60"
                    />
                    <span className="text-left">
                      <span className="block text-sm font-semibold">{t.name}</span>
                      <span className="block text-xs text-cream/60">{t.area}</span>
                    </span>
                    <span className="ml-2 flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="size-4 fill-orange text-orange" />
                      ))}
                    </span>
                  </figcaption>
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
