"use client";

import { useState, type SVGProps } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, Check, Flame } from "lucide-react";
import { TransitionLink } from "@/components/layout/transition-link";

/* Brand icons as inline SVG (kept independent of icon-library brand sets) */
function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.7 4.53-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.09 24 18.1 24 12.07Z" />
    </svg>
  );
}

function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.58-6.64 7.58H.46l8.6-9.83L0 1.15h7.6l5.24 6.93 6.06-6.93Zm-1.29 19.5h2.04L6.48 3.24H4.3l13.31 17.41Z" />
    </svg>
  );
}

const socials = [
  { label: "Instagram", Icon: InstagramIcon },
  { label: "Facebook", Icon: FacebookIcon },
  { label: "X", Icon: XIcon },
];

const exploreLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
];

export function Footer() {
  const pathname = usePathname();
  const [subscribed, setSubscribed] = useState(false);

  // The admin workspace is full-viewport — no site chrome there.
  if (pathname === "/admin" || pathname === "/login") return null;

  return (
    <footer className="bg-charcoal text-cream">
      <div className="mx-auto max-w-7xl px-6 pt-20 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <TransitionLink href="/" className="flex items-center gap-2">
              <span className="grid size-9 place-items-center rounded-xl bg-accent text-accent-foreground">
                <Flame className="size-5" />
              </span>
              <span className="font-display text-2xl font-bold tracking-tight">
                Altra<span className="text-accent">.</span>
              </span>
            </TransitionLink>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/60">
              Bold flavour, delivered fast. Dar es Salaam&rsquo;s food, while
              it&rsquo;s still hot.
            </p>
            <div className="mt-6 flex gap-2">
              {socials.map(({ label, Icon }) => (
                <a
                  key={label}
                  href="https://example.com"
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-full border border-white/10 text-cream/70 transition-colors hover:border-accent hover:bg-accent hover:text-cream"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-cream/50">
              Explore
            </h3>
            <ul className="mt-5 space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <TransitionLink
                    href={link.href}
                    className="text-sm text-cream/80 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-cream/50">
              Contact
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-cream/80">
              <li>hello@altra.co.tz</li>
              <li>+255 700 000 000</li>
              <li>
                Masaki, Msasani Peninsula
                <br />
                Dar es Salaam, Tanzania
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-cream/50">
              Fresh drops weekly
            </h3>
            <p className="mt-5 text-sm text-cream/60">
              New kitchens, secret menus, cheeky discounts.
            </p>
            {subscribed ? (
              <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-orange">
                <Check className="size-4" /> You&rsquo;re in. Karibu!
              </p>
            ) : (
              <form
                className="mt-4 flex overflow-hidden rounded-full border border-white/10 bg-white/5 p-1"
                onSubmit={(event) => {
                  event.preventDefault();
                  setSubscribed(true);
                }}
              >
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  aria-label="Email address"
                  className="min-w-0 flex-1 bg-transparent px-4 text-sm text-cream placeholder:text-cream/40 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-full bg-accent text-accent-foreground transition-transform hover:scale-105"
                >
                  <ArrowRight className="size-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Giant wordmark */}
        <p
          aria-hidden="true"
          className="mt-16 select-none text-center font-display text-[clamp(4rem,17vw,15rem)] font-bold leading-none tracking-tight text-cream/10"
        >
          Altra<span className="text-orange/60">.</span>
        </p>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-xs text-cream/50 sm:flex-row">
          <p>© 2026 Altra Foods Ltd — Dar es Salaam, Tanzania.</p>
          <p>Made with heat in DSM 🔥</p>
        </div>
      </div>
    </footer>
  );
}
