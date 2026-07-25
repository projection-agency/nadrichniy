import type { Metadata } from "next";
import { metadataForPageSlug, schemaForPageSlug, SeoJsonLd } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return metadataForPageSlug("blog", "/blog", "Блог");
}

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = await schemaForPageSlug("blog", "/blog");
  return (
    <>
      <SeoJsonLd schema={schema} />
      {children}
    </>
  );
}
