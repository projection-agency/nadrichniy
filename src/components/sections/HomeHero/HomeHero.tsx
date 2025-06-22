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
        <h1>Надрічинй</h1>
        <Link href={"#"} className={s.catalogPageLink}>
          Дивитись квартири
          <span>
            <Image
              className={s.linkIcon}
              alt="icon-apartment"
              width={24}
              height={24}
              src={"/icons/icon-apartment.svg"}
            />
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
