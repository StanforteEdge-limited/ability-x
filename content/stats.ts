import type { StatItem } from "@/content/types";

export const stats = [
  { value: "450+", label: "Attendees" },
  { value: "6", label: "Partner Organizations" },
  { value: "5", label: "Media Partners" },
  { value: "24", label: "Speakers" },
] satisfies StatItem[];

export const testimonialPlaceholder = {
  quote:
    "Placeholder testimonial quote from a partner, speaker, or attendee will appear here.",
  attribution: "Name, Title / Organization",
};
