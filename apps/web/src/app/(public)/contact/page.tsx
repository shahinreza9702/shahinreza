
import type { Metadata } from "next";
import ContactSection from "@/components/home/contact-section";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Shahin Reza for web development projects, collaborations, and professional opportunities.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <ContactSection />
    </main>
  );
}
