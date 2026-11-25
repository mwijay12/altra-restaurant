import type { Metadata } from "next";
import { InfoPage } from "@/components/sections/info-page";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "Altra's accessibility approach and how to report an accessibility issue.",
};

export default function AccessibilityPage() {
  return (
    <InfoPage
      eyebrow="Made for more people"
      title="Accessibility"
      intro="We want everyone to be able to explore Altra. We are working to make this experience usable with different devices, input methods and assistive technologies."
      notice="This is an ongoing effort; not every part of the prototype has been independently audited."
      sections={[
        {
          title: "What we aim for",
          content: <p>We aim for clear structure and labels, keyboard access to interactive controls, visible focus, readable colour contrast, responsive layouts and respect for reduced-motion preferences. We continue to review these as the experience evolves.</p>,
        },
        {
          title: "Known limitations",
          content: <p>Some visual effects, custom transitions and demo controls may not work equally well with every assistive technology. The admin dashboard is a prototype and should not be relied upon as a production service.</p>,
        },
        {
          title: "Tell us what is getting in the way",
          content: <p>Email <a className="font-semibold text-accent underline underline-offset-4" href="mailto:hello@altra.co.tz?subject=Accessibility%20feedback">hello@altra.co.tz</a> with the page, the issue you encountered and (if you wish) the device or assistive technology you use. Please do not include sensitive personal information.</p>,
        },
      ]}
    />
  );
}
