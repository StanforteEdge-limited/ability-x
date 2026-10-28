import { describe, expect, it } from "vitest";
import { cachePolicyFor, collectionsForPath, tagsForPath } from "@/lib/cache-tags";

const PUBLIC = "public, max-age=300, s-maxage=2592000";
const policy = (pathname: string, status = 200, hasSession = false) => cachePolicyFor({ pathname, status, hasSession });

describe("collectionsForPath", () => {
  it("maps each page to the collections it shows", () => {
    expect(collectionsForPath("/")).toEqual(["speakers"]);
    expect(collectionsForPath("/events/2025")).toEqual(["speakers"]);
    expect(collectionsForPath("/schedule")).toEqual(["programme", "speakers"]);
    expect(collectionsForPath("/schedule/")).toEqual(collectionsForPath("/schedule"));
    expect(collectionsForPath("/blog")).toEqual(["posts"]);
    expect(collectionsForPath("/blog/why-abilityx-exists")).toEqual(["posts"]);
    expect(collectionsForPath("/about")).toEqual([]);
  });

  it("tags every public page with the chrome and 'all'", () => {
    expect(tagsForPath("/blog/x")).toEqual(["posts", "emdash:settings", "emdash:taxonomy:category", "all"]);
    expect(tagsForPath("/about")).toEqual(["emdash:settings", "emdash:taxonomy:category", "all"]);
  });
});

describe("cachePolicyFor", () => {
  it("caches public pages at the edge with tags", () => {
    expect(policy("/")).toEqual({ cacheControl: PUBLIC, tags: tagsForPath("/") });
    expect(policy("/partner").cacheControl).toBe(PUBLIC);
  });

  it("never caches the admin, login or a signed-in editor's view", () => {
    for (const path of ["/_emdash/admin", "/_emdash/api/content/posts", "/admin", "/admin/", "/login"]) {
      expect(policy(path)).toEqual({ cacheControl: "private, no-store", tags: null });
    }
    expect(policy("/", 200, true)).toEqual({ cacheControl: "private, no-store", tags: null });
  });

  it("caches media for a year, but not a missing file", () => {
    expect(policy("/_emdash/api/media/file/abc.jpg")).toEqual({
      cacheControl: "public, max-age=31536000, immutable",
      tags: null,
    });
    expect(policy("/_emdash/api/media/file/missing.jpg", 404).cacheControl).toBe("no-store");
  });

  it("does not cache the site's own API", () => {
    expect(policy("/api/submit-form")).toEqual({ cacheControl: "no-store", tags: null });
  });

  it("caches a 404 briefly, tagged so a publish at that URL shows up", () => {
    expect(policy("/blog/nope", 404)).toEqual({
      cacheControl: "public, max-age=60, s-maxage=60",
      tags: tagsForPath("/blog/nope"),
    });
    expect(policy("/random-probe", 404).cacheControl).toBe("public, max-age=60, s-maxage=60");
  });

  it("does not cache errors or redirects", () => {
    expect(policy("/blog/x", 500)).toEqual({ cacheControl: "no-store", tags: null });
    expect(policy("/events/1.0", 301)).toEqual({ cacheControl: "public, max-age=86400", tags: null });
  });
});
