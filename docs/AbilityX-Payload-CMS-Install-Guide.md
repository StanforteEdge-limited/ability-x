# Installing Payload CMS — Split Deployment (VPS backend + Cloudflare frontend)

**Architecture:** Payload CMS runs as its own standalone Next.js app on your existing Contabo VPS, backed by Postgres, with its REST API exposed over HTTPS. The public AbilityX site remains a separate Next.js app deployed to Cloudflare Workers (via OpenNext), which fetches content from Payload's REST API instead of the local `content/` data objects. This preserves the swap-in design decided earlier: the content shape stays the same, only the source changes.

```
┌─────────────────────────┐         HTTPS / REST API        ┌──────────────────────────┐
│  Cloudflare Workers      │  ───────────────────────────►   │  VPS (Contabo)            │
│  Next.js frontend         │  ◄───────────────────────────   │  Payload CMS + Postgres   │
│  (public site, OpenNext)  │        content + media          │  (admin panel, /api)      │
└─────────────────────────┘                                   └──────────────────────────┘
```

Why split rather than embed: Payload's admin panel and Postgres connection need a persistent Node.js server — that doesn't run natively on Cloudflare Workers without adopting Cloudflare-specific D1/R2 adapters. Keeping Payload on your VPS means standard Postgres, no data-layer migration, and it stays reusable for other projects on the same box.

---

## Part 1 — Payload CMS on the VPS

### 1.1 Prerequisites on the server

```bash
# Confirm Node.js 20.9+ is installed
node -v

# Confirm Docker is available (recommended path)
docker --version
docker compose version
```

If Node isn't installed or is older than 20.9, install via nvm:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20
```

### 1.2 Scaffold the Payload project

Run this locally first (not on the server) so you can review the generated project before deploying:

```bash
npx create-payload-app@latest abilityx-cms
```

When prompted:
- **Template:** `blank` (you don't need Payload's bundled frontend — the public site is a separate app)
- **Database:** `PostgreSQL`
- **Package manager:** your preference (pnpm recommended for speed)

This creates a Next.js project with Payload pre-wired. Key files you'll touch:
- `payload.config.ts` — collections, database, CORS, plugins
- `collections/` — your content types (Speakers, SessionTracks, Sessions, Stats, PartnerInquiries, etc.)
- `.env` — secrets and connection strings

### 1.3 Define collections matching your existing content shape

This is the step that makes the swap invisible to the frontend. Match field names to what your `content/` typed objects already use, so the REST response shape lines up with what your components expect.

Example — `collections/Speakers.ts`:

```typescript
import type { CollectionConfig } from 'payload'

export const Speakers: CollectionConfig = {
  slug: 'speakers',
  admin: { useAsTitle: 'name' },
  access: { read: () => true }, // public read
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'title', type: 'text', required: true },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    { name: 'edition', type: 'select', options: ['1.0', '2.0'], defaultValue: '1.0' },
  ],
}
```

Repeat this pattern for `SessionTracks`, `Sessions`, `Stats`, `PartnerInquiries` (as a form-submission collection, not public-read), and any other content type from the `content/` directory you want editable. Register each in `payload.config.ts`:

```typescript
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { Speakers } from './collections/Speakers'
import { Media } from './collections/Media'
// ...import other collections

export default buildConfig({
  collections: [Speakers, Media /* , ... */],
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI },
  }),
  secret: process.env.PAYLOAD_SECRET!,
  // CORS — see 1.5 below
})
```

### 1.4 Postgres setup on the VPS

If Postgres isn't already running on the box (per your existing setup elsewhere), add it via Docker Compose alongside Payload — see 1.6. If you already have a Postgres instance for other projects, just create a dedicated database and user:

```sql
CREATE DATABASE abilityx_cms;
CREATE USER abilityx_cms_user WITH ENCRYPTED PASSWORD 'CHANGE_ME';
GRANT ALL PRIVILEGES ON DATABASE abilityx_cms TO abilityx_cms_user;
```

### 1.5 Environment variables

Create `.env` in the Payload project root:

```bash
DATABASE_URI=postgresql://abilityx_cms_user:CHANGE_ME@localhost:5432/abilityx_cms
PAYLOAD_SECRET=generate-a-long-random-string-here
NEXT_PUBLIC_SERVER_URL=https://cms.ability-x.org

