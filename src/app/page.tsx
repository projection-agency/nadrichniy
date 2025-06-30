"use client";
import HomeHero from "@/components/sections/HomeHero/HomeHero";
import AboutSection from "@/components/sections/AboutSection/AboutSection";
import ChooseAnApartment from "@/components/sections/ChooseAnApartment/ChooseAnApartment";
import AdvantagesSection from "@/components/sections/AdvantagesSection/AdvantagesSection";
import GallerySection from "@/components/sections/GallerySection/GallerySection";
import NewsSection from "@/components/sections/NewsSection/NewsSection";
import dynamic from "next/dynamic";

const MapSection = dynamic(
  () => import("@/components/sections/MapSection/MapSection"),
  { ssr: false }
);
export default function Home() {
  return (
    <div>
      <main>
        <HomeHero></HomeHero>
        <AboutSection></AboutSection>
        <ChooseAnApartment></ChooseAnApartment>
        <AdvantagesSection></AdvantagesSection>
        <GallerySection></GallerySection>
        <MapSection></MapSection>
        <NewsSection />
      </main>
    </div>
  );
}
