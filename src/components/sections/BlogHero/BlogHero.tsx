"use client";
import Image from "next/image";
import s from "./BlogHero.module.css";
import { useState, useEffect, useRef } from "react";
import { NewItem } from "../NewsSection/NewsSection";
import NewsItem from "@/components/NewsItem/NewsItem";
import SimpleBar from "simplebar-react";
const categories = ["all", "news", "special", "workSchedule"] as const;
type Category = (typeof categories)[number];
export default function BlogHero() {
  const [postsData, setPostsData] = useState([]);
  const togglerContRef = useRef<HTMLDivElement | null>(null);
  const togglersRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState<Category>("all");

  useEffect(() => {
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
  }, [active]);

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
        <SimpleBar
          className={s.simpleBar}
          classNames={{ track: s.simplebarTrack, scrollbar: s.scrollbar }}
          dir="horizontal"
          style={{ width: "100%" }}
          forceVisible={"x"}
          autoHide={false}
        >
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
                    (item == "special" && " Спеціальні пропозиції") ||
                    (item == "workSchedule" && "Хід будівництва")}
                </button>
              );
            })}
          </div>
        </SimpleBar>
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
