export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "https://api.lcdoy.projection-learn.website";

/** Public Next.js site origin (canonical / OG / sitemap). */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://lcdoy.projection-learn.website"
).replace(/\/$/, "");
