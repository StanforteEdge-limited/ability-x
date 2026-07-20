import { googleFormLinks } from "@/content/form-links";
import type { PartnerBenefit } from "@/content/types";

export const partnerContent = {
  header: {
    kicker: "Partnership",
    title: "Back AbilityX 2.0",
    body: "450+ attendees. 6 partner organizations. 5 media partners. One movement - and it's growing. Join us as a partner for AbilityX 2.0.",
  },
  pitch: {
    kicker: "Why Partner",
    title: "A proven platform, not a first-time bet.",
    benefits: [
      {
        number: "01",
        text: "Direct visibility with Africa's disability inclusion decision-makers.",
      },
      {
        number: "02",
        text: "Association with a proven, credible platform - not a first-time bet.",
      },
      {
        number: "03",
        text: "Flexible partnership tiers (pending - detail to follow).",
      },
      {
        number: "04",
        text: "Early access to speaking, exhibition, and branding opportunities.",
      },
    ] satisfies PartnerBenefit[],
  },
  form: {
    title: "Start a Conversation",
    intro:
      "Open the partnership form to share your organization details and interest area with the AbilityX team.",
    href: googleFormLinks.partner,
    submitLabel: "Open Partner Form",
  },
} as const;
