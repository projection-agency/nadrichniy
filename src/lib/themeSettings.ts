import { API_URL } from "@/constants";

export type GalleryHlItem = {
  hl_img_link_photo?: string[];
};

export type ContactHlItem = {
  hl_input_text_name?: string;
  hl_input_text_link?: string;
  hl_img_svg_icon?: string;
};

export type AboutContent = {
  quote?: string;
  quote_author?: string;
  experience?: string;
  stats?: { value: string; label: string }[];
  card_title?: string;
  card_text?: string;
};

export type AdvantageItem = {
  title: string;
  description: string;
  icon?: string;
  variant?: "white" | "dark";
};

export type ThemeSettings = {
  input_text_phone_1?: string;
  input_text_phone_2?: string;
  input_text_email?: string;
  input_text_address?: string;
  maps_place_url?: string;
  map_center_lat?: string;
  map_center_lng?: string;
  footer_tagline?: string;
  home_hero_title?: string;
  home_hero_cta?: string;
  home_hero_cta_link?: string;
  site_logo?: string;
  site_logo_id?: string | number;
  site_logo_svg?: string;
  map_logo?: string;
  map_logo_id?: string | number;
  hl_data_gallery?: GalleryHlItem[] | string;
  hl_data_contact?: ContactHlItem[] | string;
  hl_data_about?: AboutContent | string;
  hl_data_advantages?: AdvantageItem[] | string;
  blog_categories?: Partial<Record<"news" | "special" | "workSchedule", number>>;
  map_markers?: unknown;
};

const CATEGORY_LABELS: Record<string, string> = {
  news: "Новина",
  special: "Спеціальна пропозиція",
  workSchedule: "Хід робіт",
};

let cached: ThemeSettings | null = null;
let pending: Promise<ThemeSettings> | null = null;

function parseMaybeJson<T>(value: unknown, fallback: T): T {
  if (value == null || value === "" || value === "Invalid JSON") return fallback;
  if (typeof value === "string") {
    try {
      return JSON.parse(value) as T;
    } catch {
      return fallback;
    }
  }
  return value as T;
}

export async function fetchThemeSettings(): Promise<ThemeSettings> {
  if (cached) return cached;
  if (pending) return pending;

  pending = (async () => {
    try {
      const res = await fetch(`${API_URL}/wp-json/wp/v2/theme_settings`, {
        headers: { Accept: "application/json" },
      });
      if (!res.ok) return {};
      const data = (await res.json()) as ThemeSettings;
      cached = data;
      return data;
    } catch {
      return {};
    } finally {
      pending = null;
    }
  })();

  return pending;
}

export function getGalleryUrls(settings: ThemeSettings): string[] {
  const items = parseMaybeJson<GalleryHlItem[]>(settings.hl_data_gallery, []);
  return items.flatMap((item) =>
    Array.isArray(item?.hl_img_link_photo) ? item.hl_img_link_photo : []
  );
}

export function getSocialLinks(settings: ThemeSettings): ContactHlItem[] {
  return parseMaybeJson<ContactHlItem[]>(settings.hl_data_contact, []).filter(
    (item) => item?.hl_input_text_link
  );
}

export function getAboutContent(settings: ThemeSettings): AboutContent {
  return parseMaybeJson<AboutContent>(settings.hl_data_about, {});
}

export function getAdvantages(settings: ThemeSettings): AdvantageItem[] {
  return parseMaybeJson<AdvantageItem[]>(settings.hl_data_advantages, []);
}

export function buildContactsList(settings: ThemeSettings) {
  const phones = [settings.input_text_phone_1, settings.input_text_phone_2]
    .map((v) => (v || "").trim())
    .filter(Boolean);

  return [
    {
      title: "Відділ продажу",
      icon: "/icons/footer-phone.svg",
      data: phones,
    },
    {
      title: "Email:",
      icon: "/icons/footer-marker.svg",
      data: settings.input_text_email ? [settings.input_text_email] : [],
    },
    {
      title: "Адреса:",
      icon: "/icons/footer-mail.svg",
      data: settings.input_text_address ? [settings.input_text_address] : [],
    },
  ].filter((block) => block.data.length > 0);
}

export function getMapsPlaceUrl(settings: ThemeSettings): string {
  return (
    settings.maps_place_url?.trim() ||
    (settings.input_text_address
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          settings.input_text_address
        )}`
      : "#")
  );
}

export function getSiteLogoUrl(settings: ThemeSettings): string {
  return (settings.site_logo || "").trim();
}

export function getSiteLogoSvg(settings: ThemeSettings): string {
  return (settings.site_logo_svg || "").trim();
}

export function getMapLogoUrl(settings: ThemeSettings): string {
  return (settings.map_logo || "").trim() || "/icons/nadrichnyi.svg";
}

export function getMapCenter(settings: ThemeSettings): [number, number] {
  const lat = parseFloat(settings.map_center_lat || "");
  const lng = parseFloat(settings.map_center_lng || "");
  if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
    return [lat, lng];
  }
  return [48.9407815, 24.7164726];
}

export async function resolveCategoryLabel(
  categoryId: number | undefined
): Promise<string> {
  if (!categoryId) return "Новина";
  const settings = await fetchThemeSettings();
  const map = settings.blog_categories || {};
  const entry = Object.entries(map).find(([, id]) => id === categoryId);
  if (!entry) return "Новина";
  return CATEGORY_LABELS[entry[0]] || "Новина";
}

export { CATEGORY_LABELS };
