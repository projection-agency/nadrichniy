"use client";

import { useEffect, useState } from "react";
import { API_URL } from "@/constants";

const cache = new Map<string, string>();
const pending = new Map<string, Promise<string>>();

async function fetchPageFeaturedMediaUrl(slug: string): Promise<string> {
  if (cache.has(slug)) return cache.get(slug) || "";

  const existing = pending.get(slug);
  if (existing) return existing;

  const request = (async () => {
    try {
      const res = await fetch(
        `${API_URL}/wp-json/wp/v2/pages?slug=${encodeURIComponent(slug)}&_fields=id,featured_media,featured_media_url`,
        { headers: { Accept: "application/json" } }
      );
      if (!res.ok) return "";
      const data = (await res.json()) as Array<{ featured_media_url?: string }>;
      const url = (data?.[0]?.featured_media_url || "").trim();
      cache.set(slug, url);
      return url;
    } catch {
      cache.set(slug, "");
      return "";
    } finally {
      pending.delete(slug);
    }
  })();

  pending.set(slug, request);
  return request;
}

/**
 * Featured image of a WP page (same pages used for SEO: home, catalog, …).
 */
export function usePageFeaturedImage(slug: string, fallback: string) {
  const [src, setSrc] = useState(fallback);

  useEffect(() => {
    let alive = true;
    fetchPageFeaturedMediaUrl(slug).then((url) => {
      if (alive && url) setSrc(url);
    });
    return () => {
      alive = false;
    };
  }, [slug]);

  return src;
}
