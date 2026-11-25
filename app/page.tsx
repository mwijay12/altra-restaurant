import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { Features } from "@/components/sections/features";
import { PopularDishes } from "@/components/sections/popular-dishes";
import { VideoShowcase } from "@/components/sections/video-showcase";
import { SVGPathSection } from "@/components/ui/svg-path-section";
import { Testimonials } from "@/components/sections/testimonials";
import { StickyCTA } from "@/components/sections/sticky-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Features />
      <PopularDishes />
      <SVGPathSection variant="wave" />
      <VideoShowcase />
      <Testimonials />
      <StickyCTA />
    </>
  );
}
