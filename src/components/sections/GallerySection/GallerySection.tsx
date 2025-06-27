"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Container from "@/components/Container/Container";
import s from "./GallerySection.module.css";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { PaginationOptions } from "swiper/types";
const array = [1, 2, 3, 4, 5, 6, 7];

const GallerySection = () => {
  const [activeSlide, setActiveSlide] = useState<number | null>(null);
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);
  const swiperRef = useRef<any>(null);
  const progressRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressCircle = useRef<HTMLOrSVGElement | null>(null);
  const onAutoplayTimeLeft = (s: any, time: number, progress: number) => {
    const index = s.activeIndex;
    const ref = progressRefs.current[index];

    if (ref) {
      ref.style.setProperty("--progress", `${1 - progress}`);
    }
  };

  // const pagination: PaginationOptions = {
  //   clickable: true,
  //   el: `.${s.paginationCont}`,
  //   renderCustom: function (swiper, index, className) {
  //     return `<div className={autoplay-progress ${s.paginationItem} ${
  //       swiper.activeIndex == index ? s.active : s.unactive
  //     }} slot="container-end">
  //         <svg viewBox="0 0 48 48" ref={progressCircle}>
  //           <circle cx="24" cy="24" r="20"></circle>
  //         </svg>
  //         <span ref={progressContent}></span>
  //       </div>`;
  //   },
  // };

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
        <h2>Галерея ЖК “Надрічний”</h2>
        <div className={s.swiperCont}>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation={{
              nextEl: `.${s.swiperNext}`,
              prevEl: `.${s.swiperPrev}`,
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
              console.log(swiper.activeIndex);
              setActiveSlide(swiper.activeIndex);
            }}
          >
            {array.map((item, idx) => (
              <SwiperSlide key={idx}>
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
            <div className={s.paginationCont}>
              {array.map((item, idx) => {
                console.log(idx);
                return (
                  <div
                    key={item}
                    className={`${s.paginationItem} ${
                      idx === activeSlide ? s.active : s.unactive
                    }`}
                    ref={(el) => (progressRefs.current[idx] = el)}
                  >
                    <div className={s.imageContainer}>
                      <Image
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
                <Image
                  src={"/icons/swiper-arrow.svg"}
                  width={16}
                  height={14}
                  alt="icon"
                />
              </div>
              <div ref={nextRef} className={s.swiperNext}>
                <Image
                  src={"/icons/swiper-arrow.svg"}
                  width={16}
                  height={14}
                  alt="icon"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default GallerySection;

// {
//               type: "bullets",
//               el: `.${s.paginationCont}`,
//               bulletElement: "p",
//               clickable: true,
//             }
