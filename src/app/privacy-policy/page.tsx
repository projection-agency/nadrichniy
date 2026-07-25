"use client";
import { useEffect, useState } from "react";
import s from "./page.module.css";
import Container from "@/components/Container/Container";
import CLientAccordion from "@/components/ClientAccordion/ClientAccordion";
import { FAQ } from "@/components/ClientAccordion/ClientAccordion";
import { API_URL } from "@/constants";
export default function Page() {
  const [faqData, setFaqData] = useState<FAQ[]>([]);
  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await fetch(
          `${API_URL}/wp-json/wp/v2/pages?slug=privacy-policy`
        );
        const data = await response.json();
        const page = Array.isArray(data) ? data[0] : null;
        setFaqData(page?.FAQ ?? []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFAQs();
  }, []);

  return (
    <div>
      <section className={s.heroSection}>
        <Container>
          <div className={s.content}>
            <h1>
              Політика конфіденційності <br /> та використання файлів cookies
            </h1>
          </div>
        </Container>
      </section>
      <section className={s.accrodionSection}>
        <Container className={s.container}>
          <CLientAccordion items={faqData} />
        </Container>
      </section>
    </div>
  );
}
