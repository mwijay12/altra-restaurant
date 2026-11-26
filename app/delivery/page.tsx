import type { Metadata } from "next";
import { InfoPage } from "@/components/sections/info-page";

export const metadata: Metadata = {
  title: "Delivery, Cancellations & Refunds",
  description: "Current delivery and refund information for the Altra website prototype.",
};

export default function DeliveryPage() {
  return (
    <InfoPage
      eyebrow="Good to know"
      title="Delivery & refunds"
      updated="24 November 2026"
      intro="We want the practical details to be clear before anyone places an order."
      notice={<><strong>There is no live ordering on this prototype.</strong> No order, delivery booking or payment is created from this website, so its menu prices and delivery claims are not purchase terms.</>}
      sections={[
        {
          title: "Delivery availability and fees",
          content: <p>Any areas, delivery estimates, fees or free-delivery messages shown on the site are illustrative. Confirmed service areas, actual delivery times, minimum order values and charges will be displayed before checkout if live ordering launches.</p>,
        },
        {
          title: "Changes and cancellations",
          content: <p>This prototype cannot receive or cancel an order. Once a live service is available, the order flow will explain when an order can be changed or cancelled and how to contact the restaurant or delivery team.</p>,
        },
        {
          title: "Refunds and missing items",
          content: <p>No payment is taken on this site, so no refund can be issued for a demo interaction. If you have an issue with an order placed through another provider, contact the provider shown on your receipt. Live Altra order and refund terms will be published before direct ordering is enabled.</p>,
        },
        {
          title: "Food information",
          content: <p>Menu content is for demonstration and may not include complete ingredients or allergen information. If you have an allergy or dietary concern, do not rely on this demo menu; confirm details directly with the food provider before ordering.</p>,
        },
      ]}
    />
  );
}
