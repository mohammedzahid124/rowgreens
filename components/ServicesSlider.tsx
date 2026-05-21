"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

// Placeholder images using Unsplash for the high-end Apple style look
const slides = [
  {
    id: 0,
    title: "Smart Hydroponics",
    description: "Fully automated, precise nutrient delivery systems that utilize 90% less water while accelerating root mass generation. It's not farming, it's organic engineering.",
    image: "/smart-hydroponics.png",
    cta: "Explore Systems"
  },
  {
    id: 1,
    title: "Living Architecture",
    description: "Seamlessly integrate breathing, vibrant ecosystems directly into the structural aesthetic of modern living spaces.",
    image: "/living-architecture.jpg",
    cta: "View Designs"
  },
  {
    id: 2,
    title: "Bio-Active Soils",
    description: "Engineered substratum packed with beneficial microbes to create a micro-biome identical to untamed forest floors.",
    image: "/bio-active-soil.jpg",
    cta: "Discover Soils"
  }
];

export default function ServicesSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % slides.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <section id="services" className="relative h-screen w-full bg-black overflow-hidden flex items-center snap-section">

      {/* 1. FULLSCREEN BACKGROUND IMAGE */}
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={slides[currentIndex].image}
          alt={slides[currentIndex].title}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      </AnimatePresence>




      {/* 3. LEFT SIDE: Content Container */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:pl-20 md:pr-12 relative z-20 pb-20 md:pb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6"
          >
            <span className="text-sm tracking-widest uppercase font-semibold text-brand-accent drop-shadow-md">
              Our Services
            </span>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white drop-shadow-xl leading-[1.1]">
              {slides[currentIndex].title}
            </h2>
            <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed max-w-md drop-shadow-md">
              {slides[currentIndex].description}
            </p>
            <button className="flex items-center space-x-2 border-b border-white/40 pb-1 hover:border-brand-accent transition-colors group pt-4">
              <span className="text-sm font-semibold tracking-wide uppercase text-white group-hover:text-brand-accent transition-colors">
                {slides[currentIndex].cta}
              </span>
              <ArrowUpRight className="w-4 h-4 text-white group-hover:text-brand-accent transition-colors group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 4. BOTTOM RIGHT: Thumbnails Strip */}
      <div className="absolute bottom-8 right-4 md:right-8 flex space-x-4 z-30 overflow-x-auto p-4 mask-edge-fade">
        {slides.map((slide, i) => (
          <motion.div
            key={slide.id}
            onClick={() => setCurrentIndex(i)}
            className={`relative w-24 h-32 md:w-32 md:h-40 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 flex-shrink-0 border border-white/10 ${i === currentIndex ? "ring-2 ring-white shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-100" : "opacity-60 scale-95 hover:opacity-100"
              }`}
          >
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
            {i !== currentIndex && (
              <div className="absolute inset-0 bg-black/40" />
            )}
          </motion.div>
        ))}
      </div>

      {/* 5. BOTTOM LEFT/CENTER: Navigation Arrows */}
      <div className="absolute bottom-8 left-8 md:left-20 flex space-x-6 z-30">
        <button
          onClick={handlePrev}
          className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={handleNext}
          className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors"
        >
          <ArrowRight className="w-6 h-6 text-white" />
        </button>
      </div>

    </section>
  );
}
