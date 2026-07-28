import type { Metadata } from "next";
import { SITE_URL } from "@/constants";
import type { YoastHeadJson, YoastMeta } from "./types";
import {
  frontendAbsoluteUrl,
  rewriteBackendToFrontend,
  rewriteBackendUrlsDeep,
} from "./rewriteDomains";

const stripTags = (html?: string | null) =>
  (html ?? "").replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();

/** @deprecated Prefer frontendAbsoluteUrl — kept for callers. */
export function rewriteToFrontend(
  _wpUrl: string | undefined,
  frontPath: string
): string {
  return frontendAbsoluteUrl(frontPath);
}

export function rewriteSchemaUrls(
  schema: Record<string, unknown> | undefined,
  wpCanonical: string | undefined,
  frontPath: string
): Record<string, unknown> | undefined {
  if (!schema) return undefined;

  const frontCanonical = frontendAbsoluteUrl(frontPath);
  let rewritten = rewriteBackendUrlsDeep(schema);

  // Force page/@id / url / canonical-like values onto the exact front path.
  try {
    let raw = JSON.stringify(rewritten);
    if (wpCanonical) {
      const wpOnFront = rewriteBackendToFrontend(wpCanonical);
      for (const from of [wpCanonical, wpOnFront]) {
        raw = raw.split(from).join(frontCanonical);
        raw = raw
          .split(from.replace(/\/$/, ""))
          .join(frontCanonical.replace(/\/$/, ""));
      }
    }
    rewritten = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    // keep deep-rewritten schema
  }

  return rewritten;
}

function robotsFromYoast(
  robots?: YoastHeadJson["robots"]
): Metadata["robots"] | undefined {
  if (!robots) return undefined;

  const index =
    robots.index === "noindex" ? false : robots.index === "index" ? true : undefined;
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

/**
 * Collect keywords from Yoast focus keyphrase, synonyms and legacy metakeywords.
 */
export function collectYoastKeywords(yoastMeta?: YoastMeta | null): string[] | undefined {
  if (!yoastMeta) return undefined;

  const parts: string[] = [];

  const pushSplit = (raw?: string | null) => {
    if (!raw || !String(raw).trim()) return;
    String(raw)
      .split(/[,;]+/)
      .map((k) => k.trim())
      .filter(Boolean)
      .forEach((k) => {
        if (!parts.includes(k)) parts.push(k);
      });
  };

  pushSplit(yoastMeta.focuskw);
  pushSplit(yoastMeta.keywords);
  pushSplit(yoastMeta.metakeywords);

  if (yoastMeta.keywordsynonyms) {
    try {
      const parsed = JSON.parse(yoastMeta.keywordsynonyms);
      if (Array.isArray(parsed)) {
        parsed.forEach((item) => {
          const k = String(item || "").trim();
          if (k && !parts.includes(k)) parts.push(k);
        });
      } else {
        pushSplit(yoastMeta.keywordsynonyms);
      }
    } catch {
      pushSplit(yoastMeta.keywordsynonyms);
    }
  }

  return parts.length ? parts : undefined;
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
  const canonical = frontendAbsoluteUrl(frontPath);
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
  const keywords = collectYoastKeywords(yoastMeta);

  const ogImageUrl = ogImage?.url || undefined;
  const twitterImage = yoast?.twitter_image || undefined;

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
      images: ogImageUrl
        ? [
            {
              url: ogImageUrl,
              width: ogImage?.width,
              height: ogImage?.height,
              alt: ogImage?.alt,
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
      card:
        (yoast?.twitter_card as "summary" | "summary_large_image") ||
        "summary_large_image",
      title: yoast?.twitter_title || yoast?.og_title || title,
      description: yoast?.twitter_description || description,
      images: twitterImage
        ? [twitterImage]
        : ogImageUrl
          ? [ogImageUrl]
          : undefined,
    },
    // Explicit keywords meta for crawlers that still read it.
    ...(keywords?.length
      ? {
          other: {
            keywords: keywords.join(", "),
          },
        }
      : {}),
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
