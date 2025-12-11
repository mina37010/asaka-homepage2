import { getAccessTokenFromRefreshToken } from "@/lib/spotify/getAccessToken";
import { fetchRecentTracks } from "@/lib/spotify/fetchRecentTracks";

interface CachedNowListen {
  timestamp: number;
  data: any[];
}

interface Env {
  SPOTIFY_CLIENT_ID: string;
  SPOTIFY_CLIENT_SECRET: string;
  SPOTIFY_REFRESH_TOKEN: string;
  MY_KV: KVNamespace;
}

export const onRequest = async ({ env }: { env: Env }) => {
  try {
    const cacheKey = "nowlisten_cache";
    const ttl = 60 * 1000;

    // KV から取得
    const cachedRaw = await env.MY_KV.get(cacheKey, { type: "json" });

    const cached = cachedRaw as CachedNowListen | null;
    const now = Date.now();

    if (cached && typeof cached.timestamp === "number") {
      const age = now - cached.timestamp;

      if (age < ttl) {
        return new Response(JSON.stringify(cached.data), {
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    // Spotify API → 最新データ取得
    const accessToken = await getAccessTokenFromRefreshToken(env);
    const data = await fetchRecentTracks(accessToken);

    // KV に保存
    await env.MY_KV.put(
      cacheKey,
      JSON.stringify({ timestamp: now, data } satisfies CachedNowListen),
      { expirationTtl: 300 }
    );

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Worker error:", err);
    return new Response("Internal error in nowlisten function", { status: 500 });
  }
};
