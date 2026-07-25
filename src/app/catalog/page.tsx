"use client";
import CatalogHero from "@/components/sections/CatalogHero/CatalogHero";
import AdvantagesSection from "@/components/sections/AdvantagesSection/AdvantagesSection";
import NewsSection from "@/components/sections/NewsSection/NewsSection";
import GallerySection from "@/components/sections/GallerySection/GallerySection";
import ContactsSection from "@/components/sections/ContactsSection/ContactsSection";
import MapSection from "@/components/sections/MapSection/MapSection";
import ChooseAnApartment from "@/components/sections/ChooseAnApartment/ChooseAnApartment";
import QuestionsFormSection from "@/components/sections/QuestionsFormSection/QuestionsFormSection";

export default function CatalogPage() {
  return (
    <div>
      <main>
        <CatalogHero />
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
