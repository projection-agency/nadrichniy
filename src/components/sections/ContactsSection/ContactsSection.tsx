"use client";
import Container from "@/components/Container/Container";
import s from "./ContactsSection.module.css";
import Image from "next/image";
import Link from "next/link";
import type { Map as LeafletMap } from "leaflet";
import { useEffect, useMemo, useRef } from "react";
import { usePathname } from "next/navigation";
import { getWindowWidth } from "@/utils/getWindowWidth";
import { useThemeSettings } from "@/lib/useThemeSettings";
import {
  buildContactsList,
  getMapCenter,
  getMapLogoUrl,
  getMapsPlaceUrl,
} from "@/lib/themeSettings";
import { useModal } from "@/components/ModalContext";
import { getMapMarkersFromSettings } from "@/lib/mapMarkers";
import {
  addInfrastructureMarkers,
} from "@/lib/leafletInfrastructure";
import mapSectionStyles from "@/components/sections/MapSection/MapSection.module.css";

const ContactsSection = () => {
  const { openModal } = useModal();
  const mapRef = useRef<HTMLDivElement | null>(null);
  const leafletMapRef = useRef<LeafletMap | null>(null);
  const pathname = usePathname();
  const { settings } = useThemeSettings();
  const contactsData = useMemo(() => buildContactsList(settings), [settings]);
  const mapsPlaceUrl = useMemo(() => getMapsPlaceUrl(settings), [settings]);
  const mapCenter = useMemo(() => getMapCenter(settings), [settings]);
  const mapLogoUrl = useMemo(() => getMapLogoUrl(settings), [settings]);
  const markersData = useMemo(
    () => getMapMarkersFromSettings(settings),
    [settings]
  );
  const windowWidth = getWindowWidth();

  useEffect(() => {
    if (!mapRef.current) return;

    let cancelled = false;
    let mapInstance: LeafletMap | null = null;

    const initMap = async () => {
      const leaflet = await import("leaflet");
      if (cancelled || !mapRef.current) return;

      const L = leaflet.default;
      const container = mapRef.current;

      // Re-init on the same DOM node leaves a stale leaflet_id.
      if ((container as HTMLElement & { _leaflet_id?: number })._leaflet_id) {
        try {
          leafletMapRef.current?.remove();
        } catch {
          // ignore
        }
        leafletMapRef.current = null;
        delete (container as HTMLElement & { _leaflet_id?: number })._leaflet_id;
      }

      if (cancelled || !mapRef.current) return;

      const map = L.map(container, {
        scrollWheelZoom: false,
        zoomControl: false,
      }).setView(mapCenter, 14);

      mapInstance = map;
      leafletMapRef.current = map;

      L.control.zoom({ position: "topright" }).addTo(map);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      if (cancelled) {
        map.remove();
        return;
      }

      addInfrastructureMarkers({
        L,
        map,
        markers: markersData,
        mapLogoUrl,
        markerClassName: mapSectionStyles.markerIcon,
        iconContainerClassName: mapSectionStyles.iconContainer,
        mainMarkerClassName: s.mainMarker,
        center: mapCenter,
      });
    };

    initMap();

    return () => {
      cancelled = true;
      if (mapInstance) {
        try {
          mapInstance.remove();
        } catch {
          // Container may already be detached during React teardown.
        }
        if (leafletMapRef.current === mapInstance) {
          leafletMapRef.current = null;
        }
        mapInstance = null;
      }
    };
  }, [mapCenter, mapLogoUrl, markersData]);

  const getLinkUrl = (item: string) => {
    if (item.includes("+") || item.startsWith("0")) {
      return `tel:${item.replace(/\s/g, "")}`;
    }
    if (item.includes("@")) {
      return `mailto:${item}`;
    }
    return mapsPlaceUrl;
  };

  const [lat, lng] = mapCenter;
  const googleMapsHref = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  const wazeHref = `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`;
  const appleHref = `http://maps.apple.com/?ll=${lat},${lng}`;

  const renderContactsList = () =>
    contactsData.map((item, idx) => (
      <li key={idx} className={s.item}>
        <h4 className={s.title}>
          <span className={s.itemIcon}>
            <Image width={16} height={16} alt="icon" src={item.icon} />
          </span>
          {item.title}
        </h4>
        <div className={s.itemDataList}>
          {item.data.map((value, valueIdx) => (
            <p className={s.listItem} key={valueIdx}>
              <Link href={getLinkUrl(value)}>{value}</Link>
            </p>
          ))}
        </div>
      </li>
    ));

  return (
    <section
      className={`${s.section} ${pathname == "/contacts" && s.contactsPage}`}
    >
      <Container>
        {pathname !== "/contacts" && <h2>Контакти</h2>}
        {windowWidth <= 1024 && (
          <div className={s.mobileMapLegend}>
            <h3>Наші контакти</h3>
            <ul className={s.infoList}>{renderContactsList()}</ul>
            <button
              type="button"
              className={s.orderVisisBtn}
              onClick={() => openModal("formB")}
            >
              Записатися на візит
            </button>
          </div>
        )}
        <div className={s.mapContainer}>
          {windowWidth > 1024 && (
            <div className={s.mapLegend}>
              <h3>Наші контакти</h3>
              <ul className={s.infoList}>{renderContactsList()}</ul>
              <button
                type="button"
                className={s.orderVisisBtn}
                onClick={() => openModal("formB")}
              >
                Записатися на візит
              </button>
              <div className={s.googleMapsLinks}>
                <p>відкрити карту</p>
                <ul className={s.linkList}>
                  <li>
                    <a
                      className={s.link}
                      href={googleMapsHref}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src={`/icons/google_maps.svg`}
                        width={24}
                        height={24}
                        alt={"icon"}
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      className={s.link}
                      href={wazeHref}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src={`/icons/waze.svg`}
                        width={24}
                        height={24}
                        alt={"icon"}
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      className={s.link}
                      href={appleHref}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src={`/icons/apple_maps.svg`}
                        width={24}
                        height={24}
                        alt={"icon"}
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          )}
          <div ref={mapRef} className={s.map}></div>
        </div>
        {windowWidth <= 1024 && (
          <div className={s.googleMapsLinks}>
            <ul className={s.linkList}>
              <li>
                <a
                  className={s.link}
                  href={googleMapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={`/icons/google_maps.svg`}
                    width={24}
                    height={24}
                    alt={"icon"}
                  />
                </a>
              </li>
              <li>
                <a
                  className={s.link}
                  href={wazeHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={`/icons/waze.svg`}
                    width={24}
                    height={24}
                    alt={"icon"}
                  />
                </a>
              </li>
              <li>
                <a
                  className={s.link}
                  href={appleHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={`/icons/apple_maps.svg`}
                    width={24}
                    height={24}
                    alt={"icon"}
                  />
                </a>
              </li>
            </ul>
          </div>
        )}
      </Container>
    </section>
  );
};

export default ContactsSection;
