// Sets the headers Cloudflare's edge cache reads. The policy lives in
// src/lib/cache-tags.ts. There is no stale-while-revalidate: with s-maxage
// present Cloudflare ignores it, and an expired page simply re-renders once.
import { defineMiddleware } from "astro:middleware";
import { cachePolicyFor } from "./lib/cache-tags";

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  const hasSession = context.request.headers.get("cookie")?.includes("astro-session=") ?? false;
  const { cacheControl, tags } = cachePolicyFor({ pathname: context.url.pathname, status: response.status, hasSession });

  response.headers.set("Cache-Control", cacheControl);
  // No spaces: Cloudflare's cache tags may not contain them.
  if (tags) response.headers.set("Cache-Tag", tags.join(","));
  else response.headers.delete("Cache-Tag");
  return response;
});
