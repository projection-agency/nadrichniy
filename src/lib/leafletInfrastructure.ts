/**
 * Shared Leaflet helpers for infrastructure markers (MapSection + ContactsSection).
 */

import type { Map as LeafletMap, LayerGroup, LatLngExpression } from "leaflet";
import {
  MAP_MARKER_META,
  type MapMarkerGroup,
  getMapMarkerLabel,
} from "@/lib/mapMarkers";

type LeafletApi = typeof import("leaflet");

type AddMarkersOptions = {
  L: LeafletApi;
  map: LeafletMap;
  markers: MapMarkerGroup[];
  mapLogoUrl: string;
  markerClassName: string;
  iconContainerClassName: string;
  mainMarkerClassName?: string;
  /** Main complex center — used for fitBounds / fallback pin. */
  center?: [number, number];
};

function isMapAlive(map: LeafletMap): boolean {
  try {
    const container = map.getContainer();
    return Boolean(container?.isConnected && map.getPane("mapPane"));
  } catch {
    return false;
  }
}

function safeFitBounds(
  L: LeafletApi,
  map: LeafletMap,
  points: LatLngExpression[]
) {
  if (points.length < 2 || !isMapAlive(map)) return;

  const run = () => {
    if (!isMapAlive(map)) return;
    try {
      map.invalidateSize({ animate: false });
      map.fitBounds(L.latLngBounds(points), {
        padding: [40, 40],
        maxZoom: 15,
        animate: false,
      });
    } catch {
      // Map may have been removed mid-layout (React Strict Mode / effect re-run).
    }
  };

  map.whenReady(() => {
    requestAnimationFrame(run);
  });
}

function hasLogoMarkers(markers: MapMarkerGroup[]): boolean {
  return markers.some((item) => MAP_MARKER_META[item.title]?.pinIcon === "logo");
}

export function addInfrastructureMarkers({
  L,
  map,
  markers,
  mapLogoUrl,
  markerClassName,
  iconContainerClassName,
  mainMarkerClassName,
  center,
}: AddMarkersOptions): LayerGroup {
  const group = L.layerGroup().addTo(map);

  const whiteIcon = (type: string) =>
    new L.DivIcon({
      className: markerClassName,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -16],
      html: `
        <div class="${iconContainerClassName}">
          <img src="/icons/white-${type}.svg" alt="${type}" />
        </div>
      `,
    });

  const logoIcon = L.icon({
    iconUrl: mapLogoUrl,
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    className: mainMarkerClassName,
  });

  const boundsPoints: LatLngExpression[] = [];
  if (center) {
    boundsPoints.push(center);
  }

  markers.forEach((item) => {
    const meta = MAP_MARKER_META[item.title];
    if (!meta) return;

    const label = getMapMarkerLabel(item.title) || item.title;

    item.coordinates.forEach(([lat, lng]) => {
      boundsPoints.push([lat, lng]);

      if (meta.pinIcon === "logo") {
        L.marker([lat, lng], { icon: logoIcon })
          .addTo(group)
          .bindPopup(label);
        return;
      }

      L.marker([lat, lng], {
        icon: whiteIcon(item.title),
      })
        .addTo(group)
        .bindPopup(label);
    });
  });

  // Fallback center pin only when admin has no Надрічний / info-center markers.
  if (center && !hasLogoMarkers(markers)) {
    L.marker(center, { icon: logoIcon })
      .addTo(group)
      .bindPopup("Інформаційний центр");
  }

  safeFitBounds(L, map, boundsPoints);

  return group;
}
