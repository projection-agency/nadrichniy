"use client";
import { useState, useEffect, useRef } from "react";
import Container from "@/components/Container/Container";
import s from "./NewsSection.module.css";
import Image from "next/image";
import Link from "next/link";
import NewsItem from "@/components/NewsItem/NewsItem";
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
              <NewsItem item={item} key={item.id}/>
            );
          })}
        </ul>
      </Container>
    </section>
  );
};

export default NewsSection;

