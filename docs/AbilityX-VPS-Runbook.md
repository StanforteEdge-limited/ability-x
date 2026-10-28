# AbilityX VPS Runbook

How the site runs, and how to set it up on the VPS and move ability-x.org off the old Cloudflare Worker.

```
Cloudflare (proxied DNS, Cache Rule, purge by tag, R2 media)
  → nginx on the VPS (Cloudflare IPs only, Origin Certificate)
    → 127.0.0.1:PORT  node ./dist/server/entry.mjs   (systemd: ability-x.service)
      → SQLite /home/ability-x/data/emdash.db        media → R2 bucket ability-x-media
```

| Thing | Value |
|---|---|
| Site | https://ability-x.org (no staging host; the old Next.js Worker `ability-x` serves it until step 7) |
| Server user | `ability-x` (replace everywhere if Virtualmin chose another name) |
| App checkout | `/home/ability-x/app` |
| Data (DB, sessions) | `/home/ability-x/data` |
| Runtime env (secrets) | `/etc/ability-x.env` (root, 600) |
| Build env (no secrets) | `/home/ability-x/ability-x.build.env` |
| Service | `ability-x.service` (logs: `journalctl -u ability-x -f`) |
| nginx | `/etc/nginx/conf.d/ability-x.conf` |
| Media bucket | R2 `ability-x-media`. **Never delete it.** |
| Backup bucket | R2 `ability-x-backups` (private, 30-day lifecycle rule) |
| Editors sign in | https://ability-x.org/admin |
| Rollback copy of the old site | git branch `backup/nextjs-2026-10-28` |

Rules: run one command per line. Never paste secrets into chat or commit them. Check a secret is set with `sudo grep -c 'NAME=.' /etc/ability-x.env` (prints 1).

---

## 1. Pick the port

`4321` is the default, but another site on the box may use it. Security Focus listens on 4321 if this is the same server.

```bash
ss -ltnp | grep -E ':43[0-9]{2} '
```

Use the first free port from 4321 up. Set that same number in `/etc/ability-x.env`, in the build env and in `proxy_pass` in the nginx file.

## 2. Cloudflare (dashboard, ability-x.org zone)

1. **R2** → enable it if asked → create the buckets `ability-x-media` and `ability-x-backups`. On `ability-x-backups`, add a lifecycle rule that deletes objects after 30 days.
2. **R2 → Manage API tokens** → create a token with Object Read & Write on both buckets. Note the access key, the secret and the S3 endpoint (`https://<ACCOUNT_ID>.r2.cloudflarestorage.com`).
3. **My Profile → API Tokens** → create a token with Zone → Cache Purge on ability-x.org. It's used twice: in `/etc/ability-x.env` and as the GitHub secret `CLOUDFLARE_PURGE_TOKEN`. Also copy the **Zone ID** from the zone's overview page.
4. **SSL/TLS → Origin Server** → create a certificate for `ability-x.org, *.ability-x.org`. Keep both the certificate and the private key for step 5.
5. **Caching → Cache Rules** → create a rule now (it does nothing until DNS points at the VPS in step 7):
   - Expression: `(http.host in {"ability-x.org"} and not starts_with(http.request.uri.path, "/_emdash") and not http.cookie contains "astro-session=")`
   - Cache eligibility: **Eligible for cache**
   - Edge TTL: **Use cache-control header if present**

## 3. Server setup (as root)

If Virtualmin already has a virtual server for ability-x.org, use its user. Otherwise create one:

```bash
adduser --disabled-password --gecos "" ability-x
```

```bash
sudo -u ability-x mkdir -p /home/ability-x/data/sessions /home/ability-x/backups
```

```bash
apt-get install -y sqlite3 rclone git curl
```

Node 24 for this user only (fnm):

```bash
sudo -iu ability-x
```

```bash
curl -fsSL https://fnm.vercel.app/install | bash -s -- --skip-shell
```

```bash
export PATH="$HOME/.local/share/fnm:$PATH" && eval "$(fnm env --shell bash)"
```

```bash
fnm install 24 && fnm default 24
```

```bash
~/.local/share/fnm/aliases/default/bin/node --version
```

Clone the repo on `development` for now; step 9 moves it to `main`. If the repo is private, add a read-only deploy key on GitHub first.

```bash
git clone --branch development https://github.com/StanforteEdge-limited/ability-x.git /home/ability-x/app
```

```bash
mkdir -p /home/ability-x/app/.astro
```

```bash
exit
```

## 4. Environment files (as root)

```bash
install -o root -g root -m 600 /home/ability-x/app/deploy/ability-x.env.example /etc/ability-x.env
```

```bash
nano /etc/ability-x.env
```

Fill in every value: the port from step 1, the R2 keys and endpoint, the purge token and zone ID, `RESEND_API_KEY`, the three `GOOGLE_*` values, and a new `EMDASH_ENCRYPTION_KEY`. To make the key, run `npx emdash secrets generate` on your laptop, then store a copy in the password manager. It can't be recovered.

