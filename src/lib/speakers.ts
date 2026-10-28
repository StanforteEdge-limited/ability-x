const TITLES = new Set(["dr", "mr", "mrs", "ms", "prof"]);

export type IslandSpeaker = {
  id: string;
  name: string;
  role: string;
  image: { src: string; alt: string } | null;
};

export function speakerSubtitle(speaker: {
  role?: string | null;
  organisation?: string | null;
}): string {
  return [speaker.role, speaker.organisation]
    .map((part) => part?.trim())
    .filter(Boolean)
    .join(", ");
}

export function initials(name: string): string {
  const words = name
    .trim()
    .split(/\s+/)
    .filter((word) => word && !TITLES.has(word.replace(/\.$/, "").toLowerCase()));
  if (words.length === 0) return "";
  const first = words[0][0];
  const last = words.length > 1 ? words[words.length - 1][0] : "";
  return `${first}${last}`.toUpperCase();
}
