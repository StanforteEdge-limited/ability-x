# AbilityX: Next.js → Astro + EmDash (VPS) Migration Implementation Plan

> **For agentic workers (Opencode):** Work task by task, in order. Steps use checkbox (`- [ ]`) syntax; tick them as you go. Each task ends with a commit. Do not start a task until the previous task's verification passes. If a command's output differs from "Expected", stop and fix it before moving on. Server-side steps (Tasks 12–13) are run **by the owner**: give them one command per line, never ask for secret values in chat.

> **Status (2026-10-28):** implemented directly on `development` (Opencode was busy). Owner decisions that override the text below:
> - Production domain is **ability-x.org** (not abilityx.projectenable.africa); staging is **vps.ability-x.org**.
> - The VPS runs Virtualmin. Port 4321 is the default, but check it's free (`ss -ltnp`).
> - The owner runs the server commands; deploys are automatic from GitHub (`development` = check, `main` = deploy).
> - Current code backed up to the branch `backup/nextjs-2026-10-28`; the new code goes to `development`.
> - Programme features are still unconfirmed → hidden.
> - The nav has a **Schedule** item (route `/schedule`; `/programme` redirects there).
> - CMS email is sent from `abilityx@projectenable.africa`.
> - See `docs/AbilityX-VPS-Runbook.md` for the final server steps.

**Goal:** Replace the Next.js/OpenNext Worker with an Astro 7 + EmDash CMS site running on the owner's existing VPS (Node + SQLite) behind Cloudflare. Only **Speakers**, **Programme** (schedule) and **Blog** are editable in the CMS. Apply the AbilityX 2026 content brief.

**Architecture:** One Astro project in server mode with the Node adapter (`mode: "standalone"`), run as a single systemd process on `127.0.0.1`, proxied by nginx, which accepts traffic from Cloudflare only. EmDash stores three collections (`speakers`, `programme`, `posts`) in a SQLite file. Media goes to an R2 bucket through the S3 API. Cloudflare caches public HTML at the edge: a Cache Rule plus `Cache-Control`/`Cache-Tag` headers set in middleware, and a small EmDash plugin purges by tag when content is published. All other copy stays hardcoded in Astro pages and `src/data/*.ts`. Interactive pieces (carousels, modals, forms, lightbox, animated stats, hero slideshow) are the existing React components, moved off `next/*` and mounted as Astro islands.

**Tech Stack:** Astro 7, EmDash 1.x (`emdash`, `emdash/db` sqlite, `emdash/astro` s3/local/memoryCache), `@astrojs/node`, `@astrojs/react`, React 19, Tailwind CSS 4 (`@tailwindcss/vite`), Vitest 3, Node 24 (fnm), nginx, systemd, Cloudflare (proxied DNS, Cache Rule, purge-by-tag, R2), npm.

**Spec:**
- User request: "Convert it to an EmDash/Astro app with only the Speakers, Schedule (Programme), and Blog as editable content", deployed to the existing VPS (the owner has Workers Free only).
- Content brief: `docs/AbilityX_2026_Website_Content_Update_Brief.docx.md`. Read it in full before Task 5.
- EmDash docs: https://docs.emdashcms.com. Check any API you are unsure of there, not from memory.
- **Reference implementation (same stack, in production):** `/Users/olalekan/Projects/securityfocus` (branch `main`). Copy and adapt from it where a task says so: `astro.config.mjs`, `src/middleware.ts`, `src/lib/cache-tags.ts`, `src/lib/media.ts`, `plugins/cloudflare-purge/`, `plugins/resend-email/`, `deploy/*`, `scripts/deploy-vps.sh`, `scripts/backup-vps.sh`, `docs/vps-runbook.md`. Rename every `securityfocus` identifier, path and domain. Remove anything for features AbilityX does not have (Google sign-in, WordPress legacy redirects, widget areas, tags, feeds, archives).

## Global Constraints

- Work on branch `feat/emdash-astro`, created from `development`. Never commit to `main` or `development` directly.
- Package manager: **npm** (the repo has `package-lock.json`). The reference repo uses pnpm. Translate its `pnpm` commands to `npm`/`npx` and never add a pnpm lockfile.
- Before installing, run `npm view <pkg> version` for `astro`, `emdash`, `@astrojs/node`, `@astrojs/react`, `@tailwindcss/vite`. Pin each with `^<major.minor>`. Match the reference repo's majors where they agree.
- Runtime: Node 24. `output: "server"`. No `getStaticPaths` for CMS content.
- **No Astro cache provider, no `routeRules`, no `Astro.cache.set(...)` anywhere.** With a provider configured, EmDash bypasses its own query cache. Caching is EmDash's `memoryCache` plus Cloudflare's edge.
- `DATABASE_PATH`, `SESSION_DIR` and `EMDASH_SITE_URL` are **baked in at build time**. Set them in the build env file as well as the runtime env file.
- Run exactly one Node process. SQLite has a single writer, and EmDash's scheduler runs in-process.
- Secrets come from `process.env` at runtime (`/etc/abilityx.env` on the server, `.env` locally). Never commit them.
- CMS image fields are objects. Render them with `<Image image={...} />` from `emdash/ui` in `.astro` files. Media-library images have **no `src`**, only `meta.storageKey`. Anywhere a URL string is needed (React islands, OG tags), use `mediaUrl()` (Task 2).
- `entry.id` is the slug (URLs). `entry.data.id` is the ULID (API calls).
- Registration link everywhere: **`https://bit.ly/AbilityX2026`**, opened in a new tab with `rel="noreferrer"`.
- Event facts, verbatim from the brief: theme **"From Margins to Markets: Africa’s Blueprint for Disability-Inclusive Growth"**; **"AbilityX Disability Leadership Forum 2026"**; **"Thursday, November 26, 2026 | 9:00 AM"**; **"Paradise Event Arena, Alagomeji, Yaba, Lagos"**.
- Naming: the current edition is "AbilityX 2026" and the first edition is "AbilityX 2025". These must not appear in rendered copy: "AbilityX 2.0", "AbilityX 1.0", "2.0"/"1.0" used as edition names, "Join the Waitlist", "opens once dates are confirmed".
- Keep the existing visual design (colours, Nunito display font, DM Sans body font, spacing, Tailwind classes). This is a port, not a redesign.
- Use `<a>` and `<img>` in place of `next/link` and `next/image`. Add `loading="lazy" decoding="async"` to every image except the hero.
- Domains: production `abilityx.projectenable.africa`; staging `vps.abilityx.projectenable.africa`.

## Review Focus

1. **Speaker without a photo** (several 2025 speakers have none): the card shows an initials placeholder, never a broken image or `[object Object]`. Unit test in Task 2 (`initials`); render check in Tasks 5 and 6.
2. **Programme session with a malformed time** (an editor types "9am" or leaves the end time blank): the session still renders, sorts after valid times, and shows the raw text. Tests in Task 2 (`sortSessions`, `formatTimeRange`).
3. **No published 2026 speakers or programme sessions yet**: the section shows a "to be announced" message and a Register button, not an empty grid. Page checks in Tasks 5 and 7.
4. **Signed-in editor or admin page served from the edge cache**, or a visitor shown an editor's cached view: `/_emdash/*`, `/admin`, `/login` and any request carrying an `astro-session` cookie get `private, no-store` with no `Cache-Tag`. Tests in Task 10 (`cachePolicyFor`).
5. **Library image with no `src`** (every image uploaded after launch): `mediaUrl` resolves `meta.storageKey`, so OG images and React-island photos don't go blank. Test in Task 2.
6. **Seed media URLs with spaces** (for example `Team Photo.jpg`, `Kemi Shonubi -  Head of People...jpg`): `$media.url` is percent-encoded so EmDash can download the file. Test in Task 3 (`mediaRef`).
7. **Unknown blog slug**: `/blog/does-not-exist` returns HTTP 404 (not 500) with a 60-second edge TTL. Checked in Task 8 and the Task 12 smoke test.

