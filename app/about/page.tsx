import type { Metadata } from "next";
import { AboutSections } from "@/components/sections/about-content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Altra's story — born on a scooter in Mikocheni, now delivering hot food from 1,000+ kitchens across Dar es Salaam in 30 minutes.",
};

export default function AboutPage() {
  return <AboutSections />;
}
