"use client";
import Container from "@/components/Container/Container";
import s from "./FaqSection.module.css";
import { useState, useEffect } from "react";
// import ClientAccordion from "@/components/ClientAccordion/ClientAccordion";
export default function FaqSection() {
  const [faqData, setFaqData] = useState([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await fetch(
          "https://api.lcdoy.projection-learn.website/wp-json/wp/v2/faq"
        );
        const data = await response.json();
        setFaqData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFaqs();
  }, []);
  
  return (
    <section className={s.section}>
      <Container>
        <div className={s.topBlock}>
          <h2>Поширені питання</h2>
        </div>
        {/* {faqData ? <ClientAccordion items={faqData} /> : <p>please wait</p>} */}
      </Container>
    </section>
  );
}
