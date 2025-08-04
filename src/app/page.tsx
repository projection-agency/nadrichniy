"use client";
import HomeHero from "@/components/sections/HomeHero/HomeHero";
import AdvantagesSection from "@/components/sections/AdvantagesSection/AdvantagesSection";
import GallerySection from "@/components/sections/GallerySection/GallerySection";
import NewsSection from "@/components/sections/NewsSection/NewsSection";
import QuestionsFormSection from "@/components/sections/QuestionsFormSection/QuestionsFormSection";
import dynamic from "next/dynamic";

const ContactsSection = dynamic(
  () => import("@/components/sections/ContactsSection/ContactsSection"),
  { ssr: false }
);

const MapSection = dynamic(
  () => import("@/components/sections/MapSection/MapSection"),
  { ssr: false }
);

const AboutSection = dynamic(
  () => import("@/components/sections/AboutSection/AboutSection"),
  { ssr: false }
);

const ChooseAnApartment = dynamic(
  () => import("@/components/sections/ChooseAnApartment/ChooseAnApartment"),
  { ssr: false }
);

export default function Home() {
  return (
    <div>
      <main>
        <HomeHero></HomeHero>
        <AboutSection />
        <ChooseAnApartment></ChooseAnApartment>
        <AdvantagesSection></AdvantagesSection>
        <GallerySection></GallerySection>
        <MapSection />
        <NewsSection />
        <QuestionsFormSection />
        <ContactsSection />
      </main>
    </div>
  );
}
