"use client";
import { useState, useEffect } from "react";
import ApartmentItem from "@/components/ApartmentItem/ApartmentItem";
import { Apartment } from "@/Redux/apartmentSlice/slice";
import s from "./SimilarPlanningsSection.module.css";
import { API_URL } from "@/constants";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Container from "@/components/Container/Container";

export default function SimilarPlanningsSection() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [apartmentData, setApartmentData] = useState([]);

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await fetch(`${API_URL}/wp-json/wp/v2/apartments`);
        const data = await response.json();
        setApartmentData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchApartments();
  }, []);

  return (
    <section className={s.section}>
      <Container>
        <h2>Схожі планування</h2>
        {apartmentData && window.innerWidth >= 1024 && (
          <ul className={`${s.apartmentsList}`}>
            {apartmentData.slice(0, 3).map((item: Apartment) => {
              return <ApartmentItem item={item} key={item.id} />;
            })}
          </ul>
        )}
        {apartmentData && window.innerWidth <= 1024 && (
          <>
            <Swiper
              modules={[Navigation]}
              navigation={{
                prevEl: `.${s.swiperPrev}`,
                nextEl: `.${s.swiperNext}`,
                disabledClass: s.disabled,
              }}
              onSlideChange={(s) => setActiveIndex(s.activeIndex)}
              className={s.swiper}
            >
              {apartmentData.map((item, idx) => {
                return (
                  <SwiperSlide key={idx}>
                    <ApartmentItem item={item} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <div className={s.mobileNav}>
              <div
                className={`${s.swiperPrev} ${s.navBtn} ${
                  activeIndex === 0 ? s.disabled : ""
                }`}
              >
                {arrow}
              </div>
              <div className={s.mobPagination}>
                <p className={s.activeSlide}>
                  {activeIndex ? activeIndex + 1 : 1}
                </p>
                <p>/{apartmentData.length}</p>
              </div>
              <div
                className={`${s.swiperNext} ${s.navBtn} ${
                  activeIndex === apartmentData.length - 1 ? s.disabled : ""
                }`}
              >
                {arrow}
              </div>
            </div>
          </>
        )}
      </Container>
    </section>
  );
}

const arrow = (
  <svg
    width="16"
    height="18"
    viewBox="0 0 16 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M8 18L8 2M8 2L1 9.52941M8 2L15 9.52941" strokeWidth="2" />
  </svg>
);
