export const runtime = "edge";
"use client";

import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import "@/styles/Sites.css";

interface SiteItem {
  key: string;
  url: string;
  username: string;
}

const sites: SiteItem[] = [
  { key: "210on", url: "https://210o.net", username: "ぱうろ" },
  { key: "inaniwa", url: "https://いなにわうどん.みんな", username: "いなにわうどん" },
  { key: "nimoca", url: "https://nimoca.vercel.app", username: "nimoca" },
  { key: "maroyaka", url: "https://maroyaka.party", username: "定積" },
  { key: "churu", url: "https://itsu.dev", username: "ちゅるり" },
];

type SiteKey = SiteItem["key"];

const getSite = (key: SiteKey): SiteItem | undefined =>
  sites.find((site) => site.key === key);

export default function Page() {
  const params = useParams<{ site: SiteKey | "link" }>();
  const siteKey = params.site;

  const site = getSite(siteKey as SiteKey);
  const isLinkPage:boolean = siteKey === "link";

  if (!site && !isLinkPage) {
    notFound();
  }

  return (
    <div className="with-nav">

      <div className={`Iframe ${isLinkPage ? "hide" : ""}`}>
        <h1>誰のページですか?</h1>

        <h2>
          {site ? (
            <a
              className="a-hover"
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {site.username}
            </a>
          ) : null}
        </h2>

        {!isLinkPage && site?.url && (
          <iframe
            id="inlineFrame"
            title={site.username}
            width="95%"
            height="75%"
            src={site.url}
            className="iframe-style"
            sandbox="allow-scripts allow-same-origin allow-forms"
          />
        )}
      </div>

      {/* link ページ専用のタイトル */}
      <div className={`center ${isLinkPage ? "" : "hide"}`}>
        <h1>皆様のリンク集！</h1>
      </div>

      <div className="button-container">
        {sites.map(({ key, url, username }) => (
          <Link className="a-non" href={`/${key}`} key={key}>
            <button className="site-button base-color">
              <span>{username}</span>
              <span className="button-username pale-color">
                {url.replace("https://", "")}
              </span>
            </button>
          </Link>
        ))}
      </div>

    </div>
  );
}
