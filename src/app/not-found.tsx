"use client";
import dynamic from "next/dynamic";
import s from "./not-found.module.css";
import Container from "@/components/Container/Container";
import Link from "next/link";

export default function Custom404() {
  return (
    <section className={s.heroSection}>
      <Container>
        <div className={s.content}>
          <h1>404</h1>
          <p className={s.upperDescr}>Сторінка не знайдена</p>
          <p className={s.instruction}>
            Перевірте правильність адреси або скористайтесь навігацією на сайті.
            Якщо проблема повторюється, зверніться до нас за допомогою.
          </p>
          <Link href={"/"}>Повернутись на головну</Link>
        </div>
      </Container>
    </section>
  );
}
