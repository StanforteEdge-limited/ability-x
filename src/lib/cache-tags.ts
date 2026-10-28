/**
 * Cache policy for Cloudflare's zone cache, which sits in front of the VPS.
 *
 * A public page is kept at the edge for 30 days and carries a `Cache-Tag`
 * header naming the CMS collections it shows. The purge plugin
 * (plugins/cloudflare-purge) purges a collection's tag when an editor
 * publishes, so only the pages showing that content are re-rendered.
 *
 * Tags:
 *  - "speakers" / "programme" / "posts": the collections a page shows.
 *  - the chrome: site settings and the blog categories.
 *  - "all": every public page. The emergency switch; EmDash never purges it.
 */

export const CHROME_TAGS = ["emdash:settings", "emdash:taxonomy:category"];

export const ALL_TAG = "all";

const EDGE_MAX_AGE = 2_592_000; // 30 days
const BROWSER_MAX_AGE = 300; // 5 minutes
// Crawlers probe thousands of URLs; a minute is short enough that a page
// published at a probed URL appears almost immediately.
const NOT_FOUND_MAX_AGE = 60;
// Media keys are ULIDs: the file behind a key never changes.
const MEDIA_MAX_AGE = 31_536_000;
const REDIRECT_MAX_AGE = 86_400;

const PRIVATE_PATH = /^\/(_emdash|admin|login)(\/|$)/;
const MEDIA_PATH = /^\/_emdash\/api\/media\/file\//;
const API_PATH = /^\/api(\/|$)/;

export function collectionsForPath(pathname: string): string[] {
  const path = pathname.endsWith("/") ? pathname : `${pathname}/`;
  if (path === "/" || path === "/events/2025/") return ["speakers"];
  if (path === "/schedule/") return ["programme", "speakers"];
  if (path === "/blog/" || path.startsWith("/blog/")) return ["posts"];
  return [];
}

export function tagsForPath(pathname: string): string[] {
  return [...collectionsForPath(pathname), ...CHROME_TAGS, ALL_TAG];
}

export type CachePolicy = { cacheControl: string; tags: string[] | null };

export function cachePolicyFor(input: { pathname: string; status: number; hasSession: boolean }): CachePolicy {
  const { pathname, status, hasSession } = input;

  if (MEDIA_PATH.test(pathname)) {
    // A missing file must not stick around for a year.
    return status === 200
      ? { cacheControl: `public, max-age=${MEDIA_MAX_AGE}, immutable`, tags: null }
      : { cacheControl: "no-store", tags: null };
  }

  // The admin, its API and anything a signed-in editor sees.
  if (PRIVATE_PATH.test(pathname) || hasSession) return { cacheControl: "private, no-store", tags: null };

  if (API_PATH.test(pathname)) return { cacheControl: "no-store", tags: null };

  if (status === 200) {
    return { cacheControl: `public, max-age=${BROWSER_MAX_AGE}, s-maxage=${EDGE_MAX_AGE}`, tags: tagsForPath(pathname) };
  }
  if (status === 404) {
    return { cacheControl: `public, max-age=${NOT_FOUND_MAX_AGE}, s-maxage=${NOT_FOUND_MAX_AGE}`, tags: tagsForPath(pathname) };
  }
  if (status === 301 || status === 308) {
    return { cacheControl: `public, max-age=${REDIRECT_MAX_AGE}`, tags: null };
  }
  return { cacheControl: "no-store", tags: null };
}
