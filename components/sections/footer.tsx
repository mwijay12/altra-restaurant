"use client";

import { usePathname } from "next/navigation";
import { ArrowUpRight, Flame, Mail } from "lucide-react";
import { TransitionLink } from "@/components/layout/transition-link";

const exploreLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About Altra" },
];

const helpLinks = [
  { href: "/help", label: "Help & FAQs" },
  { href: "/contact", label: "Contact" },
  { href: "/delivery", label: "Delivery & refunds" },
];

const policyLinks = [
  { href: "/privacy", label: "Privacy policy" },
  { href: "/terms", label: "Terms of use" },
  { href: "/accessibility", label: "Accessibility" },
];

function LinkList({ title, links }: { title: string; links: typeof exploreLinks }) {
  return (
    <div>
      <h2 className="text-xs font-bold uppercase tracking-[.18em] text-cream/45">{title}</h2>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <TransitionLink href={link.href} className="text-sm text-cream/75 transition-colors hover:text-accent">{link.label}</TransitionLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const pathname = usePathname();

  // The admin workspace is full-viewport — no site chrome there.
  if (pathname === "/admin" || pathname === "/login") return null;

  return (
    <footer className="bg-charcoal text-cream">
      <div className="mx-auto max-w-7xl px-6 pt-14 sm:pt-20 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-12">
          <div>
            <TransitionLink href="/" className="inline-flex items-center gap-2" ariaLabel="Altra home">
              <span className="grid size-9 place-items-center rounded-xl bg-accent text-accent-foreground"><Flame className="size-5" /></span>
              <span className="font-display text-2xl font-bold tracking-tight">Altra<span className="text-accent">.</span></span>
            </TransitionLink>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/60">Bold flavour and good things, coming to Dar es Salaam.</p>
            <a href="mailto:hello@altra.co.tz" className="mt-5 inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-cream/80 transition-colors hover:text-accent">
              <Mail className="size-4" /> hello@altra.co.tz <ArrowUpRight className="size-3.5" />
            </a>
          </div>

          <LinkList title="Explore" links={exploreLinks} />
          <LinkList title="Help" links={helpLinks} />
          <LinkList title="Information" links={policyLinks} />
        </div>

        <div className="mt-12 overflow-hidden border-t border-white/10 pt-8 sm:mt-16">
          <p aria-hidden="true" className="select-none text-center font-display text-[clamp(4rem,17vw,15rem)] font-bold leading-[.8] tracking-tight text-cream/[.08]">
            Altra<span className="text-orange/50">.</span>
          </p>
        </div>
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-xs text-cream/45 sm:flex-row">
          <p>© {new Date().getFullYear()} Altra · Dar es Salaam, Tanzania.</p>
          <p>Site prototype — online ordering is not yet available.</p>
        </div>
      </div>
    </footer>
  );
}
