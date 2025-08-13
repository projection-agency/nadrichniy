"use client";
import dynamic from "next/dynamic";
import ClientsHero from "@/components/sections/ClientsHero/ClientsHero";
import ProposalsList from "@/components/sections/ProposalsList/ProposalsList";
import FaqSection from "@/components/sections/FaqSection/FaqSection";

const ContactsSection = dynamic(
  () => import("@/components/sections/ContactsSection/ContactsSection"),
  { ssr: false }
);

const QuestionsFormSection = dynamic(
  () => import("@/components/sections/QuestionsFormSection/QuestionsFormSection"),
  { ssr: false }
);

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
