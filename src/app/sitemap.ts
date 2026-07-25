import type { MetadataRoute } from "next";
import { API_URL, SITE_URL } from "@/constants";

type WpListItem = {
  slug: string;
  modified?: string;
};

async function fetchAllSlugs(endpoint: string): Promise<WpListItem[]> {
  const items: WpListItem[] = [];
  let page = 1;

  while (page <= 20) {
    try {
      const res = await fetch(
        `${API_URL}/wp-json${endpoint}?per_page=100&page=${page}&_fields=slug,modified`,
        { next: { revalidate: 3600 } }
      );
      if (!res.ok) break;
      const data = (await res.json()) as WpListItem[];
      if (!Array.isArray(data) || data.length === 0) break;
      items.push(...data);
      const totalPages = Number(res.headers.get("X-WP-TotalPages") || 1);
      if (page >= totalPages) break;
      page += 1;
    } catch {
      break;
    }
  }

  return items;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/catalog",
    "/blog",
    "/clients",
    "/contacts",
    "/privacy-policy",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" || path === "/catalog" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  const [posts, apartments] = await Promise.all([
    fetchAllSlugs("/wp/v2/posts"),
    fetchAllSlugs("/wp/v2/apartments"),
  ]);

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.modified ? new Date(post.modified) : new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const apartmentEntries: MetadataRoute.Sitemap = apartments.map((item) => ({
    url: `${SITE_URL}/catalog/${item.slug}`,
    lastModified: item.modified ? new Date(item.modified) : new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...postEntries, ...apartmentEntries];
}
