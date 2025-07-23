"use client";
import dynamic from "next/dynamic";
import s from "./page.module.css";
import Container from "@/components/Container/Container";
import QuestionsFormSection from "@/components/sections/QuestionsFormSection/QuestionsFormSection";
import Image from "next/image";
const ContactsSection = dynamic(
  () => import("@/components/sections/ContactsSection/ContactsSection"),
  { ssr: false }
);

const MapSection = dynamic(
  () => import("@/components/sections/MapSection/MapSection"),
  { ssr: false }
);

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
