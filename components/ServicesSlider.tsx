"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

const slides = [
  {
    id: 0,
    title: "Aquaponics Systems",
    description:
      "Integrated aquaponics ecosystems that combine fish cultivation with soil-free farming, creating a self-sustaining cycle of nutrient-rich water and organic crop production.",
    image: "/smart-hydroponics.png",
  },

  {
    id: 1,
    title: "Construction & Consultancy",
    description:
      "End-to-end eco farm planning, greenhouse construction, hydroponic infrastructure setup, and sustainable agricultural consultancy tailored for modern living and commercial-scale operations.",
    image: "/cc.png",
  },
 
  


  {
    id: 2,
    title: "Backyard Family Farms",
    description:
      "Compact, sustainable backyard farming solutions designed for families seeking fresh vegetables, herbs, and year-round food production directly from their homes.",
    image: "/living-architecture.jpg",
  },

  {
    id: 3,
    title: "Organic Living",
    description:
      "Promoting healthier lifestyles through chemical-free cultivation, natural ecosystems, and environmentally responsible farming practices for modern sustainable living.",
    image: "/bio-active-soil.jpg",
  },

  {
    id: 4,
    title: "Food Security",
    description:
      "Future-focused agricultural systems designed to ensure reliable, local, and sustainable food production for families, communities, and businesses.",
    image: "/fs.png",
  },

  {
    id: 5,
    title: "Fish Farming",
    description:
      "Advanced fish farming and aquaculture solutions optimized for healthy aquatic ecosystems, efficient growth cycles, and sustainable protein production.",
    image: "/fish.jpg",
  },

  {
    id: 6,
    title: "Commercial Farms",
    description:
      "Large-scale commercial farming infrastructure integrating hydroponics, aquaponics, automation, and sustainable agricultural technologies for maximum productivity.",
    image: "/commercial.jpg",
   
  },
];


export default function ServicesSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleNext = () =>
    setCurrentIndex((prev) => (prev + 1) % slides.length);

  const handlePrev = () =>
    setCurrentIndex((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );

  return (
    <section
      id="services"
      className="relative h-screen w-full bg-black overflow-hidden flex items-center snap-section"
    >
      {/* Background Image */}
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

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Content Section */}
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
            {/* Section Label */}
            <span className="text-base md:text-lg tracking-[0.3em] uppercase font-semibold text-white drop-shadow-md -mb-3 block -translate-y-4">
              Our Services
            </span>

            {/* Heading */}
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-green-600 drop-shadow-[0_0_20px_rgba(22,101,52,0.5)] leading-[1.1]">
              {slides[currentIndex].title}
            </h2>

            {/* Description */}
<p className="text-lg md:text-xl text-white font-medium leading-relaxed max-w-md drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]  p-4 rounded-xl border border-white/10">              {slides[currentIndex].description}
            </p>

           
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnail Strip */}
      <div className="absolute bottom-8 right-4 md:right-8 flex space-x-4 z-30 overflow-x-auto p-4 mask-edge-fade">
        {slides.map((slide, i) => (
          <motion.div
            key={slide.id}
            onClick={() => setCurrentIndex(i)}
            className={`relative w-24 h-32 md:w-32 md:h-40 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 flex-shrink-0 border border-white/20 backdrop-blur-xl bg-white/10 ${
              i === currentIndex
                ? "ring-2 ring-white shadow-[0_0_25px_rgba(255,255,255,0.35)] scale-100"
                : "opacity-70 scale-95 hover:opacity-100"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />

            {i !== currentIndex && (
              <div className="absolute inset-0 bg-black/40" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Navigation Arrows - Hidden on Mobile */}
      <div className="hidden md:flex absolute bottom-8 left-8 md:left-20 space-x-6 z-30">
        <button
          onClick={handlePrev}
          className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>

        <button
          onClick={handleNext}
          className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg"
        >
          <ArrowRight className="w-6 h-6 text-white" />
        </button>
      </div>
    </section>
  );
}