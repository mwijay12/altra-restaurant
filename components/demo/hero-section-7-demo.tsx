"use client";

import {
  FloatingFoodHero,
  type FloatingImageProps,
} from "@/components/ui/hero-section-7";

/**
 * Hero assets — self-hosted transparent food cutouts (/public/images/food)
 * plus a licensed background video (Mixkit Stock Video Free License —
 * "Burger being prepared with french fries", mixkit.co/free-stock-video/
 * burger-being-prepared-with-french-fries-3533).
 */
const heroImages: FloatingImageProps[] = [
  {
    src: "/images/food/burger.png",
    alt: "A juicy cheeseburger cutout",
    width: 341,
    height: 262,
    className:
      "w-44 sm:w-60 md:w-80 top-[13%] left-[-6%] md:top-[14%] md:left-[4%] -rotate-6",
  },
  {
    src: "/images/food/pizza.png",
    alt: "A pepperoni pizza slice cutout",
    width: 620,
    height: 717,
    className:
      "w-24 sm:w-32 md:w-44 top-[7%] right-[2%] md:top-[10%] md:right-[10%] rotate-[14deg]",
  },
  {
    src: "/images/food/taco.png",
    alt: "Two loaded street tacos cutout",
    width: 431,
    height: 318,
    className:
      "w-32 sm:w-44 md:w-60 bottom-[9%] right-[-4%] md:bottom-[12%] md:right-[4%] -rotate-6",
  },
  {
    src: "/images/food/sushi.png",
    alt: "A salmon maki sushi roll cutout",
    width: 222,
    height: 212,
    className:
      "w-20 sm:w-28 md:w-40 bottom-[13%] left-[1%] md:bottom-[15%] md:left-[7%] rotate-3",
  },
  {
    src: "/images/food/basil.png",
    alt: "Fresh basil leaves cutout",
    width: 236,
    height: 263,
    className:
      "w-12 sm:w-16 md:w-24 top-[20%] left-[26%] md:left-[24%] rotate-12",
  },
  {
    src: "/images/food/basil.png",
    alt: "Fresh basil leaves cutout",
    width: 236,
    height: 263,
    className:
      "w-10 sm:w-12 md:w-16 bottom-[28%] right-[24%] -rotate-12",
  },
];

const VIDEO_SRC =
  "https://assets.mixkit.co/videos/preview/mixkit-burger-being-prepared-with-french-fries-3533-large.mp4";
const VIDEO_POSTER =
  "https://images.unsplash.com/photo-1550547660-d9450f859349?w=1600&q=80&auto=format&fit=crop";

export default function FloatingFoodHeroDemo() {
  return (
    <FloatingFoodHero
      eyebrow="Dar es Salaam · 30-minute delivery"
      title="Crave it. Tap it. Taste it."
      description="Altra brings 1,000+ kitchens across Dar es Salaam straight to your door — hot, fresh and fast. Free delivery on your first order."
      images={heroImages}
      videoSrc={VIDEO_SRC}
      videoPoster={VIDEO_POSTER}
      primaryAction={{ label: "Order Now", href: "/menu" }}
      secondaryAction={{ label: "Our Story", href: "/about" }}
    />
  );
}
