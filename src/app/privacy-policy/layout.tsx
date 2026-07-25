import type { Metadata } from "next";
import { metadataForPrivacy, schemaForPrivacy, SeoJsonLd } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return metadataForPrivacy();
}

export default async function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = await schemaForPrivacy();
  return (
    <>
      <SeoJsonLd schema={schema} />
      {children}
    </>
  );
}
