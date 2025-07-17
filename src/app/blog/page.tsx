"use client";
import dynamic from "next/dynamic";
import BlogHero from "@/components/sections/BlogHero/BlogHero";
import QuestionsFormSection from "@/components/sections/QuestionsFormSection/QuestionsFormSection";

const ContactsSection = dynamic(
  () => import("@/components/sections/ContactsSection/ContactsSection"),
  { ssr: false }
);

export default function BlogPage() {
  return (
    <div>
      <BlogHero />
      <QuestionsFormSection />
      <ContactsSection />
    </div>
  );
}
