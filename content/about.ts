import type { AboutStatItem, HeroAction } from "@/content/types";

export const aboutContent = {
  header: {
    kicker: "About",
    title: "A Decade of Advocacy. Now Building the Future.",
    body: "Who's behind AbilityX, and why it exists.",
  },
  story: {
    kicker: "Project Enable Africa",
    paragraphs: [
      "Project Enable Africa has spent over a decade advocating for the rights, empowerment, and inclusion of persons with disabilities across Africa. AbilityX is where that decade of work meets Africa's technology and innovation ecosystem - a space to move disability inclusion from rhetoric to action.",
      "In partnership with Jobberman Nigeria, AbilityX 1.0 launched in December 2025 as Nigeria's first disability inclusion conference built around technology, data, and the future of work. AbilityX 2.0 continues that work this November - with more partners, more voices, and more at stake.",
    ],
    image: {
      label: "Team Photo Placeholder",
      description: "Placeholder for Project Enable Africa team or founder photography.",
    },
  },
  stats: [
    { value: "10+", label: "Years advocating for disability inclusion across Africa" },
    { value: "2", label: "Organizations behind AbilityX - Project Enable Africa & Jobberman Nigeria" },
  ] satisfies AboutStatItem[],
  cta: {
    kicker: "Get Involved",
    title: "Ready to be part of what's next?",
    actions: [
      { href: "/partner", label: "Partner With Us", variant: "primary" },
      { href: "/#ask", label: "Join the Waitlist", variant: "ghost" },
    ] satisfies HeroAction[],
  },
} as const;
