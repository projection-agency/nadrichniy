import type { Metadata } from "next";
import { metadataForPageSlug, schemaForPageSlug, SeoJsonLd } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return metadataForPageSlug("contacts", "/contacts", "Контакти");
}

export default async function ContactsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = await schemaForPageSlug("contacts", "/contacts");
  return (
    <>
      <SeoJsonLd schema={schema} />
      {children}
    </>
  );
}
