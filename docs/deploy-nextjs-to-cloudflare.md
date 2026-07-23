# Deploying a Next.js App to Cloudflare Workers via GitHub

A step-by-step guide for deploying a Next.js application to Cloudflare Workers using `@opennextjs/cloudflare`.

---

## Choose a Deployment Method

| | **Method 1a: Cloudflare Auto-Deploy** | **Method 1b: GitHub Action** | **Method 2: Manual** |
|---|---|---|---|
| **How it works** | Cloudflare watches `main` and deploys on push | GitHub Action deploys on push to `main` | Developer runs `wrangler deploy` locally |
| **Worker creation** | Auto-created by Cloudflare on first push | Auto-created by the action on first run | Created manually via CLI or dashboard |
| **GitHub repo** | Must already exist | Can be auto-created by the action | Must already exist |
| **Best for** | Simplest setup, no CI config needed | Teams, need control over deploy steps | Solo devs, full local control |

**Branching model (all methods):**
- All work pushes to `development` (or feature branches)
- `development` merges into `main` — never the other way around
- Deployment triggers when files hit `main`:
  - **1a:** Cloudflare's Git integration watches `main` and deploys automatically
  - **1b:** GitHub Action triggers on push to `main`
  - **2:** Developer merges `development` into `main`, then deploys locally

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Project Setup (Both Methods)](#2-project-setup-both-methods)
3. [Cloudflare Account Setup](#3-cloudflare-account-setup)
4. [Local Development](#4-local-development)
5. [Method 1a: Cloudflare Auto-Deploy](#method-1a-cloudflare-auto-deploy-simplest)
6. [Method 1b: GitHub Action](#method-1b-github-action)
7. [Method 2: Manual Deployment](#method-2-manual-deployment)
8. [Custom Domains](#8-custom-domains)
9. [Troubleshooting](#9-troubleshooting)

---

## 1. Prerequisites

- **Node.js** v18+ (v20 recommended)
- **npm** (or pnpm/yarn)
- **Git**
- A **Cloudflare account** (free tier works)
- A **GitHub account**
- **Wrangler CLI** installed globally (optional but helpful):
  ```bash
  npm install -g wrangler
  ```

---

## 2. Project Setup (Both Methods)

### 2.1 Install dependencies

```bash
npm install @opennextjs/cloudflare
npm install -D wrangler
```

### 2.2 Add build scripts to `package.json`

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "build:cloudflare": "npx opennextjs-cloudflare build",
    "preview": "npx opennextjs-cloudflare build && npx opennextjs-cloudflare preview",
    "deploy": "npx opennextjs-cloudflare build && npx opennextjs-cloudflare deploy",
    "upload": "npx opennextjs-cloudflare build && npx opennextjs-cloudflare upload"
  }
}
```

### 2.3 Create `wrangler.toml`

```toml
name = "my-app"          # Must be globally unique across all Cloudflare Workers
main = ".open-next/worker.js"
compatibility_date = "2024-12-30"
compatibility_flags = ["nodejs_compat", "global_fetch_strictly_public"]

[assets]
directory = ".open-next/assets"
binding = "ASSETS"
run_worker_first = true
```

### 2.4 Update `next.config.ts`

```typescript
import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Add external image hostnames, e.g.:
      // { protocol: "https", hostname: "img.youtube.com" },
    ],
  },
};

export default nextConfig;

initOpenNextCloudflareForDev();
```

> `initOpenNextCloudflareForDev()` enables local dev with Cloudflare Workers emulation. No effect in production builds.

### 2.5 Add `.gitignore` entries

```gitignore
.open-next/
.wrangler/
.dev.vars
cloudflare-env.d.ts
```

### 2.6 Test the Cloudflare build locally

```bash
npm run build:cloudflare
```

Verify `.open-next/` is created with `worker.js` and `assets/`.

---

## 3. Cloudflare Account Setup

### 3.1 Authenticate with Wrangler

```bash
npx wrangler login
```

### 3.2 Verify authentication and get Account ID

```bash
npx wrangler whoami
```

Save the Account ID — you'll need it for both methods.

---

## 4. Local Development

### Standard Next.js dev

```bash
npm run dev
```

### Cloudflare Workers emulation (optional)

```bash
npx wrangler dev
```

Simulates the Cloudflare Workers environment locally.

---

## Method 1a: Cloudflare Auto-Deploy (Simplest)

Cloudflare's Git integration watches `main` and deploys on every push. No GitHub Action needed.

### M1a.1 Connect the Repo to Cloudflare

1. Go to [Cloudflare Dashboard → Workers & Pages](https://dash.cloudflare.com/?zone=workers)
2. Click **"Create Application"** → **"Workers"** → **"Connect to Git"**
3. Select the GitHub repo
4. Under **"Settings"**:
   - **Production branch:** `main`
   - **Build command:** `npm run build:cloudflare`
   - **Build output directory:** `.open-next/assets`
   - **Node.js version:** `20`
5. Click **"Save and Deploy"**

Cloudflare creates the Worker automatically and redeploys on every push to `main`.

### M1a.2 Branching Workflow

```bash
# Work on development branch
git checkout -b development
git add .
git commit -m "feat: your changes"
git push -u origin development

# When ready to deploy, merge development into main
git checkout main
git merge development
git push origin main
# Cloudflare auto-deploys
```

---

## Method 1b: GitHub Action

A GitHub Action builds and deploys via `wrangler deploy` on every push to `main`.

### M1b.1 Create a Cloudflare API Token

1. Go to [Cloudflare Dashboard → My Profile → API Tokens](https://dash.cloudflare.com/profile/api-tokens)
2. Click **"Create Token"**
3. Use the **"Edit Cloudflare Workers"** template, or create a custom token with:
   - Account → Workers Scripts: Edit
   - Account → Cloudflare Pages: Edit
4. Select the correct account under "Account Resources"
5. Create and **copy the token immediately** — you won't see it again

### M1b.2 Add GitHub Secrets

Go to your repo → **Settings → Secrets and variables → Actions → New repository secret**:

| Secret Name             | Value                         |
|-------------------------|-------------------------------|
| `CLOUDFLARE_API_TOKEN`  | The API token from step M1b.1 |
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare Account ID    |

### M1b.3 Create the GitHub Action

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Cloudflare

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    name: Build & Deploy
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build for Cloudflare
        run: npm run build:cloudflare

      - name: Deploy to Cloudflare Workers
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: deploy
```

On first run, this **automatically creates the Worker** in your Cloudflare account.

### M1b.4 Branching Workflow

```bash
# Work on development branch
git checkout -b development
git add .
git commit -m "feat: your changes"
git push -u origin development

# When ready to deploy, merge development into main
git checkout main
git merge development
git push origin main
# GitHub Action triggers automatically
```

You can also trigger the action manually from the **Actions** tab in GitHub.

### M1b.5 (Optional) Branch Preview Deployments

To get preview URLs for pull requests, update the workflow trigger and deploy step:

```yaml
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch:

# ... in the deploy step:
- name: Deploy to Cloudflare Workers
  uses: cloudflare/wrangler-action@v3
  with:
    apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
    accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
    command: deploy --branch ${{ github.head_ref || github.ref_name }}
```

---

## Method 2: Manual Deployment

No GitHub Actions, no Cloudflare Git integration. The developer creates the Worker and deploys from their local machine when ready.

### M2.1 Create the Worker

**Option A — Via Wrangler (recommended):**

```bash
npm run build:cloudflare
npx wrangler deploy
```

This creates the Worker in your Cloudflare account using the name from `wrangler.toml`.

**Option B — Via Cloudflare Dashboard:**

1. Go to [Cloudflare Dashboard → Workers & Pages](https://dash.cloudflare.com/?zone=workers)
2. Click **"Create Application"** → **"Workers"**
3. Name it to match your `wrangler.toml` `name` field exactly
4. Deploy a placeholder (you'll overwrite it with `wrangler deploy` later)

### M2.2 Verify the Worker

```bash
npx wrangler workers list
```

### M2.3 Branching Workflow

```bash
# Work on development branch
git checkout -b development
git add .
git commit -m "feat: your changes"
git push -u origin development

# When ready to deploy, merge development into main
git checkout main
git merge development
git push origin main

# Then deploy locally
npm run build:cloudflare
npx wrangler deploy
```

### M2.4 Preview Before Deploying (optional)

```bash
npm run build:cloudflare
npx wrangler preview
```

---

## 8. Custom Domains

### 8.1 Add a custom domain in Cloudflare

1. Go to **Workers & Pages** → select your Worker
2. Go to **Settings → Triggers → Custom Domains**
3. Click **"Add Custom Domain"**
4. Enter your domain (e.g. `example.com`)
5. Cloudflare validates DNS and provisions an SSL certificate automatically

### 8.2 DNS configuration

If your domain's DNS is already on Cloudflare, the Worker routes are configured automatically.

If your domain is elsewhere:
1. Add Cloudflare nameservers to your registrar, or
2. Create a CNAME record pointing to `<worker-name>.<account-id>.workers.dev`

---

## 9. Troubleshooting

### Build fails with "Cannot find module"

```bash
rm -rf node_modules .open-next
npm install
npm run build:cloudflare
```

### `wrangler deploy` fails with "Worker already exists"

The Worker was created with a different name. Either:
- Update `wrangler.toml` `name` to match the existing Worker
- Delete the existing Worker: `npx wrangler delete EXISTING_NAME`

### Images not loading in production

Add all external image hostnames to `next.config.ts` under `images.remotePatterns`, then rebuild and redeploy.

### GitHub Actions fails with "Unauthorized" (Method 1b)

- Verify `CLOUDFLARE_API_TOKEN` has **Workers Scripts: Edit** permission
- Verify `CLOUDFLARE_ACCOUNT_ID` is correct (not the Zone ID)
- Regenerate the token if expired

### `initOpenNextCloudflareForDev()` error in production builds

This is expected — it only runs in development. Make sure you're using `npm run build:cloudflare` (not `npm run build`).

### Workers site returns 404

- Ensure `wrangler.toml` has the `[assets]` section with `run_worker_first = true`
- Verify `.open-next/assets/` directory exists after build
- Run `npx wrangler tail` to inspect live requests

### Useful debugging commands

```bash
npx wrangler tail              # Stream live worker logs
npx wrangler workers list      # List all workers
npx wrangler workers get NAME  # View worker details
npx wrangler delete NAME       # Delete a worker
```

---

## Quick Reference

| Command                        | What it does                              |
|--------------------------------|-------------------------------------------|
| `npm run dev`                  | Local Next.js dev server                  |
| `npm run build`                | Standard Next.js build                    |
| `npm run build:cloudflare`     | Build for Cloudflare Workers              |
| `npm run preview`              | Build + preview Cloudflare deployment     |
| `npm run deploy`               | Build + deploy to Cloudflare Workers      |
| `npx wrangler login`           | Authenticate with Cloudflare              |
| `npx wrangler deploy`          | Deploy worker + assets                    |
| `npx wrangler tail`            | Stream live worker logs                   |
| `npx wrangler delete <name>`   | Delete a worker                           |
