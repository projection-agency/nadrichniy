import Image from "next/image";
import s from "./HomeHero.module.css";
import Link from "next/link";
import Container from "@/components/Container/Container";
const HomeHero = () => {
  return (
    <section className={s.section}>
      <Container className={s.container}>
        <Image
          className={s.background}
          alt="hero-bg"
          width={3840}
          height={2160}
          src={"/images/home-hero.jpg"}
        />
        <h1>Житловий масив Надрічний</h1>
        <Link href={"#"} className={s.catalogPageLink}>
          Дивитись квартири
          <span>
            {apartment}
          </span>
        </Link>
        <div className={s.anchorLinkCont}>
          <Image
            alt="icon-scroll"
            width={32}
            height={32}
            src={"/icons/icon-scroll.svg"}
          />

          <p>
            Прокрутіть вниз <span>щоб дізнатись більше</span>
          </p>
        </div>
      </Container>
    </section>
  );
};

export default HomeHero;

const apartment = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_564_947)">
      <path
        d="M12.5 18H11.5C10.948 18 10.5 17.552 10.5 17V16C10.5 15.448 10.948 15 11.5 15H12.5C13.052 15 13.5 15.448 13.5 16V17C13.5 17.552 13.052 18 12.5 18ZM13.5 7V6C13.5 5.448 13.052 5 12.5 5H11.5C10.948 5 10.5 5.448 10.5 6V7C10.5 7.552 10.948 8 11.5 8H12.5C13.052 8 13.5 7.552 13.5 7ZM13.5 12V11C13.5 10.448 13.052 10 12.5 10H11.5C10.948 10 10.5 10.448 10.5 11V12C10.5 12.552 10.948 13 11.5 13H12.5C13.052 13 13.5 12.552 13.5 12ZM19 17V16C19 15.448 18.552 15 18 15H17C16.448 15 16 15.448 16 16V17C16 17.552 16.448 18 17 18H18C18.552 18 19 17.552 19 17ZM8 17V16C8 15.448 7.552 15 7 15H6C5.448 15 5 15.448 5 16V17C5 17.552 5.448 18 6 18H7C7.552 18 8 17.552 8 17ZM19 12V11C19 10.448 18.552 10 18 10H17C16.448 10 16 10.448 16 11V12C16 12.552 16.448 13 17 13H18C18.552 13 19 12.552 19 12ZM24 18.5V10.5C24 7.629 21.789 5.265 18.979 5.021C18.735 2.212 16.371 0 13.5 0H10.5C7.467 0 5 2.468 5 5.5V10.022C2.201 10.275 0 12.635 0 15.5V18.5C0 21.532 2.467 24 5.5 24H18.5C21.533 24 24 21.532 24 18.5ZM6.5 13C7.329 13 8 12.328 8 11.5V5.5C8 4.121 9.122 3 10.5 3H13.5C14.878 3 16 4.121 16 5.5V6.5C16 7.328 16.671 8 17.5 8H18.5C19.878 8 21 9.121 21 10.5V18.5C21 19.879 19.878 21 18.5 21H5.5C4.122 21 3 19.879 3 18.5V15.5C3 14.121 4.122 13 5.5 13H6.5Z"
      />
    </g>
    <defs>
      <clipPath id="clip0_564_947">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
