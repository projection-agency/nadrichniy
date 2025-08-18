"use client";
import { useEffect, useState } from "react";
import NewsItem from "@/components/NewsItem/NewsItem";
import { NewItem } from "../NewsSection/NewsSection";
import Container from "@/components/Container/Container";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import s from "./SimilarArticles.module.css";

export default function SimilarArticles({ category }: { category?: number }) {
  const [postsData, setPostsData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `https://api.lcdoy.projection-learn.website/wp-json/wp/v2/posts${
            category ? `?categories=${category}` : ""
          }`
        );
        const data = await response.json();
        setPostsData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, [category]);

  return (
    <section className={s.section}>
      <Container>
        <div className={s.topBlock}>
          <h2>Схожі статті</h2>
          <Link href={"/blog"}>До всіх статтей {arrow}</Link>
        </div>
        {postsData && window.innerWidth >= 1024 ? (
          <ul className={`${s.newsList}`}>
            {postsData.slice(0, 3).map((item: NewItem) => {
              return <NewsItem item={item} key={item.id} />;
            })}
          </ul>
        ) : (
          ""
        )}
        {window.innerWidth <= 1024 && postsData ? (
          <>
            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: `.${s.swiperNext}`,
                prevEl: `.${s.swiperPrev}`,
                disabledClass: s.disabled,
              }}
              slidesPerView={"auto"}
              onSlideChange={(s) => {
                setActiveIndex(s.activeIndex);
              }}
              onSwiper={(s) => {
                setActiveIndex(s.activeIndex);
              }}
              className={s.swiper}
            >
              {postsData.map((item: NewItem) => {
                return (
                  <SwiperSlide key={item.id}>
                    <NewsItem item={item} />
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
                <p>/{postsData.length}</p>
              </div>
              <div
                className={`${s.swiperNext} ${s.navBtn} ${
                  activeIndex === postsData.length - 1 ? s.disabled : ""
                }`}
              >
                {arrow}
              </div>
            </div>
            <Link className={s.blogLink} href={"/blog"}>
              До всіх статтей {arrow}
            </Link>
          </>
        ) : (
          ""
        )}
      </Container>
    </section>
  );
}

const arrow = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="10"
    viewBox="0 0 14 10"
    fill="none"
  >
    <path d="M0.5 5H12.5M12.5 5L8.26471 1M12.5 5L8.26471 9" />
  </svg>
);
