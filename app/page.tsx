import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { Features } from "@/components/sections/features";
import { PopularDishes } from "@/components/sections/popular-dishes";
import { Testimonials } from "@/components/sections/testimonials";
import { StickyCTA } from "@/components/sections/sticky-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Features />
      <PopularDishes />
      <Testimonials />
      <StickyCTA />
    </>
  );
}
