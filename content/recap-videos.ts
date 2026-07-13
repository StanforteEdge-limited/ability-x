import type { RecapVideoItem } from "@/content/types";

export const recapVideos = [
  {
    id: "recap-reel",
    label: "Recap Reel",
    description: "Instagram reel - needs re-hosting to embed.",
  },
  {
    id: "main-stage",
    label: "Main Stage Sessions",
    description: "Full Main Stage session recordings from AbilityX 1.0.",
  },
  {
    id: "breakout-sessions",
    label: "Breakout Sessions",
    description: "Breakout A and Breakout B recordings from the 1.0 livestream.",
  },
] satisfies RecapVideoItem[];
