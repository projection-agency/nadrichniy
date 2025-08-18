"use client";
import { useEffect, useState } from "react";
import Container from "@/components/Container/Container";
import NewsItem from "@/components/NewsItem/NewsItem";
import s from "./ProposalsList.module.css";

export default function ProposalsList() {
  const [postsData, setPostsData] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `https://api.lcdoy.projection-learn.website/wp-json/wp/v2/posts?categories=11`
        );
        const data = await response.json();
        setPostsData(data);
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
      {window.innerWidth <= 1024 ? <button className={s.blogLink}>Дивитися ще {arrow}</button> : ""}
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
