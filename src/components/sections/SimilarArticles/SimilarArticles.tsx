"use client";
import { useEffect, useState } from "react";
import NewsItem from "@/components/NewsItem/NewsItem";
import Container from "@/components/Container/Container";
import Link from "next/link";
import { NewItem } from "../NewsSection/NewsSection";
import s from "./SimilarArticles.module.css";

export default function SimilarArticles({ category }: { category?: number }) {
  const [postsData, setPostsData] = useState([]);
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
        {postsData ? (
          <ul className={`${s.newsList}`}>
            {postsData.slice(0, 3).map((item: NewItem) => {
              return <NewsItem item={item} key={item.id} />;
            })}
          </ul>
        ) : (
          <p>please wait</p>
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
    <path d="M0.5 5H12.5M12.5 5L8.26471 1M12.5 5L8.26471 9" stroke="white" />
  </svg>
);
