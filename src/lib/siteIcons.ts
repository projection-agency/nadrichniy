import type { Metadata } from "next";
import { readFile } from "fs/promises";
import path from "path";
import { fetchThemeSettings, getSiteFaviconUrl } from "@/lib/themeSettings";

const FALLBACK_FAVICON = "/icons/nadrichnyi.svg";

export async function getSiteFaviconHref(): Promise<string> {
  const settings = await fetchThemeSettings();
  return getSiteFaviconUrl(settings) ?? FALLBACK_FAVICON;
}

export async function getSiteIconsMetadata(): Promise<Metadata["icons"]> {
  const href = await getSiteFaviconHref();

  return {
    icon: [{ url: href }],
    shortcut: [{ url: href }],
    apple: [{ url: href }],
  };
}

export async function withSiteIcons(metadata: Metadata): Promise<Metadata> {
  return {
    ...metadata,
    icons: await getSiteIconsMetadata(),
  };
}

export async function fetchFaviconResponse(): Promise<Response> {
  const settings = await fetchThemeSettings();
  const favicon = getSiteFaviconUrl(settings);

  if (favicon) {
    try {
      const remote = await fetch(favicon, { cache: "no-store" });
      if (remote.ok) {
        const contentType =
          remote.headers.get("content-type") || "image/png";
        return new Response(await remote.arrayBuffer(), {
          headers: { "Content-Type": contentType },
        });
      }
    } catch {
      // fall through to local fallback
    }
  }

  const local = await readFile(
    path.join(process.cwd(), "public", "icons", "nadrichnyi.svg")
  );
  return new Response(local, {
    headers: { "Content-Type": "image/svg+xml" },
  });
}
