import { API_URL } from "@/constants";

export type BlogCategoryKey = "news" | "special" | "workSchedule";

export type BlogCategoryMap = Partial<Record<BlogCategoryKey, number>>;

let cachedMap: BlogCategoryMap | null = null;
let pending: Promise<BlogCategoryMap> | null = null;

/**
 * Category IDs from Theme Settings seed (`blog_categories`).
 * Stable across DB migrations (resolved by slug on the WP side).
 */
export async function fetchBlogCategoryMap(): Promise<BlogCategoryMap> {
  if (cachedMap) return cachedMap;
  if (pending) return pending;

  pending = (async () => {
    try {
      const res = await fetch(`${API_URL}/wp-json/wp/v2/theme_settings`, {
        headers: { Accept: "application/json" },
      });
      if (!res.ok) return {};
      const data = await res.json();
      const map = (data?.blog_categories ?? {}) as BlogCategoryMap;
      cachedMap = map;
      return map;
    } catch {
      return {};
    } finally {
      pending = null;
    }
  })();

  return pending;
}

export async function getBlogCategoryQuery(
  key: BlogCategoryKey | "all"
): Promise<string> {
  if (key === "all") return "";
  const map = await fetchBlogCategoryMap();
  const id = map[key];
  return id ? `?categories=${id}` : "";
}
