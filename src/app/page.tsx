import HomeHero from "@/components/sections/HomeHero/HomeHero";
import AboutSection from "@/components/sections/AboutSection/AboutSection";
import ChooseAnApartment from "@/components/sections/ChooseAnApartment/ChooseAnApartment";
import AdvantagesSection from "@/components/sections/AdvantagesSection/AdvantagesSection";
import GallerySection from "@/components/sections/GallerySection/GallerySection";
export default function Home() {
  return (
    <div>
      <main>
        <HomeHero></HomeHero>
        <AboutSection></AboutSection>
        <ChooseAnApartment></ChooseAnApartment>
        <AdvantagesSection></AdvantagesSection>
        <GallerySection></GallerySection>
      </main>
    </div>
  );
}
