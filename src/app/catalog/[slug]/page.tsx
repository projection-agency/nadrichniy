import PlanningSection from "@/components/sections/PlanningSection/PlanningSection";
import GallerySection from "@/components/sections/GallerySection/GallerySection";
import MapSection from "@/components/sections/MapSection/MapSection";
import AdvantagesSection from "@/components/sections/AdvantagesSection/AdvantagesSection";
import NewsSection from "@/components/sections/NewsSection/NewsSection";
import QuestionsFormSection from "@/components/sections/QuestionsFormSection/QuestionsFormSection";
import ContactsSection from "@/components/sections/ContactsSection/ContactsSection";
const Page = () => {
  return (
    <div>
      <main>
        <PlanningSection />
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
