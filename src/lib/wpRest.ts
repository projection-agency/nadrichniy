import { API_URL } from "@/constants";

function restUrls(path: string): string[] {
  const clean = path.replace(/^\//, "");
  const base = API_URL.replace(/\/$/, "");
  // rest_route cannot contain a second "?"; turn query into "&…"
  const restRoutePath = clean.includes("?")
    ? `/${clean.replace("?", "&")}`
    : `/${clean}`;
  return [
    `${base}/wp-json/${clean}`,
    `${base}/index.php?rest_route=${restRoutePath}`,
  ];
}

export async function fetchWpJson<T = unknown>(
  path: string,
  init?: RequestInit
): Promise<T | null> {
  for (const url of restUrls(path)) {
    try {
      const res = await fetch(url, {
        headers: { Accept: "application/json", ...(init?.headers || {}) },
        cache: "no-store",
        ...init,
      });
      if (res.ok) {
        return (await res.json()) as T;
      }
    } catch {
      // try alternate REST URL
    }
  }
  return null;
}
