# AbilityX

AbilityX is a Next.js marketing site for the AbilityX conference and movement.

The site is content-driven, with all copy and structured data stored locally in the repo. It is deployed to Cloudflare Workers using OpenNext.

## Stack

- Next.js 16 App Router
- React 19
- Tailwind CSS v4
- TypeScript
- Vitest
- OpenNext for Cloudflare
- Wrangler

## Content Model

There is no CMS or database in this project.

- Page and section content lives under `content/`
- Shared UI lives under `components/`
- App routes live under `app/`
- Utility helpers live under `lib/`

Google Form placeholders are defined in `content/form-links.ts`.

## Routes

- `/` - Home
- `/events/1.0` - AbilityX 1.0
- `/about` - About
- `/partner` - Partner With Us

## Local Development

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Scripts

```bash
npm run dev
npm run lint
npm run test
npm run build
npm run build:cloudflare
npm run preview
npm run deploy
```

Notes:

- `npm run build` runs the standard Next.js production build
- `npm run build:cloudflare` builds the Cloudflare Worker bundle via OpenNext
- `npm run deploy` is for Wrangler/OpenNext deployment workflows

## Cloudflare Deployment

This repo is configured for Cloudflare Workers Builds.

Relevant files:

- `wrangler.toml`
- `open-next.config.ts`
- `next.config.ts`

Expected Cloudflare settings:

- Production branch: `main`
- Preview branch: `development`
- Build command: `npm run build:cloudflare`

## Git Workflow

Branch flow:

- `main` - production
- `development` - active development / preview branch

Recommended flow:

1. Branch off `development`
2. Open PRs into `development`
3. Merge `development` into `main` for production releases

## Verification

Before pushing deployment-related changes, run:

```bash
npm run lint
npm run test
npm run build
npm run build:cloudflare
```

## Design References

Design and brand references live under `docs/`, including:

- `docs/abilityx_design_system/`
- `docs/design_handoff_abilityx_2_0 2/`

## Repository

GitHub: `https://github.com/StanforteEdge/ability-x`
