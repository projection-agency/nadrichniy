import type { ThemeSettings } from "@/lib/themeSettings";

export type MapMarkerGroup = {
  title: string;
  coordinates: number[][];
};

export type MapMarkerMeta = {
  label: string;
  /** Show in the infrastructure legend list. */
  showInLegend: boolean;
  /** white = /icons/white-{type}.svg; logo = site map logo pin. */
  pinIcon: "white" | "logo";
};

/** Mirrors admin marker types in theme-settings map editor. */
export const MAP_MARKER_META: Record<string, MapMarkerMeta> = {
  school: { label: "Школа", showInLegend: true, pinIcon: "white" },
  kindergarten: { label: "Садочок", showInLegend: true, pinIcon: "white" },
  hospital: { label: "Лікарня", showInLegend: true, pinIcon: "white" },
  shop: { label: "Магазин", showInLegend: true, pinIcon: "white" },
  mall: { label: "Торговий центр", showInLegend: true, pinIcon: "white" },
  gym: { label: "Спортзал", showInLegend: true, pinIcon: "white" },
  restaurant: { label: "Ресторан", showInLegend: true, pinIcon: "white" },
  // Complex pins — drawn with map logo, not listed as infrastructure.
  sales_department: {
    label: "Інформаційний центр",
    showInLegend: false,
    pinIcon: "logo",
  },
  under_riz: {
    label: "Надрічний",
    showInLegend: false,
    pinIcon: "logo",
  },
};

export function getMapMarkerLabel(type: string): string {
  return MAP_MARKER_META[type]?.label || "";
}

export function shouldShowInLegend(type: string): boolean {
  const meta = MAP_MARKER_META[type];
  return Boolean(meta?.showInLegend && meta.label);
}

function normalizeCoords(value: unknown): number[][] {
  if (!Array.isArray(value) || value.length === 0) return [];

  // Flat pair: [lat, lng]
  if (typeof value[0] === "number") {
    return value.length >= 2
      ? [[Number(value[0]), Number(value[1])]]
      : [];
  }

  return (value as unknown[])
    .filter(
      (point): point is (number | string)[] =>
        Array.isArray(point) && point.length >= 2
    )
    .map((point) => [Number(point[0]), Number(point[1])])
    .filter(([lat, lng]) => Number.isFinite(lat) && Number.isFinite(lng));
}

export function normalizeMapMarkers(raw: unknown): MapMarkerGroup[] {
  if (!Array.isArray(raw)) return [];

  const groups: MapMarkerGroup[] = [];

  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const title = String((item as { title?: unknown }).title || "").trim();
    if (!title) continue;

    const coordinates = normalizeCoords(
      (item as { coordinates?: unknown }).coordinates
    );
    if (coordinates.length === 0) continue;

    groups.push({ title, coordinates });
  }

  return groups;
}

export function getMapMarkersFromSettings(
  settings: ThemeSettings | null | undefined
): MapMarkerGroup[] {
  return normalizeMapMarkers(settings?.map_markers);
}

export function legendMarkerGroups(
  markers: MapMarkerGroup[]
): MapMarkerGroup[] {
  return markers.filter((item) => shouldShowInLegend(item.title));
}
