"use client";
import HomeHero from "@/components/sections/HomeHero/HomeHero";
import AdvantagesSection from "@/components/sections/AdvantagesSection/AdvantagesSection";
import ContactsSection from "@/components/sections/ContactsSection/ContactsSection";
import MapSection from "@/components/sections/MapSection/MapSection";
import AboutSection from "@/components/sections/AboutSection/AboutSection";
import ChooseAnApartment from "@/components/sections/ChooseAnApartment/ChooseAnApartment";
import QuestionsFormSection from "@/components/sections/QuestionsFormSection/QuestionsFormSection";
import NewsSection from "@/components/sections/NewsSection/NewsSection";
import GallerySection from "@/components/sections/GallerySection/GallerySection";

export default function Home() {
  return (
    <div>
      <main>
        <HomeHero />
        <AboutSection />
        <ChooseAnApartment />
        <AdvantagesSection />
        <GallerySection />
        <MapSection />
        <NewsSection />
        <QuestionsFormSection />
        <ContactsSection />
      </main>
    </div>
  );
}
