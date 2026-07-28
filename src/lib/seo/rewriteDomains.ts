import { API_URL, SITE_URL } from "@/constants";

/** Normalize origin: no trailing slash, lowercase host. */
export function normalizeOrigin(url: string): string {
  try {
    const u = new URL(url);
    return `${u.protocol}//${u.host}`.replace(/\/$/, "");
  } catch {
    return url.replace(/\/$/, "");
  }
}

export function getBackendOrigin(): string {
  return normalizeOrigin(API_URL);
}

export function getFrontendOrigin(): string {
  return normalizeOrigin(SITE_URL);
}

/**
 * All string forms of the backend origin that Yoast / WP might emit.
 */
export function backendOriginVariants(backend = getBackendOrigin()): string[] {
  const variants = new Set<string>();
  const add = (value: string) => {
    const v = value.trim();
    if (!v) return;
    variants.add(v);
    variants.add(v.replace(/\/$/, ""));
  };

  try {
    const u = new URL(backend);
    const host = u.host;
    const hostNoWww = host.replace(/^www\./i, "");
    const hostWww = host.startsWith("www.") ? host : `www.${hostNoWww}`;

    for (const protocol of [u.protocol, "https:", "http:"]) {
      add(`${protocol}//${host}`);
      add(`${protocol}//${hostNoWww}`);
      add(`${protocol}//${hostWww}`);
    }
  } catch {
    add(backend);
  }

  return [...variants].sort((a, b) => b.length - a.length);
}

/**
 * Replace backend domain with frontend domain in any string.
 * Also maps WP CPT public paths used in Yoast links.
 * Keeps WordPress media / API asset URLs on the backend host.
 */
export function rewriteBackendToFrontend(
  value: string,
  frontend = getFrontendOrigin(),
  backend = getBackendOrigin()
): string {
  if (!value) return value;

  // Uploads and REST assets stay on WordPress.
  if (/\/wp-content\//i.test(value) || /\/wp-json\//i.test(value)) {
    return value;
  }

  let out = value;
  for (const from of backendOriginVariants(backend)) {
    if (out.includes(from)) {
      out = out.split(from).join(frontend);
    }
  }

  // Public front routes that differ from WP permalinks.
  out = out.replace(/\/apartments\//g, "/catalog/");

  return out;
}

/**
 * Deep-rewrite every string in a JSON-like structure (schema, nested objects).
 */
export function rewriteBackendUrlsDeep<T>(value: T): T {
  if (value == null) return value;

  if (typeof value === "string") {
    return rewriteBackendToFrontend(value) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => rewriteBackendUrlsDeep(item)) as T;
  }

  if (typeof value === "object") {
    const result: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(value as Record<string, unknown>)) {
      result[key] = rewriteBackendUrlsDeep(item);
    }
    return result as T;
  }

  return value;
}

/**
 * Build a frontend absolute URL for a known front path.
 * Prefer frontPath over Yoast's WP permalink path.
 */
export function frontendAbsoluteUrl(frontPath: string): string {
  const origin = getFrontendOrigin();
  if (!frontPath || frontPath === "/") {
    return `${origin}/`;
  }
  const path = frontPath.startsWith("/") ? frontPath : `/${frontPath}`;
  return `${origin}${path}`;
}
