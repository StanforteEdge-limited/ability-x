import type { SpeakerItem } from "@/content/types";

export const speakers = Array.from({ length: 8 }, (_, index) => ({
  id: `speaker-${index + 1}`,
  name: "Speaker Name",
  role: "Title, Organization",
  image: {
    src: "/abilityx/speakers/speaker-placeholder.svg",
    alt: `Portrait placeholder for Speaker ${index + 1}`,
  },
})) satisfies SpeakerItem[];
