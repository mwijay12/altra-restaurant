import type { ReactNode } from "react";
import { ArrowUpRight, Flame } from "lucide-react";
import { TransitionLink } from "@/components/layout/transition-link";

type InfoSection = {
  title: string;
  content: ReactNode;
};

type InfoPageProps = {
  eyebrow: string;
  title: string;
  intro: ReactNode;
  sections?: InfoSection[];
  children?: ReactNode;
  updated?: string;
  notice?: ReactNode;
};

export function InfoPage({
  eyebrow,
  title,
  intro,
  sections,
  children,
  updated,
  notice,
}: InfoPageProps) {
  return (
    <div className="min-h-[70vh] bg-background pb-20 pt-28 sm:pt-36">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <TransitionLink href="/" className="transition-colors hover:text-accent">Home</TransitionLink>
          <span aria-hidden="true">/</span>
          <span className="text-foreground">{title}</span>
        </div>

        <header className="relative overflow-hidden rounded-[2rem] border border-border bg-card px-6 py-9 shadow-sm sm:px-10 sm:py-12">
          <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-16 size-56 rounded-full bg-accent/10 blur-3xl" />
          <p className="relative mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[.2em] text-accent">
            <Flame className="size-4" aria-hidden="true" /> {eyebrow}
          </p>
          <h1 className="relative max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-6xl">{title}</h1>
          <div className="relative mt-5 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">{intro}</div>
          {updated && <p className="relative mt-6 text-xs font-medium text-muted-foreground">Last updated: {updated}</p>}
        </header>

        {notice && <div className="mt-6 rounded-2xl border border-accent/25 bg-accent/5 p-5 text-sm leading-6 text-foreground">{notice}</div>}

        {children ? (
          <div className="mt-8">{children}</div>
        ) : sections && (
          <div className="mt-8 grid gap-4">
            {sections.map((section, index) => (
              <section key={section.title} className="rounded-2xl border border-border bg-card p-6 sm:p-8">
                <p className="mb-3 text-xs font-bold uppercase tracking-[.16em] text-accent">{String(index + 1).padStart(2, "0")}</p>
                <h2 className="font-display text-2xl font-semibold sm:text-3xl">{section.title}</h2>
                <div className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground sm:text-base">{section.content}</div>
              </section>
            ))}
          </div>
        )}

        <div className="mt-10 flex flex-col gap-4 rounded-2xl bg-charcoal p-6 text-cream sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="font-display text-2xl font-semibold">Need a hand?</p>
            <p className="mt-1 text-sm text-cream/65">Reach the Altra team and we’ll point you in the right direction.</p>
          </div>
          <a href="mailto:hello@altra.co.tz" className="inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-full bg-accent px-5 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.02] sm:self-auto">
            Email Altra <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
