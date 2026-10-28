import { describe, expect, it } from "vitest";
import { buildShareLinks, estimateReadTime, formatPostDate } from "@/lib/blog";

const words = (n: number) => [
  { _type: "block", children: [{ _type: "span", text: Array(n).fill("w").join(" ") }] },
];

describe("blog helpers", () => {
  it("estimates read time at 200 words a minute, minimum one", () => {
    expect(estimateReadTime(words(450))).toBe("3 min read");
    expect(estimateReadTime(words(200))).toBe("1 min read");
    expect(estimateReadTime([{ _type: "image" }])).toBe("1 min read");
    expect(estimateReadTime([])).toBe("1 min read");
    expect(estimateReadTime(undefined)).toBe("1 min read");
  });

  it("formats post dates without shifting the day", () => {
    expect(formatPostDate("2026-07-29")).toBe("July 29, 2026");
    expect(formatPostDate(new Date("2026-07-29T23:30:00Z"))).toBe("July 29, 2026");
    expect(formatPostDate(null)).toBe("");
    expect(formatPostDate("not a date")).toBe("");
  });

  it("builds the four share links", () => {
    const links = buildShareLinks("https://ability-x.org/blog/a b", "Hi & bye");
    expect(links.map((l) => l.icon)).toEqual(["x", "linkedin", "facebook", "whatsapp"]);
    expect(links[0].href).toBe(
      "https://twitter.com/intent/tweet?url=https%3A%2F%2Fability-x.org%2Fblog%2Fa%20b&text=Hi%20%26%20bye",
    );
    expect(links[3].href).toBe(
      "https://wa.me/?text=Hi%20%26%20bye%20https%3A%2F%2Fability-x.org%2Fblog%2Fa%20b",
    );
  });
});
