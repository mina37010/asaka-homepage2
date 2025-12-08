import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://asaka.party"),

  title: "浅香.party! | Asaka Hinata's Site",
  description:
    "浅香ひなたの個人サイト。3Dモデル作品、ギャラリー、プロフィール、仲間たちのリンクなど",

  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://asaka.party/",
    siteName: "浅香.party!",
    title: "浅香.party! | Asaka Hinata's Site",
    description:
      "浅香ひなたの個人サイト。3Dモデル作品、ギャラリー、プロフィール、仲間たちのリンクなど",
    images: [
      {
        url: "/Twitter_card.png",
        width: 1200,
        height: 630,
        alt: "浅香.party! OGP Image",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "浅香.party! | Asaka Hinata's Site",
    description:
      "浅香ひなたの個人サイト。3Dモデル作品、ギャラリー、プロフィール、仲間たちのリンクなど",
    images: ["/Twitter_card.png"],
    site: "@akira__okumura",
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        {children}
      </body>
    </html>
  );
}
