import type {
  GalleryPlaceholder,
  HeroAction,
  LeadCaptureCard,
  PillarItem,
} from "@/content/types";
import { googleFormLinks } from "@/content/form-links";

export const homeContent = {
  hero: {
    kicker: "AbilityX 2.0",
    title: "The Movement Returns This November",
    subhead: "Lagos, this November - details to follow.",
    tag: "This November · Lagos",
    actions: [
      { href: "#ask", label: "Partner With Us", variant: "primary" },
      {
        href: "/events/1.0",
        label: "Watch the 1.0 Recap",
        variant: "outline",
      },
    ] satisfies HeroAction[],
  },
  mission: {
    kicker: "The Movement",
    paragraphs: [
      "AbilityX is not just an event. It's a movement. It's Nigeria's leading annual convening focused on the future of disability inclusion - bringing together innovators, policymakers, startups, technologists, donors, civil society, and persons with disabilities to reimagine what inclusive development looks like in Africa.",
      "AbilityX 1.0 brought that vision to life for the first time in December 2025. This November, we're back - bigger, and building on everything 1.0 proved was possible.",
    ],
  },
  gallery: [
    { id: "gallery-1", label: "1.0 Crowd", alt: "Placeholder for AbilityX 1.0 crowd photography.", src: "/gallery/Crowd.jpg"},
    { id: "gallery-2", label: "Stage", alt: "Placeholder for AbilityX 1.0 stage photography.", src:"/gallery/stage.jpg" },
    { id: "gallery-3", label: "Panel", alt: "Placeholder for AbilityX 1.0 panel photography.", src:"/gallery/Panel.jpg"},
    { id: "gallery-4", label: "Networking", alt: "Placeholder for AbilityX 1.0 networking photography.", src:"/gallery/Networking.jpg" },
    { id: "gallery-5", label: "Exhibition Floor", alt: "Placeholder for AbilityX 1.0 exhibition floor photography.", src:"/gallery/Exhibition-floor.jpg"},
    { id: "gallery-6", label: "Speaker Moment", alt: "Placeholder for AbilityX 1.0 speaker photography.", src:"/gallery/Speaker-moment.jpg" },
  ] satisfies GalleryPlaceholder[],
  recap: {
    kicker: "Watch",
    title: "See AbilityX 1.0 for Yourself",
    body: "Highlights from the day - the conversations, the energy, the moment the movement became real.",
    cta: {
      href: "/events/1.0",
      label: "Watch Full Sessions",
      variant: "primary" as const,
    },
  },
  pillarsIntro: {
    kicker: "What To Expect",
    title: "Built on four pillars that work.",
    body: "AbilityX 2.0 builds on the four pillars that made 1.0 work - now with a full year of momentum behind them.",
  },
  pillars: [
    {
      number: "01",
      title: "Inclusive Future Dialogue",
      description:
        "High-level plenary convening Africa's most influential leaders to explore AI, data-driven policy, and inclusive digital economies.",
    },
    {
      number: "02",
      title: "Innovation Labs",
      description:
        "Interactive breakout sessions exploring the future of work, assistive technology, the data revolution, and policy innovation.",
    },
    {
      number: "03",
      title: "Research & Evidence Showcase",
      description:
        "Groundbreaking research on disability inclusion across health, finance, and key sectors in Africa.",
    },
    {
      number: "04",
      title: "AbilityX Impact Awards",
      description:
        "Celebrating excellence in technology, innovation, and leadership advancing next-generation disability inclusion.",
    },
  ] satisfies PillarItem[],
  ask: {
    id: "ask",
    kicker: "Join Us",
    title: "Three ways to be part of 2.0.",
  },
  leadCards: [
    {
      id: "partner",
      title: "Partner With Us",
      description:
        "Sponsor, co-convene, or support AbilityX 2.0. Reach 450+ decision-makers, innovators, and changemakers across Africa's disability inclusion ecosystem.",
      href: googleFormLinks.partner,
      buttonLabel: "Start a Conversation",
      featured: true,
    },
    {
      id: "waitlist",
      title: "Join the Waitlist",
      description:
        "Registration for AbilityX 2.0 opens once dates are confirmed. Be first to know.",
      href: googleFormLinks.waitlist,
      buttonLabel: "Join Waitlist",
    },
    {
      id: "exhibit",
      title: "Exhibit Your Innovation",
      description:
        "Showcase your solution to Africa's top disability inclusion stakeholders. Applications open closer to the event.",
      href: googleFormLinks.exhibit,
      buttonLabel: "Register Interest",
    },
  ] satisfies LeadCaptureCard[],
  speakers: {
    kicker: "1.0 Speakers",
    title: "AbilityX 2.0 speaker lineup coming soon.",
    caption:
      "24 speakers from AbilityX 1.0 - full roster available on request.",
  },
} as const;
