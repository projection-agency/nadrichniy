"use client";
import Image from "next/image";
import s from "./BlogHero.module.css";
import { useState, useEffect } from "react";
import { NewItem } from "../NewsSection/NewsSection";
import NewsItem from "@/components/NewsItem/NewsItem";
export default function BlogHero() {
  const [postsData, setPostsData] = useState([]);
  const [active, setActive] = useState<
    "all" | "news" | "special" | "workSchedule"
  >("all");

  useEffect(() => {
    const toggleCategoires = () => {
      switch (active) {
        case "all": {
          return "";
        }
        case "news": {
          return "?categories=8";
        }
        case "special": {
          return "?categories=11";
        }
        case "workSchedule": {
          return "?categories=10";
        }
      }
    };

    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `https://api.lcdoy.projection-learn.website/wp-json/wp/v2/posts${toggleCategoires()}`
        );
        const data = await response.json();
        setPostsData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, [active]);

  const translateMap: Record<string, string> = {
    all: "translateX(0%)",
    news: "translateX(100%)",
    special: "translateX(200%)",
    workSchedule: "translateX(300%)",
  };

  return (
    <section className={s.section}>
      <div className={s.topBlock}>
        <Image
          src={"/images/blog_bg.svg"}
          width={1920}
          height={328}
          alt="background"
        />
        <h1>Блог</h1>
      </div>
      <div className={s.content}>
        <div className={s.planningToggler}>
          <div
            className={s.background}
            style={{
              transform: translateMap[active] || "translateX(0%)",
            }}
          ></div>
          <button
            className={active === "all" ? s.active : ""}
            onClick={() => setActive("all")}
          >
            Всі
          </button>
          <button
            className={active === "news" ? s.active : ""}
            onClick={() => setActive("news")}
          >
            Новини
          </button>
          <button
            className={active === "special" ? s.active : ""}
            onClick={() => setActive("special")}
          >
            Спеціальні пропозиції
          </button>
          <button
            className={active === "workSchedule" ? s.active : ""}
            onClick={() => setActive("workSchedule")}
          >
            Хід будівництва
          </button>
        </div>
        {postsData ? (
          <ul className={`${s.newsList}`}>
            {postsData.map((item: NewItem) => {
              return <NewsItem item={item} key={item.id} />;
            })}
          </ul>
        ) : (
          <p>please wait</p>
        )}
      </div>
    </section>
  );
}
