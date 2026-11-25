import type { Metadata } from "next";
import { InfoPage } from "@/components/sections/info-page";

export const metadata: Metadata = {
  title: "Help & FAQs",
  description: "Answers to common questions about Altra's menu, orders, delivery and demo website.",
};

const faqs = [
  { question: "Can I place a food order on this website?", answer: "Not yet. The menu and cart controls are part of a website prototype and do not submit an order or payment. We will update this page when live ordering is available." },
  { question: "Are the menu prices and delivery times current?", answer: "They are illustrative demo content and are not a live offer. Please do not rely on them for a purchase or delivery." },
  { question: "How do I access the admin demo?", answer: "Use the Login link and the demo guidance on that page. The admin experience is not a secure production system; use only a test email and never reuse a real password." },
  { question: "Why did my menu edits disappear?", answer: "Menu edits are stored in local storage in the browser where you made them. They do not sync to other devices or update a live restaurant menu. Clearing browser site data may remove them." },
  { question: "Does the newsletter form subscribe me?", answer: "No. The current newsletter interaction is a visual prototype and does not send or store your email address." },
  { question: "How do I ask about an order or a privacy concern?", answer: "For a real order placed outside this prototype, contact the business or platform where you placed it. For a question about this website, email hello@altra.co.tz." },
];

export default function HelpPage() {
  return (
    <InfoPage
      eyebrow="Quick answers"
      title="Help & FAQs"
      intro="A few useful answers while Altra’s online experience is being built."
      notice="This site is a prototype, so ordering and delivery are not available through it yet."
    >
      <div className="grid gap-3">
        {faqs.map(({ question, answer }) => (
          <details key={question} className="group rounded-2xl border border-border bg-card p-5 open:border-accent/40 sm:p-6">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold marker:hidden [&::-webkit-details-marker]:hidden">
              {question}
              <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-full bg-accent/10 text-lg text-accent transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">{answer}</p>
          </details>
        ))}
      </div>
    </InfoPage>
  );
}
