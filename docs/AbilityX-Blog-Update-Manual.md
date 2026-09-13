# AbilityX Blog Update Manual

This site currently uses a code-managed blog. There is no CMS yet. To publish or edit blog posts, update `src/data/blog.ts`, test locally, commit, and push.

## Files Involved

- `src/data/blog.ts` — source of truth for all blog posts.
- `src/app/blog/page.tsx` — blog listing page.
- `src/app/blog/[slug]/page.tsx` — individual blog post page.
- `src/components/layout/site-nav.tsx` — includes the Blog nav link.

Most blog updates should only touch `src/data/blog.ts`.

## Blog Post Shape

Each post in `blogPosts` uses this structure:

```ts
{
  slug: "why-abilityx-exists",
  title: "Why AbilityX Exists",
  excerpt: "Short summary shown on the blog list and used for page metadata.",
  date: "2026-07-29",
  author: "AbilityX Team",
  category: "Movement",
  readTime: "3 min read",
  heroImage: "/abilityx/Extra Pictures/AbilityX-4.jpg",
  content: [
    "First paragraph.",
    "Second paragraph.",
  ],
}
```

## Adding a New Post

1. Open `src/data/blog.ts`.
2. Add a new object inside the `blogPosts` array.
3. Use a unique `slug`. The slug becomes the URL: `/blog/<slug>`.
4. Keep `date` in `YYYY-MM-DD` format.
5. Put each paragraph as a separate string inside `content`.
6. Add `heroImage` if the post should show an image in the header and body.

Example:

```ts
{
  slug: "inclusive-innovation-in-africa",
  title: "Inclusive Innovation in Africa",
  excerpt: "How assistive technology, policy, and capital can accelerate disability inclusion.",
  date: "2026-08-15",
  author: "AbilityX Team",
  category: "Innovation",
  readTime: "4 min read",
  heroImage: "/gallery/Exhibition-floor.jpg",
  content: [
    "Inclusive innovation is strongest when persons with disabilities shape the tools, policies, and systems meant to serve them.",
    "Across Africa, founders, researchers, advocates, and institutions are beginning to treat accessibility as core infrastructure rather than a side issue.",
  ],
}
```

## Editing an Existing Post

1. Find the post object in `src/data/blog.ts` by its `slug` or `title`.
2. Edit the fields directly.
3. Do not change the `slug` after publishing unless you are okay with the old URL breaking.
4. If a slug must change, consider adding a redirect later.

## Images

Images should live in the `public/` folder. Reference them with a root-relative path.

Examples:

```ts
heroImage: "/gallery/Crowd.jpg"
heroImage: "/abilityx/Extra Pictures/AbilityX-4.jpg"
```

The same `heroImage` is used in two places:

- The top banner background on the post page.
- The article body image above the post content.

## Slug Rules

Use lowercase words separated by hyphens.

Good:

```ts
slug: "inclusive-innovation-in-africa"
```

Avoid spaces, punctuation, uppercase letters, and duplicate slugs.

## Share Links

Post pages automatically show share icons for X, LinkedIn, Facebook, and WhatsApp.

Share URLs are generated from:

```ts
process.env.NEXT_PUBLIC_SITE_URL ?? "https://abilityx.projectenable.africa"
```

If production should share `https://ability-x.org`, set this environment variable in Cloudflare:

```bash
NEXT_PUBLIC_SITE_URL=https://ability-x.org
```

## Local Testing

After adding or editing posts, run:

```bash
npm run lint
npm run build
```

To test locally in the browser:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000/blog
http://localhost:3000/blog/<slug>
```

For Cloudflare-specific route testing, run:

```bash
npm run build:cloudflare
npm run preview
```

## Publishing

After testing:

```bash
git add src/data/blog.ts
git commit -m "feat: add blog post"
git push origin development
```

If production deploys from `main`, merge `development` into `main` before expecting the post on the production domain.

## Important Cloudflare Routing Note

Do not add this to `src/app/blog/[slug]/page.tsx`:

```ts
export const dynamicParams = false;
```

It caused valid blog slug pages to return 404 in the OpenNext Cloudflare runtime, even though `next build` listed the pages as generated. Unknown slugs are already handled by `notFound()`.

## Checklist Before Pushing

- New post has a unique slug.
- Date uses `YYYY-MM-DD`.
- Image path starts with `/` and points to a file in `public/`.
- Paragraphs are separate strings in `content`.
- `npm run lint` passes.
- `npm run build` passes.
- `/blog/<slug>` loads locally.
