"use client";
import BlogHero from "@/components/sections/BlogHero/BlogHero";
import ContactsSection from "@/components/sections/ContactsSection/ContactsSection";
import QuestionsFormSection from "@/components/sections/QuestionsFormSection/QuestionsFormSection";

export default function BlogPage() {
  return (
    <div>
      <BlogHero />
      <QuestionsFormSection />
      <ContactsSection />
    </div>
  );
}
