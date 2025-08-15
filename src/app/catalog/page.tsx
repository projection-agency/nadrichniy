"use client";
import AdvantagesSection from "@/components/sections/AdvantagesSection/AdvantagesSection";
import CatalogHero from "@/components/sections/CatalogHero/CatalogHero";
import ApartmentFilterPopup from "@/components/ApartmentFilterPopup/ApartmentFilterPopup";
import dynamic from "next/dynamic";

const NewsSection = dynamic(
  () => import("@/components/sections/NewsSection/NewsSection"),
  { ssr: false }
);

const GallerySection = dynamic(
  () => import("@/components/sections/GallerySection/GallerySection"),
  { ssr: false }
);

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

const QuestionsFormSection = dynamic(
  () =>
    import("@/components/sections/QuestionsFormSection/QuestionsFormSection"),
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
