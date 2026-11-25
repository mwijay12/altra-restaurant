"use client";

import { useEffect, useRef, useState, type ComponentPropsWithoutRef } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import { featuredDishes as seedFeaturedDishes, formatTZS, type Dish } from "@/lib/data";
import { getAvailableMenuDishes, MENU_KEY, MENU_UPDATED_EVENT, readMenuDishes } from "@/lib/menu-store";
import { gsap, useGSAP } from "@/lib/gsap";
import { Badge } from "@/components/ui/badge";
import { TransitionLink } from "@/components/layout/transition-link";

/** Dish card with GSAP quickTo image parallax on hover. */
function DishCard({ dish, className }: { dish: Dish; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const card = cardRef.current;
    const img = imgRef.current;
    if (!card || !img) return;

    const xTo = gsap.quickTo(img, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(img, "y", { duration: 0.6, ease: "power3" });

    const onMove = (event: PointerEvent) => {
      const rect = card.getBoundingClientRect();
      xTo(((event.clientX - rect.left) / rect.width - 0.5) * 16);
      yTo(((event.clientY - rect.top) / rect.height - 0.5) * 12);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    card.addEventListener("pointermove", onMove);
    card.addEventListener("pointerleave", onLeave);
    return () => {
      card.removeEventListener("pointermove", onMove);
      card.removeEventListener("pointerleave", onLeave);
    };
  });

  return (
    <div
      ref={cardRef}
      className={
        "group relative w-[min(84vw,360px)] shrink-0 snap-start md:w-[360px] " +
        (className ?? "")
      }
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
        <div ref={imgRef} className="absolute -inset-[8%]">
          <Image
            src={dish.image}
            alt={dish.name}
            fill
            sizes="(max-width: 640px) 280px, 360px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        {dish.tag ? (
          <span className="absolute left-4 top-4 z-10 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur">
            {dish.tag}
          </span>
        ) : null}
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-xl font-semibold">{dish.name}</h3>
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {dish.description}
          </p>
          <p className="mt-2 text-sm font-bold text-accent">
            {formatTZS(dish.price)}
          </p>
        </div>
        <button
          aria-label={`Add ${dish.name} to cart`}
          className="mt-1 grid size-11 shrink-0 cursor-pointer place-items-center rounded-full bg-accent text-accent-foreground shadow-lg shadow-accent/25 transition-transform duration-300 hover:scale-110"
        >
          <Plus className="size-5" />
        </button>
      </div>
    </div>
  );
}

/**
 * Pinned horizontal-scroll section (desktop) / snap carousel (mobile).
 * Progress bar tracks scrub progress; entrance is a staggered reveal.
 */
