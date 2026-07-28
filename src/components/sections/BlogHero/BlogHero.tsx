"use client";
import Image from "next/image";
import s from "./BlogHero.module.css";
import { useState, useEffect, useRef } from "react";
import { NewItem } from "../NewsSection/NewsSection";
import NewsItem from "@/components/NewsItem/NewsItem";
import SimpleBar from "simplebar-react";
import { API_URL } from "@/constants";
import { getBlogCategoryQuery } from "@/lib/blogCategories";
import { getWindowWidth } from "@/utils/getWindowWidth";

const categories = ["all", "news", "special", "workSchedule"] as const;
type Category = (typeof categories)[number];

export default function BlogHero() {
  const [postsData, setPostsData] = useState<NewItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const togglerContRef = useRef<HTMLDivElement | null>(null);
  const togglersRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState<Category>("all");
  const isMobile = getWindowWidth() <= 1024;

  useEffect(() => {
    if (!isMobile) return;

    const container = togglerContRef.current;
    const activeIndex = categories.indexOf(active);
    const activeButton = togglersRefs.current[activeIndex];

    if (container && activeButton) {
      const itemLeft = activeButton.offsetLeft;
      const itemWidth = activeButton.offsetWidth;
      const containerWidth = container.offsetWidth;
      const scrollTo = itemLeft - containerWidth / 2 + itemWidth / 2;

      container.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  }, [active, isMobile]);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const query = await getBlogCategoryQuery(active);
        const response = await fetch(`${API_URL}/wp-json/wp/v2/posts${query}`);
        const data = await response.json();
        setPostsData(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log(error);
        setPostsData([]);
      } finally {
        setIsLoading(false);
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

  const toggler = (
    <div
      className={s.planningToggler}
      ref={(el) => {
        if (el) {
          togglerContRef.current = el;
        }
      }}
    >
      <div
        className={s.background}
        style={{
          transform: translateMap[active] || "translateX(0%)",
        }}
      ></div>
      {categories.map((item, idx) => {
        return (
          <button
            key={idx}
            ref={(el) => {
              if (el) {
                togglersRefs.current[idx] = el;
              }
            }}
            className={active === item ? s.active : ""}
            onClick={() => setActive(item)}
          >
            {(item == "all" && "Всі") ||
              (item == "news" && "Новини") ||
              (item == "special" && "Спеціальні пропозиції") ||
              (item == "workSchedule" && "Хід будівництва")}
          </button>
        );
      })}
    </div>
  );

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
        {isMobile ? (
          <SimpleBar
            className={s.simpleBar}
            classNames={{ track: s.simplebarTrack, scrollbar: s.scrollbar }}
            autoHide
          >
            {toggler}
          </SimpleBar>
        ) : (
          toggler
        )}
        {isLoading ? null : postsData && postsData.length > 0 ? (
          <ul className={`${s.newsList}`}>
            {postsData.map((item: NewItem) => {
              return <NewsItem item={item} key={item.id} />;
            })}
          </ul>
        ) : (
          <p className={s.emptyState}>
            {active === "all"
              ? "Новин ще немає"
              : "У цій категорії записів поки немає"}
          </p>
        )}
      </div>
    </section>
  );
}
