"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Leaf, Layers, Droplet, Globe } from "lucide-react";
import Footer from "@/components/Footer"; 
export default function ProductDetailPage({ slug }: { slug: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  // Extremely basic data mapping
  const titles: Record<string, string> = {
    "terra-seed": "Terra Seed",
    "aura-light": "Aura Grow Light",
    "verdant-base": "Verdant Base"
  };

  const title = titles[slug] || "Future Product";
const videos: Record<string, string> = {
  "terra-seed": "/videos/green1.mp4",
  "aura-light": "/videos/green2.mp4",
  "verdant-base": "/videos/green3.mp4",
};

const videoSrc = videos[slug];
  return (
    <main ref={containerRef} className="bg-white min-h-screen">
      
      {/* Hero */}
      <section className="relative h-screen w-full flex items-center justify-center bg-brand-soft overflow-hidden">
        {/* BACKGROUND VIDEO */}
<div className="absolute inset-0 z-0">
  <video
    className="w-full h-full object-cover"
    src={videoSrc}
    autoPlay
    muted
    loop
    playsInline
  />
  <div className="absolute inset-0 bg-black/40" /> {/* overlay */}
</div>
        <Link href="/#products" className="absolute top-8 left-8 z-50 flex items-center space-x-2 text-white/70 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium tracking-wide">Back to Products</span>
        </Link>

        <motion.div 
          className="text-center z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="text-white font-semibold tracking-widest uppercase text-sm mb-4 block">Product Focus</span>
          <h1 className="text-6xl md:text-[8rem] font-bold tracking-tighter text-white mb-6 drop-shadow-2xl capitalize">
            {title}
          </h1>
        </motion.div>
      </section>

      {/* Benefits & Process */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
          
          <div className="space-y-6">
            <h2 className="text-4xl font-bold tracking-tighter text-green-600">Core Benefits</h2>
            <p className="text-lg text-black/60 font-light leading-relaxed">
              Designed from the molecular level up to ensure absolute viability. This product eliminates traditional waste variables by using precise environmental matching, giving you 100% pure organic yield globally.
            </p>
            <ul className="space-y-4 pt-4">
              <li className="flex items-center space-x-4"><Leaf className="text-brand-primary" /> <span className="font-medium text-green-600">Maximum Bio-Availability</span></li>
              <li className="flex items-center space-x-4"><Layers className="text-brand-primary" /> <span className="font-medium text-green-600">Zero Chemical Additives</span></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h2 className="text-4xl font-bold tracking-tighter text-green-600">The Process</h2>
            <p className="text-lg text-black/60 font-light leading-relaxed">
              We extract naturally occurring cycles and compress them into accessible form. Through algorithmic light balancing, closed-loop water arrays, and pure bacteria scaffolding—we force rapid, healthy germination.
            </p>
          </div>

        </div>
      </section>

      {/* Aquaponics in Dubai & Sustainability */}
      <section className="py-32 px-6 bg-brand-soft">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
          
          <div className="space-y-6 order-2 md:order-1">
            <h2 className="text-4xl font-bold tracking-tighter text-green-600">Aquaponics in Dubai</h2>
            <p className="text-lg text-black/60 font-light leading-relaxed">
              In the heart of the desert, water is everything. By implementing our strict aquaponic loops in Dubai, we recycle 95% of all water used. Fish biowaste is transformed immediately into nutrient-rich plant food, building lush green realities in the harshest arid environments.
            </p>
          </div>

          <div className="space-y-6 order-1 md:order-2">
            <h2 className="text-4xl font-bold tracking-tighter text-green-600">Eternal Sustainability</h2>
            <p className="text-lg text-black/60 font-light leading-relaxed">
              True sustainability isn't just a low footprint—it's a positive impact. Our systems actively pull carbon from the air, generate fresh oxygen, and reduce supply chain miles to zero. 
            </p>
            <ul className="space-y-4 pt-4">
              <li className="flex items-center space-x-4"><Droplet className="text-blue-500" /> <span className="font-medium text-black/80">95% Less Water</span></li>
              <li className="flex items-center space-x-4"><Globe className="text-green-500" /> <span className="font-medium text-black/80">Zero Footprint Miles</span></li>
            </ul>
          </div>

        </div>
      </section>
    <Footer />
    </main>
  );
}
