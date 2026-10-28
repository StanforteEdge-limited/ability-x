const WORDS_PER_MINUTE = 200;

type ShareIcon = "x" | "linkedin" | "facebook" | "whatsapp";

function blockText(block: unknown): string {
  if (!block || typeof block !== "object") return "";
  const { _type, children } = block as { _type?: string; children?: unknown };
  if (_type !== "block" || !Array.isArray(children)) return "";
  return children
    .map((child) => (child && typeof child === "object" ? String((child as { text?: unknown }).text ?? "") : ""))
    .join(" ");
}

export function estimateReadTime(blocks: unknown[] | null | undefined): string {
  const text = (blocks ?? []).map(blockText).join(" ");
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
  return `${minutes} min read`;
}

const dateFormat = new Intl.DateTimeFormat("en", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

export function formatPostDate(date: Date | string | null | undefined): string {
  if (!date) return "";
  const parsed = date instanceof Date ? date : new Date(date);
  return Number.isNaN(parsed.getTime()) ? "" : dateFormat.format(parsed);
}

export function buildShareLinks(
  url: string,
  title: string,
): { label: string; icon: ShareIcon; href: string }[] {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  return [
    {
      label: "Share on X",
      icon: "x",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      label: "Share on LinkedIn",
      icon: "linkedin",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      label: "Share on Facebook",
      icon: "facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      label: "Share on WhatsApp",
      icon: "whatsapp",
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    },
  ];
}
