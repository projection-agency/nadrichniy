import ClientsHero from "@/components/sections/ClientsHero/ClientsHero";
import ProposalsList from "@/components/sections/ProposalsList/ProposalsList";
import FaqSection from "@/components/sections/FaqSection/FaqSection";
export default function ClientsPage() {
  return (
    <div>
      <ClientsHero />
      <ProposalsList />
      {/* <FaqSection /> */}
    </div>
  );
}
