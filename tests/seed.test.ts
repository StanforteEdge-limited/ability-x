import { describe, expect, it } from "vitest";
import { blogPosts } from "../scripts/legacy/blog";
import { speakers } from "../scripts/legacy/speakers";
import { buildSeed, mediaRef, slugify, toPortableText } from "../scripts/seed-lib";

describe("seed helpers", () => {
  it("turns paragraphs into Portable Text blocks", () => {
    expect(toPortableText(["One", "Two"])).toEqual([
      { _type: "block", _key: "p0", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s0", text: "One", marks: [] }] },
      { _type: "block", _key: "p1", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s1", text: "Two", marks: [] }] },
    ]);
  });

  it("percent-encodes media URLs but keeps the plain filename", () => {
    expect(mediaRef("/abilityx/Team Photo.jpg", "Team", "https://x.test").$media).toEqual({
      url: "https://x.test/abilityx/Team%20Photo.jpg",
      alt: "Team",
      filename: "Team Photo.jpg",
    });
  });

  it("slugifies labels", () => {
    expect(slugify("Movement & Policy")).toBe("movement-policy");
    expect(slugify("  Movement ")).toBe("movement");
  });
});

describe("buildSeed", () => {
  const seed = buildSeed({ speakers, posts: blogPosts, mediaBase: "https://x.test" });

  it("defines the three editable collections", () => {
    expect(seed.collections.map((c) => c.slug)).toEqual(["speakers", "programme", "posts"]);
    expect(seed.taxonomies.map((t) => t.name)).toEqual(["category"]);
  });

  it("imports every 2025 speaker", () => {
    expect(seed.content.speakers).toHaveLength(speakers.length);
    expect(seed.content.speakers.every((s) => s.data.edition === "2025")).toBe(true);
    expect(seed.content.speakers.find((s) => s.id === "mrs-bolaji-alabi")!.data.photo).toBeUndefined();
    expect(seed.content.speakers.find((s) => s.id === "temi-dalley")!.data.photo).toBeDefined();
  });

  it("imports blog posts oldest first so publish order matches", () => {
    const slugs = seed.content.posts.map((p) => p.slug);
    expect(slugs).toEqual([...blogPosts].sort((a, b) => a.date.localeCompare(b.date)).map((p) => p.slug));
    const first = seed.content.posts.find((p) => p.slug === "why-abilityx-exists")!;
    expect(first.data.content).toHaveLength(4);
    expect(first.taxonomies).toEqual({ category: ["movement"] });
    expect(first.bylines).toEqual([{ byline: "byline-abilityx-team" }]);
  });

  it("carries no old edition names", () => {
    expect(JSON.stringify(seed)).not.toMatch(/AbilityX (1|2)\.0/);
  });
});
