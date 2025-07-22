"use client";
import dynamic from "next/dynamic";
import Container from "@/components/Container/Container";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SimilarArticles from "@/components/sections/SimilarArticles/SimilarArticles";
import QuestionsFormSection from "@/components/sections/QuestionsFormSection/QuestionsFormSection";
import addHeadingsId from "@/utils/addHeadingsId";
import s from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import extractHeadingsWithIds from "@/utils/extractHeadingsWithIds";
import extractImagesFromHtml from "@/utils/extractImagesFromHtml";
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

const telegram = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
  >
    <g clip-path="url(#clip0_4368_5002)">
      <path
        d="M6.84254 11.8632L6.56132 16.8888C6.96366 16.8888 7.13792 16.6692 7.34688 16.4055L9.23322 14.115L13.1419 17.7519C13.8588 18.2595 14.3638 17.9922 14.5572 16.914L17.1229 1.63926C17.3502 0.292864 16.7403 -0.234534 16.0419 0.0957643L0.961103 7.43162C-0.0681298 7.93922 -0.0525461 8.66822 0.786141 8.99852L4.64169 10.5222L13.5974 3.40235C14.0189 3.04775 14.4021 3.24395 14.0869 3.59855L6.84254 11.8632Z"
        fill="#405BE7"
      />
    </g>
    <defs>
      <clipPath id="clip0_4368_5002">
        <rect width="18" height="18" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const facebook = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
  >
    <mask
      id="mask0_4368_4502"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="18"
      height="18"
    >
      <path d="M17.1719 0.5H0.171875V17.5H17.1719V0.5Z" fill="white" />
    </mask>
    <g mask="url(#mask0_4368_4502)">
      <path
        d="M6.50146 7.8441C6.74973 7.8441 6.951 7.64283 6.951 7.39456V4.98623C6.951 4.03548 7.3147 3.12698 7.95697 2.45974C8.59867 1.79308 9.46527 1.42188 10.3651 1.42188H12.2338V3.73392H10.3651C10.0353 3.73392 9.7226 3.8702 9.49482 4.10684C9.26761 4.34289 9.14284 4.65951 9.14284 4.98623V7.39456C9.14284 7.64283 9.3441 7.8441 9.59237 7.8441H12.1128L11.5564 10.1562H9.59237C9.3441 10.1562 9.14284 10.3574 9.14284 10.6057V16.5784H6.951V10.6057C6.951 10.3574 6.74973 10.1562 6.50146 10.1562H4.63281V7.8441H6.50146Z"
        fill="#405BE7"
        stroke="#405BE7"
        stroke-width="0.899069"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
  </svg>
);

const instagram = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
  >
    <path
      d="M8.99777 1.14453C11.1325 1.14453 11.3989 1.15239 12.2365 1.19167C13.0733 1.23096 13.6429 1.36217 14.1442 1.55703C14.6627 1.7566 15.0996 2.02688 15.5365 2.46296C15.936 2.85573 16.2452 3.33086 16.4424 3.85525C16.6365 4.35575 16.7684 4.92617 16.8078 5.76296C16.8447 6.60053 16.8548 6.86689 16.8548 9.00168C16.8548 11.1365 16.847 11.4028 16.8078 12.2404C16.7684 13.0772 16.6365 13.6468 16.4424 14.1481C16.2457 14.6728 15.9365 15.148 15.5365 15.5404C15.1436 15.9397 14.6685 16.2489 14.1442 16.4463C13.6437 16.6404 13.0733 16.7724 12.2365 16.8117C11.3989 16.8486 11.1325 16.8588 8.99777 16.8588C6.86299 16.8588 6.59662 16.8509 5.75906 16.8117C4.92226 16.7724 4.35263 16.6404 3.85134 16.4463C3.32674 16.2495 2.85154 15.9402 2.45905 15.5404C2.05944 15.1477 1.75029 14.6725 1.55313 14.1481C1.35826 13.6476 1.22705 13.0772 1.18777 12.2404C1.15084 11.4028 1.14062 11.1365 1.14062 9.00168C1.14062 6.86689 1.14848 6.60053 1.18777 5.76296C1.22705 4.92539 1.35826 4.35653 1.55313 3.85525C1.74974 3.33053 2.05897 2.85528 2.45905 2.46296C2.85165 2.06322 3.32682 1.75403 3.85134 1.55703C4.35263 1.36217 4.92148 1.23096 5.75906 1.19167C6.59662 1.15474 6.86299 1.14453 8.99777 1.14453ZM8.99777 5.0731C7.95584 5.0731 6.9566 5.487 6.21985 6.22375C5.48309 6.9605 5.0692 7.95975 5.0692 9.00168C5.0692 10.0436 5.48309 11.0428 6.21985 11.7796C6.9566 12.5163 7.95584 12.9303 8.99777 12.9303C10.0397 12.9303 11.0389 12.5163 11.7757 11.7796C12.5124 11.0428 12.9263 10.0436 12.9263 9.00168C12.9263 7.95975 12.5124 6.9605 11.7757 6.22375C11.0389 5.487 10.0397 5.0731 8.99777 5.0731ZM14.105 4.87667C14.105 4.6162 14.0015 4.36638 13.8172 4.18219C13.6331 3.998 13.3833 3.89453 13.1228 3.89453C12.8623 3.89453 12.6125 3.998 12.4283 4.18219C12.2441 4.36638 12.1406 4.6162 12.1406 4.87667C12.1406 5.13716 12.2441 5.38697 12.4283 5.57115C12.6125 5.75534 12.8623 5.85881 13.1228 5.85881C13.3833 5.85881 13.6331 5.75534 13.8172 5.57115C14.0015 5.38697 14.105 5.13716 14.105 4.87667ZM8.99777 6.64453C9.62293 6.64453 10.2225 6.89288 10.6645 7.33492C11.1066 7.77697 11.3549 8.37653 11.3549 9.00168C11.3549 9.62683 11.1066 10.2264 10.6645 10.6684C10.2225 11.1105 9.62293 11.3588 8.99777 11.3588C8.37262 11.3588 7.77307 11.1105 7.33101 10.6684C6.88897 10.2264 6.64062 9.62683 6.64062 9.00168C6.64062 8.37653 6.88897 7.77697 7.33101 7.33492C7.77307 6.89288 8.37262 6.64453 8.99777 6.64453Z"
      fill="#405BE7"
    />
  </svg>
);

