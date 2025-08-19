"use client";
import { useEffect, useState } from "react";
import s from "./page.module.css";
import Container from "@/components/Container/Container";
import CLientAccordion from "@/components/ClientAccordion/ClientAccordion";
import { FAQ } from "@/components/ClientAccordion/ClientAccordion";
export default function Page() {
  const [faqData, setFaqData] = useState<FAQ[]>([]);
  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await fetch(
          "https://api.lcdoy.projection-learn.website/wp-json/wp/v2/pages/106"
        );
        const data = await response.json();
        setFaqData(data.FAQ);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFAQs();
  }, []);

  console.log(faqData);
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
