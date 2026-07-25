import type { Metadata } from "next";
import {
  metadataForPostSlug,
  schemaForPostSlug,
  SeoJsonLd,
} from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return metadataForPostSlug(slug);
}

export default async function BlogSlugLayout({ params, children }: Props) {
  const { slug } = await params;
  const schema = await schemaForPostSlug(slug);

  return (
    <>
      <SeoJsonLd schema={schema} />
      {children}
    </>
  );
}
