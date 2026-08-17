export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "https://api.lcdoy.projection-learn.website";

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
