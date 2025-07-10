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
import { useRef } from "react";
import MapSectionSwiperItem from "@/components/MapSectionSwiperItem/MapSectionSwiperItem";
import { useHasMounted } from "@/utils/useHasMounted";
import { forEach } from "rsuite/esm/internals/utils/ReactChildren";

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

const mainMarker = new Icon({
  iconUrl: "/icons/nadrichnyi.svg",
  className: s.mainMarker,
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const MapSection = () => {
  const [markersData, setMarkersData] = useState<[]>([]);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const leafletMapRef = useRef<L.Map | null>(null);

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

  const iconMap: Record<string, JSX.Element> = {
    mall,
    shop,
    school,
    kindergarten,
    hospital,
    restaurant,
    gym,
  };

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

    L.marker([48.9407815, 24.7164726], { icon: markerIcon })
      .addTo(leafletMapRef.current)
      .bindPopup("Надрічний");

    const markers = L.layerGroup().addTo(leafletMapRef.current)

    if (markersData.length !== 0) {
      markersData.forEach((item: Location, idx) => {
        const title = item.title;
        const coordsArray =
          Array.isArray(item.coordinates) && item.coordinates.length > 0
            ? Array.isArray(item.coordinates[0])
              ? (item.coordinates as number[][])
              : [item.coordinates as number[]]
            : [];

        return coordsArray.forEach((coords, subIdx) => {
          if (coords.length !== 0) {
            return L.marker([coords[0], coords[1]], {
              icon: getCustomIcon(item.title),
            })
              .addTo(markers)
              .bindPopup(title);
          } else {
            return;
          }
        });
      });
    }

    return () => {
      leafletMapRef.current?.remove();
      leafletMapRef.current = null;
    };
  }, [markersData]);

  const checkLocationTitle = (value: string) => {
    if (value == "school") {
      return "Школа";
    }
    if (value == "kindergarten") {
      return "Садочок";
    }

    if (value == "hospital") {
      return "Лікарня";
    }

    if (value == "shop") {
      return "Магазин";
    }
    if (value == "mall") {
      return "Торговий центр";
    }
  };

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
                        <div className={s.infoIcon}>{iconMap[item.title]}</div>
                        <p>{checkLocationTitle(item.title)}</p>
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
          <div
            ref={mapRef}
            className={s.map}
            style={{ width: "100%", zIndex: 0 }}
          ></div>
          {/* {
            <MapContainer
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
          } */}
        </div>
        <div className={s.swiperCont}>
          <Swiper
            className={s.swiper}
            modules={[Navigation]}
            navigation={{
              nextEl: `.${s.swiperNext}`,
              prevEl: `.${s.swiperPrev}`,
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

const mall = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    stroke="white"
    fill="white"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19 6.5H17C17 3.7 14.8 1.5 12 1.5C9.2 1.5 7 3.7 7 6.5H5C3.9 6.5 3 7.4 3 8.5V20.5C3 21.6 3.9 22.5 5 22.5H19C20.1 22.5 21 21.6 21 20.5V8.5C21 7.4 20.1 6.5 19 6.5ZM12 3.5C13.7 3.5 15 4.8 15 6.5H9C9 4.8 10.3 3.5 12 3.5ZM12 13.5C9.7 13.5 7.7 11.9 7.2 9.7C7 9.1 7.5 8.5 8.1 8.5C8.6 8.5 9 8.8 9.1 9.3C9.5 10.6 10.6 11.5 12 11.5C13.4 11.5 14.5 10.6 14.9 9.3C15 8.8 15.4 8.5 15.9 8.5C16.5 8.5 17 9.1 16.9 9.8C16.3 11.9 14.3 13.5 12 13.5Z" />
  </svg>
);

const shop = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M1 1C0.447715 1 0 1.44772 0 2C0 2.55228 0.447715 3 1 3H2.7793C2.92489 3 3.0668 3.04581 3.18491 3.13095C3.30302 3.21608 3.39135 3.33622 3.43738 3.47435L6.73438 13.3672C6.88079 13.8064 6.8994 14.2793 6.78711 14.7285L6.51562 15.8164C6.11728 17.4098 7.35758 19 9 19H21C21.5523 19 22 18.5523 22 18C22 17.4477 21.5523 17 21 17H9C8.61061 17 8.36064 16.6805 8.45508 16.3027L8.65981 15.485C8.6945 15.3465 8.7745 15.2235 8.88709 15.1356C8.99969 15.0477 9.13842 15 9.28125 15H20C20.4306 15.0002 20.813 14.7248 20.9492 14.3164L23.6152 6.31641C23.8312 5.66862 23.3489 4.99969 22.666 5H6.55469C6.40909 5 6.26718 4.95419 6.14907 4.86906C6.03095 4.78392 5.94262 4.66379 5.89657 4.52566L4.94922 1.68359C4.81295 1.27515 4.43057 0.999775 4 1H1ZM8 20C6.89543 20 6 20.8954 6 22C6 23.1046 6.89543 24 8 24C9.10457 24 10 23.1046 10 22C10 20.8954 9.10457 20 8 20ZM20 20C18.8954 20 18 20.8954 18 22C18 23.1046 18.8954 24 20 24C21.1046 24 22 23.1046 22 22C22 20.8954 21.1046 20 20 20Z" />
  </svg>
);

const school = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M22.2387 12.7495C22.4151 12.6198 22.5541 12.4459 22.6418 12.2454C22.7294 12.0448 22.7627 11.8246 22.7381 11.6071C22.7135 11.3896 22.6319 11.1824 22.5017 11.0065C22.3714 10.8305 22.1971 10.6921 21.9962 10.605V8.89453L20.9962 9.31953V10.605C20.7953 10.692 20.6208 10.8305 20.4905 11.0065C20.3602 11.1825 20.2786 11.3897 20.254 11.6073C20.2294 11.8249 20.2626 12.0452 20.3504 12.2458C20.4381 12.4464 20.5773 12.6204 20.7537 12.75C20.5968 12.8653 20.4691 13.0159 20.3809 13.1896C20.2928 13.3633 20.2466 13.5553 20.2462 13.75V14.9995C20.2462 15.1321 20.2989 15.2593 20.3927 15.3531C20.4864 15.4469 20.6136 15.4995 20.7462 15.4995H22.2462C22.3788 15.4995 22.506 15.4469 22.5998 15.3531C22.6936 15.2593 22.7462 15.1321 22.7462 14.9995V13.7495C22.7458 13.5548 22.6997 13.3628 22.6116 13.1891C22.5234 13.0154 22.3957 12.8648 22.2387 12.7495Z" />
    <path d="M19.5 9.95508V13.6551C19.5027 14.0852 19.3935 14.5087 19.1832 14.8838C18.9728 15.259 18.6684 15.573 18.3 15.7951C16.3882 16.9116 14.214 17.5 12 17.5C9.78607 17.5 7.61186 16.9116 5.70005 15.7951C5.33165 15.573 5.02732 15.259 4.81694 14.8838C4.60656 14.5087 4.49735 14.0852 4.50005 13.6551V9.95508L10.635 12.5501C11.0672 12.7316 11.5313 12.8251 12 12.8251C12.4688 12.8251 12.9329 12.7316 13.365 12.5501L19.5 9.95508Z" />
    <path d="M23.0162 4.6186L12.9722 0.368599C12.6635 0.238758 12.332 0.171875 11.9972 0.171875C11.6623 0.171875 11.3308 0.238758 11.0222 0.368599L0.978156 4.6186C0.706676 4.73343 0.475046 4.9257 0.312197 5.1714C0.149348 5.4171 0.0625 5.70533 0.0625 6.0001C0.0625 6.29487 0.149348 6.5831 0.312197 6.8288C0.475046 7.0745 0.706676 7.26677 0.978156 7.3816L11.0222 11.6316C11.3308 11.7616 11.6623 11.8285 11.9972 11.8285C12.332 11.8285 12.6635 11.7616 12.9722 11.6316L23.0162 7.3816C23.2876 7.26677 23.5193 7.0745 23.6821 6.8288C23.845 6.5831 23.9318 6.29487 23.9318 6.0001C23.9318 5.70533 23.845 5.4171 23.6821 5.1714C23.5193 4.9257 23.2876 4.73343 23.0162 4.6186Z" />
  </svg>
);

