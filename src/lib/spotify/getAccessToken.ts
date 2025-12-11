const encodeBase64 = (value: string) => {
  if (typeof btoa === "function") {
    return btoa(value);
  }

  const globalAny = globalThis as any;
  if (globalAny?.Buffer?.from) {
    return globalAny.Buffer.from(value).toString("base64");
  }

  throw new Error("Base64 encoder is not available in this environment.");
};

export async function getAccessTokenFromRefreshToken(env: any): Promise<string> {
  const params = new URLSearchParams();
  params.append("grant_type", "refresh_token");
  params.append("refresh_token", env.SPOTIFY_REFRESH_TOKEN);

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${encodeBase64(
        `${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`
      )}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });

  const json = await res.json<any>();
  return json.access_token;
}
