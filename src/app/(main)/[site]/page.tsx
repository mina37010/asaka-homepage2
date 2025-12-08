export const runtime = "edge";
import SiteClient from "./SiteClient";

export const metadata = {
  title: "Link collection | 浅香.party!",
  description:
    "浅香ひなたの友人の個人サイトの紹介ページ。",
};

export default async function Page({ params }: { params: Promise<{ site: string }> }) {
  const { site } = await params;

  return <SiteClient site={site} />;
}
