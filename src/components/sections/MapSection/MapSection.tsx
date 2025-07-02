"use client";
import Container from "@/components/Container/Container";
import s from "./MapSection.module.css";
import Image from "next/image";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L, { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation } from "swiper/modules";
import MapSectionSwiperItem from "@/components/MapSectionSwiperItem/MapSectionSwiperItem";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

type Location = {
  title: string;
  coordinates: number[][] | number[];
};

const MapSection = () => {
  const [markersData, setMarkersData] = useState<any>([]);

  const getCustomIcon = (type: string) => {
    return new L.DivIcon({
      className: `${s.markerIcon}`,
      iconUrl: `/icons/${type}.svg`,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
      shadowUrl: undefined,
      shadowSize: undefined,
      shadowAnchor: undefined,

      html: `
      <div class=${s.iconContainer}>
        <img src="/icons/white-${type}.svg" alt="${type}" />
      </div>
    `,
    });
  };

  const mainMarker = new Icon({
    iconUrl: "/icons/nadrichnyi.svg",
    className: s.mainMarker,
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  useEffect(() => {
    const container = document.querySelector(".leaflet-container") as any;
    console.log(container);
    if (container && container._leaflet_id) {
      // Prevent duplicate map error
      container._leaflet_id = null;
      console.log(container._leaflet_id);
    }
  }, []);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch(
          "https://api.lcdoy.projection-learn.website/wp-json/wp/v2/theme_settings"
        );
        const data = await response.json();
        setMarkersData(data.map_markers);
      } catch (error) {
        console.log(error);
      }
    };

    fetchdata();
  }, []);
  return (
    <section className={s.section}>
      <Container>
        <h2>Все там, де ви</h2>
        <div className={s.mapContainer}>
          <div className={s.mapLegend}>
            <h3>Розміщення та інфраструктура</h3>
            <ul className={s.infoList}>
              {markersData?.map((item: Location, idx: number) => {
                if (item.coordinates.length !== 0) {
                  return (
                    <li key={idx} className={s.infoItem}>
                      <div className={s.infoIconCont}>
                        <div className={s.infoIcon}>
                          <Image
                            src={`/icons/${item.title}.svg`}
                            width={24}
                            height={24}
                            alt={`${item.title}`}
                          />
                        </div>
                        <p>{item.title}</p>
                      </div>

                      <p>{item.coordinates.length}</p>
                    </li>
                  );
                }
              })}
            </ul>
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
          <MapContainer
            key={"map2"}
            id="mapOne"
            center={[48.9407815, 24.7164726]}
            className={s.map}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            {markersData?.map((item: Location, idx: number) => {
              const title = item.title;
              const coordsArray =
                Array.isArray(item.coordinates) && item.coordinates.length > 0
                  ? Array.isArray(item.coordinates[0])
                    ? (item.coordinates as number[][])
                    : [item.coordinates as number[]]
                  : [];
              return coordsArray.map((coords, subIdx) => {
                if (coords.length !== 0) {
                  return (
                    <Marker
                      key={idx - subIdx}
                      icon={getCustomIcon(item.title)}
                      position={[coords[0], coords[1]]}
                    >
                      <Popup>
                        <p>{title}</p>
                      </Popup>
                    </Marker>
                  );
                } else {
                  return;
                }
              });
            })}
            <Marker icon={mainMarker} position={[48.9407815, 24.7164726]}>
              <Popup>
                <p>Надрічний</p>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
        <div className={s.swiperCont}>
          <Swiper
            className={s.swiper}
            modules={[Navigation]}
            navigation={{
              nextEl: `.${s.swiperNext}`,
              prevEl: `.${s.swiperPrev}`,
              // lockClass: s.disabled,
              disabledClass: s.disabled,
            }}
          >
            <SwiperSlide>
              <MapSectionSwiperItem></MapSectionSwiperItem>
            </SwiperSlide>
            <SwiperSlide>
              <MapSectionSwiperItem></MapSectionSwiperItem>
            </SwiperSlide>
            <SwiperSlide>
              <MapSectionSwiperItem></MapSectionSwiperItem>
            </SwiperSlide>
          </Swiper>
          <div className={s.navCont}>
            <div className={s.swiperPrev}>{line}</div>
            <div className={s.swiperNext}>{line}</div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default MapSection;

const line = (
  <svg
    width="10"
    height="9"
    viewBox="0 0 10 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 4.5H9M9 4.5L4.76471 0.5M9 4.5L4.76471 8.5" />
  </svg>
);
