import s from "./CatalogHero.module.css";
import Container from "@/components/Container/Container";
import Image from "next/image";
import Link from "next/link";
import StatisticsList from "@/components/StatisticsList/StatisticsList";
const CatalogHero = () => {
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
        <Link
          className={s.link}
          href="https://www.google.com/maps/search/?api=1&query=48.9407815,24.7164726"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>{iconMarker}</span> Івано-Франківськ, вул. Надрічна, 12
        </Link>
        <StatisticsList />
      </Container>
    </section>
  );
};

export default CatalogHero;

const iconMarker = (
  <svg viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 0C9.31371 0 12 2.72897 12 6.09473C11.9997 8.09244 9.88606 11.9534 8.16797 14.7627C7.15943 16.4118 4.84057 16.4118 3.83203 14.7627C2.11395 11.9534 0.000342757 8.0924 0 6.09473C0 2.72903 2.68638 0.000103926 6 0ZM6.00293 2.9375C4.44378 2.93766 3.17986 4.23524 3.17969 5.83594C3.17969 7.43679 4.44367 8.73519 6.00293 8.73535C7.56232 8.73535 8.82715 7.43689 8.82715 5.83594C8.82697 4.23514 7.56221 2.9375 6.00293 2.9375Z" />
  </svg>
);
