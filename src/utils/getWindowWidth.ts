/** Safe window width for SSR (defaults to desktop). */
export function getWindowWidth(fallback = 1200): number {
  if (typeof window === "undefined") return fallback;
  return window.innerWidth;
}
