import type { Metadata } from "next";
import { InfoPage } from "@/components/sections/info-page";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms for browsing and using the Altra website prototype.",
};

export default function TermsPage() {
  return (
    <InfoPage
      eyebrow="A few ground rules"
      title="Terms of use"
      updated="24 November 2026"
      intro={<>These terms apply when you browse this Altra website. Please read them alongside our <a className="font-semibold text-accent underline underline-offset-4" href="/privacy">Privacy Policy</a>.</>}
      notice={<><strong>Prototype notice.</strong> This is a product and brand demonstration. The website does not currently accept or fulfil orders, process payments, create real customer accounts, or provide a live delivery service. Menu prices, availability, delivery estimates and promotional claims are illustrative and are not an offer to sell.</>}
      sections={[
        {
          title: "Using the website",
          content: <p>You may browse the public pages for personal, lawful use. Do not interfere with the website, attempt to access systems or information you are not authorised to use, introduce malicious code, or use the demo in a way that disrupts other visitors.</p>,
        },
        {
          title: "Demo access and content",
          content: <p>The admin sign-in is a client-side demonstration and is not secure authentication or an access-control system. Demo credentials and changes are not private; do not enter real passwords, confidential information or personal data. Some menu, operational and performance content is sample data and should not be relied upon as a statement of real business activity.</p>,
        },
        {
          title: "Menu, prices and allergens",
          content: <p>Dish names, images, prices, ingredients and availability shown on the prototype may be incomplete or illustrative. No food order is placed by using the menu or cart controls. If Altra launches ordering, final item details, applicable taxes or fees, allergen information and availability will be presented through the live order process.</p>,
        },
        {
          title: "Intellectual property",
          content: <p>Website design, copy, branding and other materials are owned by or used with permission by their respective rights holders. You may not reproduce or commercially exploit them without permission, except where applicable law allows.</p>,
        },
        {
          title: "Availability and liability",
          content: <p>The prototype is provided for demonstration and may change, be interrupted, or contain errors. To the extent permitted by law, Altra disclaims warranties relating to the demo. Nothing in these terms limits rights or liabilities that cannot lawfully be excluded, including applicable consumer protections.</p>,
        },
        {
          title: "Future ordering and changes",
          content: <p>Live orders, payment, delivery, cancellation and refund terms will be published before those services are offered. We may update the prototype or these terms; the revision date above shows when this page was last updated.</p>,
        },
        {
          title: "Applicable law and contact",
          content: <p>These terms are intended to be read consistently with applicable laws of Tanzania and any mandatory protections that apply to you. Questions can be sent to <a className="font-semibold text-accent underline underline-offset-4" href="mailto:hello@altra.co.tz">hello@altra.co.tz</a>. The operating company and registered business address should be confirmed here before commercial launch.</p>,
        },
      ]}
    />
  );
}
