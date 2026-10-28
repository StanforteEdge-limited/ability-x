export const REGISTER_URL = "https://bit.ly/AbilityX2026";

export const SITE_URL = "https://abilityx.projectenable.africa";

export const EVENT = {
  edition: "AbilityX 2026",
  forumName: "AbilityX Disability Leadership Forum 2026",
  themeHeadline: "FROM MARGINS TO MARKETS",
  themeSubline: "Africa’s Blueprint for Disability-Inclusive Growth",
  themeFull: "From Margins to Markets: Africa’s Blueprint for Disability-Inclusive Growth",
  dateLine: "Thursday, November 26, 2026 | 9:00 AM",
  venue: "Paradise Event Arena, Alagomeji, Yaba, Lagos",
} as const;

export const FOCUS_AREAS = ["Employment", "Entrepreneurship", "Finance", "Technology", "Policy"] as const;

/**
 * Programme features from the 2025 "four pillars" that are confirmed for 2026.
 * The brief says unconfirmed features must not appear on the live page, so
 * only titles listed here render. Use the exact titles from src/data/home.ts.
 */
export const CONFIRMED_PROGRAMME_FEATURES: string[] = [];

export type NavKey = "home" | "about" | "schedule" | "event-2025" | "blog" | "partner";

export const NAV_ITEMS: ReadonlyArray<{ key: NavKey; label: string; href: string }> = [
  { key: "home", label: "Home", href: "/" },
  { key: "about", label: "About", href: "/about" },
  { key: "schedule", label: "Schedule", href: "/schedule" },
  { key: "event-2025", label: "AbilityX 2025", href: "/events/2025" },
  { key: "blog", label: "Blog", href: "/blog" },
  { key: "partner", label: "Partner With Us", href: "/partner" },
];
