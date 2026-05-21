"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SCIENCE_CONCEPTS = [
  {
    id: 0,
    title: "pH Balance",
    description: "Self-correcting micro-biomes maintain the perfect 6.0-6.5 pH window, ensuring maximum nutrient availability without chemical buffers.",
    theme: {
      bg: "#e0f2fe",
      accent: "#0284c7",
      gradient: "linear-gradient(to bottom right, #f0f9ff, #bae6fd)"
    }
  },
  {
    id: 1,
    title: "Dissolved Oxygen",
    description: "Hyper-aeration zones create micro-bubbles, elevating DO levels to hyper-saturate root zones and prevent decay.",
    theme: {
      bg: "#ecfdf5",
      accent: "#059669",
      gradient: "linear-gradient(to bottom right, #f2fbf5, #a7f3d0)"
    }
  },
  {
    id: 2,
    title: "Beneficial Bacteria",
    description: "A synthesized layer of Nitrosomonas and Nitrobacter species act as the living engine of our bio-active soil arrays.",
    theme: {
      bg: "#fffbeb",
      accent: "#d97706",
      gradient: "linear-gradient(to bottom right, #fefce8, #fde68a)"
    }
  },
  {
    id: 3,
    title: "Nutrient Cycle",
    description: "Complete elemental breakdown loops driven by nature to unlock complex organic compounds perfectly.",
    theme: {
      bg: "#f4f4f5",
      accent: "#52525b",
      gradient: "linear-gradient(to bottom right, #fafafa, #e4e4e7)"
    }
  },
  {
    id: 4,
    title: "Water Flow Systems",
    description: "Biomimetic capillary structures mirror natural aquifers, efficiently cycling water upward against gravity.",
    theme: {
      bg: "#eff6ff",
      accent: "#2563eb",
      gradient: "linear-gradient(to bottom right, #f8fafc, #bfdbfe)"
    }
  },
  {
    id: 5,
    title: "Root Oxygenation",
    description: "Suspended misting matrices ensure root tips are constantly coated in nutrient-dense moisture without suffocating.",
    theme: {
      bg: "#fce7f3",
      accent: "#db2777",
      gradient: "linear-gradient(to bottom right, #fdf2f8, #fbcfe8)"
    }
  }
];

export default function ScienceSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SCIENCE_CONCEPTS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const activeItem = SCIENCE_CONCEPTS[activeIndex];

  return (
    <motion.section
      id="science"
      animate={{ backgroundColor: activeItem.theme.bg }}
      transition={{ duration: 1.2 }}
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden snap-section"
    >
      {/* Background Gradient Morph */}
      <motion.div
        className="absolute inset-0 z-0 opacity-40 mix-blend-multiply"
        animate={{ background: activeItem.theme.gradient }}
        transition={{ duration: 1.2 }}
      />

      {/* Circular Visual Element */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="relative w-64 h-64"
        >
          <svg
            className="w-full h-full"
            viewBox="0 0 200 200"
            style={{ filter: `drop-shadow(0 0 20px ${activeItem.theme.accent})` }}
          >
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke={activeItem.theme.accent}
              strokeWidth="2"
              opacity="0.3"
            />
            <circle
              cx="100"
              cy="100"
              r="60"
              fill="none"
              stroke={activeItem.theme.accent}
              strokeWidth="1.5"
              opacity="0.2"
            />
            <motion.circle
              cx="100"
              cy="100"
              r="40"
              fill="none"
              stroke={activeItem.theme.accent}
              strokeWidth="2"
              animate={{ strokeDasharray: [0, 251] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
          </svg>
        </motion.div>
      </div>

      {/* Top Text Context */}
      <div className="relative z-30 flex flex-col items-center px-6 text-center w-full max-w-3xl">
        <span className="text-sm tracking-widest font-semibold uppercase text-brand-primary mb-8 block">
          Living Mechanics
        </span>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.6 }}
            className="w-full flex flex-col items-center"
          >
            <motion.h2
              className="text-5xl md:text-7xl font-bold tracking-tighter mb-4"
              animate={{ color: activeItem.theme.accent }}
              transition={{ duration: 1.2 }}
            >
              {activeItem.title}
            </motion.h2>
            <p className="text-lg md:text-xl text-black/70 font-light leading-relaxed max-w-2xl">
              {activeItem.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Concept dots */}
      <div className="relative z-30 flex gap-2 mt-12 justify-center flex-wrap px-4">
        {SCIENCE_CONCEPTS.map((item, index) => (
          <button
            key={item.id}
            onClick={() => setActiveIndex(index)}
            className="transition-all duration-300"
            aria-label={`View ${item.title}`}
          >
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width: index === activeIndex ? "12px" : "8px",
                height: index === activeIndex ? "12px" : "8px",
                background: index === activeIndex ? activeItem.theme.accent : "rgba(0,0,0,0.2)",
                boxShadow: index === activeIndex ? `0 0 12px ${activeItem.theme.accent}` : "none",
              }}
            />
          </button>
        ))}
      </div>
    </motion.section>
  );
}