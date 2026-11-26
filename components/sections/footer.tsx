"use client";

import { usePathname } from "next/navigation";
import StickerSlapFooter from "@/components/ui/sticker-slap-footer";

export function Footer() {
  const pathname = usePathname();

  // The admin workspace and sign-in are standalone full-viewport screens.
  if (pathname === "/admin" || pathname === "/login") return null;

  return (
    <StickerSlapFooter
      wordmark="Altra"
      email="hello@altra.co.tz"
      address="Dar es Salaam, Tanzania"
      paper="#fff8f0"
      panel="#ff5c00"
      accent="#ffd6c0"
      height="min(88svh, 900px)"
    />
  );
}
