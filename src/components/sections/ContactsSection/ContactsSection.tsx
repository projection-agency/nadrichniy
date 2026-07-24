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

const ContactsSection = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const leafletMapRef = useRef<LeafletMap | null>(null);
  const pathname = usePathname();
  const { settings } = useThemeSettings();
  const contactsData = useMemo(() => buildContactsList(settings), [settings]);
  const mapsPlaceUrl = useMemo(() => getMapsPlaceUrl(settings), [settings]);
  const mapCenter = useMemo(() => getMapCenter(settings), [settings]);
  const mapLogoUrl = useMemo(() => getMapLogoUrl(settings), [settings]);
  const windowWidth = getWindowWidth();

  useEffect(() => {
    if (!mapRef.current) return;

    let cancelled = false;

    const initMap = async () => {
      await import("leaflet/dist/leaflet.css");
      const leaflet = await import("leaflet");
      if (cancelled || !mapRef.current) return;

      const L = leaflet.default;

      mapRef.current.innerHTML = "";

      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }

      leafletMapRef.current = L.map(mapRef.current, {
        scrollWheelZoom: false,
      }).setView(mapCenter, 14);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(leafletMapRef.current);

      const markerIcon = L.icon({
        iconUrl: mapLogoUrl,
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
        className: s.mainMarker,
      });

      L.marker(mapCenter, { icon: markerIcon })
        .addTo(leafletMapRef.current)
        .bindPopup("Надрічний");
    };

    initMap();

    return () => {
      cancelled = true;
      leafletMapRef.current?.remove();
      leafletMapRef.current = null;
    };
  }, [mapCenter, mapLogoUrl]);

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
            <button className={s.orderVisisBtn}>Записатися на візит</button>
          </div>
        )}
        <div className={s.mapContainer}>
          {windowWidth > 1024 && (
            <div className={s.mapLegend}>
              <h3>Наші контакти</h3>
              <ul className={s.infoList}>{renderContactsList()}</ul>
              <button className={s.orderVisisBtn}>Записатися на візит</button>
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
          <div
            ref={mapRef}
            className={s.map}
            style={{ width: "100%", zIndex: 0 }}
          ></div>
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
