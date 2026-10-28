# AbilityX

The website for AbilityX, the disability leadership forum by Project Enable Africa: https://ability-x.org

Astro 7 + [EmDash](https://docs.emdashcms.com) CMS on Node, with SQLite for content and Cloudflare R2 for media. It runs on a VPS behind Cloudflare.

## What is editable

Editors manage three collections at `/admin`:

- **Speakers**: both editions. 2026 speakers appear on the homepage; 2025 speakers on `/events/2025`.
- **Schedule** (`programme` collection): sessions on `/schedule`.
- **Blog Posts**: `/blog`.

Everything else (homepage copy, About, Partner, the 2025 page) is code: `src/pages`, `src/components/astro`, and data in `src/data`. Event facts and the registration link are in `src/config/event.ts`.

See `docs/AbilityX-CMS-Editor-Guide.md` for editors and `docs/AbilityX-VPS-Runbook.md` for the server.

## Local development

```bash
cp .env.example .env              # then fill in
npx emdash secrets generate --write=.env
mkdir -p data/uploads
npm install
npm run dev                       # Astro 7 dev runs in the background; logs in .astro/dev.log
```

On the first run, open `/_emdash/api/setup/dev-bypass` to apply the schema and the sample content (2025 speakers and existing blog posts) from `seed/seed.json`, and sign in as a dev admin. The admin is at `/_emdash/admin`.

Stop the dev server with `npx astro dev stop`.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build (`dist/server/entry.mjs`) |
| `npm start` | Run the production build |
| `npm run check` | Type check (`astro check`) |
| `npm test` | Unit tests (Vitest) |
| `npm run seed:build` | Rebuild `seed/seed.json` from `scripts/legacy/*` |
| `npm run seed:validate` | Validate the seed |

## Layout

```
src/pages/             routes: /, /about, /partner, /schedule, /events/2025, /blog, /admin, /api/submit-form
src/components/astro/  server-rendered components (home sections, nav, footer, cards)
src/components/react/  interactive islands (carousels, modals, forms, lightbox)
src/lib/               helpers (schedule times, speakers, blog, forms, cache tags)
src/middleware.ts      Cache-Control / Cache-Tag headers for Cloudflare
plugins/               EmDash plugins: Cloudflare cache purge, Resend email
seed/seed.json         CMS schema + initial content (generated)
deploy/, scripts/      VPS service, nginx, deploy and backup scripts
```

## Deploying

Push to `development` → GitHub Actions type-checks, tests and builds. Merge `development` → `main` → it deploys to the VPS over SSH and purges Cloudflare's cache. Details in `docs/AbilityX-VPS-Runbook.md`.

The previous Next.js site is preserved on the branch `backup/nextjs-2026-10-28`.
