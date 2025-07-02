"use client";
import { useState, useEffect } from "react";
import Container from "@/components/Container/Container";
import s from "./NewsSection.module.css";
import Image from "next/image";
import Link from "next/link";
export interface NewItem {
  id: number;
  author: number;
  categories: [number, number];
  date: string;
  date_gmt: string;
  link: string;
  slug: string;
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
      <Container>
        <h2>Новини</h2>
        <ul className={s.newsList}>
          {newsData.slice(0, 3).map((item: NewItem) => {
            return (
              <div key={item.id} className={s.newsItem}>
                <p className={s.subtitle}>Новина</p>
                <h3>{item.title.rendered}</h3>
                <p className={s.content}>
                  {item.content.rendered.length >= 100
                    ? item.content.rendered.slice(0, 100)
                    : item.content.rendered}
                </p>
                <div className={s.timeAndDate}>
                  <p className={s.readingTime}>
                    <span>
                      <Image
                        src={"/icons/clock.svg"}
                        width={24}
                        height={24}
                        alt="icon"
                      />
                    </span>
                    {item.reading_time} хвилин читання
                  </p>
                  <p className={s.date}>{item.date}</p>
                </div>
                <Image
                  className={s.image}
                  width={424}
                  height={429}
                  src={"/images/interier.jpg"}
                  alt="image"
                />
                <Link href={"#"} className={s.articleLink}>
                  Читати статтю
                  <Image
                    className={s.icon}
                    src={"/icons/swiper-arrow.svg"}
                    width={9}
                    height={8}
                    alt="icon"
                  />
                </Link>
              </div>
            );
          })}
        </ul>
      </Container>
    </section>
  );
};

export default NewsSection;
