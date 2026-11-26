import { FlavourHero } from "@/components/sections/flavour-hero";
import { Marquee } from "@/components/sections/marquee";
import { Features } from "@/components/sections/features";
import { PopularDishes } from "@/components/sections/popular-dishes";
import { FlavourFlight } from "@/components/sections/flavour-flight";
import { VideoShowcase } from "@/components/sections/video-showcase";
import { SVGPathSection } from "@/components/ui/svg-path-section";
import { Testimonials } from "@/components/sections/testimonials";

export default function Home() {
  return (
    <>
      <FlavourHero />
      <Marquee />
      <Features />
      <PopularDishes />
      <FlavourFlight />
      <SVGPathSection variant="wave" />
      <VideoShowcase />
      <Testimonials />
    </>
  );
}
