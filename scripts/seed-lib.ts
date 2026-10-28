import type { SpeakerItem } from "../src/data/types";
import type { BlogPost } from "./legacy/blog";

const PLACEHOLDER_IMAGE = "/abilityx/speakers/speaker-placeholder.svg";

export type PortableTextBlock = {
  _type: "block";
  _key: string;
  style: "normal";
  markDefs: [];
  children: { _type: "span"; _key: string; text: string; marks: [] }[];
};

export type MediaRef = { $media: { url: string; alt: string; filename: string } };

type SeedEntry = {
  id: string;
  slug?: string;
  status: "published";
  data: Record<string, unknown>;
  taxonomies?: Record<string, string[]>;
  bylines?: { byline: string }[];
};

export function toPortableText(paragraphs: string[]): PortableTextBlock[] {
  return paragraphs.map((text, index) => ({
    _type: "block",
    _key: `p${index}`,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `s${index}`, text, marks: [] }],
  }));
}

export function mediaRef(publicPath: string, alt: string, base: string): MediaRef {
  return {
    $media: {
      url: `${base.replace(/\/$/, "")}${encodeURI(publicPath)}`,
      alt,
      filename: publicPath.split("/").pop() ?? publicPath,
    },
  };
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** The first edition was renamed from "1.0" to "2025", the current one from "2.0" to "2026". */
function renameEditions(text: string): string {
  return text.replaceAll("AbilityX 2.0", "AbilityX 2026").replaceAll("AbilityX 1.0", "AbilityX 2025");
}

const collections = [
  {
    slug: "speakers",
    label: "Speakers",
    labelSingular: "Speaker",
    description: "Speakers for each AbilityX edition. 2026 speakers appear on the homepage.",
    routable: false,
    supports: ["drafts", "revisions", "search"],
    fields: [
      { slug: "name", label: "Full name", type: "string", required: true, searchable: true },
      { slug: "role", label: "Role / title", type: "string", required: true },
      { slug: "organisation", label: "Organisation", type: "string" },
      { slug: "photo", label: "Photo", type: "image" },
      { slug: "session_title", label: "Session title (only once confirmed)", type: "string" },
      {
        slug: "edition",
        label: "Edition",
        type: "select",
        required: true,
        defaultValue: "2026",
        validation: { options: ["2026", "2025"] },
      },
      { slug: "sort_order", label: "Sort order (lower shows first)", type: "integer", defaultValue: 100 },
    ],
  },
  {
    slug: "programme",
    label: "Schedule",
    labelSingular: "Session",
    description: "AbilityX 2026 programme sessions, shown on the Schedule page.",
    routable: false,
    supports: ["drafts", "revisions"],
    fields: [
      { slug: "title", label: "Title", type: "string", required: true, searchable: true },
      {
        slug: "session_type",
        label: "Session type",
        type: "select",
        validation: {
          options: [
            "Registration",
            "Opening",
            "Keynote",
            "Plenary",
            "Panel",
            "Fireside Chat",
            "Breakout",
            "Break",
            "Networking",
            "Awards",
            "Closing",
          ],
        },
      },
      { slug: "start_time", label: "Start time (24h, e.g. 09:00)", type: "string", required: true },
      { slug: "end_time", label: "End time (24h, e.g. 10:30)", type: "string" },
      { slug: "location", label: "Location (e.g. Main Hall)", type: "string" },
      { slug: "description", label: "Description", type: "text" },
      {
        slug: "speakers",
        label: "Speakers",
        type: "reference",
        validation: { targetCollection: "speakers", multiple: true },
      },
    ],
  },
  {
    slug: "posts",
    label: "Blog Posts",
    labelSingular: "Blog Post",
    supports: ["drafts", "revisions", "search", "seo", "scheduling"],
    fields: [
      { slug: "title", label: "Title", type: "string", required: true, searchable: true },
      { slug: "excerpt", label: "Excerpt", type: "text" },
      { slug: "featured_image", label: "Featured image", type: "image" },
      { slug: "content", label: "Content", type: "portableText", searchable: true },
    ],
  },
];

export function buildSeed(input: { speakers: SpeakerItem[]; posts: BlogPost[]; mediaBase: string }) {
  const { mediaBase } = input;

  const speakers: SeedEntry[] = input.speakers.map((speaker, index) => {
    const data: Record<string, unknown> = {
      name: speaker.name,
      role: renameEditions(speaker.role),
      edition: "2025",
      sort_order: index * 10,
    };
    if (speaker.image.src !== PLACEHOLDER_IMAGE) {
      data.photo = mediaRef(speaker.image.src, speaker.image.alt, mediaBase);
    }
    return { id: speaker.id, status: "published", data };
  });

  // Seeds cannot set a publish date, and entries are published in file
  // order, so write the oldest post first to keep the blog's order.
  const sortedPosts = [...input.posts].sort((a, b) => a.date.localeCompare(b.date));
  const posts: SeedEntry[] = sortedPosts.map((post) => {
    const data: Record<string, unknown> = {
      title: renameEditions(post.title),
      excerpt: renameEditions(post.excerpt),
      content: toPortableText(post.content.map(renameEditions)),
    };
    if (post.heroImage) data.featured_image = mediaRef(post.heroImage, post.title, mediaBase);
    return {
      id: `post-${post.slug}`,
      slug: post.slug,
      status: "published",
      data,
      taxonomies: { category: [slugify(post.category)] },
      bylines: [{ byline: "byline-abilityx-team" }],
    };
  });

  const categoryLabels = [...new Set(input.posts.map((post) => post.category))];

  return {
    $schema: "https://emdashcms.com/seed.schema.json",
    version: "1" as const,
    meta: {
      name: "AbilityX",
      description: "AbilityX Disability Leadership Forum: speakers, schedule and blog.",
      author: "Project Enable Africa",
    },
    settings: {
      title: "AbilityX",
      tagline: "From Margins to Markets: Africa’s Blueprint for Disability-Inclusive Growth",
    },
    collections,
    taxonomies: [
      {
        name: "category",
        label: "Categories",
        labelSingular: "Category",
        hierarchical: false,
        collections: ["posts"],
        terms: categoryLabels.map((label) => ({ slug: slugify(label), label })),
      },
    ],
    bylines: [{ id: "byline-abilityx-team", slug: "abilityx-team", displayName: "AbilityX Team" }],
    content: { speakers, posts },
  };
}