export function PopularDishes({
  title = "This week's obsessions",
  eyebrow = "Most loved",
  dishes = seedFeaturedDishes,
  ...rest
}: {
  title?: string;
  eyebrow?: string;
  dishes?: Dish[];
} & ComponentPropsWithoutRef<"section">) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);
  const [liveDishes, setLiveDishes] = useState(seedFeaturedDishes);
  const displayedDishes = dishes === seedFeaturedDishes ? liveDishes : dishes;

  useEffect(() => {
    const update = () => {
      setLiveDishes(getAvailableMenuDishes(readMenuDishes()).filter((dish) => dish.featured));
    };
    const onStorage = (event: StorageEvent) => {
      if (event.key === MENU_KEY) update();
    };
    update();
    window.addEventListener(MENU_UPDATED_EVENT, update);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(MENU_UPDATED_EVENT, update);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const syncActiveCard = () => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-dish-card]"));
    if (!cards.length) return;
    const trackLeft = track.getBoundingClientRect().left;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;
    cards.forEach((card, index) => {
      const distance = Math.abs(card.getBoundingClientRect().left - trackLeft);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });
    setActiveCard(closestIndex);
  };

  const moveCarousel = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const firstCard = track.querySelector<HTMLElement>("[data-dish-card]");
    const step = firstCard ? firstCard.getBoundingClientRect().width + 24 : track.clientWidth * 0.85;
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const q = gsap.utils.selector(sectionRef);

      gsap.from(q("[data-dishes-heading] > *"), {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: { trigger: q("[data-dishes-heading]")[0], start: "top 82%" },
      });

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const track = trackRef.current;
        if (!track) return;
        const distance = () =>
          Math.max(0, track.scrollWidth - document.documentElement.clientWidth + 64);

        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressRef.current) {
                progressRef.current.style.transform = `scaleX(${self.progress})`;
              }
            },
          },
        });
      });

      gsap.from(q("[data-dish-card]"), {
        y: 90,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power4.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:flex md:min-h-svh md:flex-col md:justify-center md:py-0"
      {...rest}
    >
      <div
        data-dishes-heading
        className="mx-auto flex w-full max-w-7xl flex-wrap items-end justify-between gap-6 px-6 md:px-10"
      >
        <div>
          <Badge>{eyebrow}</Badge>
          <h2 className="mt-5 font-display text-[clamp(1.95rem,4.6vw,3.25rem)] font-semibold tracking-tight">
            {title}
            <span className="text-accent">.</span>
          </h2>
        </div>
        <TransitionLink
          href="/menu"
          className="group flex items-center gap-2 text-sm font-semibold text-accent"
        >
          View full menu
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </TransitionLink>
      </div>

      <div className="mt-12 md:mt-14">
        <div
          ref={trackRef}
          className="no-scrollbar flex w-full min-w-0 snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain scroll-smooth scroll-pl-6 px-6 pb-4 md:w-max md:overflow-visible md:px-10"
          onScroll={syncActiveCard}
          aria-label="Featured dishes carousel"
          role="region"
          tabIndex={0}
          style={{ touchAction: "pan-x pan-y", WebkitOverflowScrolling: "touch" }}
        >
          {displayedDishes.map((dish) => (
            <div key={dish.id} data-dish-card className="shrink-0 snap-start">
              <DishCard dish={dish} />
            </div>
          ))}

          {/* End card */}
          <div data-dish-card className="flex w-[min(84vw,360px)] shrink-0 snap-start items-center md:w-[360px]">
            <TransitionLink
              href="/menu"
              className="glass group flex h-56 w-full flex-col items-center justify-center gap-3 rounded-3xl text-center transition-colors hover:border-accent/40"
            >
              <span className="text-4xl">🍲</span>
              <span className="font-display text-xl font-semibold">
                See all 1,000+ kitchens
              </span>
              <span className="flex items-center gap-2 text-sm font-semibold text-accent">
                Browse the menu
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </TransitionLink>
          </div>
        </div>
        <div className="mx-6 mt-2 flex items-center justify-between md:hidden">
          <div className="flex items-center gap-2" aria-label={`Slide ${Math.min(activeCard + 1, displayedDishes.length)} of ${displayedDishes.length}`}>
            {displayedDishes.map((dish, index) => (
              <span
                key={dish.id}
                className={`h-1.5 rounded-full transition-all duration-300 ${activeCard === index ? "w-6 bg-accent" : "w-1.5 bg-foreground/20"}`}
              />
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-muted-foreground">Swipe to explore</span>
            <button
              type="button"
              aria-label="Previous dishes"
              onClick={() => moveCarousel(-1)}
              disabled={activeCard === 0}
              className="grid size-10 place-items-center rounded-full border border-border bg-card text-foreground shadow-sm transition hover:border-accent hover:text-accent disabled:opacity-35"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next dishes"
              onClick={() => moveCarousel(1)}
              disabled={activeCard >= displayedDishes.length - 1}
              className="grid size-10 place-items-center rounded-full bg-accent text-accent-foreground shadow-md shadow-accent/20 transition hover:scale-105 disabled:opacity-35"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop scrub progress */}
      <div className="absolute bottom-10 left-10 right-10 hidden h-1 overflow-hidden rounded-full bg-foreground/10 md:block">
        <div
          ref={progressRef}
          className="h-full w-full origin-left scale-x-0 rounded-full bg-accent"
        />
      </div>
    </section>
  );
}
