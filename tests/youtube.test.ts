import { describe, expect, it } from "vitest";
import {
  getYouTubeEmbedUrl,
  getYouTubeThumbnailUrl,
  isPlaceholderYouTubeId,
} from "@/lib/youtube";

describe("youtube helpers", () => {
  it("builds embed and thumbnail urls from a YouTube id", () => {
    expect(getYouTubeEmbedUrl("abc123xyz")).toBe(
      "https://www.youtube.com/embed/abc123xyz",
    );

    expect(getYouTubeThumbnailUrl("abc123xyz")).toBe(
      "https://img.youtube.com/vi/abc123xyz/hqdefault.jpg",
    );
  });

  it("detects placeholder youtube ids", () => {
    expect(isPlaceholderYouTubeId("placeholdermainstage1")).toBe(true);
    expect(isPlaceholderYouTubeId("abc123xyz")).toBe(false);
  });
});