---

## File Structure

```
astro.config.mjs                 # Node adapter, sqlite, s3|local storage, memoryCache, plugins
.env.example                     # local dev env names (no values)
src/live.config.ts               # EmDash live collection loader (boilerplate)
src/middleware.ts                # Cache-Control / Cache-Tag per response (from reference)
src/lib/cache-tags.ts            # tag groups per path + cachePolicyFor() (from reference, trimmed)
plugins/cloudflare-purge/        # native plugin: purge Cloudflare by tag on publish (from reference)
plugins/resend-email/            # native plugin: EmDash invites/magic links via Resend (from reference)
seed/seed.json                   # GENERATED by scripts/build-seed.ts; schema + migrated content
scripts/build-seed.ts, scripts/seed-lib.ts
scripts/legacy/speakers.ts       # moved from src/data/speakers.ts (seed input only)
scripts/legacy/blog.ts           # moved from src/data/blog.ts (seed input only)
scripts/deploy-vps.sh            # pull, npm ci, build, restart, origin smoke test
scripts/backup-vps.sh            # sqlite .backup + integrity_check + rclone to R2
deploy/abilityx.service          # systemd unit
deploy/nginx-abilityx.conf       # nginx vhost (Cloudflare-only origin)
deploy/abilityx.env.example      # runtime env names
deploy/abilityx.build.env.example# build env names
deploy/sudoers-abilityx          # restart-only sudo rule
deploy/cloudflare-ips.txt        # copied from reference; refresh from cloudflare.com/ips
src/config/event.ts              # 2026 event constants, nav items
src/lib/{programme,speakers,blog,forms,media}.ts   # pure helpers
src/lib/{cn,youtube,carousel-state,email,googleSheets}.ts   # kept as-is
src/styles/global.css            # ported from src/app/globals.css
src/layouts/BaseLayout.astro
src/components/astro/            # Container, PillButton, SectionHeading, PageBanner, SiteNav, SiteFooter, SpeakerCard, home/*
src/components/react/            # ported islands + HeroSlideshow, QuoteCarousel, FormModalButton
src/data/                        # quotes, gallery, awards, sessions (2025 recordings), types, home — static
src/pages/index.astro, about.astro, partner.astro, programme.astro, events/2025.astro
src/pages/blog/index.astro, blog/[slug].astro, admin.astro, login.astro, 404.astro
src/pages/api/submit-form.ts
docs/AbilityX-VPS-Runbook.md, docs/AbilityX-CMS-Editor-Guide.md
tests/*.test.ts
```

