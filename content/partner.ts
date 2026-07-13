import type { PartnerBenefit, PartnerInterestOption } from "@/content/types";

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
    intro: "Tell us a bit about you - our partnerships team will follow up shortly.",
    caption: "Partnership tiers to follow - this starts the conversation.",
    successTitle: "Thanks - inquiry sent.",
    successBody:
      "Our partnerships team will follow up shortly to discuss how you can be part of AbilityX 2.0.",
    fields: {
      fullName: "Full name",
      organization: "Organization",
      workEmail: "Work email",
      interestArea: "Interest area",
    },
    submitLabel: "Send Inquiry",
    interestOptions: [
      { label: "Sponsorship", value: "sponsorship" },
      { label: "Co-convening", value: "co-convening" },
      { label: "Media partnership", value: "media-partnership" },
      { label: "Speaking opportunity", value: "speaking-opportunity" },
      { label: "Other", value: "other" },
    ] satisfies PartnerInterestOption[],
  },
} as const;
