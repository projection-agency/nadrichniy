// type Props = {
//   params: { slug: string };
//   searchParams: { [key: string]: string | string[] | undefined };
// };
"use client";
import dynamic from "next/dynamic";
import Container from "@/components/Container/Container";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import SimilarArticles from "@/components/sections/SimilarArticles/SimilarArticles";
import QuestionsFormSection from "@/components/sections/QuestionsFormSection/QuestionsFormSection";
import s from "./page.module.css";
const ContactsSection = dynamic(
  () => import("@/components/sections/ContactsSection/ContactsSection"),
  { ssr: false }
);

type Post = {
  title: { rendered: string };
  categories: number[];
  excerpt: { rendered: string };
  reading_time: number;
  content: { rendered: string };
  date: string;
};
const BlogPostPage = () => {
  const [postData, setPostData] = useState<Post>();
  const params = useParams();
  const pathname = usePathname();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `https://api.lcdoy.projection-learn.website/wp-json/wp/v2/posts?slug=${params.slug}`
        );
        const data = await response.json();
        setPostData(data[0]);
      } catch (error) {
        console.log(error);
      }
    };

    if (!params.slug) {
      return;
    }
    fetchPost();
  }, [params.slug]);

  if (!postData) {
    return;
  }
  const toggleCategoires = () => {
    switch (postData.categories[0]) {
      case 8: {
        return "Новини";
      }
      case 11: {
        return "Спеціальні пропозиції";
      }
      case 10: {
        return "Хід будівництва";
      }
      default: {
        return "Всі";
      }
    }
  };

  const breadcrumbData = [
    { label: "Блог", href: "/blog" },
    { label: toggleCategoires() },
    { label: postData.title.rendered },
  ];

  return (
    <div className={s.page}>
      <section className={s.heroSection}>
        {postData ? (
          <Container>
            <Breadcrumbs items={breadcrumbData} />
            <h1>{postData.title.rendered}</h1>
            <div className={s.subtitleBlock}>
              <p
                dangerouslySetInnerHTML={{ __html: postData.excerpt.rendered }}
              ></p>
              <div className={s.timeBlock}>
                <p className={s.readingTime}>
                  <span>{clock}</span> {postData.reading_time} хвилин читання
                </p>
                <p>{postData.date}</p>
              </div>
            </div>
          </Container>
        ) : (
          <p>please wait</p>
        )}
      </section>
      <section className={s.content}>
        {postData ? (
          <Container>
            <article
              dangerouslySetInnerHTML={{ __html: postData.content.rendered }}
            ></article>
          </Container>
        ) : (
          <Container>
            <p>please wait</p>
          </Container>
        )}
      </section>
      <SimilarArticles category={postData.categories[0]} />
      <QuestionsFormSection />
      <ContactsSection />
    </div>
  );
};
export default BlogPostPage;
// { params }: Props

const clock = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M12 1.00195C9.82441 1.00195 7.69767 1.64709 5.88873 2.85579C4.07979 4.06448 2.66989 5.78245 1.83733 7.79244C1.00477 9.80242 0.786929 12.0142 1.21137 14.1479C1.6358 16.2817 2.68345 18.2418 4.22183 19.7801C5.76021 21.3185 7.72022 22.3662 9.85401 22.7906C11.9878 23.215 14.1995 22.9972 16.2095 22.1646C18.2195 21.3321 19.9375 19.9222 21.1462 18.1132C22.3549 16.3043 23 14.1775 23 12.002C22.9966 9.08563 21.8365 6.28973 19.7744 4.22758C17.7122 2.16542 14.9163 1.00539 12 1.00195ZM15.707 15.709C15.5195 15.8964 15.2652 16.0017 15 16.0017C14.7348 16.0017 14.4805 15.8964 14.293 15.709L11.293 12.709C11.1055 12.5215 11.0001 12.2671 11 12.002V6.00195C11 5.73674 11.1054 5.48238 11.2929 5.29485C11.4804 5.10731 11.7348 5.00195 12 5.00195C12.2652 5.00195 12.5196 5.10731 12.7071 5.29485C12.8946 5.48238 13 5.73674 13 6.00195V11.588L15.707 14.295C15.8945 14.4825 15.9998 14.7368 15.9998 15.002C15.9998 15.2671 15.8945 15.5214 15.707 15.709Z"
      fill="white"
    />
  </svg>
);
