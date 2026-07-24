import { getSchemaForPath } from "./mapYoastToMetadata";
import type { YoastHeadJson } from "./types";

type Props = {
  schema?: Record<string, unknown> | null;
};

/** Renders Yoast JSON-LD with frontend-rewritten URLs. */
export default function SeoJsonLd({ schema }: Props) {
  if (!schema) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function SeoJsonLdFromYoast({
  yoast,
  frontPath,
}: {
  yoast?: YoastHeadJson | null;
  frontPath: string;
}) {
  return <SeoJsonLd schema={getSchemaForPath(yoast, frontPath)} />;
}
