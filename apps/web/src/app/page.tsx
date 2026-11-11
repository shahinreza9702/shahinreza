
import Navbar from "@/components/layout/navbar";
import HeroSection from "@/components/home/hero-section";
import AboutSection from "@/components/home/about-section";
import SkillsSection from "@/components/home/skills-section";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
      </main>
    </>
  );
}
