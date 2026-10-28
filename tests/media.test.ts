import { describe, expect, it } from "vitest";
import { mediaUrl } from "@/lib/media";

describe("mediaUrl", () => {
  it("prefers the storage key, then src", () => {
    expect(mediaUrl({ meta: { storageKey: "abc.jpg" } })).toBe("/_emdash/api/media/file/abc.jpg");
    expect(mediaUrl({ src: "https://x.test/a.jpg" })).toBe("https://x.test/a.jpg");
    expect(mediaUrl({ src: "https://x.test/a.jpg", meta: { storageKey: "k" } })).toBe(
      "/_emdash/api/media/file/k",
    );
  });

  it("returns null when there is no image", () => {
    expect(mediaUrl(null)).toBeNull();
    expect(mediaUrl(undefined)).toBeNull();
    expect(mediaUrl({})).toBeNull();
  });
});