const restaurant = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_326_1547)">
      <path d="M23.3772 20.4059L13.9663 10.995L2.9713 0H2.11204L1.93658 0.445828C1.4735 1.62258 1.27564 2.82614 1.36447 3.92625C1.46572 5.18025 1.94211 6.26592 2.74222 7.06603L11.3255 15.6493L12.4576 14.5172L20.3929 23.3903C21.1822 24.1797 22.5409 24.2265 23.3772 23.3903C24.2 22.5675 24.2 21.2287 23.3772 20.4059Z" />
      <path d="M7.34336 13.6621L0.620969 20.3845C-0.201781 21.2073 -0.201781 22.546 0.620969 23.3688C1.40256 24.1504 2.75467 24.2194 3.60527 23.3688L10.3277 16.6464L7.34336 13.6621Z" />
      <path d="M22.9796 3.99475L19.1663 7.80803L18.1715 6.81325L21.9848 2.99992L20.99 2.00514L17.1768 5.81842L16.182 4.82364L19.9953 1.01036L19.0006 0.015625L14.0267 4.98953C13.4182 5.59802 13.0548 6.40595 13.0035 7.26461C12.9905 7.48216 12.9412 7.69614 12.8594 7.89967L16.0904 11.1307C16.294 11.0488 16.508 10.9996 16.7255 10.9866C17.5841 10.9353 18.3921 10.5719 19.0006 9.96344L23.9745 4.98958L22.9796 3.99475Z" />
    </g>
    <defs>
      <clipPath id="clip0_326_1547">
        <rect width="24" height="24" />
      </clipPath>
    </defs>
  </svg>
);

