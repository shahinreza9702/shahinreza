
import Navbar from "@/components/layout/navbar";
import HeroSection from "@/components/home/hero-section";
import AboutSection from "@/components/home/about-section";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
      </main>
    </>
  );
}
