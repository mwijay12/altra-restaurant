import type { Metadata } from "next";
import { InfoPage } from "@/components/sections/info-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Altra's demo website handles information and browser storage.",
};

export default function PrivacyPage() {
  return (
    <InfoPage
      eyebrow="The fine print, plainly spoken"
      title="Privacy policy"
      updated="24 November 2026"
      intro={<>Your privacy matters. This page explains what this Altra website prototype does with information when you browse or try its demo features.</>}
      notice={<><strong>Prototype notice.</strong> This website is currently a demonstration, not a live ordering service. It does not submit food orders, take payments, or send newsletter sign-ups to Altra. The privacy details below describe the demo as it currently works; they must be reviewed and updated before live customer accounts or ordering are launched.</>}
      sections={[
        {
          title: "Who is responsible?",
          content: <p>Altra is presented as a Dar es Salaam food brand. The legal name and registered address of the business operating this prototype have not been confirmed here. For a privacy question or request, email <a className="font-semibold text-accent underline underline-offset-4" href="mailto:hello@altra.co.tz">hello@altra.co.tz</a>. The operator should publish its full legal identity and a verified privacy contact before launch.</p>,
        },
        {
          title: "What information this demo handles",
          content: <>
            <p><strong className="text-foreground">Admin demo sign-in:</strong> if you use the demo sign-in, the email address and a role/session timestamp are saved in your browser’s local storage to keep the demo session working. The password is not sent to an authentication service or saved by this prototype. Do not use a real password or confidential account.</p>
            <p><strong className="text-foreground">Menu and preferences:</strong> demo menu edits and your display-theme preference may be saved in local storage on your device. They are not a live shared menu database.</p>
            <p><strong className="text-foreground">Newsletter:</strong> the current sign-up interaction is only a visual demo. It does not submit or retain the email address entered.</p>
            <p><strong className="text-foreground">Orders and payments:</strong> the menu/cart controls are illustrative. This prototype does not submit an order or payment.</p>
          </>,
        },
        {
          title: "Cookies, local storage and technical data",
          content: <>
            <p>This prototype uses browser local storage for demo sign-in state, menu customisation and theme preference. You can clear this data through your browser’s site-data controls; clearing it may sign you out and reset demo changes.</p>
            <p>When a website is requested, the hosting provider and internet infrastructure may process technical information such as IP address, browser details and request logs for delivery, security and troubleshooting. The exact providers, retention periods and settings must be confirmed by the site operator. No advertising or analytics feature is intentionally described as part of this demo policy.</p>
          </>,
        },
        {
          title: "How information is used and shared",
          content: <p>Information kept in local storage is used only to make the corresponding demo feature work in your browser. Altra does not receive demo menu edits, theme preferences, or the newsletter field through an application backend. Hosting and security providers may process technical request data as needed to operate the site. If live ordering, analytics, marketing or account services are added, this policy must be revised to identify the data, purpose, providers and legal basis before those features go live.</p>,
        },
        {
          title: "Your choices and privacy requests",
          content: <p>You can clear browser storage at any time. For questions or a request about personal information, contact <a className="font-semibold text-accent underline underline-offset-4" href="mailto:hello@altra.co.tz">hello@altra.co.tz</a>. The business operating Altra should respond in line with applicable data-protection law, including applicable requirements in Tanzania.</p>,
        },
        {
          title: "Changes to this policy",
          content: <p>We will update this page when the demo’s data practices change. Material changes should be made before a new data-collection feature is launched. The date at the top indicates the latest revision.</p>,
        },
      ]}
    />
  );
}
