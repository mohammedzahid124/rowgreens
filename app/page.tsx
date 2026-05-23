import Navbar from "@/components/Navbar";
import RowGreenScroll from "@/components/RowGreenScroll";
import ServicesSlider from "@/components/ServicesSlider";
import ScienceSection from "@/components/ScienceSection";
import ProductsSection from "@/components/ProductsSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="h-screen w-full overflow-y-scroll snap-y snap-mandatory">
      {/* 0. Top Navigation */}
      <Navbar />

<div className="snap-start">
  <RowGreenScroll />
</div>

<div className="snap-start">
  <ServicesSlider />
</div>

<div className="snap-start">
  <ScienceSection />
</div>

<div className="snap-start">
  <ProductsSection />
</div>

<div className="snap-start">
  <AboutSection />
</div>

<div className="snap-start">
  <Footer />
</div>
    </main>
  );
}