```bash
install -o ability-x -g ability-x -m 644 /home/ability-x/app/deploy/ability-x.build.env.example /home/ability-x/ability-x.build.env
```

```bash
nano /home/ability-x/ability-x.build.env
```

Set the same `S3_ENDPOINT` and `PORT` as in `/etc/ability-x.env`.

## 5. Service, sudo rule, nginx (as root)

```bash
install -o root -g root -m 644 /home/ability-x/app/deploy/ability-x.service /etc/systemd/system/ability-x.service
```

```bash
install -o root -g root -m 440 /home/ability-x/app/deploy/sudoers-ability-x /etc/sudoers.d/ability-x
```

```bash
visudo -c
```

Origin certificate: paste the certificate into `origin.pem` and the key into `origin.key`.

```bash
mkdir -p /etc/ssl/ability-x && nano /etc/ssl/ability-x/origin.pem
```

```bash
nano /etc/ssl/ability-x/origin.key && chmod 600 /etc/ssl/ability-x/origin.key
```

nginx: find the IP the Virtualmin vhosts listen on, then install the file with that IP (and your port, if it isn't 4321).

```bash
grep -h "listen" /etc/nginx/sites-enabled/* | sort -u
```

```bash
sed 's/SERVER_IP/<the IP>/g' /home/ability-x/app/deploy/nginx-ability-x.conf > /etc/nginx/conf.d/ability-x.conf
```

```bash
nginx -t && systemctl reload nginx
```

## 6. First deploy (as ability-x)

```bash
sudo -iu ability-x
```

```bash
bash /home/ability-x/app/scripts/deploy-vps.sh
```

It ends with `Deployed: the site answers 200`. Then, as root:

```bash
systemctl enable ability-x
```

If the build fails, the old service keeps running; read the error, fix it and run the script again.

## 7. Go live and set up the CMS

There's no staging host, so the site goes live the moment ability-x.org points at the VPS. Before that, the deploy script's own check (`the site answers 200`) is the only test. Do the steps below together, at a quiet time: until the setup wizard is finished, the public pages have no content.

1. Cloudflare dashboard:
   - Workers & Pages → `ability-x` → Settings → Domains & Routes: **remove** `ability-x.org` and `www.ability-x.org`.
   - DNS: add `A  @  <server IP>` and `CNAME  www  ability-x.org`, both proxied (orange cloud).
   - Rules → Redirect Rules: `www.ability-x.org/*` → `https://ability-x.org/${1}` (301).
2. Open https://ability-x.org/_emdash/admin and complete the setup wizard **with sample content**. This creates the Speakers, Schedule and Blog collections and imports the 36 speakers from 2025 and the 2 blog posts. Their images are downloaded from the site's own `/speakers` and `/abilityx` files into R2.
3. Create your admin account (passkey).
4. **Settings**: check the site title is `AbilityX`.
5. **Blog Posts**: seeds can't carry dates, so set each post's publish date:
   - *Why AbilityX Exists*: 29 July 2026
   - *Why We Built AbilityX: From a Forum to a Movement*: 10 September 2026
6. Caching → Configuration → **Purge Everything**, so nothing from the minutes before setup stays cached.
7. **Settings → Email → Send test email.** All email (CMS invites and sign-in links, and the website forms) comes from `abilityx@projectenable.africa`, so `RESEND_API_KEY` must be allowed to send from `projectenable.africa`. A key restricted to another domain fails with "not authorized to send emails from projectenable.africa".
8. Invite the editors (Settings → Users). They follow `docs/AbilityX-CMS-Editor-Guide.md`.

**If the blog and speakers are empty after the wizard**, import the sample content from the command line. `--skip-media` keeps the images as links to the site's own `/speakers` and `/abilityx` files instead of copying them to R2. Back up, stop the service, import, start, then Purge Everything:

```bash
sudo -u ability-x sqlite3 /home/ability-x/data/emdash.db ".backup '/home/ability-x/backups/before-seed.db'"
```

```bash
systemctl stop ability-x
```

```bash
sudo -iu ability-x bash -c 'export PATH="$HOME/.local/share/fnm:$PATH"; eval "$(fnm env --shell bash)"; cd /home/ability-x/app && npx emdash seed seed/seed.json --database /home/ability-x/data/emdash.db --skip-media'
```

```bash
systemctl start ability-x
```

It ends with `Content: 38 created`. Existing entries are never overwritten, so running it twice is safe.

## 8. Checks

- [ ] `/`, `/about`, `/partner`, `/schedule`, `/events/2025`, `/blog`, both posts and `/admin` load; images show.
- [ ] `/events/1.0` → 301 to `/events/2025`. `/programme` → 301 to `/schedule`. `/blog/nope` → 404. `www.ability-x.org` → `ability-x.org`.
- [ ] Second load of `/` shows `cf-cache-status: HIT` (browser dev tools → Network → response headers).
- [ ] Publish a test blog post: `/blog` shows it within a minute (`MISS` once, then `HIT`). The service log shows `[cloudflare-purge] purged`. Then delete the post.
- [ ] A post scheduled two minutes ahead goes live by itself.
- [ ] Partner and Exhibit forms: the row lands in the Google Sheet and both emails arrive.
- [ ] `bash /home/ability-x/app/scripts/backup-vps.sh` writes a backup.
- [ ] From your laptop, the origin refuses direct access: `curl -sk -o /dev/null -w '%{http_code}' --resolve ability-x.org:443:<server IP> https://ability-x.org/` prints `403`.

## 9. Automatic deploys from GitHub

Pushing to `development` runs the type check, tests and build. Merging `development` → `main` deploys, but only code that passed on `development`. The workflow is `.github/workflows/deploy.yml`.

On your laptop, create a deploy key:

```bash
ssh-keygen -t ed25519 -N "" -C "github-deploy-ability-x" -f ./ability-x_deploy
```

On the server, as `ability-x`, add the public key pinned to the deploy script. Paste the contents of `ability-x_deploy.pub` in place of `<public key>`:

```bash
mkdir -p ~/.ssh && chmod 700 ~/.ssh
```

```bash
echo 'command="bash /home/ability-x/app/scripts/deploy-vps.sh",no-pty,no-port-forwarding,no-agent-forwarding,no-X11-forwarding <public key>' >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys
```

Get the host key **on the server** (a scan from elsewhere could be intercepted):

```bash
ssh-keyscan -t ed25519 localhost | sed 's/^localhost/<server IP>/'
```

On GitHub → Settings → Secrets and variables → Actions, add `VPS_HOST` (server IP), `VPS_SSH_KEY` (contents of `ability-x_deploy`), `VPS_KNOWN_HOSTS` (the line from above), `CLOUDFLARE_PURGE_TOKEN` and `CLOUDFLARE_ZONE_ID`. Then delete the local key files:

```bash
rm ./ability-x_deploy ./ability-x_deploy.pub
```

The deploy runs `git pull` on whatever branch the server checkout is on, so move the server to `main`. First merge `development` → `main` on GitHub, then as `ability-x`:

```bash
cd /home/ability-x/app && git fetch && git checkout main
```

## 10. Backups

Off-site remote for `ability-x` (R2 token from step 2):

```bash
sudo -iu ability-x rclone config create r2 s3 provider=Cloudflare access_key_id=<key> secret_access_key=<secret> endpoint=https://<ACCOUNT_ID>.r2.cloudflarestorage.com no_head=true no_check_bucket=true
```

Both flags matter. `no_check_bucket=true`: otherwise rclone tries to create the bucket before uploading, and an object-level token gets `AccessDenied`. `no_head=true`: otherwise rclone's post-upload check gets `501` from R2 and reports a false failure.

Start the command with a space so the secret stays out of the shell history. Test with `rclone ls r2:ability-x-backups`; a token scoped to the bucket can't run `rclone lsd r2:`.

Nightly cron for `ability-x` (Webmin → Scheduled Cron Jobs, or `crontab -e`):

```
17 2 * * *  /home/ability-x/app/scripts/backup-vps.sh
```

Restore: stop the service, copy a backup over `/home/ability-x/data/emdash.db`, delete any `emdash.db-wal` and `emdash.db-shm`, then start the service.

## 11. Rollback

The old Next.js Worker stays deployed. To go back:

1. Delete the `A @` and `CNAME www` records.
2. Workers & Pages → `ability-x` → Domains & Routes → add `ability-x.org` and `www.ability-x.org` again.
3. Purge Everything.

The old code is on the branch `backup/nextjs-2026-10-28`.

## 12. After 14 days

- Delete the `ability-x` Worker (Workers & Pages → `ability-x` → Settings → Delete).
- **Never delete the `ability-x-media` bucket.** Every image on the site lives there.

## Troubleshooting

| Symptom | Fix |
|---|---|
| Every page is `cf-cache-status: DYNAMIC` | The Cache Rule is missing, or the host isn't in its expression. |
| A publish doesn't show up | Check `journalctl -u ability-x` for `[cloudflare-purge]`. Without a token, purge by hand. |
| A template change doesn't show after deploy | The workflow's purge step needs `CLOUDFLARE_PURGE_TOKEN` and `CLOUDFLARE_ZONE_ID`. Otherwise Purge Everything by hand. |
| The admin 404s | `EMDASH_ENCRYPTION_KEY` is missing from `/etc/ability-x.env`. |
| Service won't start: `namespace` error | `/home/ability-x/app/.astro` doesn't exist. Create it as `ability-x`. |
| Everyone gets 403 | nginx is filtering on `$remote_addr`. It must use `$realip_remote_addr` (it does in the shipped file). |
| Images 404 after deploy | The R2 keys or `S3_*` values differ between the build env and `/etc/ability-x.env`. |
| Wrong domain in links or sign-in | `EMDASH_SITE_URL` is baked in at build time: it must be `https://ability-x.org` in both env files, then redeploy. |
