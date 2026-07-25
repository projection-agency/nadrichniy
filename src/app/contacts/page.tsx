"use client";
import s from "./page.module.css";
import Container from "@/components/Container/Container";
import Image from "next/image";
import ContactsSection from "@/components/sections/ContactsSection/ContactsSection";
import MapSection from "@/components/sections/MapSection/MapSection";
import QuestionsFormSection from "@/components/sections/QuestionsFormSection/QuestionsFormSection";

export default function ContactsPage() {
  return (
    <div>
      <section className={s.section}>
        <Image
          src={"/images/contacts_bg.svg"}
          width={1920}
          height={328}
          alt="background"
        />
        <Container>
          <h1>Контакти</h1>
        </Container>
      </section>
      <ContactsSection />
      <QuestionsFormSection />
      <MapSection />
    </div>
  );
}
