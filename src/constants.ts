const DEFAULT_API_URL = "https://api.nadrichnyi.if.ua";

export const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_API_URL
).replace(/\/$/, "");

export const API_DOMAIN = (
  process.env.NEXT_PUBLIC_API_DOMAIN ??
  API_URL.replace(/^https?:\/\//, "").split("/")[0]
);

/**
 * Public Next.js site origin (canonical / OG / sitemap).
 * Prefer NEXT_PUBLIC_SITE_URL; on Vercel fall back to the deployment host.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "") ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
  "https://nadrichniy.vercel.app"
).replace(/\/$/, "");
