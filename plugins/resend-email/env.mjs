// Runtime secrets for hook handlers, which run without an Astro request context.
// Kept in its own module so the built-in import stays static (see EmDash's
// cloudflare-email plugin).
//
// On the VPS the process environment is the only source of secrets: systemd
// reads /etc/abilityx.env (mode 600, root-owned) into the process.
export const env = globalThis.process?.env ?? {};
