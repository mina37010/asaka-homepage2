export const runtime = "edge";

import SiteClient from "./SiteClient";

export default async function Page({ params }: { params: Promise<{ site: string }> }) {
  const { site } = await params;

  return <SiteClient site={site} />;
}
