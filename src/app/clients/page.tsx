"use client";
import dynamic from "next/dynamic";
import ClientsHero from "@/components/sections/ClientsHero/ClientsHero";

const ContactsSection = dynamic(
  () => import("@/components/sections/ContactsSection/ContactsSection"),
  { ssr: false }
);

const QuestionsFormSection = dynamic(
  () =>
    import("@/components/sections/QuestionsFormSection/QuestionsFormSection"),
  { ssr: false }
);

const FaqSection = dynamic(
  () => import("@/components/sections/FaqSection/FaqSection"),
  { ssr: false }
);

const ProposalsList = dynamic(
  () => import("@/components/sections/ProposalsList/ProposalsList"),
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
