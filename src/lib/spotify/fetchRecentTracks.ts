type SpotifyRecent = {
  items: Array<{
    track: {
      name: string;
      artists: Array<{ name: string }>;
      album: { images: Array<{ url?: string }> };
      external_urls: { spotify: string };
    };
  }>;
};

export async function fetchRecentTracks(accessToken: string): Promise<any[]> {
  const res = await fetch(
    "https://api.spotify.com/v1/me/player/recently-played?limit=20",
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  const json: SpotifyRecent = await res.json();

  return json.items.map((item: any) => ({
    title: item.track.name,
    artist: item.track.artists.map((a: any) => a.name).join(", "),
    image: item.track.album.images[0]?.url,
    url: item.track.external_urls.spotify,
  }));
}
