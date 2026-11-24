"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { categories, dishes, formatTZS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";

type Category = (typeof categories)[number];

/** Animated filterable food grid for /menu (Framer Motion layout animations). */
export function MenuGrid() {
  const [active, setActive] = useState<Category>("All");
  const filtered =
    active === "All" ? dishes : dishes.filter((d) => d.category === active);

  return (
    <section className="mx-auto max-w-7xl px-6 pb-24 pt-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <Badge>The Menu</Badge>
        <h1 className="mt-5 font-display text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl">
          Pick your craving<span className="text-accent">.</span>
        </h1>
        <p className="mt-4 text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "dish" : "dishes"} ready to
          leave a kitchen near you in 30 minutes or less.
        </p>
      </div>

      {/* Filter tabs */}
      <div
        className="mt-10 flex flex-wrap justify-center gap-2"
        role="tablist"
        aria-label="Dish categories"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={active === cat}
            onClick={() => setActive(cat)}
            className={cn(
              "relative cursor-pointer rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
              active === cat
                ? "text-accent-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {active === cat ? (
              <motion.span
                layoutId="menu-tab-pill"
                className="absolute inset-0 rounded-full bg-accent shadow-lg shadow-accent/30"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            ) : null}
            <span className="relative z-10">{cat}</span>
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((dish) => (
            <motion.article
              key={dish.id}
              layout
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 24 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="group"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {dish.tag ? (
                  <span className="absolute left-4 top-4 z-10 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur">
                    {dish.tag}
                  </span>
                ) : null}
              </div>
              <div className="mt-4 flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-xl font-semibold">{dish.name}</h2>
                  <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {dish.description}
                  </p>
                  <p className="mt-2 text-sm font-bold text-accent">
                    {formatTZS(dish.price)}
                  </p>
                </div>
                <button
                  aria-label={`Add ${dish.name} to cart`}
                  className="mt-1 grid size-10 shrink-0 cursor-pointer place-items-center rounded-full bg-accent text-accent-foreground shadow-lg shadow-accent/25 transition-transform duration-300 hover:scale-110"
                >
                  <Plus className="size-5" />
                </button>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* App banner */}
      <div className="mt-24 overflow-hidden rounded-[2.5rem] bg-accent px-8 py-14 text-center text-accent-foreground">
        <h2 className="font-display text-3xl font-semibold sm:text-5xl">
          1,000+ more on the app.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-accent-foreground/85">
          Street legends, hidden gems, five-star kitchens — the whole city, one
          tap away.
        </p>
        <Magnetic strength={0.2} className="mt-8">
          <Button variant="charcoal" size="lg">
            Get the Altra app
          </Button>
        </Magnetic>
      </div>
    </section>
  );
}
