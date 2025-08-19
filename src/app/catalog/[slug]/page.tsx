"use client";
import PlanningSection from "@/components/sections/PlanningSection/PlanningSection";
import GallerySection from "@/components/sections/GallerySection/GallerySection";
import MapSection from "@/components/sections/MapSection/MapSection";
import NewsSection from "@/components/sections/NewsSection/NewsSection";
import QuestionsFormSection from "@/components/sections/QuestionsFormSection/QuestionsFormSection";
import ContactsSection from "@/components/sections/ContactsSection/ContactsSection";
import dynamic from "next/dynamic";

const AdvantagesSection = dynamic(
  () => import("@/components/sections/AdvantagesSection/AdvantagesSection"),
  { ssr: false }
);


const SimilarPlanningsSection = dynamic(
  () =>
    import(
      "@/components/sections/SimilarPlanningsSection/SimilarPlanningsSection"
    ),
  { ssr: false }
);

const Page = () => {
  return (
    <div>
      <main>
        <PlanningSection />
        <SimilarPlanningsSection />
        <GallerySection />
        <MapSection />
        <AdvantagesSection />
        <NewsSection />
        <QuestionsFormSection />
        <ContactsSection />
      </main>
    </div>
  );
};

export default Page;
