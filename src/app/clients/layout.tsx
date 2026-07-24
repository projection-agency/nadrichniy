import type { Metadata } from "next";
import { metadataForPageSlug, schemaForPageSlug, SeoJsonLd } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return metadataForPageSlug("clients", "/clients", "Клієнтам");
}

export default async function ClientsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = await schemaForPageSlug("clients", "/clients");
  return (
    <>
      <SeoJsonLd schema={schema} />
      {children}
    </>
  );
}
