"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useRef, useEffect, useState, useMemo } from "react";
import Container from "@/components/Container/Container";
import s from "./GallerySection.module.css";
import Image from "next/image";
import "swiper/css";
import { useWindowWidth } from "@/utils/useWindowWidth";
import { useThemeSettings } from "@/lib/useThemeSettings";
import { getGalleryUrls } from "@/lib/themeSettings";

const GallerySection = () => {
  const [activeSlide, setActiveSlide] = useState<number | null>(null);
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);
  const swiperRef = useRef<any>(null);
  const progressRefs = useRef<(HTMLDivElement | null)[]>([]);
  const paginationContRef = useRef<HTMLDivElement | null>(null);
  const windowW = useWindowWidth();
  const { settings } = useThemeSettings();
  const images = useMemo(() => getGalleryUrls(settings), [settings]);

  const onAutoplayTimeLeft = (s: any, time: number, progress: number) => {
    const index = s.activeIndex;
    const ref = progressRefs.current[index];

    if (ref) {
      ref.style.setProperty("--progress", `${1 - progress}`);
    }
  };

  const handleSlideChange = (swiper: any) => {
    const activeItem = progressRefs.current[swiper.activeIndex];
    if (activeItem && paginationContRef.current && windowW > 1024) {
      const itemTop = activeItem.offsetTop;
      const itemHeight = activeItem.offsetHeight;
      const container = paginationContRef.current;
      const containerHeight = container.offsetHeight;

      const scrollToTop = itemTop - containerHeight / 2 + itemHeight / 2;
      container.scrollTo({ top: scrollToTop, behavior: "smooth" });
    } else if (activeItem && paginationContRef.current && windowW <= 1024) {
      const itemLeft = activeItem.offsetLeft;
      const itemWidth = activeItem.offsetWidth;
      const container = paginationContRef.current;
      const containerWidth = container.offsetWidth;

      const scrollToCenter = itemLeft - containerWidth / 2 + itemWidth / 2;
      container.scrollTo({ left: scrollToCenter, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (
      swiperRef.current &&
      swiperRef.current.params &&
      prevRef.current &&
      nextRef.current
    ) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.navigation.destroy();
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, []);

  return (
    <section className={s.section}>
      <Container>
        <h2>
          Галерея <br /> ЖК “Надрічний”
        </h2>
        <div className={s.swiperCont}>
          <div className={s.mobileNav}>
            <div
              ref={prevRef}
              onClick={() => {
                if (activeSlide) {
                  swiperRef.current.slideTo(activeSlide - 1);
                }
              }}
              className={`${s.swiperPrev} ${s.navBtn} ${
                activeSlide === 0 ? s.disabled : ""
              }`}
            >
              {arrow}
            </div>
            <div className={s.mobPagination}>
              <p className={s.activeSlide}>
                {activeSlide ? activeSlide + 1 : 1}
              </p>
              <p>/{images.length || 1}</p>
            </div>
            <div
              ref={nextRef}
              onClick={() => {
                if (activeSlide !== null && activeSlide < images.length - 1) {
                  swiperRef.current.slideTo(activeSlide + 1);
                }
              }}
              className={`${s.swiperNext} ${s.navBtn} ${
                activeSlide === images.length - 1 ? s.disabled : ""
              }`}
            >
              {arrow}
            </div>
          </div>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation={{
              nextEl: `.${s.swiperNext}`,
              prevEl: `.${s.swiperPrev}`,
              disabledClass: s.disabled,
            }}
            autoplay={{
              delay: 3000,
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            className={`${s.swiper} swiper`}
            onAutoplayTimeLeft={onAutoplayTimeLeft}
            onSlideChange={(swiper) => {
              setActiveSlide(swiper.activeIndex);
              handleSlideChange(swiper);
            }}
          >
            {images.map((src, idx) => (
              <SwiperSlide key={`${src}-${idx}`} className={s.swiperSlide}>
                <Image
                  src={src}
                  width={1480}
                  height={800}
                  alt="img"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className={s.controls}>
            <div className={s.paginationCont} ref={paginationContRef}>
              {images.map((src, idx) => {
                return (
                  <div
                    key={`${src}-thumb-${idx}`}
                    className={`${s.paginationItem} ${
                      idx === activeSlide ? s.active : s.unactive
                    }`}
                    ref={(el) => {
                      progressRefs.current[idx] = el;
                    }}
                    onClick={() => {
                      setActiveSlide(idx);
                      swiperRef.current?.slideTo(idx);
                    }}
                  >
                    <div className={s.imageContainer}>
                      <Image
                        className={s.image}
                        src={src}
                        width={1480}
                        height={800}
                        alt="img"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={s.swiperController}>
              <div ref={prevRef} className={s.swiperPrev}>
                {arrow}
              </div>
              <div ref={nextRef} className={s.swiperNext}>
                {arrow}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default GallerySection;

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
