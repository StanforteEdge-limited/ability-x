import type { SessionItem, SessionTrack } from "@/content/types";

const session = (track: string, index: number) => ({
  id: `${track}-${index}`,
  title: `Session Title ${index}`,
  description:
    "Session description placeholder. Final footage and captions will be sourced from the AbilityX 1.0 livestream archive.",
  youtubeId: `placeholder${track.replace(/-/g, "")}${index}`,
  thumbnailLabel: "YouTube Session Thumbnail",
});

export const sessionTracks = [
  {
    id: "main-stage",
    title: "Main Stage",
    sessionCountLabel: "4 sessions",
    sessions: [
      session("main-stage", 1),
      session("main-stage", 2),
      session("main-stage", 3),
      session("main-stage", 4),
    ],
  },
  {
    id: "breakout-a",
    title: "Breakout A",
    sessionCountLabel: "3 sessions",
    sessions: [
      session("breakout-a", 1),
      session("breakout-a", 2),
      session("breakout-a", 3),
    ],
  },
  {
    id: "breakout-b",
    title: "Breakout B",
    sessionCountLabel: "3 sessions",
    sessions: [
      session("breakout-b", 1),
      session("breakout-b", 2),
      session("breakout-b", 3),
    ],
  },
] satisfies SessionTrack[];

export const allSessions: SessionItem[] = sessionTracks.flatMap(
  (track) => track.sessions,
);
