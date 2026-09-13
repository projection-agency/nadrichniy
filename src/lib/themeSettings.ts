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

function decodeSvgTransportClient(svg: string): string {
  const value = (svg || "").trim();
  if (!value || !value.startsWith("svgb64:")) return value;
  try {
    return decodeURIComponent(
      Array.from(atob(value.slice(7)), (c) =>
        "%" + c.charCodeAt(0).toString(16).padStart(2, "0")
      ).join("")
    );
  } catch {
    return "";
  }
}

export const DEFAULT_AUDIENCE_SLIDE_IMAGE = "/images/swiperImageMap.jpg";

export type AudienceHlItem = {
  hl_img_link_slide_photo?: string[];
  hl_img_link_photo?: string[];
  hl_input_text_tag?: string;
  hl_input_text_subtitle?: string;
  hl_img_svg_slide_icon?: string;
  hl_img_svg_icon?: string;
  hl_textarea_desc_left?: string;
  hl_textarea_desc_right?: string;
};

export type AudienceSlide = {
  image: string;
  tag: string;
  subtitle: string;
  iconSvg: string;
  descriptionLeft: string;
  descriptionRight: string;
};

export type AudienceContent = {
  sectionBadge: string;
  sectionTitle: string;
  ctaText: string;
  slides: AudienceSlide[];
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
  site_logo_scroll?: string;
  site_logo_scroll_id?: string | number;
  site_favicon?: string;
  site_favicon_id?: string | number;
  map_logo?: string;
  map_logo_id?: string | number;
  hl_data_gallery?: GalleryHlItem[] | string;
  hl_data_contact?: ContactHlItem[] | string;
  hl_data_about?: AboutContent | string;
  hl_data_advantages?: AdvantageItem[] | string;
  hl_data_audience?: AudienceHlItem[] | string;
  audience_section_badge?: string;
  audience_section_title?: string;
  audience_cta_text?: string;
  blog_categories?: Partial<Record<"news" | "special" | "workSchedule", number>>;
  map_markers?: unknown;
};

const CATEGORY_LABELS: Record<string, string> = {
  news: "Новина",
  special: "Спеціальна пропозиція",
  workSchedule: "Хід робіт",
};

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

function themeSettingsFetchUrls(): string[] {
  const base = API_URL.replace(/\/$/, "");
  return [
    `${base}/wp-json/wp/v2/theme_settings`,
    `${base}/index.php?rest_route=/wp/v2/theme_settings`,
  ];
}

async function fetchThemeSettingsResponse(): Promise<Response | null> {
  for (const url of themeSettingsFetchUrls()) {
    try {
      const res = await fetch(url, {
        headers: { Accept: "application/json" },
        cache: "no-store",
      });
      if (res.ok) return res;
    } catch {
      // try alternate REST URL (plain permalinks / nginx without wp-json rewrite)
    }
  }
  return null;
}

export async function fetchThemeSettings(): Promise<ThemeSettings> {
  if (pending) return pending;

  pending = (async () => {
    try {
      const res = await fetchThemeSettingsResponse();
      if (!res) return {};
      return (await res.json()) as ThemeSettings;
    } catch {
      return {};
    } finally {
      pending = null;
    }
  })();

  return pending;
}

export function getGalleryUrls(settings: ThemeSettings): string[] {
  const raw = settings.hl_data_gallery;
  let items: GalleryHlItem[] = [];

  if (Array.isArray(raw)) {
    items = raw;
  } else if (raw && typeof raw === "object") {
    items = Object.values(raw as Record<string, GalleryHlItem>);
  } else {
    items = parseMaybeJson<GalleryHlItem[]>(raw, []);
  }

  return items.flatMap((item) => {
    const photos = item?.hl_img_link_photo;
    if (!Array.isArray(photos)) return [];

    return photos.filter(
      (url): url is string => typeof url === "string" && url.trim() !== ""
    );
  });
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

const DEFAULT_AUDIENCE_SLIDES: AudienceSlide[] = [
  {
    image: DEFAULT_AUDIENCE_SLIDE_IMAGE,
    tag: "",
    subtitle: "Для родин із дітьми",
    iconSvg: "",
    descriptionLeft:
      "Коли поруч садок, а школу не доводиться шукати далеко — це знімає зайві клопоти. Внутрішній двір без машин і з дитячим майданчиком — простір, де безпечно й спокійно",
    descriptionRight:
      "Можна не поспішати, не шукати, не хвилюватися. Усе зроблено так, щоб щоденне життя з дитиною було трохи простішим — і вдома, і надворі",
  },
];

export function getAudienceContent(settings: ThemeSettings): AudienceContent {
  const sectionBadge =
    (settings.audience_section_badge || "").trim() || "Для кого";
  const sectionTitle =
    (settings.audience_section_title || "").trim() || "Тут буде зручно";
  const ctaText =
    (settings.audience_cta_text || "").trim() || "Замовити дзвінок";

  const items = parseMaybeJson<AudienceHlItem[]>(settings.hl_data_audience, []);
  const slides = items
    .map((item) => {
      const photos =
        item?.hl_img_link_slide_photo ?? item?.hl_img_link_photo;
      const image =
        Array.isArray(photos) && typeof photos[0] === "string" && photos[0].trim()
          ? photos[0].trim()
          : DEFAULT_AUDIENCE_SLIDE_IMAGE;

      const iconRaw =
        item?.hl_img_svg_slide_icon ?? item?.hl_img_svg_icon ?? "";

      return {
        image,
        tag: (item?.hl_input_text_tag || "").trim(),
        subtitle: (item?.hl_input_text_subtitle || "").trim(),
        iconSvg: decodeSvgTransportClient(iconRaw.trim()),
        descriptionLeft: (item?.hl_textarea_desc_left || "").trim(),
        descriptionRight: (item?.hl_textarea_desc_right || "").trim(),
      };
    })
    .filter(
      (slide) =>
        slide.subtitle ||
        slide.descriptionLeft ||
        slide.descriptionRight ||
        slide.iconSvg
    );

  return {
    sectionBadge,
    sectionTitle,
    ctaText,
    slides: slides.length ? slides : DEFAULT_AUDIENCE_SLIDES,
  };
}

export function buildContactsList(settings: ThemeSettings) {
  const phones = [settings.input_text_phone_1, settings.input_text_phone_2]
    .map((v) => (v || "").trim())
    .filter(Boolean);

  return [
    {
      title: "Інформаційний центр",
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
  return (settings.site_logo || settings.site_logo_scroll || "").trim();
}

export function getSiteLogoSvg(settings: ThemeSettings): string {
  return (settings.site_logo_svg || "").trim();
}

export function getMapLogoUrl(settings: ThemeSettings): string {
  return (settings.map_logo || "").trim() || "/icons/nadrichnyi.svg";
}

export function getSiteFaviconUrl(settings: ThemeSettings): string | undefined {
  const url = (settings.site_favicon || "").trim();
  return url || undefined;
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
