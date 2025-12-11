export type CloudflareKVConfig = {
  accountId: string;
  namespaceId: string;
  apiToken: string;
};

const createKVUrl = (key: string, config: CloudflareKVConfig) => {
  const encodedKey = encodeURIComponent(key);
  return `https://api.cloudflare.com/client/v4/accounts/${config.accountId}/storage/kv/namespaces/${config.namespaceId}/values/${encodedKey}`;
};

export async function getCloudflareKVJSON<T>(
  key: string,
  config: CloudflareKVConfig
): Promise<T | null> {
  const url = createKVUrl(key, config);
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${config.apiToken}`,
    },
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error(
      `Cloudflare KV GET failed (${res.status}): ${await res.text()}`
    );
  }

  const text = await res.text();
  if (!text) {
    return null;
  }

  return JSON.parse(text) as T;
}

export async function putCloudflareKVJSON(
  key: string,
  value: unknown,
  config: CloudflareKVConfig,
  ttlSeconds?: number
) {
  const baseUrl = createKVUrl(key, config);
  const url =
    typeof ttlSeconds === "number"
      ? `${baseUrl}?expiration_ttl=${ttlSeconds}`
      : baseUrl;

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${config.apiToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
  });

  if (!res.ok) {
    throw new Error(
      `Cloudflare KV PUT failed (${res.status}): ${await res.text()}`
    );
  }
}
