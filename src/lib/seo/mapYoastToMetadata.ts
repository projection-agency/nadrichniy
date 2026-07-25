import type { Metadata } from "next";
import { API_URL, SITE_URL } from "@/constants";
import type { YoastHeadJson, YoastMeta } from "./types";

const stripTags = (html?: string | null) =>
  (html ?? "").replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();

export function rewriteToFrontend(
  wpUrl: string | undefined,
  frontPath: string
): string {
  const path = frontPath.startsWith("/") ? frontPath : `/${frontPath}`;
  return `${SITE_URL}${path}`;
}

export function rewriteSchemaUrls(
  schema: Record<string, unknown> | undefined,
  wpCanonical: string | undefined,
  frontPath: string
): Record<string, unknown> | undefined {
  if (!schema) return undefined;

  const frontCanonical = rewriteToFrontend(wpCanonical, frontPath);
  let raw = JSON.stringify(schema);
  raw = raw.split(API_URL).join(SITE_URL);
  raw = raw.split("/apartments/").join("/catalog/");

  if (wpCanonical) {
    const wpOnFrontHost = wpCanonical.split(API_URL).join(SITE_URL);
    for (const from of [wpCanonical, wpOnFrontHost]) {
      raw = raw.split(from).join(frontCanonical);
      raw = raw.split(from.replace(/\/$/, "")).join(frontCanonical.replace(/\/$/, ""));
    }
  }

  try {
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return schema;
  }
}

function robotsFromYoast(
  robots?: YoastHeadJson["robots"]
): Metadata["robots"] | undefined {
  if (!robots) return undefined;

  const index = robots.index === "noindex" ? false : robots.index === "index" ? true : undefined;
  const follow =
    robots.follow === "nofollow" ? false : robots.follow === "follow" ? true : undefined;

  return {
    index,
    follow,
    "max-snippet": robots["max-snippet"]?.replace("max-snippet:", "")
      ? Number(robots["max-snippet"].replace("max-snippet:", ""))
      : undefined,
    "max-image-preview": robots["max-image-preview"]?.includes("large")
      ? "large"
      : robots["max-image-preview"]?.includes("none")
        ? "none"
        : robots["max-image-preview"]?.includes("standard")
          ? "standard"
          : undefined,
    "max-video-preview": robots["max-video-preview"]?.replace("max-video-preview:", "")
      ? Number(robots["max-video-preview"].replace("max-video-preview:", ""))
      : undefined,
  };
}

export function yoastToMetadata(
  yoast: YoastHeadJson | null | undefined,
  options: {
    frontPath: string;
    fallbackTitle?: string;
    fallbackDescription?: string;
    yoastMeta?: YoastMeta | null;
  }
): Metadata {
  const { frontPath, fallbackTitle, fallbackDescription, yoastMeta } = options;
  const canonical = rewriteToFrontend(yoast?.canonical ?? yoast?.og_url, frontPath);
  const title =
    yoast?.title ||
    yoast?.og_title ||
    fallbackTitle ||
    "ЖК Надрічний";
  const description =
    yoast?.description ||
    yoast?.og_description ||
    stripTags(fallbackDescription) ||
    undefined;

  const ogImage = yoast?.og_image?.[0];
  const keywordsRaw = yoastMeta?.keywords || yoastMeta?.focuskw;
  const keywords = keywordsRaw
    ? keywordsRaw.split(/[,;]+/).map((k) => k.trim()).filter(Boolean)
    : undefined;

  const metadata: Metadata = {
    title,
    description,
    keywords,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical },
    robots: robotsFromYoast(yoast?.robots),
    openGraph: {
      title: yoast?.og_title || title,
      description: yoast?.og_description || description,
      url: canonical,
      siteName: yoast?.og_site_name,
      locale: yoast?.og_locale,
      type: yoast?.og_type === "article" ? "article" : "website",
      images: ogImage?.url
        ? [
            {
              url: ogImage.url,
              width: ogImage.width,
              height: ogImage.height,
              alt: ogImage.alt,
            },
          ]
        : undefined,
      ...(yoast?.og_type === "article"
        ? {
            publishedTime: yoast.article_published_time,
            modifiedTime: yoast.article_modified_time,
          }
        : {}),
    },
    twitter: {
      card: (yoast?.twitter_card as "summary" | "summary_large_image") || "summary_large_image",
      title: yoast?.twitter_title || yoast?.og_title || title,
      description: yoast?.twitter_description || description,
      images: yoast?.twitter_image
        ? [yoast.twitter_image]
        : ogImage?.url
          ? [ogImage.url]
          : undefined,
    },
  };

  return metadata;
}

export function getSchemaForPath(
  yoast: YoastHeadJson | null | undefined,
  frontPath: string
): Record<string, unknown> | undefined {
  return rewriteSchemaUrls(
    yoast?.schema,
    yoast?.canonical || yoast?.og_url,
    frontPath
  );
}
