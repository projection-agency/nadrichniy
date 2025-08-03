"use client";
import AdvantagesSection from "@/components/sections/AdvantagesSection/AdvantagesSection";
import GallerySection from "@/components/sections/GallerySection/GallerySection";
import NewsSection from "@/components/sections/NewsSection/NewsSection";
import QuestionsFormSection from "@/components/sections/QuestionsFormSection/QuestionsFormSection";
import CatalogHero from "@/components/sections/CatalogHero/CatalogHero";
import ApartmentFilterPopup from "@/components/ApartmentFilterPopup/ApartmentFilterPopup";
import dynamic from "next/dynamic";

const ContactsSection = dynamic(
  () => import("@/components/sections/ContactsSection/ContactsSection"),
  { ssr: false }
);

const MapSection = dynamic(
  () => import("@/components/sections/MapSection/MapSection"),
  { ssr: false }
);

const ChooseAnApartment = dynamic(
  () => import("@/components/sections/ChooseAnApartment/ChooseAnApartment"),
  { ssr: false }
);

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
