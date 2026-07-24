import type { Metadata } from "next";
import { metadataForPageSlug, schemaForPageSlug, SeoJsonLd } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return metadataForPageSlug("catalog", "/catalog", "Каталог");
}

export default async function CatalogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = await schemaForPageSlug("catalog", "/catalog");
  return (
    <>
      <SeoJsonLd schema={schema} />
      {children}
    </>
  );
}
