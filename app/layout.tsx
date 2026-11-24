import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/playfair-display";
import "@fontsource-variable/playfair-display/wght-italic.css";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { TransitionProvider } from "@/components/layout/transition-provider";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";

export const metadata: Metadata = {
  title: {
    default: "Altra — Bold flavour, delivered fast",
    template: "%s · Altra",
  },
  description:
    "Altra delivers from 1,000+ kitchens across Dar es Salaam in 30 minutes. Hot, fresh, fast — free delivery on your first order.",
  keywords: [
    "food delivery",
    "Dar es Salaam",
    "Tanzania",
    "restaurant",
    "Altra",
  ],
  openGraph: {
    title: "Altra — Bold flavour, delivered fast",
    description:
      "1,000+ kitchens across Dar es Salaam, delivered hot in 30 minutes. Free delivery on your first order.",
    type: "website",
    locale: "en_TZ",
    siteName: "Altra",
  },
};

// Applies the saved (or system) theme before first paint — no flash.
const themeInitScript = `(function(){try{var t=localStorage.getItem("altra-theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark");}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-svh bg-background font-sans text-foreground antialiased">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <SmoothScroll>
          <TransitionProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </TransitionProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
