import HomeHero from "@/components/sections/HomeHero/HomeHero";
import AboutSection from "@/components/sections/AboutSection/AboutSection";
import ChooseAnApartment from "@/components/sections/ChooseAnApartment/ChooseAnApartment";
export default function Home() {
  return (
    <div>
      <main>
        <HomeHero></HomeHero>
        <AboutSection></AboutSection>
        <ChooseAnApartment></ChooseAnApartment>
      </main>
    </div>
  );
}
