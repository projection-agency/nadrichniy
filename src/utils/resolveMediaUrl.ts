/** Normalize WP media field (string | string[] | empty) to a usable URL. */
export function resolveMediaUrl(
  value: unknown,
  fallback = "/images/bg_about.jpg"
): string {
  if (typeof value === "string" && value.trim()) {
    return value.trim();
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      if (typeof item === "string" && item.trim()) return item.trim();
      if (item && typeof item === "object" && "url" in item) {
        const url = (item as { url?: unknown }).url;
        if (typeof url === "string" && url.trim()) return url.trim();
      }
    }
  }

  if (value && typeof value === "object" && "url" in (value as object)) {
    const url = (value as { url?: unknown }).url;
    if (typeof url === "string" && url.trim()) return url.trim();
  }

  return fallback;
}
