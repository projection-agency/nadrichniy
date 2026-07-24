"use client";
import Container from "@/components/Container/Container";
import Image from "next/image";
import s from "./AboutSection.module.css";
import { useWindowWidth } from "@/utils/useWindowWidth";
import { useThemeSettings } from "@/lib/useThemeSettings";
import { getAboutContent } from "@/lib/themeSettings";
import { useMemo } from "react";
import { useModal } from "@/components/ModalContext";

const AboutSection = () => {
  const windowWidth = useWindowWidth();
  const { settings } = useThemeSettings();
  const { openModal } = useModal();
  const about = useMemo(() => getAboutContent(settings), [settings]);

  const quote =
    about.quote || "Нас знають, з нами працюють, нам довіряють";
  const quoteAuthor = about.quote_author || "© Спілка забудовників";
  const experience =
    about.experience ||
    "Понад 20 років у Івано‑Франківську зводимо житло, куди хочеться повертатися, а також соціальні й інфраструктурні об’єкти";
  const stats =
    about.stats && about.stats.length
      ? about.stats
      : [
          { value: "95%", label: "Проєктів здано без затримок" },
          { value: "20+", label: "Років будівельного досвіду" },
          { value: "7500+", label: "Квартир введено в експлуатацію" },
        ];
  const cardTitle =
    about.card_title ||
    "Ми про комфорт, а не про ефекти — тільки спокійна архітектура, що створює затишок";
  const cardText =
    about.card_text ||
    "Комплекс виглядає спокійно й доречно, без спроб виділитися формою чи кольором. Форми зрозумілі, фасади лаконічні, між будинками достатньо простору та світла";

  return (
    <section className={s.section}>
      <Container>
        <ul className={s.list}>
          <li>
            <div className={s.titleCont}>
              <h2>Про нас</h2>
            </div>
            <div className={s.qoute}>
              <h3>{quote}</h3>
              <p>{quoteAuthor}</p>
            </div>
            <Image
              className={s.bg}
              src={"/images/bg_about.jpg"}
              width={300}
              height={300}
              alt="image"
            />
          </li>

          <li>
            <p className={s.experience}>{experience}</p>
            <div className={s.statistics}>
              {stats.map((stat, idx) => (
                <div key={idx}>
                  <h3>{stat.value}</h3>
                  <p>{stat.label}</p>
                </div>
              ))}
            </div>
          </li>

          {windowWidth <= 1024 ? (
            <li>
              <Image
                src={"/images/bg_about1.jpg"}
                width={820}
                height={780}
                alt="image"
              />
            </li>
          ) : (
            ""
          )}

          <li>
            <p className={s.cardTitle}>
              <span>{cardTitle}</span>
            </p>
            <div className={s.content}>
              <p>{cardText}</p>

              <button type="button" onClick={() => openModal("formB")}>
                Замовити дзвінок
                <span>{apartment}</span>
              </button>
            </div>
          </li>

          {windowWidth >= 1024 ? (
            <li>
              <Image
                src={"/images/bg_about1.jpg"}
                width={820}
                height={780}
                alt="image"
              />
            </li>
          ) : (
            ""
          )}
        </ul>
      </Container>
    </section>
  );
};

export default AboutSection;

const apartment = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_about_cta)">
      <path d="M12.5 18H11.5C10.948 18 10.5 17.552 10.5 17V16C10.5 15.448 10.948 15 11.5 15H12.5C13.052 15 13.5 15.448 13.5 16V17C13.5 17.552 13.052 18 12.5 18Z" />
    </g>
    <defs>
      <clipPath id="clip0_about_cta">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
