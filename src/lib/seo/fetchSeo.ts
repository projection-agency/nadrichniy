import { cache } from "react";
import { API_URL } from "@/constants";
import type {
  WpSeoEntity,
  YoastGetHeadResponse,
  YoastHeadJson,
} from "./types";
import { getSchemaForPath, yoastToMetadata } from "./mapYoastToMetadata";
import type { Metadata } from "next";
import { withSiteIcons } from "@/lib/siteIcons";

const REVALIDATE = 300;

async function wpFetch<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}/wp-json${path}`, {
      next: { revalidate: REVALIDATE },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export const fetchHomeYoast = cache(async (): Promise<YoastHeadJson | null> => {
  const data = await wpFetch<YoastGetHeadResponse>(
    `/yoast/v1/get_head?url=${encodeURIComponent(`${API_URL}/`)}`
  );
  return data?.json ?? null;
});

export const fetchPageBySlug = cache(
  async (slug: string): Promise<WpSeoEntity | null> => {
    const data = await wpFetch<WpSeoEntity[]>(
      `/wp/v2/pages?slug=${encodeURIComponent(slug)}&_fields=id,slug,link,title,yoast_head_json,yoast_meta`
    );
    return data?.[0] ?? null;
  }
);

export const fetchPageById = cache(
  async (id: number): Promise<WpSeoEntity | null> => {
    return wpFetch<WpSeoEntity>(
      `/wp/v2/pages/${id}?_fields=id,slug,link,title,yoast_head_json,yoast_meta`
    );
  }
);

export const fetchPostBySlug = cache(
  async (slug: string): Promise<WpSeoEntity | null> => {
    const data = await wpFetch<WpSeoEntity[]>(
      `/wp/v2/posts?slug=${encodeURIComponent(slug)}&_fields=id,slug,link,title,excerpt,yoast_head_json,yoast_meta`
    );
    return data?.[0] ?? null;
  }
);

export const fetchApartmentBySlug = cache(
  async (slug: string): Promise<WpSeoEntity | null> => {
    const data = await wpFetch<WpSeoEntity[]>(
      `/wp/v2/apartments?slug=${encodeURIComponent(slug)}&_fields=id,slug,link,title,yoast_head_json,yoast_meta`
    );
    return data?.[0] ?? null;
  }
);

export async function metadataForHome(): Promise<Metadata> {
  const [yoast, homePage] = await Promise.all([
    fetchHomeYoast(),
    fetchPageBySlug("home"),
  ]);
  return withSiteIcons(
    yoastToMetadata(yoast, {
      frontPath: "/",
      fallbackTitle: homePage?.title?.rendered || "ЖК Надрічний",
      yoastMeta: homePage?.yoast_meta,
    })
  );
}

export async function metadataForPageSlug(
  slug: string,
  frontPath: string,
  fallbackTitle: string
): Promise<Metadata> {
  const page = await fetchPageBySlug(slug);
  return withSiteIcons(
    yoastToMetadata(page?.yoast_head_json, {
      frontPath,
      fallbackTitle: page?.title?.rendered || fallbackTitle,
      yoastMeta: page?.yoast_meta,
    })
  );
}

export async function metadataForPrivacy(): Promise<Metadata> {
  const page = await fetchPageBySlug("privacy-policy");
  return withSiteIcons(
    yoastToMetadata(page?.yoast_head_json, {
      frontPath: "/privacy-policy",
      fallbackTitle:
        page?.title?.rendered ||
        "Політика конфіденційності та використання файлів cookies",
      yoastMeta: page?.yoast_meta,
    })
  );
}

export async function metadataForPostSlug(slug: string): Promise<Metadata> {
  const post = await fetchPostBySlug(slug);
  return withSiteIcons(
    yoastToMetadata(post?.yoast_head_json, {
      frontPath: `/blog/${slug}`,
      fallbackTitle: post?.title?.rendered,
      fallbackDescription: post?.excerpt?.rendered,
      yoastMeta: post?.yoast_meta,
    })
  );
}

export async function metadataForApartmentSlug(slug: string): Promise<Metadata> {
  const apartment = await fetchApartmentBySlug(slug);
  return withSiteIcons(
    yoastToMetadata(apartment?.yoast_head_json, {
      frontPath: `/catalog/${slug}`,
      fallbackTitle: apartment?.title?.rendered,
      yoastMeta: apartment?.yoast_meta,
    })
  );
}

export async function schemaForHome() {
  return getSchemaForPath(await fetchHomeYoast(), "/");
}

export async function schemaForPageSlug(slug: string, frontPath: string) {
  const page = await fetchPageBySlug(slug);
  return getSchemaForPath(page?.yoast_head_json, frontPath);
}

export async function schemaForPrivacy() {
  const page = await fetchPageBySlug("privacy-policy");
  return getSchemaForPath(page?.yoast_head_json, "/privacy-policy");
}

export async function schemaForPostSlug(slug: string) {
  const post = await fetchPostBySlug(slug);
  return getSchemaForPath(post?.yoast_head_json, `/blog/${slug}`);
}

export async function schemaForApartmentSlug(slug: string) {
  const apartment = await fetchApartmentBySlug(slug);
  return getSchemaForPath(apartment?.yoast_head_json, `/catalog/${slug}`);
}
