import Navbar from "@/components/Navbar";
import RowGreenScroll from "@/components/RowGreenScroll";
import ServicesSlider from "@/components/ServicesSlider";
import ScienceSection from "@/components/ScienceSection";
import ProductsSection from "@/components/ProductsSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-white selection:bg-brand-soft selection:text-brand-primary">
      {/* 0. Top Navigation */}
      <Navbar />

      {/* 1. The Scroll Narrative Canvas Block */}
      <RowGreenScroll />

      {/* 2. Structured Premium Slider */}
      <ServicesSlider />

      {/* 3. The Science of Biomimicry (Semicircle) */}
      <ScienceSection />

      {/* 4. Fullscreen Video Product Stack */}
      <ProductsSection />

      {/* 5. The Story Context (Emotional) */}
      <AboutSection />

      {/* 6. Memorable Storytelling Ending */}
      <Footer />
    </main>
  );
}
