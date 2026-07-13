import type { SpeakerItem } from "@/content/types";

export const speakers = Array.from({ length: 8 }, (_, index) => ({
  id: `speaker-${index + 1}`,
  name: "Speaker Name",
  role: "Title, Organization",
})) satisfies SpeakerItem[];
