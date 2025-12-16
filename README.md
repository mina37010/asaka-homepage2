# asaka-homepage2

浅香ひなたの個人サイトです。
Next.js（App Router）＋ TypeScript で構築し、Cloudflare Pages でホスティングしています。

👉 https://asaka.party/

## 🛠 Tech Stack

- **Next.js 16（App Router / React Compiler）**
- **React 19**
- **TypeScript**
- **Cloudflare Pages**
- **Cloudflare Workers KV**
- **Cloudflare R2**
- **Global CSS**

## 🔑 環境変数

`/api/nowlisten` はSpotify APIとCloudflare KVを利用するため、以下の値を設定してください。

- `SPOTIFY_CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET`
- `SPOTIFY_REFRESH_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_KV_NAMESPACE_ID`
- `CLOUDFLARE_API_TOKEN`
