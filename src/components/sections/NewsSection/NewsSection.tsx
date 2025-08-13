"use client";
import { useState, useEffect, useRef } from "react";
import Container from "@/components/Container/Container";
import s from "./NewsSection.module.css";
import Image from "next/image";
import Link from "next/link";
import NewsItem from "@/components/NewsItem/NewsItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
export interface NewItem {
  id: number;
  author: number;
  categories: [number, number];
  date: string;
  date_gmt: string;
  link: string;
  slug: string;
  excerpt: {
    rendered: string;
  };
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  reading_time: number;
}

const NewsSection = () => {
  const [newsData, setNewsData] = useState([]);
  const [activeSlide, setActiveSlide] = useState<number | null>(0);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          "https://api.lcdoy.projection-learn.website/wp-json/wp/v2/posts"
        );
        const data = await response.json();
        setNewsData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNews();
  }, []);

  return (
    <section className={s.section}>
      <Container className={s.container}>
        <h2>Новини</h2>
        {window.innerWidth <= 1024 ? (
          <>
            {" "}
            <Swiper
              className={s.swiper}
              modules={[Navigation]}
              navigation={{
                nextEl: `.${s.swiperNext}`,
                prevEl: `.${s.swiperPrev}`,
              }}
              slidesPerView={"auto"}
              onSlideChange={(s) => {
                setActiveSlide(s.activeIndex);
              }}
              onSwiper={(s) => {
                setActiveSlide(s.activeIndex);
              }}
            >
              {newsData.map((item, idx) => {
                return (
                  <SwiperSlide className={s.swiperSlide} key={idx}>
                    <NewsItem item={item} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <div className={s.mobileNav}>
              <div
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
                <p>/{newsData.length}</p>
              </div>
              <div
                className={`${s.swiperNext} ${s.navBtn} ${
                  activeSlide === newsData.length - 1 ? s.disabled : ""
                }`}
              >
                {arrow}
              </div>
            </div>{" "}
          </>
        ) : (
          <ul className={s.newsList}>
            {newsData.slice(0, 3).map((item: NewItem) => {
              return <NewsItem item={item} key={item.id} />;
            })}
          </ul>
        )}
      </Container>
    </section>
  );
};

export default NewsSection;

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
