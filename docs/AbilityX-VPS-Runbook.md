# AbilityX VPS Runbook

How the site runs, how to set it up on the VPS, and how to move ability-x.org off the old Cloudflare Worker.

```
Cloudflare (proxied DNS, Cache Rule, purge by tag, R2 media)
  → nginx on the VPS (Cloudflare IPs only, Origin Certificate)
    → 127.0.0.1:PORT  node ./dist/server/entry.mjs   (systemd: abilityx.service)
      → SQLite /home/abilityx/data/emdash.db        media → R2 bucket ability-x-media
```

| Thing | Value |
|---|---|
| Production | https://ability-x.org (still the Next.js Worker `ability-x` until cutover) |
| Staging | https://vps.ability-x.org |
| Server user | `abilityx` (replace everywhere if Virtualmin chose another name) |
| App checkout | `/home/abilityx/app` |
| Data (DB, sessions) | `/home/abilityx/data` |
| Runtime env (secrets) | `/etc/abilityx.env` (root, 600) |
| Build env (no secrets) | `/home/abilityx/abilityx.build.env` |
| Service | `abilityx.service` (logs: `journalctl -u abilityx -f`) |
| nginx | `/etc/nginx/conf.d/abilityx.conf` |
| Media bucket | R2 `ability-x-media`. **Never delete it.** |
| Backup bucket | R2 `ability-x-backups` (private, 30-day lifecycle rule) |
| Editors sign in | https://ability-x.org/admin |
| Rollback copy of the old site | git branch `backup/nextjs-2026-10-28` |

Rules: run one command per line. Never paste secrets into chat or commit them. Check a secret is set with `sudo grep -c 'NAME=.' /etc/abilityx.env` (prints 1).

---

## 1. Pick the port

`4321` is the default, but another site on the box may use it. Security Focus listens on 4321 if this is the same server.

```bash
ss -ltnp | grep -E ':43[0-9]{2} '
```

Use the first free port from 4321 up. Set that same number in `/etc/abilityx.env`, in the build env and in `proxy_pass` in the nginx file.

## 2. Cloudflare (dashboard, ability-x.org zone)

1. **R2** → enable it if asked → create the buckets `ability-x-media` and `ability-x-backups`. On `ability-x-backups`, add a lifecycle rule that deletes objects after 30 days.
2. **R2 → Manage API tokens** → create a token with Object Read & Write on both buckets. Note the access key, the secret and the S3 endpoint (`https://<ACCOUNT_ID>.r2.cloudflarestorage.com`).
3. **My Profile → API Tokens** → create a token with Zone → Cache Purge on ability-x.org. It's used twice: in `/etc/abilityx.env` and as the GitHub secret `CLOUDFLARE_PURGE_TOKEN`. Also copy the **Zone ID** from the zone's overview page.
4. **SSL/TLS → Origin Server** → create a certificate for `ability-x.org, *.ability-x.org`. Keep both the certificate and the private key for step 5.
5. **DNS** → add `A  vps  <server IP>`, proxied (orange cloud).
6. **Caching → Cache Rules** → create a rule:
   - Expression: `(http.host in {"vps.ability-x.org"} and not starts_with(http.request.uri.path, "/_emdash") and not http.cookie contains "astro-session=")`
   - Cache eligibility: **Eligible for cache**
   - Edge TTL: **Use cache-control header if present**

## 3. Server setup (as root)

If Virtualmin already has a virtual server for ability-x.org, use its user. Otherwise create one:

```bash
adduser --disabled-password --gecos "" abilityx
```

```bash
sudo -u abilityx mkdir -p /home/abilityx/data/sessions /home/abilityx/backups
```

```bash
apt-get install -y sqlite3 rclone git curl
```

Node 24 for this user only (fnm):

