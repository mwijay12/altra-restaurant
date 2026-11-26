"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Badge } from "@/components/ui/badge";
import { TransitionLink } from "@/components/layout/transition-link";
import { dishes } from "@/lib/data";

const stories = [
  {
    id: "chipsi-mayai",
    number: "01",
    title: "The Dar original.",
    note: "Chipsi Mayai",
    align: "left",
  },
  {
    id: "mishkaki",
    number: "02",
    title: "Charcoal. Citrus. A little heat.",
    note: "Mishkaki",
    align: "right",
  },
  {
    id: "pilau-beef",
    number: "03",
    title: "Spice that takes its time.",
    note: "Pilau Beef",
    align: "left",
  },
  {
    id: "ugali-sukuma",
    number: "04",
    title: "A taste of home.",
    note: "Ugali & Sukuma Wiki",
    align: "right",
  },
] as const;

const trail = "M 875 72 C 875 145 205 125 170 258 S 145 390 840 432 S 905 615 180 652 S 125 815 820 848 S 900 1012 165 1050";
const mobileTrail = "M 26 0 C 14 120 38 180 25 290 S 16 470 25 580 S 40 790 24 920 S 13 1120 25 1260 S 40 1450 24 1590 S 15 1800 26 2100";

/** Scroll-led editorial food story, with a small Altra ember tracing the story path. */
export function FlavourFlight() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const emberRef = useRef<SVGGElement>(null);
  const shadowRef = useRef<SVGGElement>(null);
  const mobilePathRef = useRef<SVGPathElement>(null);
  const mobileEmberRef = useRef<SVGGElement>(null);
  const mobileShadowRef = useRef<SVGGElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const animateTrail = (path: SVGPathElement | null, ember: SVGGElement | null, shadow: SVGGElement | null) => {
      if (!path || !ember || !shadow) return;
      gsap.to([ember, shadow], {
        motionPath: { path, align: path, alignOrigin: [0.5, 0.5], autoRotate: false },
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          end: "bottom 42%",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
      gsap.fromTo(path, { drawSVG: "0%" }, {
        drawSVG: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "bottom 45%",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
    };

    // Desktop keeps the sweeping side-to-side flight. On phones, a slim
    // vertical rail and smaller ember follow the stacked cards without
    // stretching the desktop route across the tall viewport.
    const media = gsap.matchMedia();
    media.add("(min-width: 768px)", () => animateTrail(pathRef.current, emberRef.current, shadowRef.current));
    media.add("(max-width: 767px)", () => animateTrail(mobilePathRef.current, mobileEmberRef.current, mobileShadowRef.current));

    const cards = Array.from(section.querySelectorAll<HTMLElement>("[data-flavour-card]"));
    cards.forEach((card, index) => {
      gsap.from(card, {
        y: 44,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: index % 2 ? 0.07 : 0,
        scrollTrigger: {
          trigger: card,
          start: "top 88%",
          once: true,
        },
      });
    });
    return () => media.revert();
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden bg-[#fff4e8] py-24 text-[#211811] sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_25%,rgba(255,92,0,0.08),transparent_50%)]" />
      <svg
        aria-hidden="true"
        viewBox="0 0 1000 1120"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 -z-0 hidden h-full w-full overflow-visible opacity-55 md:block"
      >
        <path d={trail} fill="none" stroke="#ff5c00" strokeWidth="2" strokeDasharray="3 11" strokeLinecap="round" opacity=".22" />
        <path ref={pathRef} d={trail} fill="none" stroke="#ff5c00" strokeWidth="2.2" strokeLinecap="round" opacity=".8" />
        <g ref={shadowRef} aria-hidden="true" opacity=".16">
          <ellipse cx="0" cy="20" rx="19" ry="7" fill="#211811" />
        </g>
        <g ref={emberRef} aria-hidden="true">
          <circle r="23" fill="#ff5c00" />
          <circle r="18" fill="#f46b21" />
          <path d="M1 13C-12 4-7-7 1-16c1 7 7 9 7 14 5-4 6-9 5-12 11 11 8 24-2 28-3 1-7 1-10-1Z" fill="#fff8f0" />
          <path d="M1 10c-5-4-3-8 1-12 0 4 4 5 4 8 0 3-2 5-5 4Z" fill="#ff9b59" />
        </g>
      </svg>
      <svg
        aria-hidden="true"
        viewBox="0 0 430 2100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 -z-0 h-full w-full overflow-visible opacity-65 md:hidden"
      >
        <path d={mobileTrail} fill="none" stroke="#ff5c00" strokeWidth="2" strokeDasharray="3 11" strokeLinecap="round" opacity=".22" />
        <path ref={mobilePathRef} d={mobileTrail} fill="none" stroke="#ff5c00" strokeWidth="2.2" strokeLinecap="round" opacity=".8" />
        <g ref={mobileShadowRef} aria-hidden="true" opacity=".15">
          <ellipse cx="0" cy="11" rx="10" ry="4" fill="#211811" />
        </g>
        <g ref={mobileEmberRef} aria-hidden="true">
          <circle r="12" fill="#ff5c00" />
          <circle r="9.2" fill="#f46b21" />
          <path d="M.5 7C-6.3 2-3.8-4 .5-8c.5 3.5 3.5 4.5 3.5 7 2.5-2 3-4.5 2.5-6 5.5 5.5 4 12-1 14-1.5.5-3.5.5-5 0Z" fill="#fff8f0" />
          <path d="M.5 5c-2.5-2-1.5-4 0-6 0 2 2 2.5 2 4s-1 2.5-2 2Z" fill="#ff9b59" />
        </g>
      </svg>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <header className="mx-auto mb-16 max-w-3xl text-center sm:mb-24">
          <Badge>Dar, served</Badge>
          <h2 className="mt-5 font-display text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[1.02] tracking-tight">
            A little heat.<br className="hidden sm:block" /> A lot of heart<span className="text-accent">.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#6f594b] sm:text-base">
            A few familiar favourites from the Altra menu preview. Follow the ember as it drifts from one plate to the next.
          </p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[.13em] text-[#8c7768]">Menu preview · Online ordering is not available yet</p>
        </header>

        <div className="relative z-10 flex flex-col gap-12 sm:gap-16 md:gap-20">
          {stories.map((story) => {
            const dish = dishes.find((item) => item.id === story.id);
            if (!dish) return null;
            const alignRight = story.align === "right";
            return (
              <article
                key={story.id}
                data-flavour-card
                className={`group w-full max-w-[34rem] pl-10 md:pl-0 ${alignRight ? "md:ml-auto md:mr-[4%]" : "md:ml-[4%]"}`}
              >
                <div className="relative aspect-[1.22] overflow-hidden rounded-[1.75rem] bg-[#ead9c8] shadow-[0_22px_70px_rgba(76,47,28,0.12)] sm:rounded-[2.25rem]">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 560px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a120c]/60 via-transparent to-transparent" />
                  <span className="absolute left-5 top-5 rounded-full border border-white/40 bg-black/15 px-3 py-1.5 text-[11px] font-bold tracking-[.15em] text-white backdrop-blur-md">
                    {story.number} <span className="mx-1 opacity-60">/</span> 04
                  </span>
                  <p className="absolute inset-x-5 bottom-5 font-display text-2xl font-semibold leading-tight text-white drop-shadow sm:inset-x-7 sm:bottom-7 sm:text-3xl">
                    {story.note}
                  </p>
                </div>
                <div className={`mt-5 flex items-start justify-between gap-4 px-1 ${alignRight ? "md:flex-row-reverse" : ""}`}>
                  <div className={alignRight ? "md:text-right" : ""}>
                    <p className="text-[10px] font-bold uppercase tracking-[.18em] text-accent">A Dar favourite · {story.number}</p>
                    <h3 className="mt-2 font-display text-xl font-semibold sm:text-2xl">{story.title}</h3>
                  </div>
                  <span aria-hidden="true" className="mt-1 grid size-9 shrink-0 place-items-center rounded-full border border-[#d9c6b5] text-[#765c49] transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        <div className="relative z-10 mt-16 text-center sm:mt-24">
          <TransitionLink href="/menu" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-charcoal px-6 text-sm font-semibold text-cream transition-transform hover:scale-[1.03]">
            Explore the menu preview <ArrowUpRight className="size-4" />
          </TransitionLink>
        </div>
      </div>
    </section>
  );
}
