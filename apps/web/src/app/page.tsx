
import Navbar from "@/components/layout/navbar";
import HeroSection from "@/components/home/hero-section";
import AboutSection from "@/components/home/about-section";
import SkillsSection from "@/components/home/skills-section";
import ProjectsSection from "@/components/home/projects-section";
import ExperienceSection from "@/components/home/experience-section";
import BlogSection from "@/components/home/blog-section";
import ContactSection from "@/components/home/contact-section";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <BlogSection />
        <ContactSection />
      </main>
    </>
  );
}
