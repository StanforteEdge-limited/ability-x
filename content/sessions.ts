import type { SessionItem, SessionTrack } from "@/content/types";

export const sessionTracks = [
  {
    id: "abilityx-1-0-recordings",
    title: "AbilityX 1.0 Recordings",
    sessionCountLabel: "3 videos",
    sessions: [
      {
        id: "abilityx-1-0-main-stage",
        title: "Main Stage",
        description:
          "Opening context, keynote moments, plenary conversations, and flagship main-stage sessions from AbilityX 1.0.",
        youtubeId: "ECkUf2QPkzQ",
        thumbnailLabel: "AbilityX 1.0 main stage recording thumbnail",
      },
      {
        id: "abilityx-1-0-breakout-a",
        title: "Breakout A",
        description:
          "Breakout sessions focused on inclusion practice, innovation, and cross-sector problem solving.",
        youtubeId: "Nt_28-5t6A8",
        thumbnailLabel: "AbilityX 1.0 breakout A recording thumbnail",
      },
      {
        id: "abilityx-1-0-breakout-b",
        title: "Breakout B",
        description:
          "Additional breakout sessions, community insights, and closing conversations from the conference day.",
        youtubeId: "_DwvL6wEUsg",
        thumbnailLabel: "AbilityX 1.0 breakout B recording thumbnail",
      },
    ],
  },
] satisfies SessionTrack[];

export const allSessions: SessionItem[] = sessionTracks.flatMap(
  (track) => track.sessions,
);
