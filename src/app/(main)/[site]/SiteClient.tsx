"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
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

type Props = {
  site: string;
};

export default function SiteClient({ site }: Props) {
  const siteData = sites.find((s) => s.key === site);
  const isLinkPage = site === "link";

  // 該当ページが無い場合 NotFound
  if (!siteData && !isLinkPage) {
    notFound();
  }

  return (
    <div className="with-nav">

      {/* 個別サイトページ */}
      <div className={`Iframe ${isLinkPage ? "hide" : ""}`}>
        <h1>誰のページですか?</h1>

        <h2>
          {siteData && (
            <a
              className="a-hover"
              href={siteData.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {siteData.username}
            </a>
          )}
        </h2>

        {!isLinkPage && siteData?.url && (
          <iframe
            id="inlineFrame"
            title={siteData.username}
            width="95%"
            height="75%"
            src={siteData.url}
            className="iframe-style"
            sandbox="allow-scripts allow-same-origin allow-forms"
          />
        )}
      </div>

      {/* link ページ専用のタイトル */}
      <div className={`center ${isLinkPage ? "" : "hide"}`}>
        <h1>皆様のリンク集！</h1>
      </div>

      {/* リンクボタン一覧 */}
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