const kindergarten = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.4543 16.0953L19.6667 11.9028C19.2992 9.89284 17.5443 8.43033 15.4967 8.43033H12.8267C12.9093 6.21032 11.9718 2.80533 7.85424 1.61281C7.62174 1.54533 7.38178 1.59033 7.19428 1.73283C7.00678 1.87533 6.89426 2.09282 6.89426 2.33282V3.78782L2.91176 5.7828C2.14675 6.16531 1.65177 6.96782 1.65177 7.82282C1.65177 8.71532 2.14675 9.50282 2.94175 9.89283L4.76424 10.7628L3.86428 16.1928L3.74425 16.1478C2.58176 15.7278 1.29925 16.3353 0.879246 17.4978C0.466761 18.6603 1.07425 19.9428 2.23675 20.3553L4.26175 21.0828C6.74425 21.9678 9.34678 22.4178 12.0018 22.4178C14.6493 22.4178 17.2518 21.9678 19.7343 21.0828L21.7668 20.3553C22.3293 20.1603 22.7793 19.7478 23.0343 19.2078C23.2893 18.6678 23.3193 18.0603 23.1168 17.4978C22.7268 16.4028 21.5568 15.8103 20.4543 16.0953ZM9.07675 17.4228C9.44428 16.1028 10.6443 15.1803 12.0093 15.1803C12.6168 15.1803 13.2017 15.3603 13.7043 15.6978C14.2068 16.0428 14.5968 16.5228 14.8218 17.0853L15.0618 17.6853C13.0592 18.0153 11.0118 18.0153 9.00176 17.6928L9.07675 17.4228ZM21.6768 18.5703C21.5942 18.7428 21.4443 18.8778 21.2642 18.9453L19.2318 19.6728C14.5893 21.3303 9.40674 21.3303 4.77175 19.6728L2.73928 18.9453C2.35677 18.8103 2.16176 18.3903 2.29676 18.0078C2.40177 17.7003 2.68678 17.5128 2.98675 17.5128C3.06928 17.5128 3.15928 17.5278 3.23426 17.5578L5.26678 18.2778C9.59425 19.8228 14.4093 19.8228 18.7367 18.2778L20.7618 17.5578C21.1518 17.4228 21.5718 17.6178 21.7068 18.0078C21.7743 18.1878 21.7668 18.3903 21.6768 18.5703Z" />
  </svg>
);

const hospital = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_326_1523)">
      <path d="M23.5992 9.21267L12.6 1.21327C12.2 0.913287 11.8 0.913287 11.4001 1.21327L0.400816 9.21267C-0.399143 9.71265 0.100837 11.0125 1.00077 11.0125H3.00065V22.0118C3.00065 22.6117 3.40061 23.0117 4.00056 23.0117H19.9994C20.5994 23.0117 20.9993 22.6117 20.9993 22.0118V11.0125H22.9992C23.8992 11.0125 24.3991 9.71265 23.5992 9.21267ZM12 21.0119C8.70025 21.0119 6.00044 18.3121 6.00044 15.0123C6.00044 11.7125 8.70025 9.01272 12 9.01272C15.2998 9.01272 17.9996 11.7125 17.9996 15.0123C17.9996 18.3121 15.2998 21.0119 12 21.0119Z" />
      <path d="M13.5035 13.5115V10.5117H10.5037V13.5115H7.50391V16.5113H10.5037V19.5111H13.5035V16.5113H16.5033V13.5115H13.5035Z" />
    </g>
    <defs>
      <clipPath id="clip0_326_1523">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const gym = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_326_1541)">
      <path d="M7.67969 9.89453H16.3184V14.1522H7.67969V9.89453Z" />
      <path d="M22.7478 8.73828H22.1484V15.017H22.7478C23.4404 15.0161 24.0018 14.4549 24.0025 13.762V9.99278C24.0016 9.30014 23.4402 8.73892 22.7478 8.73828Z" />
      <path d="M19.7942 6.08203H17.4141V17.9656H19.7942C20.4868 17.9647 21.0483 17.4035 21.0489 16.7109V7.33674C21.0483 6.6441 20.4868 6.08289 19.7942 6.08203Z" />
      <path d="M2.94922 7.33674V16.7109C2.94986 17.4035 3.51129 17.965 4.20393 17.9656H6.58406V6.08203H4.20393C3.51129 6.08289 2.94986 6.6441 2.94922 7.33674Z" />
      <path d="M0 9.99104V13.7601C0.000642126 14.4529 0.562072 15.0142 1.25471 15.015H1.85402V8.73633H1.25471C0.562072 8.73697 0.000856164 9.2984 0 9.99104Z" />
    </g>
    <defs>
      <clipPath id="clip0_326_1541">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
