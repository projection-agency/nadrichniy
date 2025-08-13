"use client";
import dynamic from "next/dynamic";
import BlogHero from "@/components/sections/BlogHero/BlogHero";

const ContactsSection = dynamic(
  () => import("@/components/sections/ContactsSection/ContactsSection"),
  { ssr: false }
);

const QuestionsFormSection = dynamic(
  () => import("@/components/sections/QuestionsFormSection/QuestionsFormSection"),
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
