"use client";
import { useEffect, useState } from "react";
import Container from "@/components/Container/Container";
import NewsItem from "@/components/NewsItem/NewsItem";
import s from "./ProposalsList.module.css"
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
    </Container>
  );
}
