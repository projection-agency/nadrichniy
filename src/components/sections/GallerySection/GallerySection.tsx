"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useRef, useEffect, useState } from "react";
import Container from "@/components/Container/Container";
import s from "./GallerySection.module.css";
import Image from "next/image";
import "swiper/css";
const array = [1, 2, 3, 4, 5, 6, 7];

const GallerySection = () => {
  const [activeSlide, setActiveSlide] = useState<number | null>(null);
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);
  const swiperRef = useRef<any>(null);
  const progressRefs = useRef<(HTMLDivElement | null)[]>([]);
  const paginationContRef = useRef<HTMLDivElement | null>(null);
  const [windowW, setWindowW] = useState(window.innerWidth);

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

    window.addEventListener("resize", () => setWindowW(window.innerWidth));

    return window.removeEventListener("resize", () => {});
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
              <p>/{array.length}</p>
            </div>
            <div
              ref={nextRef}
              onClick={() => {
                if (activeSlide) {
                  swiperRef.current.slideTo(activeSlide + 1);
                }
              }}
              className={`${s.swiperNext} ${s.navBtn} ${
                activeSlide === array.length - 1 ? s.disabled : ""
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
            {array.map((item, idx) => (
              <SwiperSlide key={idx} className={s.swiperSlide}>
                <Image
                  src={
                    "https://api.lcdoy.projection-learn.website/wp-content/uploads/2025/06/telegram-cloud-photo-size-2-5431594601380179473-y-1.png"
                  }
                  width={1480}
                  height={800}
                  alt="img"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className={s.controls}>
            <div className={s.paginationCont} ref={paginationContRef}>
              {array.map((item, idx) => {
                return (
                  <div
                    key={item}
                    className={`${s.paginationItem} ${
                      idx === activeSlide ? s.active : s.unactive
                    }`}
                    ref={(el) => {
                      progressRefs.current[idx] = el;
                    }}
                    onClick={(e) => {
                      setActiveSlide(idx);
                      swiperRef.current?.slideTo(idx);
                    }}
                  >
                    <div className={s.imageContainer}>
                      <Image
                        className={s.image}
                        src={
                          "https://api.lcdoy.projection-learn.website/wp-content/uploads/2025/06/telegram-cloud-photo-size-2-5431594601380179473-y-1.png"
                        }
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
