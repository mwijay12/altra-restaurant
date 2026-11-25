"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowRight, HeartHandshake, Leaf, Zap } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { Badge } from "@/components/ui/badge";
import { AnimatedCurve } from "@/components/ui/animated-curve";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { TransitionLink } from "@/components/layout/transition-link";

const stats = [
  { value: 30, suffix: " min", label: "Average delivery time", decimals: 0 },
  { value: 1000, suffix: "+", label: "Partner kitchens", decimals: 0 },
  { value: 250, suffix: "k+", label: "Orders delivered", decimals: 0 },
  { value: 4.9, suffix: "", label: "Average rating", decimals: 1 },
];

const values = [
  {
    icon: Zap,
    title: "Fast by design",
    copy: "Routing, kitchens and handoffs engineered around one number: 30 minutes, door to door.",
  },
  {
    icon: Leaf,
    title: "Fresh by standard",
    copy: "No freezers in our network. Ingredients hit the kitchen the morning they hit your plate.",
  },
  {
    icon: HeartHandshake,
    title: "Fair by default",
    copy: "Riders earn above market, restaurants keep a fair cut, customers pay honest prices.",
  },
];

function ParallaxImage({
  src,
  alt,
  className,
  sizes,
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div
      data-parallax
      className={`relative overflow-hidden rounded-[2.5rem] ${className ?? ""}`}
    >
      <div data-parallax-inner className="absolute inset-x-0 -top-[12%] h-[124%]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes ?? "100vw"}
          priority={priority}
          className="object-cover"
        />
      </div>
    </div>
  );
}

export function AboutSections() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const q = gsap.utils.selector(scope);

      // Generic staggered reveals (batched by viewport entry)
      gsap.set(q("[data-reveal]"), { y: 60, opacity: 0 });
      ScrollTrigger.batch(q("[data-reveal]"), {
        start: "top 85%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power4.out",
            overwrite: true,
          }),
      });

      // Hero intro text
      gsap.from(q("[data-about-intro] > *"), {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power4.out",
      });

      // Image parallax (scrub)
      q("[data-parallax]").forEach((container) => {
        const inner = container.querySelector("[data-parallax-inner]");
        if (!inner) return;
        gsap.fromTo(
          inner,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      // Count-up stats
      q("[data-counter]").forEach((el) => {
        const target = parseFloat(el.dataset.target ?? "0");
        const decimals = parseInt(el.dataset.decimals ?? "0", 10);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onUpdate: () => {
            el.textContent =
              decimals > 0
                ? obj.v.toFixed(decimals)
                : Math.round(obj.v).toLocaleString("en");
          },
        });
      });
    },
    { scope },
  );

  return (
    <div ref={scope}>
      {/* Intro */}
      <section className="mx-auto max-w-4xl px-6 pt-32 text-center lg:px-8">
        <div data-about-intro className="flex flex-col items-center">
          <Badge>Since 2023 · Dar es Salaam</Badge>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            We don&rsquo;t deliver food. We deliver{" "}
            <em className="text-accent">the good part</em> of your day.
          </h1>
          <p className="mt-6 max-w-xl text-balance leading-relaxed text-muted-foreground">
            Altra started with two friends, one scooter and a stubborn belief:
            nobody in this city should eat cold fries ever again.
          </p>
          <AnimatedCurve
            variant="swoop"
            showDot
            className="mt-10 w-full max-w-xl text-accent"
          />
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <ParallaxImage
          className="mt-14 aspect-[16/9]"
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80&auto=format&fit=crop"
          alt="A table full of freshly prepared dishes"
          priority
        />
      </div>

      {/* Story */}
      <section className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div data-reveal>
            <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Born on two wheels<span className="text-accent">.</span>
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              In 2023, Juma and Amina spent their weekends delivering home
              cooking from Amina&rsquo;s mother&rsquo;s kitchen in Mikocheni —
              one scooter, one insulated bag, word of mouth.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Three years later, Altra moves hot food across the whole city:
              1,000+ kitchens from Masaki to Kariakoo, a rider fleet that knows
              every shortcut from Mikocheni to Sinza, and a 30-minute guarantee
              we actually honour.
            </p>
          </div>
          <ParallaxImage
            className="aspect-[4/5]"
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1000&q=80&auto=format&fit=crop"
            alt="Friends laughing together over a shared meal"
          />
        </div>

        <blockquote
          data-reveal
          className="mx-auto mt-24 max-w-3xl text-center"
        >
          <p className="font-display text-3xl font-medium italic leading-snug sm:text-4xl">
            &ldquo;Hot food is a love language. We just happen to speak it at
            40 km/h.&rdquo;
          </p>
          <cite className="mt-4 block text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground not-italic">
            — The Altra founding team
          </cite>
        </blockquote>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              data-reveal
              className="glass rounded-3xl p-8 text-center"
            >
              <p className="font-display text-4xl font-bold text-accent sm:text-5xl">
                <span data-counter data-target={stat.value} data-decimals={stat.decimals}>
                  0
                </span>
                {stat.suffix}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
        <div data-reveal className="mx-auto max-w-2xl text-center">
          <Badge>What we stand for</Badge>
          <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Three rules we never break<span className="text-accent">.</span>
          </h2>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.title}
              data-reveal
              className="glass rounded-3xl p-8 transition-transform duration-500 hover:-translate-y-1"
            >
              <span className="grid size-11 place-items-center rounded-2xl bg-accent text-accent-foreground shadow-lg shadow-accent/25">
                <value.icon className="size-5" />
              </span>
              <h3 className="mt-6 font-display text-2xl font-semibold">
                {value.title}
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {value.copy}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-24 lg:px-8">
        <div
          data-reveal
          className="relative overflow-hidden rounded-[2.5rem] bg-charcoal px-8 py-16 text-center text-cream"
        >
          <div
            aria-hidden="true"
            className="absolute -left-24 -top-24 size-80 rounded-full bg-orange/25 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-24 -right-24 size-80 rounded-full bg-pink/20 blur-3xl"
          />
          <h2 className="relative font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Taste what Dar is raving about<span className="text-accent">.</span>
          </h2>
          <p className="relative mx-auto mt-4 max-w-md text-cream/70">
            Your first order ships free. Hot food, thirty minutes, zero excuses.
          </p>
          <div className="relative mt-8">
            <Magnetic strength={0.2}>
              <TransitionLink href="/menu">
                <Button size="lg" className="group">
                  Order Now
                  <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </TransitionLink>
            </Magnetic>
          </div>
        </div>
      </section>
    </div>
  );
}
