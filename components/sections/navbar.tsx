"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Flame, Menu as MenuIcon, Moon, Sun, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { TransitionLink } from "@/components/layout/transition-link";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
];

function Logo() {
  return (
    <TransitionLink href="/" className="group flex items-center gap-2">
      <motion.span
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.1 }}
        className="grid size-9 place-items-center rounded-xl bg-accent text-accent-foreground shadow-lg shadow-accent/30 transition-transform duration-300 group-hover:rotate-12"
      >
        <Flame className="size-5" />
      </motion.span>
      <span className="font-display text-2xl font-bold tracking-tight">
        Altra<span className="text-accent">.</span>
      </span>
    </TransitionLink>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  // The home hero is a full-bleed flavour slider with its own on-canvas
  // navigation — the global chrome would sit on top of the flood colour.
  if (pathname === "/") return null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  // Lock body scroll while the mobile menu is open (Lenis respects it)
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("altra-theme", next ? "dark" : "light");
    } catch {
      // private mode etc.
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-border/70 bg-background/80 backdrop-blur-lg"
            : "bg-transparent",
        )}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 md:h-18 lg:px-8">
          <Logo />

          <div className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <TransitionLink
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
              >
                {link.label}
              </TransitionLink>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="grid size-10 cursor-pointer place-items-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
            >
              {dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
            </button>
            <div className="hidden md:block">
              <Magnetic strength={0.25}>
                <TransitionLink href="/menu">
                  <Button size="sm" className="h-10 px-5">
                    Order Now
                  </Button>
                </TransitionLink>
              </Magnetic>
            </div>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="grid size-10 cursor-pointer place-items-center rounded-full transition-colors hover:bg-foreground/5 md:hidden"
            >
              <MenuIcon className="size-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[60] flex flex-col bg-accent text-accent-foreground"
          >
            <div className="flex h-16 items-center justify-between px-4 sm:px-6">
              <span className="font-display text-2xl font-bold">Altra.</span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid size-10 cursor-pointer place-items-center rounded-full transition-colors hover:bg-black/10"
              >
                <X className="size-6" />
              </button>
            </div>
            <div className="flex flex-1 flex-col items-start justify-center gap-3 px-8">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <TransitionLink
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-5xl font-semibold sm:text-6xl"
                  >
                    {link.label}
                  </TransitionLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.42, duration: 0.5 }}
                className="mt-8"
              >
                <TransitionLink href="/menu" onClick={() => setOpen(false)}>
                  <Button size="lg" variant="charcoal">
                    Order Now — it&rsquo;s free to try
                  </Button>
                </TransitionLink>
              </motion.div>
            </div>
            <p className="px-8 pb-[max(2.5rem,env(safe-area-inset-bottom))] text-sm text-accent-foreground/70">
              Dar es Salaam · Free delivery on first order
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
