import type { AboutStatItem, HeroAction } from "@/content/types";

export const aboutContent = {
  header: {
    kicker: "About",
    title: "A Decade of Advocacy. Now Building the Future.",
    body: "Who's behind AbilityX, why it exists, and what it is building next.",
    imageSrc: "/Team Photo.jpg",
  },
  story: {
    kicker: "Project Enable Africa",
    paragraphs: [
      "Globally, more than 1 billion people - approximately 15% of the world's population - live with some form of disability. In Nigeria, an estimated 35 million persons with disabilities face compounding barriers: inaccessible infrastructure, limited access to education and healthcare, social stigma, and high unemployment. Despite the 2018 enactment of Nigeria's Discrimination Against Persons with Disabilities (Prohibition) Act, implementation remains slow and inconsistent.",
      "AbilityX was born from the transformation of the Disability Inclusion and Leadership (DIAL) Forum - now in its sixth year - into a bolder, next-generation platform for disability inclusion discourse and leadership in Africa. Convened by Project Enable Africa, AbilityX is Nigeria's premier annual conference on the future of disability inclusion: a community-owned, partnership-driven ecosystem that positions persons with disabilities at the center of innovation and leadership, rather than as subjects of charity.",
      "AbilityX 1.0 launched in December 2025 in Lagos, in partnership with Jobberman Nigeria, convening 450+ stakeholders across government, private sector, civil society, and the disability community. AbilityX 2.0 continues that work this November - deepening the partnership ecosystem and raising the bar on measurable outcomes.",
    ],
    image: {
      src: "/Team Photo.jpg",
      alt: "Project Enable Africa team and community photo.",
    },
  },
  stats: [
    { value: "1B+", label: "People globally living with disability" },
    { value: "35M", label: "Estimated persons with disabilities in Nigeria" },
    { value: "15%", label: "Share of the world's population living with disability" },
    { value: "450+", label: "Stakeholders convened at AbilityX 1.0" },
  ] satisfies AboutStatItem[],
  vision: "To position Nigeria as a regional leader in disability-inclusive innovation and technology-driven empowerment.",
  mission:
    "To create a dynamic, youth-focused, community-owned platform that drives cutting-edge solutions, fosters cross-sectoral partnerships, and empowers persons with disabilities as leaders in Africa's digital transformation.",
  objectives: [
    {
      title: "Catalyze Innovation",
      description:
        "Surface practical ideas, tools, and collaborations that advance disability-inclusive innovation in Nigeria and beyond.",
    },
    {
      title: "Drive Policy Transformation",
      description:
        "Turn inclusion commitments into implementation-focused action across institutions, policy conversations, and public systems.",
    },
    {
      title: "Empower Digital Leadership",
      description:
        "Position persons with disabilities as leaders shaping Africa's digital future, not passive beneficiaries of it.",
    },
    {
      title: "Build Strategic Partnerships",
      description:
        "Bring government, private sector, civil society, and the disability community into durable partnership around shared outcomes.",
    },
    {
      title: "Generate Actionable Intelligence",
      description:
        "Translate research, lived experience, and sector evidence into decisions that improve inclusive development practice.",
    },
  ],
  cta: {
    kicker: "Get Involved",
    title: "Ready to be part of what's next?",
    actions: [
      { href: "/partner", label: "Partner With Us", variant: "primary" },
      { href: "/#ask", label: "Join the Waitlist", variant: "ghost" },
    ] satisfies HeroAction[],
  },
} as const;
