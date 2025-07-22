import Image from "next/image";
import { NewItem } from "../sections/NewsSection/NewsSection";
import s from "./NewsItem.module.css";
import Link from "next/link";

export default function NewsItem({ item }: { item: NewItem }) {

  const togglePostType = () => {
    switch (item.categories[0]) {
      case 8: {
        return "Новина";
      }
      case 11: {
        return "Спеціальна пропозиція";
      }

      case 10: {
        return "Хід робіт";
      }
      default: {
        return "Новина";
      }
    }
  };
  
  return (
    <div key={item.id} className={s.newsItem}>
      <p className={s.subtitle}>{togglePostType()}</p>
      <h3>{item.title.rendered}</h3>
      <p
        className={s.content}
        dangerouslySetInnerHTML={{ __html: item.excerpt.rendered }}
      ></p>
      <div className={s.timeAndDate}>
        <p className={s.readingTime}>
          <span>
            <Image src={"/icons/clock.svg"} width={24} height={24} alt="icon" />
          </span>
          {item.reading_time} хвилин читання
        </p>
        <p className={s.date}>{item.date}</p>
      </div>
      <Image
        className={s.image}
        width={424}
        height={429}
        src={"/images/interier.jpg"}
        alt="image"
      />
      <Link href={`/blog/${item.slug}`} className={s.articleLink}>
        Читати статтю
        {swiperArrow}
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
    <path d="M8 18L8 2M8 2L1 9.52941M8 2L15 9.52941" stroke-width="2" />
  </svg>
);
