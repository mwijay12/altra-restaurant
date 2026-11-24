"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Flame, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TransitionLink } from "@/components/layout/transition-link";

/** Sticky CTA banner with animated gradient — appears after the hero. */
export function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () =>
      setVisible(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const show = visible && !dismissed;

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          initial={{ y: 140, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 140, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          className="fixed bottom-4 left-4 right-4 z-40 md:bottom-6 md:left-auto md:right-6 md:max-w-md"
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange via-[#ff8a3d] to-pink bg-[length:200%_200%] p-5 shadow-2xl shadow-orange/30 animate-gradient">
            <div className="flex items-center gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-black/20">
                <Flame className="size-6 text-cream" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-display text-lg font-bold text-cream">
                  Hungry right now?
                </p>
                <p className="text-sm text-cream/85">
                  Free delivery on your first order.
                </p>
              </div>
              <TransitionLink href="/menu">
                <Button variant="charcoal" size="sm" className="shrink-0">
                  Order Now
                </Button>
              </TransitionLink>
            </div>
            <button
              onClick={() => setDismissed(true)}
              aria-label="Dismiss banner"
              className="absolute right-3 top-3 grid size-7 cursor-pointer place-items-center rounded-full text-cream/80 transition-colors hover:bg-black/10 hover:text-cream"
            >
              <X className="size-4" />
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
