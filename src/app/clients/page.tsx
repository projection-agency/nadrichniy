"use client";
import ClientsHero from "@/components/sections/ClientsHero/ClientsHero";
import ContactsSection from "@/components/sections/ContactsSection/ContactsSection";
import QuestionsFormSection from "@/components/sections/QuestionsFormSection/QuestionsFormSection";
import FaqSection from "@/components/sections/FaqSection/FaqSection";
import ProposalsList from "@/components/sections/ProposalsList/ProposalsList";

export default function ClientsPage() {
  return (
    <div>
      <ClientsHero />
      <ProposalsList />
      <FaqSection />
      <QuestionsFormSection />
      <ContactsSection />
    </div>
  );
}
