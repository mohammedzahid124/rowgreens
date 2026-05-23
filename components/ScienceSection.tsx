"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ITEMS = [
  {
    title: "pH Balance",
    description:
      "Self-correcting micro-biomes maintain the perfect 6.0–6.5 pH window for optimal nutrient absorption.",
       color: "#0ea5e9",
        bg: "linear-gradient(180deg, #e0f2fe 0%, #f0fdf4 100%)",
    image: "/ph-balance.jpg",
  },
  {
    title: "Dissolved Oxygen",
    description:
      "Hyper-aeration zones create micro-bubbles that sustain elevated oxygen levels throughout the system.",
      color: "#10b981",
      bg: "linear-gradient(180deg, #ecfdf5 0%, #f0fdf4 100%)",
    image: "/dissolved-oxygen.png",
  },
  {
    title: "Beneficial Bacteria",
    description:
      "Living microbial layers drive the entire bio-active nitrogen cycle inside every unit.",
       color: "#f59e0b",
       bg: "linear-gradient(180deg, #fffbeb 0%, #fefce8 100%)",
    image: "/goodbacteria.jpg",
  },
  {
    title: "Nutrient Cycle",
    description:
      "Organic breakdown loops unlock macro and micro nutrients naturally — zero synthetic inputs.",
      color: "#8b5cf6",
      bg: "linear-gradient(180deg, #f5f3ff 0%, #faf5ff 100%)",
    image: "/nitrogen.png",
  },
  {
    title: "Water Flow",
    description:
      "Biomimetic circulation structures move water exactly as natural aquifers do — silently and efficiently.",
      color: "#3b82f6",
      bg: "linear-gradient(180deg, #eff6ff 0%, #f0fdf4 100%)",
    image: "/waterflow-system.png",
  },
  {
    title: "Root Oxygenation",
    description:
      "Precision mist systems keep roots in a perfect oxygen-rich zone without waterlogging.",
      color: "#ef4444",
       bg: "linear-gradient(180deg, #fef2f2 0%, #fff7ed 100%)",
    image: "/root-oxygenation.png",
  },
];

export default function ScienceSection() {
  const [active, setActive] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const total = ITEMS.length;
  const item = ITEMS[active];

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % total);
    }, 4000);
  }, [total]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const next = () => {
    setActive((prev) => (prev + 1) % total);
    resetTimer();
  };

  const prev = () => {
    setActive((prev) => (prev - 1 + total) % total);
    resetTimer();
  };

  return (
    <motion.section
      id="science"
      className="w-full h-screen flex flex-col items-center justify-between px-6 py-10 relative overflow-hidden"
      animate={{ background: item.bg }}
      transition={{ duration: 0.6 }}
    >
      {/* ── TEXT ── */}
      <div className="text-center max-w-2xl mt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={active + "-text"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-bold tracking-[0.3em] uppercase mb-3 text-green-600">
              The Science
            </span>

            <h2
  className="text-4xl md:text-6xl font-bold mb-4"
  style={{ color: item.color }}
>
              {item.title}
            </h2>

            <p
  className="text-base md:text-lg opacity-80"
  style={{ color: item.color }}
>
              {item.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

{/* ── CENTER IMAGE WITH 70% CIRCLE ── */}
<div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full flex justify-center overflow-hidden">

  {/* Wrapper controls how much circle is visible */}
  <div
    className="relative"
    style={{
      width: 900,
      height: 900, // controls visible portion (~70%)
      overflow: "hidden",
    }}
  >

    {/* Circle container (pushed DOWN) */}
    <div
      className="absolute left-1/2 -translate-x-1/2 rounded-full"
      style={{
        width: 800,
        height: 750,
        bottom: -280, // 👈 THIS creates the 60% cut effect
      }}
    >

      {/* OUTER RING */}
      <div className="absolute inset-0 rounded-full border style={{
  border: `1px solid ${item.color}33`
}} opacity-40" />

      {/* INNER RING (tight gap) */}
      <div className="absolute inset-[8px] rounded-full border style={{
  border: `1px solid ${item.color}66`
}} opacity-60" />

      {/* IMAGE */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          className="absolute inset-[16px] rounded-full overflow-hidden border-4 border-white shadow-2xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />

          {/* Glow */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              boxShadow: "0 0 80px boxShadow: `0 0 80px ${item.color}44`",
            }}
          />
        </motion.div>
      </AnimatePresence>

    </div>
  </div>
</div>

      {/* ── SIDE ARROWS ── */}
      <div className="absolute inset-0 flex items-center justify-between px-6 pointer-events-none">
        <button
  onClick={prev}
  className="pointer-events-auto w-12 h-12 rounded-full text-white flex items-center justify-center hover:scale-110 transition"
  style={{ backgroundColor: item.color }}
>
          ←
        </button>

        <button
  onClick={prev}
  className="pointer-events-auto w-12 h-12 rounded-full text-white flex items-center justify-center hover:scale-110 transition"
  style={{ backgroundColor: item.color }}
>
          →
        </button>
      </div>
    </motion.section>
  );
}