Deleted: `src/app/**`, `next.config.ts`, `next-env.d.ts`, `open-next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `wrangler.toml`, `tsconfig.tsbuildinfo`, `cloudflare-env.d.ts` (if present), `src/components/{home,layout,ui,event}` and `src/components/InquiryForm.tsx` (after porting), `docs/AbilityX-Blog-Update-Manual.md`, `docs/deploy-nextjs-to-cloudflare.md`.

---

### Task 1: Scaffold Astro + EmDash (Node + SQLite), remove Next.js

**Files:**
- Create: `astro.config.mjs`, `src/live.config.ts`, `src/styles/global.css`, `src/layouts/BaseLayout.astro` (minimal), `src/pages/index.astro` (placeholder), `.env.example`
- Modify: `package.json`, `tsconfig.json`, `.gitignore`, `vitest.config.ts`
- Delete: the Next.js files listed above. Keep `src/components`, `src/data` and `src/lib` for later tasks; just stop importing them.
- Test: existing `tests/youtube.test.ts`, `tests/carousel-state.test.ts`

**Interfaces:**
- Produces: `BaseLayout.astro` props `{ title: string; description?: string }` (extended in Task 4); the `@/*` alias → `src/*`; the npm scripts below.

- [ ] **Step 1: Branch and baseline**

```bash
git checkout development && git pull && git checkout -b feat/emdash-astro
npm test
```
Expected: 2 test files pass.

- [ ] **Step 2: Swap dependencies.** Uninstall `next`, `@opennextjs/cloudflare`, `eslint`, `eslint-config-next`, `@tailwindcss/postcss`, `wrangler`. Install `astro`, `emdash`, `@astrojs/node`, `@astrojs/react`, `react`, `react-dom`, `jose`. Install dev deps `@tailwindcss/vite`, `tailwindcss@^4`, `@astrojs/check`, `typescript`, `vitest`, `tsx`, `@types/react`, `@types/react-dom`, `@types/node`. Add `"engines": { "node": ">=24" }`.

- [ ] **Step 3: Scripts**

```json
"scripts": {
  "dev": "astro dev",
  "build": "astro build",
  "start": "node ./dist/server/entry.mjs",
  "check": "astro check",
  "test": "vitest run",
  "seed:build": "tsx scripts/build-seed.ts",
  "seed:validate": "emdash seed seed/seed.json --validate"
}
```

- [ ] **Step 4: `astro.config.mjs`.** Copy `/Users/olalekan/Projects/securityfocus/astro.config.mjs`, then:
  - `siteUrl`: `process.env.NODE_ENV === "production" ? (process.env.EMDASH_SITE_URL ?? "https://abilityx.projectenable.africa") : undefined`.
  - `databasePath = process.env.DATABASE_PATH ?? "./data/emdash.db"`. Storage: `s3()` when `S3_BUCKET` is set, otherwise `local({ directory: process.env.MEDIA_DIR ?? "./data/uploads", baseUrl: "/_emdash/api/media/file" })`. Keep the `EMDASH_STORAGE` override.
  - Keep `session: { driver: sessionDrivers.fsLite({ base: process.env.SESSION_DIR ?? "./.astro/sessions" }) }`, `objectCache: memoryCache({ defaultTtl: 3_600, revalidate: 0 })`, `trustedProxyHeaders: ["cf-connecting-ip", "x-forwarded-for"]`, `toolbar: "client"`.
  - `admin: { logo: "/abilityx/logo-primary.png", siteName: "AbilityX", footerLabel: "AbilityX", favicon: "/favicon.svg" }`.
  - **Remove** `authProviders`/`google`. For now, leave `plugins: []` (Task 11 adds the two plugins).
  - Add `vite: { plugins: [tailwindcss()] }` and `redirects: { "/events/1.0": { status: 301, destination: "/events/2025" } }`.
  - Keep the reference's comments that explain *why* (no cache provider, baked paths); delete the ones about Security Focus specifics.

- [ ] **Step 5: `src/live.config.ts`:** the EmDash boilerplate (`_emdash: defineLiveCollection({ loader: emdashLoader() })`).

- [ ] **Step 6: Styles and minimal layout.** Move `src/app/globals.css` to `src/styles/global.css` without changes. In `BaseLayout.astro` `<head>`, load Google Fonts Nunito (700, 800, 900) and DM Sans (400, 500, 700) with `display=swap`. Set `--font-display` and `--font-body` on `:root` to those families so the existing `font-display`/`font-sans` tokens keep working. Render `<html lang="en" class="h-full antialiased">` and `<body class="min-h-full bg-white font-sans text-brand-black">`, and include `EmDashHead`, `EmDashBodyStart` and `EmDashBodyEnd` from `emdash/ui`. `index.astro` renders `<BaseLayout title="AbilityX"><h1>AbilityX</h1></BaseLayout>`.

- [ ] **Step 7: Config files.**
  - `tsconfig.json`: extend `astro/tsconfigs/strict`; `include: [".astro/types.d.ts", "emdash-env.d.ts", "src/**/*", "scripts/**/*", "tests/**/*", "plugins/**/*"]`; `jsx: "react-jsx"`; `jsxImportSource: "react"`; `paths: { "@/*": ["./src/*"] }`.
  - `.gitignore`: add `.astro/`, `dist/`, `data/`, `.env`; remove the `.next`/`.open-next`/`.wrangler` entries.
  - `.env.example` lists `EMDASH_ENCRYPTION_KEY`, `RESEND_API_KEY`, `GOOGLE_CLIENT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_SHEET_ID`, `DATABASE_PATH`, `SESSION_DIR`. Generate a local `EMDASH_ENCRYPTION_KEY` into `.env` using the method in the EmDash docs, and copy the form secrets from `.env.local`.
  - `vitest.config.ts`: keep the `@` alias.

- [ ] **Step 8: Verify**

Run: `npm test` → Expected: 2 files pass.
Run: `npm run dev` and open `http://localhost:4321/` → Expected: an "AbilityX" heading in Nunito. Open `/_emdash/admin` → Expected: the EmDash setup wizard. **Do not complete it yet.** (If Astro 7 dev runs as a background daemon, logs are in `.astro/dev.log`. If deps 404 after installs, run `astro dev stop && rm -rf node_modules/.vite && astro dev`.)
Run: `npm run build && DATABASE_PATH=./data/emdash.db node ./dist/server/entry.mjs`, then open `http://localhost:4321/` → Expected: the same page from the production build.

- [ ] **Step 9: Commit**: `git add -A && git commit -m "chore: replace Next.js with Astro + EmDash on Node/SQLite"`

---

### Task 2: Pure helpers (event config, programme, speakers, media, blog, forms)

**Files:**
- Create: `src/config/event.ts`, `src/lib/programme.ts`, `src/lib/speakers.ts`, `src/lib/media.ts`, `src/lib/blog.ts`, `src/lib/forms.ts`
- Test: `tests/programme.test.ts`, `tests/speakers.test.ts`, `tests/media.test.ts`, `tests/blog.test.ts`, `tests/forms.test.ts`

**Interfaces:**
- Produces:
  - `src/config/event.ts`:
    - `export const REGISTER_URL = "https://bit.ly/AbilityX2026"`.
    - `export const EVENT = { edition: "AbilityX 2026", forumName: "AbilityX Disability Leadership Forum 2026", themeHeadline: "FROM MARGINS TO MARKETS", themeSubline: "Africa’s Blueprint for Disability-Inclusive Growth", themeFull: "From Margins to Markets: Africa’s Blueprint for Disability-Inclusive Growth", dateLine: "Thursday, November 26, 2026 | 9:00 AM", venue: "Paradise Event Arena, Alagomeji, Yaba, Lagos" } as const`.
    - `export const FOCUS_AREAS = ["Employment", "Entrepreneurship", "Finance", "Technology", "Policy"] as const`.
    - `export const CONFIRMED_PROGRAMME_FEATURES: string[] = []`: titles from the old pillars list that the client confirms. Empty means hide them.
    - `export type NavKey = "home" | "about" | "event-2025" | "blog" | "partner" | "programme"`.
    - `export const NAV_ITEMS = [{ key: "home", label: "Home", href: "/" }, { key: "about", label: "About", href: "/about" }, { key: "event-2025", label: "AbilityX 2025", href: "/events/2025" }, { key: "blog", label: "Blog", href: "/blog" }, { key: "partner", label: "Partner With Us", href: "/partner" }] as const`.
  - `src/lib/programme.ts`:
    - `parseTime(value: string | null | undefined): number | null`: minutes since midnight. Accepts `"HH:MM"` 24-hour only.
    - `formatTime(value: string): string`: `"09:00"` → `"9:00 AM"`. Invalid input → the raw input, trimmed.
    - `formatTimeRange(start: string, end?: string | null): string`: joins with a spaced en dash ` – `.
    - `sortSessions<T extends { start_time: string; title: string }>(items: T[]): T[]`: valid times ascending, invalid times after them, ties broken by title. Does not mutate the input.
  - `src/lib/speakers.ts`:
    - `speakerSubtitle(s: { role?: string | null; organisation?: string | null }): string`: non-empty parts joined with `", "`.
    - `initials(name: string): string`: first letter of the first and last word, uppercase, max 2 letters. Skips the titles `Dr`, `Mr`, `Mrs`, `Ms`, `Prof`.
    - `type IslandSpeaker = { id: string; name: string; role: string; image: { src: string; alt: string } | null }`.
  - `src/lib/media.ts`: `mediaUrl(image: { src?: string; meta?: { storageKey?: string } } | null | undefined): string | null`. Returns `/_emdash/api/media/file/${meta.storageKey}` when there is a storageKey, else `src`, else `null`. The reference's `src/lib/media.ts` does the same job; use it as a guide.
  - `src/lib/blog.ts`:
    - `estimateReadTime(blocks: unknown[] | null | undefined): string`: counts words in `children[].text` of `_type: "block"` items at 200 wpm, rounds up, minimum 1, returns `"N min read"`.
    - `formatPostDate(date: Date | string | null | undefined): string`: `Intl.DateTimeFormat("en", { year: "numeric", month: "long", day: "numeric" })`. Empty string for null or invalid input.
    - `buildShareLinks(url: string, title: string): { label: string; icon: "x" | "linkedin" | "facebook" | "whatsapp"; href: string }[]`: the same four links and URL patterns as `git show development:"src/app/blog/[slug]/page.tsx"` (lines 90–111).
  - `src/lib/forms.ts`:
    - `type FormType = "partner" | "waitlist" | "exhibit"`.
    - `validateFormBody(body: unknown): { ok: true; formType: FormType; fields: Record<string, string> } | { ok: false; error: string }`.
    - `buildRow(formType, fields, timestamp: string): (string | number)[]`.
    - `buildEmailHtml(formType, fields): string`.
    - Move `SHEET_RANGES`, `SUBJECT_LABELS` and `RECIPIENTS` verbatim from `git show development:src/app/api/submit-form/route.ts`. Rows and email HTML must come out byte-identical to the old route.

- [ ] **Step 1: Write failing tests**

```ts
// tests/programme.test.ts
expect(parseTime("09:00")).toBe(540);
expect(parseTime("9am")).toBeNull();
expect(parseTime("")).toBeNull();
expect(formatTime("13:30")).toBe("1:30 PM");
expect(formatTime("00:05")).toBe("12:05 AM");
expect(formatTime(" 9am ")).toBe("9am");
expect(formatTimeRange("09:00", "10:30")).toBe("9:00 AM – 10:30 AM");
expect(formatTimeRange("09:00", null)).toBe("9:00 AM");
const input = [
  { start_time: "11:00", title: "B" }, { start_time: "9am", title: "Bad" },
  { start_time: "09:00", title: "Z" }, { start_time: "09:00", title: "A" },
];
expect(sortSessions(input).map((s) => s.title)).toEqual(["A", "Z", "B", "Bad"]);
expect(input[0].title).toBe("B");

// tests/speakers.test.ts
expect(speakerSubtitle({ role: "CEO", organisation: "Lafiami" })).toBe("CEO, Lafiami");
expect(speakerSubtitle({ role: "CEO", organisation: "" })).toBe("CEO");
expect(speakerSubtitle({})).toBe("");
expect(initials("Dr Kolawole Olugbodi")).toBe("KO");
expect(initials("Temi Dalley")).toBe("TD");
expect(initials("Cher")).toBe("C");

// tests/media.test.ts
expect(mediaUrl({ meta: { storageKey: "abc.jpg" } })).toBe("/_emdash/api/media/file/abc.jpg");
expect(mediaUrl({ src: "https://x.test/a.jpg" })).toBe("https://x.test/a.jpg");
expect(mediaUrl({ src: "https://x.test/a.jpg", meta: { storageKey: "k" } })).toBe("/_emdash/api/media/file/k");
expect(mediaUrl(null)).toBeNull();
expect(mediaUrl({})).toBeNull();

// tests/blog.test.ts
const words = (n: number) => [{ _type: "block", children: [{ _type: "span", text: Array(n).fill("w").join(" ") }] }];
expect(estimateReadTime(words(450))).toBe("3 min read");
expect(estimateReadTime([])).toBe("1 min read");
expect(estimateReadTime(undefined)).toBe("1 min read");
expect(formatPostDate("2026-07-29")).toBe("July 29, 2026");
expect(formatPostDate(null)).toBe("");
const links = buildShareLinks("https://abilityx.projectenable.africa/blog/a b", "Hi & bye");
expect(links.map((l) => l.icon)).toEqual(["x", "linkedin", "facebook", "whatsapp"]);
expect(links[0].href).toBe("https://twitter.com/intent/tweet?url=https%3A%2F%2Fabilityx.projectenable.africa%2Fblog%2Fa%20b&text=Hi%20%26%20bye");

// tests/forms.test.ts
expect(validateFormBody({ formType: "partner", name: "A", email: "a@b.co" }).ok).toBe(true);
expect(validateFormBody({ formType: "partner", name: "A" })).toEqual({ ok: false, error: "Missing required fields" });
expect(validateFormBody({ formType: "exhibit", contactPerson: "A", email: "a@b.co" }).ok).toBe(true);
expect(validateFormBody({ formType: "waitlist", name: "A", email: "a@b.co" }).ok).toBe(false); // phone required
expect(validateFormBody({ formType: "nope", name: "A", email: "a@b.co" }).ok).toBe(false);
expect(validateFormBody(null).ok).toBe(false);
// buildRow: one assertion per form type, expected arrays copied from the old route's row construction
```

`formatPostDate("2026-07-29")` must not shift by a day in negative-offset timezones. Parse date-only strings as UTC and format with `timeZone: "UTC"`.

- [ ] **Step 2: Run** `npm test` → Expected: the 5 new files FAIL (modules not found).
- [ ] **Step 3: Implement** the six modules.
- [ ] **Step 4: Run** `npm test` → Expected: all 7 files PASS.
- [ ] **Step 5: Commit**: `git add src/config src/lib tests && git commit -m "feat: add event config and pure helpers"`

---

### Task 3: CMS schema and seed (Speakers, Programme, Blog)

**Files:**
- Create: `scripts/seed-lib.ts`, `scripts/build-seed.ts`, `seed/seed.json` (generated and committed)
- Move: `src/data/speakers.ts` → `scripts/legacy/speakers.ts` and `src/data/blog.ts` → `scripts/legacy/blog.ts`. Change their `@/data/types` imports to relative paths.
- Test: `tests/seed.test.ts`

**Interfaces — the schema every later task uses (field slugs are exact):**

**Collection `speakers`** (label "Speakers", singular "Speaker"; supports `drafts`, `revisions`, `search`):
| slug | type | notes |
|---|---|---|
| `name` | string | required, searchable |
| `role` | string | required. Job title; the 2025 rows carry the full legacy role string here |
| `organisation` | string | |
| `photo` | image | |
| `session_title` | string | only once confirmed (brief §7) |
| `edition` | select | options `["2026", "2025"]`, required |
| `sort_order` | integer | lower comes first |

**Collection `programme`** (label "Programme", singular "Session"; supports `drafts`, `revisions`):
| slug | type | notes |
|---|---|---|
| `title` | string | required |
| `session_type` | select | `["Registration", "Opening", "Keynote", "Plenary", "Panel", "Fireside Chat", "Breakout", "Break", "Networking", "Awards", "Closing"]` |
| `start_time` | string | required. Label "Start time (24h, e.g. 09:00)" |
| `end_time` | string | Label "End time (24h, e.g. 10:30)" |
| `location` | string | e.g. "Main Hall" |
| `description` | text | |
| `speakers` | reference | `validation: { targetCollection: "speakers", multiple: true }` |

**Collection `posts`** (label "Blog Posts", singular "Blog Post"; supports `drafts`, `revisions`, `search`, `seo`, `scheduling`):
| slug | type | notes |
|---|---|---|
| `title` | string | required, searchable |
| `excerpt` | text | |
| `featured_image` | image | |
| `content` | portableText | searchable |

- **Taxonomy** `category`: label "Categories", singular "Category", `hierarchical: false`, `collections: ["posts"]`. Terms are the distinct legacy `category` values, slugified.
- **Byline** `{ id: "byline-abilityx-team", slug: "abilityx-team", displayName: "AbilityX Team" }`.
- **Settings** `{ title: "AbilityX", tagline: "From Margins to Markets: Africa’s Blueprint for Disability-Inclusive Growth" }`.
- **No menus, widget areas or sections.** Navigation and all other copy are not editable.

**Seed content:**
- Each legacy speaker becomes a `speakers` entry with `edition: "2025"`, `sort_order` = index × 10 and `slug` = legacy `id`. Set `photo` to `mediaRef(...)`, except when the legacy image is the placeholder SVG; then omit `photo`.
- Each legacy blog post becomes a `posts` entry with `status: "published"`, `slug` = legacy slug, `content` = `toPortableText(content)`, `featured_image` from `heroImage` when there is one, `taxonomies: { category: [slugify(category)] }` and `bylines: [{ byline: "byline-abilityx-team" }]`. Set the published date from the legacy `date`. Check the EmDash seed docs for the entry-level key. If none exists, say so in the commit message so the dates get fixed in the admin.
- No `programme` content (the 2026 programme is not out yet).
- While building, replace "AbilityX 2.0" → "AbilityX 2026" and "AbilityX 1.0" → "AbilityX 2025" in post text and speaker roles.

**Helpers:**
- `scripts/seed-lib.ts` exports:
  - `toPortableText(paragraphs: string[]): PortableTextBlock[]`
  - `mediaRef(publicPath: string, alt: string, base: string): { $media: { url: string; alt: string; filename: string } }`: url = `base + encodeURI(publicPath)`; filename = the last path segment, unencoded.
  - `slugify(value: string): string`
  - `buildSeed(input: { speakers: SpeakerItem[]; posts: BlogPost[]; mediaBase: string }): Seed`
- `scripts/build-seed.ts` reads `--media-base`, writes `seed/seed.json` with 2-space indent. The default base is `https://abilityx.projectenable.africa`: the live Next site keeps serving `/public` until cutover, so EmDash can download the images from it on both the laptop and the VPS.

- [ ] **Step 1: Write failing tests** (`tests/seed.test.ts`)

```ts
expect(toPortableText(["One", "Two"])).toEqual([
  { _type: "block", _key: "p0", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s0", text: "One", marks: [] }] },
  { _type: "block", _key: "p1", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s1", text: "Two", marks: [] }] },
]);
expect(mediaRef("/abilityx/Team Photo.jpg", "Team", "https://x.test").$media).toEqual({
  url: "https://x.test/abilityx/Team%20Photo.jpg", alt: "Team", filename: "Team Photo.jpg",
});
expect(slugify("Movement & Policy")).toBe("movement-policy");
const seed = buildSeed({ speakers: legacySpeakers, posts: legacyPosts, mediaBase: "https://x.test" });
expect(seed.collections.map((c) => c.slug)).toEqual(["speakers", "programme", "posts"]);
expect(seed.content.speakers).toHaveLength(legacySpeakers.length);
expect(seed.content.speakers.every((s) => s.data.edition === "2025")).toBe(true);
expect(seed.content.speakers.find((s) => s.slug === "mrs-bolaji-alabi")!.data.photo).toBeUndefined();
expect(seed.content.posts.find((p) => p.slug === "why-abilityx-exists")!.data.content).toHaveLength(4);
expect(JSON.stringify(seed)).not.toMatch(/AbilityX (1|2)\.0/);
```

- [ ] **Step 2: Run** `npm test` → Expected: `seed.test.ts` FAILS.
- [ ] **Step 3: Implement** `scripts/seed-lib.ts` and `scripts/build-seed.ts`, and move the two legacy files.
- [ ] **Step 4: Run** `npm test` → PASS. Run `npm run seed:build && npm run seed:validate` → Expected: no validation errors.
- [ ] **Step 5: Apply locally.** Start dev and open `http://localhost:4321/_emdash/api/setup/dev-bypass` (applies the schema and sample content). In `/_emdash/admin`, confirm the three collections exist, every legacy speaker is present with photos showing, and Blog Posts has 3 entries, each with a category. Restart dev and confirm `emdash-env.d.ts` declares `speakers`, `programme` and `posts`.
- [ ] **Step 6: Commit**: `git add scripts seed tests/seed.test.ts emdash-env.d.ts src/data && git commit -m "feat: add EmDash schema and seed for speakers, programme and blog"`

---

### Task 4: Layout, navigation, footer and ported UI

**Files:**
- Create: `src/components/astro/{Container,PillButton,SectionHeading,PageBanner,SiteNav,SiteFooter,SpeakerCard}.astro`
- Create: `src/components/react/`. Move `ui/carousel.tsx`, `ui/modal.tsx`, `ui/lightbox.tsx`, `ui/animated-stat-value.tsx`, `InquiryForm.tsx` and `event/*.tsx` here. Add `HeroSlideshow.tsx`, `QuoteCarousel.tsx` and `FormModalButton.tsx`.
- Create: `public/favicon.svg`: the "X" mark on a `#0D0D0D` rounded square, matching `git show development:src/app/icon.tsx`.
- Modify: `src/layouts/BaseLayout.astro`
- Delete: `src/components/{home,layout,ui,event}` and `src/components/InquiryForm.tsx` once moved.

**Interfaces:**
- Consumes: `REGISTER_URL`, `EVENT`, `NAV_ITEMS`, `NavKey`, `initials`, `speakerSubtitle` (Task 2).
- Produces:
  - `BaseLayout.astro` props `{ title: string; description?: string; active?: NavKey; image?: string; noindex?: boolean }`. Renders `SiteNav`, `<slot />`, then `SiteFooter`. Title is `title === "AbilityX" ? title : \`${title} | AbilityX\``. Includes OG/Twitter tags; `image` must be an absolute URL.
  - `SpeakerCard.astro` props `{ name: string; role?: string | null; organisation?: string | null; sessionTitle?: string | null; photo?: object | null }`. Renders the photo with `<Image image={photo} />`. With no photo, it renders a `bg-brand-subtle` tile showing `initials(name)` in `font-display`.
  - `FormModalButton.tsx` props `{ formType: "exhibit" | "partner"; label: string; title: string; className?: string }`: a button that opens `Modal` with `InquiryForm` inside.
  - `QuoteCarousel.tsx` props `{ quotes: SpeakerQuoteItem[] }`: the shuffle and carousel from the old homepage's Speakers section (`git show development:src/app/page.tsx`).
  - `HeroSlideshow.tsx` props `{ images: string[]; intervalMs?: number }`: only the cross-fading background layers from `hero-section.tsx`. With `prefers-reduced-motion` it shows the first image and does not cycle.

- [ ] **Step 1: Port the React components.** Replace `next/image` with `<img>`. Keep `className`; a `fill` image becomes `absolute inset-0 h-full w-full object-cover …`. Replace `next/link` with `<a>`. Drop `"use client"`. Fix the `@/` imports.
- [ ] **Step 2: Astro primitives.** Translate `container`, `pill-button`, `section-heading`, `page-banner` and `site-footer` 1:1 into `.astro`, keeping the same classes and variants.
- [ ] **Step 3: `SiteNav.astro`.** Same markup as `site-nav.tsx`, with items from `NAV_ITEMS` (brief §1: Home | About | AbilityX 2025 | Blog | Partner With Us | Register). "Register" is the right-hand red pill (`bg-brand-red text-white`) with `href={REGISTER_URL} target="_blank" rel="noreferrer"`. The mobile secondary nav lists the same five links, and Register stays visible as the pill.
- [ ] **Step 4: `SiteFooter.astro`.** Links: AbilityX 2025, Programme (`/programme`), Blog, Partner With Us, Register (external).
- [ ] **Step 5: Verify.** `npm run check` → 0 errors. `npm test` → PASS. In dev, `/` shows 5 nav links plus a red Register pill pointing at `https://bit.ly/AbilityX2026`. At 375px wide, nothing scrolls horizontally.
- [ ] **Step 6: Commit**: `git add -A && git commit -m "feat: port layout, navigation and interactive components to Astro"`

---

### Task 5: Homepage per the 2026 brief

**Files:**
- Replace: `src/pages/index.astro`
- Create: `src/components/astro/home/*.astro` (names below), `src/data/home.ts` (gallery, stats and impact arrays moved out of the old `page.tsx`)

**Interfaces:**
- Consumes: `EVENT`, `REGISTER_URL`, `FOCUS_AREAS`, `CONFIRMED_PROGRAMME_FEATURES` (Task 2); `SpeakerCard`, `FormModalButton`, `QuoteCarousel`, `HeroSlideshow`, `AnimatedStatValue` (Task 4); the `speakers` collection (Task 3).

The section order follows the brief's "Suggested homepage order". Copy every heading, paragraph, label and button **verbatim** from the brief section listed.

| # | Component | Brief § | Notes |
|---|---|---|---|
| 1 | `Hero.astro` | §2 | Kicker `EVENT.forumName`, H1 "FROM MARGINS TO MARKETS", subline, date line, venue. Primary pill "Register for AbilityX 2026" → `REGISTER_URL`; outline pill "Partner With Us" → `/partner`. No recap button. `HeroSlideshow client:load` with the existing four images. |
| 2 | `Movement.astro` | §3 | Kicker "The Movement" and both paragraphs verbatim. Keep the masonry photo gallery. |
| 3 | `Focus.astro` | §4 | Kicker "AbilityX 2026 Focus", H2 "Inclusion must lead to opportunity.", two paragraphs, `FOCUS_AREAS` as pills. |
| 4 | `WhoShouldAttend.astro` | §5 | Paragraph, bold callout, Register button. |
| 5 | `WhatToExpect.astro` | §6 | Four cards: Bold conversations / Real connections / Ideas to action / Opportunities. Old pillar cards render only for titles in `CONFIRMED_PROGRAMME_FEATURES` (none by default). Link "See the programme →" to `/programme`. |
| 6 | `Speakers2026.astro` | §7 | `getEmDashCollection("speakers", { where: { edition: "2026" }, orderBy: { sort_order: "asc" } })`, rendered as a `SpeakerCard` grid. With **zero entries**: heading "AbilityX 2026 speakers", "Speakers will be announced soon." and a Register button. |
| 7 | `Impact2025.astro` | §8 | Lead-in verbatim. Four stats labelled "Stakeholders engaged", "Media reach", "Breakout sessions", "Partner organisations". Button "Watch the AbilityX 2025 Recap" → `/events/2025`. Then the team-photo "Relive" block, retitled for AbilityX 2025. |
| 8 | `ImpactBeyond.astro` | §9 | The existing four impact cards, then `QuoteCarousel client:visible` headed "Voices from AbilityX 2025" with the footnote "Verified quotes from AbilityX 2025 speakers, pulled directly from the conference report." |
| 9 | `WaysToJoin.astro` | §10 | `id="ask"`. Cards in order: Attend (featured, dark) → "Register Now" (`REGISTER_URL`); Partner → "Partner With Us" (`/partner`); Exhibit → `FormModalButton client:visible formType="exhibit" label="Register Interest" title="Exhibit at AbilityX 2026"`. |
| 10 | `FinalCta.astro` | §11 | "BE IN THE ROOM.", paragraph, edition/date/venue, "REGISTER FOR ABILITYX 2026" button, and `bit.ly/AbilityX2026` as visible text. |

- [ ] **Step 1: Build** the 10 components and compose `index.astro` (`<BaseLayout title="AbilityX" active="home" description={EVENT.themeFull}>`).
- [ ] **Step 2: Verify with no 2026 speakers.** Sections appear in the order above. Section 6 shows "Speakers will be announced soon." The Exhibit button opens the form modal. Every Register link goes to `https://bit.ly/AbilityX2026`.
Run: `grep -rnE "AbilityX (1|2)\.0|Waitlist|waitlist|opens once dates|The Movement Returns|November 2026\. Lagos" src/pages/index.astro src/components/astro` → Expected: no output.
- [ ] **Step 3: Verify with 2026 speakers.** In the admin, publish one 2026 speaker with a photo and one without. Reload: both cards render, and the one without a photo shows initials. Delete both afterwards.
- [ ] **Step 4: Commit**: `git commit -m "feat: rebuild homepage around AbilityX 2026 brief"`

---

### Task 6: AbilityX 2025 page (`/events/2025`)

**Files:**
- Create: `src/pages/events/2025.astro`
- Modify: `src/components/react/event-media-tabs.tsx` and the speaker list it renders (accept `IslandSpeaker[]`; a `null` image renders the initials tile). In `src/data/sessions.ts` and `src/data/gallery.ts`, rename "AbilityX 1.0" → "AbilityX 2025" in titles, labels and alt text.

**Interfaces:**
- Consumes: the `speakers` collection; `IslandSpeaker`, `speakerSubtitle`, `initials`, `mediaUrl` (Task 2).

- [ ] **Step 1: Port** `git show development:src/app/events/1.0/page.tsx` 1:1, renaming the edition labels (banner kicker "AbilityX 2025", "Awards Presented at AbilityX 2025", "Explore AbilityX 2025"). Fetch speakers with `getEmDashCollection("speakers", { where: { edition: "2025" }, orderBy: { sort_order: "asc" } })`. Map them server-side to `IslandSpeaker`: `role: speakerSubtitle(e.data)`, and `image: url ? { src: url, alt: e.data.photo?.alt || \`Portrait of ${e.data.name}.\` } : null` where `url = mediaUrl(e.data.photo)`. Mount `EventMediaTabs client:visible`.
- [ ] **Step 2: Verify.** `/events/2025`: the speaker tab lists every 2025 speaker with a photo or initials, and the videos, gallery lightbox and press tab all work. `/events/1.0` returns a 301 to `/events/2025`. Check with `node -e 'fetch("http://localhost:4321/events/1.0",{redirect:"manual"}).then(r=>console.log(r.status,r.headers.get("location")))'`.
- [ ] **Step 3: Commit**: `git commit -m "feat: move first-edition page to /events/2025 with CMS speakers"`

---

### Task 7: Programme page (`/programme`)

**Files:**
- Create: `src/pages/programme.astro`, `src/components/astro/ProgrammeList.astro`

**Interfaces:**
- Consumes: the `programme` collection and its `speakers` references; `sortSessions`, `formatTimeRange`, `speakerSubtitle` (Task 2); `EVENT`, `REGISTER_URL`.

- [ ] **Step 1: Build the page.**
  - `PageBanner` with kicker "AbilityX 2026", title "Programme" and description `${EVENT.dateLine} · ${EVENT.venue}`.
  - Fetch with `getEmDashCollection("programme", { limit: 100, references: { speakers: true } })`. Check the docs to confirm `getEmDashCollection` accepts `references`. If it doesn't, fetch the 2026 speakers once and match them to the reference ids.
  - Sort with `sortSessions`.
  - Each row shows: the time range (left column, `font-display`), the session type badge (`text-brand-red uppercase`), title, location, description, and speaker names with `speakerSubtitle`.
  - With **zero sessions**: "The full programme will be published soon." and a Register button.
- [ ] **Step 2: Verify.** With no sessions, the empty-state copy shows. Then publish sessions at `"11:00"`, `"09:00"` (with two speakers) and `"9am"`. The order is 09:00, then 11:00, then "9am" shown as raw text, and the 09:00 row lists both speakers. Delete the test sessions afterwards.
- [ ] **Step 3: Commit**: `git commit -m "feat: add CMS-driven programme page"`

---

### Task 8: Blog list and post pages

**Files:**
- Create: `src/pages/blog/index.astro`, `src/pages/blog/[slug].astro`, `src/pages/404.astro`

**Interfaces:**
- Consumes: the `posts` collection, the `category` taxonomy, bylines; `estimateReadTime`, `formatPostDate`, `buildShareLinks`, `mediaUrl` (Task 2).

- [ ] **Step 1: List page.** Port the markup of `git show development:src/app/blog/page.tsx`.
  - Fetch with `getEmDashCollection("posts", { orderBy: { published_at: "desc" }, limit: 24, cursor })`, taking `cursor` from `?cursor=`. Show an "Older posts" link when `nextCursor` is set.
  - Use `entry.data.terms?.category` if entries come back with terms attached. Otherwise call `getEntryTerms` with `entry.data.id` (the ULID, not `entry.id`).
  - Cards with no featured image leave out the image block.
  - Meta line: `formatPostDate(publishedAt)` · category · `estimateReadTime(content)`.
- [ ] **Step 2: Post page.** Port `git show development:"src/app/blog/[slug]/page.tsx"`.
  - Fetch with `getEmDashEntry("posts", Astro.params.slug)`. If missing, `return Astro.rewrite("/404")`; `404.astro` sets `Astro.response.status = 404`.
  - Body: `<PortableText value={post.data.content ?? []} />`, wrapped in the old prose classes.
  - Author: `post.data.byline?.displayName ?? "AbilityX Team"`.
  - Share links: `buildShareLinks(new URL(\`/blog/${post.id}\`, Astro.url.origin).href, post.data.title)`.
  - OG image: the absolute URL of `mediaUrl(post.data.featured_image)`, plus `og:image:width`/`height` when the image has them.
- [ ] **Step 3: Verify.**
  - `/blog` lists the 3 migrated posts, newest first, with read times.
  - Each post page renders its body and four share links.
  - `/blog/does-not-exist` returns status 404.
  - A draft post with no image and no body doesn't appear on `/blog`. Once published, it appears with "1 min read" and no broken image. Delete it afterwards.
  - An image uploaded through the admin (no `src`) shows on the card and in `og:image`.
- [ ] **Step 4: Commit**: `git commit -m "feat: serve blog from EmDash"`

---

### Task 9: About, Partner, forms API and copy sweep

**Files:**
- Create: `src/pages/about.astro`, `src/pages/partner.astro`, `src/pages/api/submit-form.ts`
- Keep unchanged: `src/lib/email.ts` and `src/lib/googleSheets.ts` (they read `process.env`, which works on Node)

**Interfaces:**
- Consumes: `validateFormBody`, `buildRow`, `buildEmailHtml` and the constants (Task 2).
- Produces: `POST /api/submit-form` with the same contract as the old route: JSON body `{ formType, ...fields }`; 400 `{ error: "Missing required fields" }`; the success body copied from the old route.

- [ ] **Step 1: Port About and Partner** 1:1 from git, with these changes:
  - "AbilityX 2.0" → "AbilityX 2026" and "AbilityX 1.0" → "AbilityX 2025" everywhere.
  - About's sentence "…AbilityX 2.0 continues that work this November…" becomes "AbilityX 2026 continues that work on November 26, 2026 under the theme “From Margins to Markets: Africa’s Blueprint for Disability-Inclusive Growth.”"
  - About's "Join the Waitlist" becomes "Register for AbilityX 2026" → `REGISTER_URL`.
  - Partner banner: title "Back AbilityX 2026"; description ends with "Join us as a partner for AbilityX 2026."
  - The partner form is `InquiryForm client:visible formType="partner"`.
- [ ] **Step 2: Endpoint.** `export const prerender = false; export const POST: APIRoute`, built on the Task 2 helpers plus the existing `appendToSheet`, `sendAdminNotification` and `sendConfirmation`. Responses are `Cache-Control: no-store`.
- [ ] **Step 3: Remove the waitlist UI.** `InquiryForm`'s prop type accepts only `"partner" | "exhibit"`. The API still accepts `waitlist`.
- [ ] **Step 4: Copy sweep.**
Run: `grep -rnE "AbilityX (1|2)\.0|\b(1|2)\.0 (Speakers|Recap|By The Numbers|Recordings)|Relive 1\.0|Join the Waitlist|Join Waitlist|opens once dates are confirmed|The Movement Returns" src` → Expected: no output.
Run: `npm test && npm run check` → Expected: PASS, 0 errors.
Dev: submit the partner form with `.env` filled in → a row appears in the "Partner Inquiries" sheet tab and the admin email arrives. Submitting without an email returns 400.
- [ ] **Step 5: Commit**: `git commit -m "feat: port about, partner and forms API; apply 2026 naming"`

---

### Task 10: Edge cache headers (middleware + cache tags)

**Files:**
- Create: `src/lib/cache-tags.ts` and `src/middleware.ts`, adapted from the reference repo
- Test: `tests/cache-tags.test.ts`

**Interfaces:**
- Produces:
  - `ALL_TAG = "all"`.
  - `CHROME_TAGS = ["emdash:settings", "emdash:taxonomy:category"]`. Check the tag names EmDash emits against the reference and the docs.
  - `collectionsForPath(pathname: string): string[]`:
    - `/` → `["speakers"]`
    - `/events/2025/` → `["speakers"]`
    - `/programme/` → `["programme", "speakers"]`
    - `/blog/` and `/blog/*` → `["posts"]`
    - anything else → `[]`
    - The collection tag format is the one the reference uses (e.g. `emdash:collection:posts`). Confirm it.
  - `tagsForPath(pathname: string): string[]`: the collection tags + `CHROME_TAGS` + `ALL_TAG`.
  - `cachePolicyFor(input: { pathname: string; status: number; hasSession: boolean }): { cacheControl: string; tags: string[] | null }`:
    - Private (`"private, no-store"`, no tags) when the path starts with `/_emdash`, `/admin` or `/login`, or when `hasSession` is true.
    - `/api/*` → `"no-store"`, no tags.
    - Media `/_emdash/api/media/file/*` with status 200 → `"public, max-age=31536000, immutable"`, no tags. This check runs **before** the `/_emdash` private rule.
    - Public 200 → `"public, max-age=300, s-maxage=2592000"` plus `tagsForPath`. **No `stale-while-revalidate`.**
    - 404 → `"public, max-age=60, s-maxage=60"`, no tags.
    - Any other status → `"no-store"`.
  - `src/middleware.ts`: `onRequest` calls `next()`, then sets the headers from `cachePolicyFor`, with `hasSession = cookie header contains "astro-session="`. Leave out the reference's legacy redirect and `robots` handling unless it's needed.

- [ ] **Step 1: Write failing tests**

```ts
expect(cachePolicyFor({ pathname: "/", status: 200, hasSession: false }).cacheControl).toBe("public, max-age=300, s-maxage=2592000");
expect(cachePolicyFor({ pathname: "/", status: 200, hasSession: false }).tags).toEqual(expect.arrayContaining(["all"]));
expect(cachePolicyFor({ pathname: "/", status: 200, hasSession: true })).toEqual({ cacheControl: "private, no-store", tags: null });
expect(cachePolicyFor({ pathname: "/_emdash/admin", status: 200, hasSession: false }).cacheControl).toBe("private, no-store");
expect(cachePolicyFor({ pathname: "/admin/", status: 200, hasSession: false }).cacheControl).toBe("private, no-store");
expect(cachePolicyFor({ pathname: "/_emdash/api/media/file/abc.jpg", status: 200, hasSession: false }).cacheControl).toBe("public, max-age=31536000, immutable");
expect(cachePolicyFor({ pathname: "/api/submit-form", status: 200, hasSession: false }).cacheControl).toBe("no-store");
expect(cachePolicyFor({ pathname: "/blog/nope", status: 404, hasSession: false })).toEqual({ cacheControl: "public, max-age=60, s-maxage=60", tags: null });
expect(cachePolicyFor({ pathname: "/blog/x", status: 500, hasSession: false }).cacheControl).toBe("no-store");
expect(collectionsForPath("/programme")).toEqual(collectionsForPath("/programme/"));
expect(tagsForPath("/blog/why-abilityx-exists").join(",")).toMatch(/posts/);
```

- [ ] **Step 2: Run** `npm test` → FAIL. **Step 3: Implement.** **Step 4: Run** `npm test` → PASS.
- [ ] **Step 5: Verify in a production build.** Run `npm run build && node ./dist/server/entry.mjs`. Then check with `node -e 'fetch("http://localhost:4321/blog").then(r=>console.log(r.headers.get("cache-control"),r.headers.get("cache-tag")))'` → public plus tags. For `/_emdash/admin` → `private, no-store`.
- [ ] **Step 6: Commit**: `git commit -m "feat: set edge cache headers and cache tags"`

---

### Task 11: EmDash plugins (Cloudflare purge, Resend email), editor entry, SEO basics

**Files:**
- Create: `plugins/cloudflare-purge/` and `plugins/resend-email/`, copied from the reference and renamed to the `@abilityx/*` package names
- Modify: `astro.config.mjs` (`plugins: [resendEmail({...}), cloudflarePurge()]`), `package.json`
- Create: `src/pages/admin.astro`, `src/pages/login.astro`, `public/robots.txt`, `docs/AbilityX-CMS-Editor-Guide.md`
- Delete: `docs/AbilityX-Blog-Update-Manual.md`

- [ ] **Step 1: Copy the plugins.** Link them with `npm install ./plugins/cloudflare-purge ./plugins/resend-email` (this writes `file:` deps). Keep the purge plugin's behaviour exactly as in the reference:
  - purge tags on `content:afterPublish`, `afterUnpublish`, `afterDelete` and `afterRestore`;
  - on `content:afterSave`, only when `status === "published"`, debounced 30 s;
  - retry on 429;
  - a no-op when `CLOUDFLARE_API_TOKEN`/`CLOUDFLARE_ZONE_ID` are unset or `CLOUDFLARE_PURGE_ENABLED` isn't `1`.

  The tags it purges must come from `src/lib/cache-tags.ts`: the collection tag of the changed entry plus every path tag that includes it (for a speaker: `/`, `/events/2025`, `/programme`), and `ALL_TAG` for settings changes. Remove the reference's tag/widget logic AbilityX doesn't have. Resend config: `from: { email: "noreply@abilityx.projectenable.africa", name: "AbilityX" }`, `replyTo: "damilare@projectenable.africa"`. The site's existing Resend domain is `abilityx.projectenable.africa`, so check the From address is on the verified domain. Run the reference's plugin tests too, if there are any.
- [ ] **Step 2: `/admin` landing page.** Standalone (no site nav). Contents:
  - the AbilityX logo and the line "Manage AbilityX speakers, programme and blog.";
  - three cards: Speakers, Programme, Blog;
  - a "Sign in" button → `/_emdash/admin` and a "Visit the site" link → `/`;
  - `<meta name="robots" content="noindex, nofollow">` and the header `X-Robots-Tag: noindex, nofollow`.

  `login.astro` returns `Astro.redirect("/admin/", 301)`.
- [ ] **Step 3: `robots.txt`.** `User-agent: *`, `Allow: /`, `Disallow: /admin`, `Disallow: /_emdash/`.
- [ ] **Step 4: Editor guide.** A short how-to covering:
  - adding a 2026 speaker (edition 2026, sort order, session title only once confirmed);
  - programme sessions (24-hour times);
  - writing, publishing and scheduling a blog post;
  - uploading images;
  - that published changes reach the live site within about a minute, through the edge purge;
  - that all other page copy is changed by a developer.
- [ ] **Step 5: Verify.** `npm test && npm run check && npm run build` → PASS. `/admin` renders with the noindex header, and `/login` returns a 301 to `/admin/`.
- [ ] **Step 6: Commit**: `git commit -m "feat: add purge and email plugins, editor landing page, CMS guide"`

---

### Task 12: VPS staging (owner runs the server commands)

**Files:**
- Create: `deploy/abilityx.service`, `deploy/nginx-abilityx.conf`, `deploy/abilityx.env.example`, `deploy/abilityx.build.env.example`, `deploy/sudoers-abilityx`, `deploy/cloudflare-ips.txt`, `scripts/deploy-vps.sh`, `scripts/backup-vps.sh`, `docs/AbilityX-VPS-Runbook.md`. Each is adapted from the reference file of the same role.

**Fixed values:** site user `abilityx`; app dir `/home/abilityx/app`; data dir `/home/abilityx/data` (holding `emdash.db` and `sessions/`); runtime env `/etc/abilityx.env` (root, 600); build env `/home/abilityx/abilityx.build.env`; port: the first free port at or above 4330 (`ss -ltnp`), the same value in `.env`, nginx and the unit; R2 media bucket `ability-x-media`; R2 backup bucket `ability-x-backups` (private, 30-day lifecycle rule).

**Env names**
- Runtime: `EMDASH_SITE_URL`, `DATABASE_PATH`, `SESSION_DIR`, `HOST`, `PORT`, `EMDASH_ENCRYPTION_KEY`, `RESEND_API_KEY`, `GOOGLE_CLIENT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_SHEET_ID`, `CLOUDFLARE_ZONE_ID`, `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_PURGE_ENABLED`, `S3_ENDPOINT`, `S3_BUCKET`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_REGION=auto`.
- Build: `EMDASH_SITE_URL`, `DATABASE_PATH`, `SESSION_DIR`, `S3_BUCKET`, `S3_ENDPOINT`, `S3_REGION`.

- [ ] **Step 1: Write the deploy files** from the reference, with these adaptations:
  - `deploy-vps.sh` uses `npm ci` and `npm run build`, keeps the refuse-a-dirty-tree check and `git pull --ff-only`, and ends with an origin smoke test (`curl -fsS -o /dev/null http://127.0.0.1:$PORT/`).
  - nginx keeps the Cloudflare-only origin using `geo $realip_remote_addr $from_cf`, never `allow`/`deny`. It listens on 80 and 443 with a Cloudflare Origin Certificate in `/etc/ssl/abilityx/`.
  - If the box runs Virtualmin, the file goes in `conf.d/` with `listen <box-IP>:443 ssl`, and Virtualmin's own vhost is never edited.
  - The systemd unit runs `ExecStart=/home/abilityx/.local/share/fnm/aliases/default/bin/node ./dist/server/entry.mjs` with `ReadWritePaths=/home/abilityx/data /home/abilityx/app/.astro`.
  - `backup-vps.sh` copies with `sqlite3 .backup`, never `cp`, then runs `PRAGMA integrity_check`, keeps 14 days, `cd`s into the backup directory first, and uploads with rclone (`provider = Cloudflare`, `no_head = true`) to `ability-x-backups`.
  - The runbook lists every server step below as numbered single-line commands.
- [ ] **Step 2: Cloudflare and R2 prep (owner, in the dashboard).**
  - Enable R2 if it isn't already.
  - Create the `ability-x-media` and `ability-x-backups` buckets.
  - Create an R2 API token scoped to both buckets, and a zone Cache Purge API token.
  - Create an Origin Certificate for `abilityx.projectenable.africa` and `*.abilityx.projectenable.africa`.
  - Add a proxied A record `vps.abilityx.projectenable.africa` → VPS IP.
  - Add a Cache Rule: expression `(http.host in {"vps.abilityx.projectenable.africa"} and not starts_with(http.request.uri.path, "/_emdash") and not http.cookie contains "astro-session=")`, set to "Eligible for cache", Edge TTL "Use cache-control header if present".
- [ ] **Step 3: Server setup (owner).**
  - Create the user and the directories; create `/home/abilityx/app/.astro` **before** the first start.
  - Install Node 24 with fnm for `abilityx` and run `fnm default 24`.
  - Clone the repo on `feat/emdash-astro`. Staging tracks that branch; production tracks `main` after the merge.
  - Install the env files with `EMDASH_SITE_URL=https://vps.abilityx.projectenable.africa` in **both**. Generate a fresh `EMDASH_ENCRYPTION_KEY` and keep a copy in the owner's password manager: it can't be recovered.
  - Install the unit, the sudoers file (check with `visudo -c`) and the nginx file (check with `nginx -t`, then reload).
  - Run `bash scripts/deploy-vps.sh`.
- [ ] **Step 4: CMS setup on staging.** Open `https://vps.abilityx.projectenable.africa/_emdash/admin` and complete the setup wizard **with sample content**. This imports the seed and downloads the images from the still-live Next site into R2. Create the owner's admin account. Passkeys are bound to the domain, so also test sign-in with the email magic link. In Settings, check the site title reads "AbilityX".
- [ ] **Step 5: Staging checks.**
  - Every page type returns 200: `/`, `/about`, `/partner`, `/events/2025`, `/programme`, `/blog`, each post, `/admin`. `/events/1.0` → 301 and `/blog/nope` → 404.
  - Images load (this proves the R2 token).
  - A second request to `/` shows `cf-cache-status: HIT`.
  - Publish a test post: `/blog` shows `MISS` once, then `HIT` with the new post. Unpublish it and delete it.
  - A post scheduled 2 minutes ahead goes live on its own, and the purge log shows it (`journalctl -u abilityx`).
  - The partner and exhibit forms deliver.
  - `scripts/backup-vps.sh` writes a backup and uploads it.
  - A test send from Settings → Email arrives.
- [ ] **Step 6: Commit**: `git commit -m "chore: add VPS deploy, backup and runbook"`, push, and open a PR to `development`.

---

### Task 13: Production cutover (owner; confirm the timing first)

- [ ] **Step 1:** Merge to `development`, then `main`. On the server, switch the checkout to `main`.
- [ ] **Step 2:** In both env files set `EMDASH_SITE_URL=https://abilityx.projectenable.africa`, run `bash scripts/deploy-vps.sh`, and add the apex to nginx's `server_name` (`nginx -t`, reload). The staging database carries over as-is; no copy is needed, because staging *is* the production box.
- [ ] **Step 3: Cloudflare.**
  - Remove the custom domain `abilityx.projectenable.africa` from the `ability-x` Worker.
  - Add a proxied A record for the apex → VPS IP.
  - Add the apex to the Cache Rule's host list.
  - Purge Everything.
- [ ] **Step 4:** Re-run the Task 12 Step 5 checks on `https://abilityx.projectenable.africa`, plus a **passkey** sign-in.
- [ ] **Step 5: After.** Keep the old `ability-x` Worker for 14 days as the rollback (rollback = re-attach its custom domain and delete the A record). Then delete it. Never delete the `ability-x-media` bucket. Add a daily cron for `backup-vps.sh` on the server.
- [ ] **Step 6 (optional): CI.** Add `.github/workflows/deploy.yml`, modelled on the reference: checks on `development`, and an SSH deploy on `main` gated on the matching `development` run, plus a `purge_everything` step after each deploy. Only do this if the owner wants push-to-deploy.

---

## Open items for the owner (none blocks implementation)

1. **Programme features** (Inclusive Future Dialogue, Innovation Labs, Research & Evidence Showcase, AbilityX Impact Awards): hidden until they are listed in `CONFIRMED_PROGRAMME_FEATURES` (brief §6).
2. **Programme in the nav:** the brief's navigation has no Programme link, so it's linked from "What to expect" and the footer. Add it to `NAV_ITEMS` once the programme is published, if wanted.
3. **2026 speakers and sessions:** none are seeded; editors add them as they are cleared for announcement.
4. **VPS details:** Virtualmin or plain nginx, the free port, and SSH access. These are needed before Task 12.
5. **Resend From address:** confirm `noreply@abilityx.projectenable.africa` is on the verified Resend domain.
