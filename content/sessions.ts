import type { SessionItem, SessionTrack } from "@/content/types";

export const sessionTracks = [
  {
    id: "official-replays",
    title: "Official Replays",
    sessionCountLabel: "2 videos",
    sessions: [
      {
        id: "abilityx-1-0-livestream-part-1",
        title: "AbilityX 1.0 Livestream Part 1",
        description:
          "Opening sessions, featured speakers, and the first half of the official AbilityX 1.0 replay.",
        youtubeId: "GH018QVgX9g",
        thumbnailLabel: "AbilityX 1.0 livestream part 1 thumbnail",
      },
      {
        id: "abilityx-1-0-livestream-part-2",
        title: "AbilityX 1.0 Livestream Part 2",
        description:
          "Closing panels, community moments, and the second half of the official AbilityX 1.0 replay.",
        youtubeId: "_DwvL6wEUsg",
        thumbnailLabel: "AbilityX 1.0 livestream part 2 thumbnail",
      },
    ],
  },
] satisfies SessionTrack[];

export const allSessions: SessionItem[] = sessionTracks.flatMap(
  (track) => track.sessions,
);