# CORS — must include the exact Cloudflare-deployed frontend domain(s)
CORS_ORIGINS=https://ability-x.org,https://www.ability-x.org
```

In `payload.config.ts`, wire CORS to that variable so the Cloudflare-hosted frontend is allowed to call the API cross-origin:

```typescript
export default buildConfig({
  // ...
  cors: process.env.CORS_ORIGINS?.split(',') ?? [],
  csrf: process.env.CORS_ORIGINS?.split(',') ?? [],
})
```

Without this, browser requests from `ability-x.org` to `cms.ability-x.org/api/*` will be blocked by CORS even though the data is public.

### 1.6 Dockerize for deployment

`Dockerfile` (production, standalone output):

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 payload
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
RUN mkdir -p /app/public/media && chown -R payload:nodejs /app/public/media
USER payload
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
```

Enable standalone output in `next.config.mjs`:

```javascript
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig = {
  output: 'standalone',
}

export default withPayload(nextConfig)
```

`docker-compose.yml` (includes Postgres if not already running elsewhere on the box — omit the `db` service if reusing an existing instance):

```yaml
services:
  db:
    image: postgres:16-alpine
    restart: unless-stopped
    environment:
      POSTGRES_DB: abilityx_cms
      POSTGRES_USER: abilityx_cms_user
      POSTGRES_PASSWORD: CHANGE_ME
    volumes:
      - abilityx_cms_pgdata:/var/lib/postgresql/data

  payload:
    build: .
    restart: unless-stopped
    env_file: .env
    ports:
      - "127.0.0.1:3000:3000"
    volumes:
      - ./media:/app/public/media
    depends_on:
      - db

volumes:
  abilityx_cms_pgdata:
```

Note the port binding (`127.0.0.1:3000:3000`) — Payload isn't exposed directly to the internet; the reverse proxy in 1.7 handles that.

Bring it up:

```bash
docker compose up -d --build
```

### 1.7 Reverse proxy + SSL (Caddy — simplest option)

If you don't already have a reverse proxy on the VPS, Caddy handles HTTPS automatically:

```bash
sudo apt install caddy
```

`/etc/caddy/Caddyfile`:

```
cms.ability-x.org {
    reverse_proxy 127.0.0.1:3000
}
```

```bash
sudo systemctl reload caddy
```

Point `cms.ability-x.org` at the VPS's IP in DNS before this step, or Caddy's automatic SSL will fail to issue a certificate.

If you're already running nginx elsewhere on the box, use an nginx server block + certbot instead — same end result, just swap the reverse-proxy tool.

### 1.8 First run and admin user

```bash
docker compose logs -f payload
```

Once the container is healthy, visit `https://cms.ability-x.org/admin` and create the first admin user through Payload's setup screen. This is your dashboard — this is where speakers, blog posts, partner inquiries, etc. get created going forward.

---

## Part 2 — Frontend (Cloudflare) side: swapping local content for Payload

This is the part that fulfills the earlier design decision — same content shape, different source.

### 2.1 Add a typed fetch layer

Create `lib/payload.ts` in the frontend project:

```typescript
const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL! // https://cms.ability-x.org

export async function getSpeakers(edition: '1.0' | '2.0') {
  const res = await fetch(
    `${PAYLOAD_URL}/api/speakers?where[edition][equals]=${edition}`,
    { next: { revalidate: 3600 } } // ISR: refresh hourly
  )
  const data = await res.json()
  return data.docs // matches the shape your components already expect
}
```

Repeat this pattern per collection (`getSessionTracks`, `getStats`, etc.), matching function names/shapes to what `content/homePageContent.ts` and `content/event1PageContent.ts` already export.

### 2.2 Swap the import, not the component

In each page/section that currently does:

```typescript
import { homePageContent } from '@/content/home'
```

Change to:

```typescript
const stats = await getStats()
const speakers = await getSpeakers('1.0')
```

No changes needed inside `StatsSection`, `SpeakersSection`, etc. — they already consume this shape. This is the whole point of the typed-object structure decided earlier.

### 2.3 Environment variable on the Cloudflare side

In the Cloudflare Workers project settings (or `wrangler.toml` / `.dev.vars` for local dev):

```
NEXT_PUBLIC_PAYLOAD_URL=https://cms.ability-x.org
```

### 2.4 Partner inquiry form → real submission

For the CTA cards currently doing local-only success-state swaps, point the submit handler at Payload's REST API instead:

```typescript
async function submitInquiry(formData: PartnerInquiryInput) {
  const res = await fetch(`${PAYLOAD_URL}/api/partner-inquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  })
  return res.ok
}
```

Make the `partner-inquiries` collection write-only from the public side (`create: () => true`, `read: () => false` for unauthenticated users) so submissions land in the admin dashboard without being publicly listable.

---

## Rollout order

1. Stand up Payload on the VPS (Part 1), confirm `/admin` works and you can manually create a test Speaker.
2. Confirm `https://cms.ability-x.org/api/speakers` returns that test record over HTTPS with correct CORS headers.
3. Wire one section of the frontend (Speakers is a good first test) to fetch from Payload instead of local data — verify it renders identically.
4. Repeat per content type once the pattern is proven.
5. Wire the partner-inquiry form last, since it's the one write path and worth testing thoroughly before it's live for real sponsor outreach.