const mail = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M1.28502 2.55984L6.0936 7.3705C7.14237 8.41725 8.85673 8.41815 9.90636 7.3705L14.7149 2.55984C14.7634 2.51141 14.7563 2.43166 14.7001 2.39248C14.2097 2.05044 13.613 1.84766 12.9702 1.84766H3.02984C2.38701 1.84766 1.79029 2.05047 1.29983 2.39248C1.24365 2.43166 1.2366 2.51141 1.28502 2.55984ZM0 4.87746C0 4.37199 0.125325 3.8944 0.346077 3.47462C0.380598 3.40895 0.4681 3.39567 0.520559 3.44813L5.26827 8.19584C6.77171 9.70147 9.22738 9.70234 10.7317 8.19584L15.4794 3.44813C15.5319 3.39567 15.6194 3.40895 15.6539 3.47462C15.8746 3.8944 16 4.37202 16 4.87746V11.2023C16 12.8743 14.64 14.2322 12.9702 14.2322H3.02984C1.36004 14.2322 0 12.8743 0 11.2023V4.87746Z"
      fill="#405BE7"
    />
  </svg>
);

const iconMap: Record<string, JSX.Element> = {
  mail,
  facebook,
  instagram,
  telegram,
};

const socialLinks = [
  { title: "telegram", link: "" },
  { title: "facebook", link: "" },
  { title: "instagram", link: "" },
  { title: "mail", link: "" },
];

const BlogPostPage = () => {
  const [postData, setPostData] = useState<Post>();
  const params = useParams();

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

  const { images, htmlWithoutImages } = extractImagesFromHtml(
    postData.content.rendered
  );
  const contentWithHeadings = addHeadingsId(htmlWithoutImages);
  const headingsWithId = extractHeadingsWithIds(contentWithHeadings);

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
            {images ? (
              images.slice(0, 1).map((item, idx) => {
                return (
                  <Image
                    className={s.image}
                    key={idx}
                    src={item.src}
                    width={1920}
                    height={720}
                    alt={item.alt ? item.alt : "image"}
                  />
                );
              })
            ) : (
              <p>please wait</p>
            )}
            <div className={s.articleCont}>
              <article
                dangerouslySetInnerHTML={{ __html: contentWithHeadings }}
              ></article>
              <div className={s.navContainer}>
                <div className={s.articleNavigation}>
                  <div>
                    <p>зміст статті</p>
                    {nav}
                  </div>
                  <nav>
                    <ul>
                      {headingsWithId.map((item, idx) => {
                        console.log(item);
                        return (
                          <li key={idx}>
                            <Link href={`#${item.id}`}>{item.text}</Link>
                          </li>
                        );
                      })}
                    </ul>
                  </nav>
                </div>
                <div className={s.socialsCont}>
                  <p>поділитись</p>
                  <ul>
                    {socialLinks.map((item, idx) => {
                      return (
                        <li key={idx}>
                          <Link href={"#"} />
                          {iconMap[item.title]}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className={s.proposalCont}>
                  <p className={s.title}>акційна пропозиція</p>
                  <Image
                    src={"/images/proposal.jpg"}
                    width={432}
                    height={352}
                    alt="proposal"
                  />
                  <p className={s.proposal}>
                    Заголовок (Чим особливий район біля річки)
                  </p>
                  <Link href={"#"}>Дізнатись більше {btnArrow}</Link>
                </div>
              </div>
            </div>
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

const nav = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path d="M7 8H23H7ZM10 12.5H23H10ZM13.5 17H23H13.5Z" fill="#191B1A" />
    <path
      d="M7 8H23M10 12.5H23M13.5 17H23"
      stroke="#191B1A"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const btnArrow = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="10"
    height="9"
    viewBox="0 0 10 9"
    fill="none"
  >
    <path d="M0 4.5H9M9 4.5L4.76471 0.5M9 4.5L4.76471 8.5" stroke="#656D7A" />
  </svg>
);
