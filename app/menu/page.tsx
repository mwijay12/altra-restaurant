import type { Metadata } from "next";
import { MenuGrid } from "@/components/sections/menu-grid";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Browse Altra's menu — smash burgers, wood-fired pizza, sushi, tacos, ramen and desserts, delivered across Dar es Salaam in 30 minutes.",
};

export default function MenuPage() {
  return <MenuGrid />;
}
