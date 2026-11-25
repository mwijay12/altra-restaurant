import type { Metadata } from "next";
import { ArrowUpRight, Mail, MapPin, MessageCircle } from "lucide-react";
import { InfoPage } from "@/components/sections/info-page";

export const metadata: Metadata = {
  title: "Contact Altra",
  description: "Contact the Altra team in Dar es Salaam, Tanzania.",
};

export default function ContactPage() {
  return (
    <InfoPage
      eyebrow="We’re listening"
      title="Talk to Altra"
      intro="Questions about the website, a partnership idea, or feedback for the team? Send us a note and we’ll get back to you."
      notice="This prototype does not accept orders. For an order placed through another service, please contact that service directly."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <a href="mailto:hello@altra.co.tz" className="group rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent/50 sm:p-8">
          <span className="grid size-12 place-items-center rounded-2xl bg-accent/10 text-accent"><Mail className="size-5" aria-hidden="true" /></span>
          <h2 className="mt-6 font-display text-2xl font-semibold">Email us</h2>
          <p className="mt-2 text-sm text-muted-foreground">hello@altra.co.tz</p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-accent">Write an email <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span>
        </a>
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <span className="grid size-12 place-items-center rounded-2xl bg-accent/10 text-accent"><MapPin className="size-5" aria-hidden="true" /></span>
          <h2 className="mt-6 font-display text-2xl font-semibold">Around Dar</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Altra is a Dar es Salaam food brand. A verified street address and phone contact will be published when the service is ready for in-person or delivery orders.</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 sm:col-span-2 sm:p-8">
          <span className="grid size-12 place-items-center rounded-2xl bg-accent/10 text-accent"><MessageCircle className="size-5" aria-hidden="true" /></span>
          <h2 className="mt-6 font-display text-2xl font-semibold">What should I include?</h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">Tell us what you’re asking about and how we can help. Please don’t email payment-card details, passwords, or other sensitive information. For privacy questions, see our <a href="/privacy" className="font-semibold text-accent underline underline-offset-4">Privacy Policy</a>.</p>
        </div>
      </div>
    </InfoPage>
  );
}
