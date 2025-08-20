"use client";
import HomeHero from "@/components/sections/HomeHero/HomeHero";
import dynamic from "next/dynamic";

const AdvantagesSection = dynamic(
  () => import("@/components/sections/AdvantagesSection/AdvantagesSection"),
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

const AboutSection = dynamic(
  () => import("@/components/sections/AboutSection/AboutSection"),
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

const NewsSection = dynamic(
  () =>
    import("@/components/sections/NewsSection/NewsSection"),
  { ssr: false }
);

const GallerySection = dynamic(
  () =>
    import("@/components/sections/GallerySection/GallerySection"),
  { ssr: false }
);

export default function Home() {
  return (
    <div>
      <main>
        <HomeHero></HomeHero>
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
