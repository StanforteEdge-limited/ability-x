import node from "@astrojs/node";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, sessionDrivers } from "astro/config";
import emdash, { local, memoryCache, s3 } from "emdash/astro";
import { sqlite } from "emdash/db";

// Dev runs on loopback, where EmDash needs no configured origin, and a
// config-file siteUrl would send unauthenticated admin redirects to the live
// site. Production builds bake the canonical origin in; staging builds
// override it:  EMDASH_SITE_URL=https://vps.ability-x.org npm run build
// (Keep defineConfig's object-literal form: the emdash integration does not
// mount its routes when astro.config passes a function to defineConfig.)
const siteUrl =
	process.env.NODE_ENV === "production"
		? (process.env.EMDASH_SITE_URL ?? "https://ability-x.org")
		: undefined;

// The database is a SQLite file. The path is read at BUILD time and baked
// into the bundle, so DATABASE_PATH must be set in the build environment as
// well as at runtime.
const databasePath = process.env.DATABASE_PATH ?? "./data/emdash.db";

// Media lives in R2, reached through its S3 API. Without S3_BUCKET (laptop,
// CI) the site falls back to local disk so `npm run dev` needs no cloud
// credentials. EMDASH_STORAGE=s3|local forces the choice.
const storageDriver = process.env.EMDASH_STORAGE ?? (process.env.S3_BUCKET ? "s3" : "local");
const storage =
	storageDriver === "s3"
		? s3()
		: local({
				directory: process.env.MEDIA_DIR ?? "./data/uploads",
				baseUrl: "/_emdash/api/media/file",
			});

export default defineConfig({
	output: "server",
	adapter: node({ mode: "standalone" }),
	// The admin login lives in the session store. On the VPS it sits next to
	// the database, outside the build, so a deploy does not log editors out.
	session: {
		driver: sessionDrivers.fsLite({ base: process.env.SESSION_DIR ?? "./.astro/sessions" }),
	},
	// There is deliberately no Astro cache provider and no routeRules here.
	// A cache provider makes EmDash bypass its own query cache. The page cache
	// is Cloudflare's, in front of the origin: src/middleware.ts sets the
	// headers it reads, using the tag groups in src/lib/cache-tags.ts.
	image: {
		layout: "constrained",
		responsiveStyles: true,
	},
	redirects: {
		"/events/1.0": { status: 301, destination: "/events/2025" },
		"/programme": { status: 301, destination: "/schedule" },
	},
	vite: {
		plugins: [tailwindcss()],
	},
	integrations: [
		react(),
		emdash({
			database: sqlite({ url: `file:${databasePath}` }),
			storage,
			// One long-lived process, so this is a real cross-request cache. A
			// write stamps the namespace and orphans its cached queries, and
			// revalidate: 0 lets an editor see their own publish immediately.
			objectCache: memoryCache({ defaultTtl: 3_600, revalidate: 0 }),
			siteUrl,
			// nginx forwards the visitor's IP. Only safe because the origin
			// accepts Cloudflare traffic alone (deploy/nginx-abilityx.conf).
			trustedProxyHeaders: ["cf-connecting-ip", "x-forwarded-for"],
			// Cached pages are shared with signed-in editors; a client toolbar stays reliable.
			toolbar: "client",
			admin: {
				logo: "/abilityx/logo-primary.png",
				siteName: "AbilityX",
				footerLabel: "AbilityX",
				favicon: "/favicon.svg",
			},
			plugins: [],
		}),
	],
	devToolbar: { enabled: false },
});
