"use client";

import {
  FloatingFoodHero,
  type FloatingImageProps,
} from "@/components/ui/hero-section-7";

const heroImages: FloatingImageProps[] = [
  {
    src: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80&auto=format&fit=crop",
    alt: "A juicy cheeseburger",
    className:
      "w-40 sm:w-56 md:w-64 top-10 left-4 md:top-20 md:left-20 animate-float",
  },
  {
    src: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=300&q=80&auto=format&fit=crop",
    alt: "Dumplings in a steamer",
    className:
      "w-28 sm:w-36 md:w-48 top-10 right-4 md:top-16 md:right-16 animate-float",
  },
  {
    src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=350&q=80&auto=format&fit=crop",
    alt: "A slice of pepperoni pizza",
    className:
      "w-32 sm:w-40 md:w-56 bottom-8 right-5 md:bottom-16 md:right-20 animate-float",
  },
  {
    src: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300&q=80&auto=format&fit=crop",
    alt: "Fresh salmon sushi rolls",
    className:
      "w-28 sm:w-32 md:w-44 bottom-6 left-4 md:bottom-14 md:left-24 animate-float-slow",
  },
  {
    src: "https://images.unsplash.com/photo-1598511757337-fe2cafc31294?w=200&q=80&auto=format&fit=crop",
    alt: "Fresh basil garnish",
    className: "w-8 sm:w-12 top-1/4 left-1/3 animate-float-slow",
  },
];

export default function FloatingFoodHeroDemo() {
  return (
    <FloatingFoodHero
      eyebrow="Dar es Salaam · 30-minute delivery"
      title="Crave it. Tap it. Taste it."
      description="Altra brings 1,000+ kitchens across Dar es Salaam straight to your door — hot, fresh and fast. Free delivery on your first order."
      images={heroImages}
      primaryAction={{ label: "Order Now", href: "/menu" }}
      secondaryAction={{ label: "Our Story", href: "/about" }}
    />
  );
}
