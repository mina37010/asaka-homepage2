import { NextResponse } from "next/server";
import { getAccessTokenFromRefreshToken } from "@/lib/spotify/getAccessToken";
import { fetchRecentTracks } from "@/lib/spotify/fetchRecentTracks";
import {
  CloudflareKVConfig,
  getCloudflareKVJSON,
  putCloudflareKVJSON,
} from "@/lib/cloudflare/kv";

type CachedNowListen = {
  timestamp: number;
  data: any[];
};

const CACHE_TTL_MS = 60 * 1000;
const KV_TTL_SECONDS = 5 * 60;
const CACHE_KEY = "nowlisten_cache";
let cache: CachedNowListen | null = null;

const loadKVConfig = (): CloudflareKVConfig | null => {
  const {
    CLOUDFLARE_ACCOUNT_ID,
    CLOUDFLARE_KV_NAMESPACE_ID,
    CLOUDFLARE_API_TOKEN,
  } = process.env;

  if (
    !CLOUDFLARE_ACCOUNT_ID ||
    !CLOUDFLARE_KV_NAMESPACE_ID ||
    !CLOUDFLARE_API_TOKEN
  ) {
    return null;
  }

  return {
    accountId: CLOUDFLARE_ACCOUNT_ID,
    namespaceId: CLOUDFLARE_KV_NAMESPACE_ID,
    apiToken: CLOUDFLARE_API_TOKEN,
  };
};

const isCacheValid = (
  cached: CachedNowListen | null,
  now: number
): cached is CachedNowListen => {
  if (!cached || typeof cached.timestamp !== "number") return false;
  return now - cached.timestamp < CACHE_TTL_MS;
};

export async function GET() {
  const {
    SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET,
    SPOTIFY_REFRESH_TOKEN,
  } = process.env;

  if (
    !SPOTIFY_CLIENT_ID ||
    !SPOTIFY_CLIENT_SECRET ||
    !SPOTIFY_REFRESH_TOKEN
  ) {
    console.error("Spotify credentials are missing.");
    return NextResponse.json(
      { error: "Spotify credentials are not configured." },
      { status: 500 }
    );
  }

  const kvConfig = loadKVConfig();
  const now = Date.now();

  if (isCacheValid(cache, now)) {
    return NextResponse.json(cache.data);
  }

  if (kvConfig) {
    try {
      const kvCached = await getCloudflareKVJSON<CachedNowListen>(
        CACHE_KEY,
        kvConfig
      );

      if (isCacheValid(kvCached, now)) {
        cache = kvCached;
        return NextResponse.json(kvCached!.data);
      }
    } catch (error) {
      console.error("Failed to read Cloudflare KV cache:", error);
    }
  } else {
    console.warn("Cloudflare KV configuration is missing; skipping KV cache.");
  }

  try {
    const accessToken = await getAccessTokenFromRefreshToken({
      SPOTIFY_CLIENT_ID,
      SPOTIFY_CLIENT_SECRET,
      SPOTIFY_REFRESH_TOKEN,
    });

    const data = await fetchRecentTracks(accessToken);
    cache = { timestamp: now, data };

    if (kvConfig) {
      try {
        await putCloudflareKVJSON(
          CACHE_KEY,
          cache,
          kvConfig,
          KV_TTL_SECONDS
        );
      } catch (error) {
        console.error("Failed to update Cloudflare KV cache:", error);
      }
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("nowlisten route error:", error);
    return NextResponse.json(
      { error: "Failed to fetch nowlisten data." },
      { status: 500 }
    );
  }
}
