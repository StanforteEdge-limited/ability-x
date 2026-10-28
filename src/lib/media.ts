type MediaValue = { src?: string; meta?: { storageKey?: string } } | null | undefined;

/**
 * URL for a CMS image field. Images picked from the media library carry no
 * `src`, only `meta.storageKey`, so resolve that first. Use this wherever an
 * image has to leave EmDash's <Image> component (React islands, OG tags).
 */
export function mediaUrl(image: MediaValue): string | null {
  const storageKey = image?.meta?.storageKey;
  if (storageKey) return `/_emdash/api/media/file/${storageKey}`;
  return image?.src || null;
}
