import type { Metadata } from "next";
import {
  metadataForApartmentSlug,
  schemaForApartmentSlug,
  SeoJsonLd,
} from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return metadataForApartmentSlug(slug);
}

export default async function CatalogSlugLayout({ params, children }: Props) {
  const { slug } = await params;
  const schema = await schemaForApartmentSlug(slug);

  return (
    <>
      <SeoJsonLd schema={schema} />
      {children}
    </>
  );
}
