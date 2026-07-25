"use client";
import Image from "next/image";
import { NewItem } from "../sections/NewsSection/NewsSection";
import s from "./NewsItem.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { resolveCategoryLabel } from "@/lib/themeSettings";
import { resolveMediaUrl } from "@/utils/resolveMediaUrl";

export default function NewsItem({ item }: { item: NewItem }) {
  const [categoryLabel, setCategoryLabel] = useState("Новина");

  useEffect(() => {
    let alive = true;
    resolveCategoryLabel(item.categories?.[0]).then((label) => {
      if (alive) setCategoryLabel(label);
    });
    return () => {
      alive = false;
    };
  }, [item.categories]);

  const date = new Date(item.date);
  const formatted = date.toLocaleDateString("uk-UA");
  const imageSrc = resolveMediaUrl(
    (item as { featured_media_url?: unknown; image?: unknown }).featured_media_url ??
      (item as { image?: unknown }).image,
    "/images/interier.jpg"
  );

  return (
    <div key={item.id} className={s.newsItem}>
      <Link href={`/blog/${item.slug}`} className={s.link}>
        <p className={s.subtitle}>{categoryLabel}</p>
        <h3>{item.title.rendered}</h3>
        <p
          className={s.content}
          dangerouslySetInnerHTML={{ __html: item.excerpt.rendered }}
        ></p>
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
          <p className={s.date}>{formatted}</p>
        </div>
        <Image
          className={s.image}
          width={424}
          height={429}
          src={imageSrc}
          alt="image"
        />
        <span className={s.articleLink}>
          Читати статтю
          {swiperArrow}
        </span>
      </Link>
    </div>
  );
}

const swiperArrow = (
  <svg
    width="16"
    height="18"
    viewBox="0 0 16 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={s.icon}
  >
    <path d="M8 18L8 2M8 2L1 9.52941M8 2L15 9.52941" strokeWidth="2" />
  </svg>
);
