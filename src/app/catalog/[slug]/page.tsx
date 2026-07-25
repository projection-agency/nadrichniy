"use client";
import PlanningSection from "@/components/sections/PlanningSection/PlanningSection";
import GallerySection from "@/components/sections/GallerySection/GallerySection";
import MapSection from "@/components/sections/MapSection/MapSection";
import NewsSection from "@/components/sections/NewsSection/NewsSection";
import QuestionsFormSection from "@/components/sections/QuestionsFormSection/QuestionsFormSection";
import ContactsSection from "@/components/sections/ContactsSection/ContactsSection";
import AdvantagesSection from "@/components/sections/AdvantagesSection/AdvantagesSection";
import SimilarPlanningsSection from "@/components/sections/SimilarPlanningsSection/SimilarPlanningsSection";

export default function CatalogSlugPage() {
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
}
