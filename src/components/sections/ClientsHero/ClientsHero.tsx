import s from "./ClientsHero.module.css";
import Container from "@/components/Container/Container";
import Image from "next/image";
export default function ClientsHero() {
  return (
    <section className={s.section}>
      <Image
        src={"/images/client_bg.svg"}
        width={750}
        height={328}
        alt="house"
        className={s.bg}
      />
      <Container>
        <h1>Умови придбання</h1>
      </Container>
    </section>
  );
}
