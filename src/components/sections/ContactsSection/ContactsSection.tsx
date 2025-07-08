"use client";
import Container from "@/components/Container/Container";
import "leaflet/dist/leaflet.css";
import s from "./ContactsSection.module.css";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "leaflet";
import L from "leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Marker } from "react-leaflet/Marker";
import { Popup } from "react-leaflet/Popup";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useHasMounted } from "@/utils/useHasMounted";

const mainMarker = new Icon({
  iconUrl: "/icons/nadrichnyi.svg",
  className: s.mainMarker,
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const contactsData = [
  {
    title: "Відділ продажу",
    icon: "/icons/footer-phone.svg",
    data: ["+38 (044) 333 85 98", "+38 (044) 333 85 98"],
  },
  {
    title: "Email:",
    icon: "/icons/footer-marker.svg",
    data: ["nadrichnyy@gmail.com"],
  },
  {
    title: "Адреса:",
    icon: "/icons/footer-mail.svg",
    data: ["Івано-Франківськ, вул. Надрічна, 12"],
  },
];

const ContactsSection = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const leafletMapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Очищаємо попередній вміст перед ініціалізацією
    mapRef.current.innerHTML = "";

    if (leafletMapRef.current) {
      leafletMapRef.current.remove();
      leafletMapRef.current = null;
    }

    leafletMapRef.current = L.map(mapRef.current, {
      scrollWheelZoom: false,
    }).setView([48.9407815, 24.7164726], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(leafletMapRef.current);

    const markerIcon = L.icon({
      iconUrl: "/icons/nadrichnyi.svg",
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
      className: s.mainMarker,
    });

    L.marker([48.9407815, 24.7164726], { icon: markerIcon })
      .addTo(leafletMapRef.current)
      .bindPopup("Надрічний");

    return () => {
      leafletMapRef.current?.remove();
      leafletMapRef.current = null;
    };
  }, []);
  // const pathname = usePathname();
  // const hasMounted = useHasMounted();
  // const mapKey = pathname.includes("catalog") ? s.mapFour : s.mapTwo;
  // console.log(mapKey);

  const getLinkUrl = (item: string) => {
    if (item.includes("+38")) {
      return `tel:${item}`;
    }
    if (item.includes("@")) {
      return `mailto:${item}`;
    } else {
      return `https://g.co/kgs/7w4BSLH`;
    }
  };
  return (
    <section className={s.section}>
      <Container>
        <h2>Контакти</h2>
        <div className={s.mapContainer}>
          <div className={s.mapLegend}>
            <h3>Наші контакти</h3>
            <ul className={s.infoList}>
              {contactsData.map((item, idx) => {
                return (
                  <li key={idx} className={s.item}>
                    <h4 className={s.title}>
                      <span className={s.itemIcon}>
                        <Image
                          width={16}
                          height={16}
                          alt="icon"
                          src={item.icon}
                        />
                      </span>
                      {item.title}
                    </h4>
                    <div className={s.itemDataList}>
                      {item.data.map((item, idx) => {
                        return (
                          <p className={s.listItem} key={idx}>
                            <Link href={getLinkUrl(item)}>{item}</Link>
                          </p>
                        );
                      })}
                    </div>
                  </li>
                );
              })}
            </ul>
            <button className={s.orderVisisBtn}>Записатися на візит</button>
            <div className={s.googleMapsLinks}>
              <p>відкрити карту</p>
              <ul className={s.linkList}>
                <li>
                  <a
                    className={s.link}
                    href="https://www.google.com/maps/search/?api=1&query=48.9407815,24.7164726"
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
                    href="https://waze.com/ul?ll=48.9407815,24.7164726&navigate=yes"
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
                    href="http://maps.apple.com/?ll=48.9407815,24.7164726"
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
          <div
            ref={mapRef}
            className={s.map}
            style={{ width: "100%", zIndex: 0 }}
          ></div>
          {/* {hasMounted && (
            <MapContainer
              key={pathname}
              center={[48.9407815, 24.7164726]}
              className={s.mapTwo}
              zoom={13}
              scrollWheelZoom={false}
              style={{ height: "400px", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />

              <Marker icon={mainMarker} position={[48.9407815, 24.7164726]}>
                <Popup>
                  <p>Надрічний</p>
                </Popup>
              </Marker>
            </MapContainer>
          )} */}
        </div>
      </Container>
    </section>
  );
};

export default ContactsSection;
