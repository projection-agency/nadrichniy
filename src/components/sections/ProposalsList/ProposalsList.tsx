"use client";
import { useEffect, useState } from "react";
import Container from "@/components/Container/Container";
import NewsItem from "@/components/NewsItem/NewsItem";
import s from "./ProposalsList.module.css";
import { getWindowWidth } from "@/utils/getWindowWidth";
import { API_URL } from "@/constants";
import { getBlogCategoryQuery } from "@/lib/blogCategories";
import { NewItem } from "../NewsSection/NewsSection";

export default function ProposalsList() {
  const [postsData, setPostsData] = useState<NewItem[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const query = await getBlogCategoryQuery("special");
        const response = await fetch(`${API_URL}/wp-json/wp/v2/posts${query}`);
        const data = await response.json();
        setPostsData(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, []);
  return (
    <Container className={s.container}>
      {postsData ? (
        <ul className={s.list}>
          {postsData.map((item, idx) => (
            <NewsItem key={idx} item={item} />
          ))}
        </ul>
      ) : (
        <p>please wait</p>
      )}
      {getWindowWidth() <= 1024 ? (
        <button className={s.blogLink}>Дивитися ще {arrow}</button>
      ) : (
        ""
      )}
    </Container>
  );
}

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
