"use client";
import Container from "@/components/Container/Container";
import s from "./MapSection.module.css";
import Image from "next/image";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation } from "swiper/modules";
import MapSectionSwiperItem from "@/components/MapSectionSwiperItem/MapSectionSwiperItem";

// Fix іконки, бо Leaflet їх не бачить без цього
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const items = [
  { lat: 48.9407815, lng: 24.7164726, title: "Надрічний" },
  { lat: 48.9216, lng: 24.7096, title: "Школа" },
  { lat: 48.9196, lng: 24.711, title: "Магазин" },
];

const MapSection = () => {
  return (
    <section className={s.section}>
      <Container>
        <h2>Все там, де ви</h2>
        <MapContainer
          className={s.mapContainer}
          center={[48.9407815, 24.7164726]} // Київ
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {items.map((item, idx) => {
            return (
              <Marker key={idx} position={[item.lat, item.lng]}>
                <p>{item.title}</p>
              </Marker>
            );
          })}
        </MapContainer>
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
