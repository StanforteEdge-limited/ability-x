/**
 * Builds seed/seed.json from the legacy site data.
 *
 *   npm run seed:build                       # images from the live site
 *   npm run seed:build -- --media-base=URL   # images from somewhere else
 *
 * EmDash downloads each $media URL when the seed's sample content is applied,
 * so the media base must serve the files in /public at that moment. The live
 * Next.js site does until cutover.
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { blogPosts } from "./legacy/blog";
import { speakers } from "./legacy/speakers";
import { buildSeed } from "./seed-lib";

const mediaArg = process.argv.find((arg) => arg.startsWith("--media-base="));
const mediaBase = mediaArg?.split("=")[1] ?? "https://ability-x.org";

const seed = buildSeed({ speakers, posts: blogPosts, mediaBase });
const target = fileURLToPath(new URL("../seed/seed.json", import.meta.url));
writeFileSync(target, `${JSON.stringify(seed, null, 2)}\n`);

console.log(
  `Wrote ${target}: ${seed.content.speakers.length} speakers, ${seed.content.posts.length} posts (media from ${mediaBase})`,
);
