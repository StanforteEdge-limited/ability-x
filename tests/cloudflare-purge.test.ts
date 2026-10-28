import { afterEach, describe, expect, it, vi } from "vitest";
import { createPlugin } from "@abilityx/cloudflare-purge";

const log = { info: vi.fn(), warn: vi.fn(), error: vi.fn() };

function hook(name: string) {
  const plugin = createPlugin() as unknown as { hooks: Record<string, { handler: (event: unknown, ctx: unknown) => Promise<void> }> };
  return plugin.hooks[name].handler;
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  vi.clearAllMocks();
});

describe("cloudflare-purge", () => {
  it("purges the collection tag when an entry is published", async () => {
    vi.stubEnv("CLOUDFLARE_ZONE_ID", "zone");
    vi.stubEnv("CLOUDFLARE_API_TOKEN", "token");
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ success: true }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    await hook("content:afterPublish")({ collection: "speakers", content: { id: "abc" } }, { log });

    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.cloudflare.com/client/v4/zones/zone/purge_cache");
    expect(JSON.parse(init.body)).toEqual({ tags: ["speakers", "abc"] });
  });

  it("does nothing without credentials", async () => {
    vi.stubEnv("CLOUDFLARE_ZONE_ID", "");
    vi.stubEnv("CLOUDFLARE_API_TOKEN", "");
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    await hook("content:afterPublish")({ collection: "posts", content: { id: "abc" } }, { log });

    expect(fetchMock).not.toHaveBeenCalled();
  });
});