```bash
sudo -iu abilityx
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

Clone the repo. Use the `development` branch for staging; you'll switch to `main` at cutover. If the repo is private, add a read-only deploy key on GitHub first.

```bash
git clone --branch development https://github.com/StanforteEdge-limited/ability-x.git /home/abilityx/app
```

```bash
mkdir -p /home/abilityx/app/.astro
```

```bash
exit
```

## 4. Environment files (as root)

```bash
install -o root -g root -m 600 /home/abilityx/app/deploy/abilityx.env.example /etc/abilityx.env
```

```bash
nano /etc/abilityx.env
```

Fill in every value: the port from step 1, the R2 keys and endpoint, the purge token and zone ID, `RESEND_API_KEY`, the three `GOOGLE_*` values, and a new `EMDASH_ENCRYPTION_KEY`. To make the key, run `npx emdash secrets generate` on your laptop, then store a copy in the password manager. It can't be recovered.

```bash
install -o abilityx -g abilityx -m 644 /home/abilityx/app/deploy/abilityx.build.env.example /home/abilityx/abilityx.build.env
```

```bash
nano /home/abilityx/abilityx.build.env
```

Set the same `S3_ENDPOINT` and `PORT` as in `/etc/abilityx.env`.

## 5. Service, sudo rule, nginx (as root)

```bash
install -o root -g root -m 644 /home/abilityx/app/deploy/abilityx.service /etc/systemd/system/abilityx.service
```

```bash
install -o root -g root -m 440 /home/abilityx/app/deploy/sudoers-abilityx /etc/sudoers.d/abilityx
```

```bash
visudo -c
```

Origin certificate: paste the certificate into `origin.pem` and the key into `origin.key`.

```bash
mkdir -p /etc/ssl/abilityx && nano /etc/ssl/abilityx/origin.pem
```

```bash
nano /etc/ssl/abilityx/origin.key && chmod 600 /etc/ssl/abilityx/origin.key
```

nginx: find the IP the Virtualmin vhosts listen on, then install the file with that IP (and your port, if it isn't 4321).

```bash
grep -h "listen" /etc/nginx/sites-enabled/* | sort -u
```

```bash
sed 's/SERVER_IP/<the IP>/g' /home/abilityx/app/deploy/nginx-abilityx.conf > /etc/nginx/conf.d/abilityx.conf
```

```bash
nginx -t && systemctl reload nginx
```

## 6. First deploy (as abilityx)

```bash
sudo -iu abilityx
```

```bash
bash /home/abilityx/app/scripts/deploy-vps.sh
```

It ends with `Deployed: the site answers 200`. Then, as root:

```bash
systemctl enable abilityx
```

If the build fails, the old service keeps running; read the error, fix it and run the script again.

## 7. Set up the CMS on staging

1. Open https://vps.ability-x.org/_emdash/admin and complete the setup wizard **with sample content**. This creates the Speakers, Schedule and Blog collections and imports the 36 speakers from 2025 and the 2 blog posts. Their images are downloaded from the live ability-x.org into R2.
2. Create your admin account (passkey). Passkeys are tied to the domain: the one you make on `vps.` won't work on `ability-x.org`. After cutover, sign in with an email link and add a new passkey.
3. **Settings**: check the site title is `AbilityX`.
4. **Blog Posts**: seeds can't carry dates, so set each post's publish date:
   - *Why AbilityX Exists*: 29 July 2026
   - *Why We Built AbilityX: From a Forum to a Movement*: 10 September 2026
5. **Settings → Email → Send test email.** If it fails with a domain error, `projectenable.africa` isn't verified in Resend. Either verify it, or change the From address in `astro.config.mjs` to one on `abilityx.projectenable.africa` (the website forms already send from there).
6. Invite the editors (Settings → Users). They follow `docs/AbilityX-CMS-Editor-Guide.md`.

## 8. Staging checks

- [ ] `/`, `/about`, `/partner`, `/schedule`, `/events/2025`, `/blog`, both posts and `/admin` load; images show.
- [ ] `/events/1.0` → 301 to `/events/2025`. `/programme` → 301 to `/schedule`. `/blog/nope` → 404.
- [ ] Second load of `/` shows `cf-cache-status: HIT` (browser dev tools → Network → response headers).
- [ ] Publish a test blog post: `/blog` shows it within a minute (`MISS` once, then `HIT`). The service log shows `[cloudflare-purge] purged`. Then delete the post.
- [ ] A post scheduled two minutes ahead goes live by itself.
- [ ] Partner and Exhibit forms: the row lands in the Google Sheet and both emails arrive.
- [ ] `bash /home/abilityx/app/scripts/backup-vps.sh` writes a backup.
- [ ] From your laptop, the origin refuses direct access: `curl -sk -o /dev/null -w '%{http_code}' --resolve vps.ability-x.org:443:<server IP> https://vps.ability-x.org/` prints `403`.

## 9. Automatic deploys from GitHub

Pushing to `development` runs the type check, tests and build. Merging `development` → `main` deploys, but only code that passed on `development`. The workflow is `.github/workflows/deploy.yml`.

On your laptop, create a deploy key:

```bash
ssh-keygen -t ed25519 -N "" -C "github-deploy-abilityx" -f ./abilityx_deploy
```

On the server, as `abilityx`, add the public key pinned to the deploy script. Paste the contents of `abilityx_deploy.pub` in place of `<public key>`:

```bash
mkdir -p ~/.ssh && chmod 700 ~/.ssh
```

```bash
echo 'command="bash /home/abilityx/app/scripts/deploy-vps.sh",no-pty,no-port-forwarding,no-agent-forwarding,no-X11-forwarding <public key>' >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys
```

Get the host key **on the server** (a scan from elsewhere could be intercepted):

```bash
ssh-keyscan -t ed25519 localhost | sed 's/^localhost/<server IP>/'
```

On GitHub → Settings → Secrets and variables → Actions, add `VPS_HOST` (server IP), `VPS_SSH_KEY` (contents of `abilityx_deploy`), `VPS_KNOWN_HOSTS` (the line from above), `CLOUDFLARE_PURGE_TOKEN` and `CLOUDFLARE_ZONE_ID`. Then delete the local key files:

```bash
rm ./abilityx_deploy ./abilityx_deploy.pub
```

The deploy runs `git pull` on whatever branch the server checkout is on, so the server must be on `main` once you deploy through GitHub (step 11).

## 10. Backups

Off-site remote for `abilityx` (R2 token from step 2):

```bash
sudo -iu abilityx rclone config create r2 s3 provider=Cloudflare access_key_id=<key> secret_access_key=<secret> endpoint=https://<ACCOUNT_ID>.r2.cloudflarestorage.com no_head=true
```

`no_head=true` matters: without it rclone's post-upload check gets `501` from R2 and reports a false failure.

Nightly cron for `abilityx` (Webmin → Scheduled Cron Jobs, or `crontab -e`):

```
17 2 * * *  /home/abilityx/app/scripts/backup-vps.sh
```

Restore: stop the service, copy a backup over `/home/abilityx/data/emdash.db`, delete any `emdash.db-wal` and `emdash.db-shm`, then start the service.

## 11. Cutover: ability-x.org moves to the VPS

Pick a quiet time, then do these steps in order.

1. Freeze edits in the CMS.
2. Merge `development` → `main` on GitHub and let the workflow pass (or, before step 9 is set up, deploy by hand).
3. On the server, as `abilityx`, move the checkout to `main`:

   ```bash
   cd /home/abilityx/app && git fetch && git checkout main
   ```

4. In **both** `/etc/abilityx.env` and `/home/abilityx/abilityx.build.env`, set `EMDASH_SITE_URL=https://ability-x.org`. Then deploy:

   ```bash
   bash /home/abilityx/app/scripts/deploy-vps.sh
   ```

5. As root, add the apex to nginx. In `/etc/nginx/conf.d/abilityx.conf`, change the line to `server_name ability-x.org vps.ability-x.org;`, then:

   ```bash
   nginx -t && systemctl reload nginx
   ```

6. Cloudflare dashboard:
   - Workers & Pages → `ability-x` → Settings → Domains & Routes: **remove** `ability-x.org` and `www.ability-x.org`.
   - DNS: add `A  @  <server IP>` (proxied). For www, add `CNAME  www  ability-x.org` (proxied).
   - Rules → Redirect Rules: www.ability-x.org/* → https://ability-x.org/$1 (301).
   - Cache Rules: add `"ability-x.org"` to the host list in the expression.
   - Caching → Configuration → **Purge Everything**.
7. Run the checks from step 8 on https://ability-x.org, plus an email-link sign-in and a new passkey.

## 12. Rollback

The old Next.js Worker stays deployed. To go back:

1. Delete the `A @` and `CNAME www` records.
2. Workers & Pages → `ability-x` → Domains & Routes → add `ability-x.org` and `www.ability-x.org` again.
3. Purge Everything.

The old code is on the branch `backup/nextjs-2026-10-28`.

## 13. After 14 days

- Delete the `ability-x` Worker (Workers & Pages → `ability-x` → Settings → Delete).
- **Never delete the `ability-x-media` bucket.** Every image on the site lives there.

## Troubleshooting

| Symptom | Fix |
|---|---|
| Every page is `cf-cache-status: DYNAMIC` | The Cache Rule is missing, or the host isn't in its expression. |
| A publish doesn't show up | Check `journalctl -u abilityx` for `[cloudflare-purge]`. Without a token, purge by hand. |
| A template change doesn't show after deploy | The workflow's purge step needs `CLOUDFLARE_PURGE_TOKEN` and `CLOUDFLARE_ZONE_ID`. Otherwise Purge Everything by hand. |
| The admin 404s | `EMDASH_ENCRYPTION_KEY` is missing from `/etc/abilityx.env`. |
| Service won't start: `namespace` error | `/home/abilityx/app/.astro` doesn't exist. Create it as `abilityx`. |
| Everyone gets 403 | nginx is filtering on `$remote_addr`. It must use `$realip_remote_addr` (it does in the shipped file). |
| Images 404 after deploy | The R2 keys or `S3_*` values differ between the build env and `/etc/abilityx.env`. |
| Wrong links after cutover (still `vps.`) | `EMDASH_SITE_URL` is baked in at build time: update both env files and redeploy. |
