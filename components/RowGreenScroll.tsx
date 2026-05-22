"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";

function GrowRowText() {
  return (
    <div className="relative inline-block text-center">
      {/* TOP LINE */}
      <motion.span
        initial={{ scaleX: 0, opacity: 0.5 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
        className="absolute left-0 top-0 w-full h-[2px] bg-white/70 origin-left"
      />

      {/* TEXT */}
<div className="flex flex-col md:flex-row items-center justify-center text-5xl md:text-8xl font-bold tracking-tight text-white leading-tight text-center">
        {/* LEFT */}
        <motion.span
          initial={{ opacity: 0, x: "0.5em" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Grow
        </motion.span>

        {/* SPACE */}
<span className="hidden md:block mx-3" />
        {/* RIGHT */}
        <motion.span
          initial={{ opacity: 0, x: "-0.5em" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          with RowGreens
        </motion.span>
      </div>

      {/* BOTTOM LINE */}
      <motion.span
        initial={{ scaleX: 0, opacity: 0.5 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="absolute left-0 bottom-0 w-full h-[2px] bg-white/70 origin-left"
      />
    </div>
  );
}

// 🔥 LETTER ANIMATION (anime.js style but cinematic)
function AnimatedText({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div className="flex overflow-hidden">
      {text.split("").map((letter, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            initial={{ y: "120%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              delay: i * 0.06,
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`inline-block text-5xl md:text-7xl font-bold tracking-tight ${className || "text-black"}`}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        </span>
      ))}
    </div>
  );
}

export default function HeroSection() {
  const [showFinal, setShowFinal] = useState(false);

  const curtain = useMotionValue(0);

  // 🎭 Curtain movement
  const leftX = useTransform(curtain, [0, 1], ["0%", "-100%"]);
  const rightX = useTransform(curtain, [0, 1], ["0%", "100%"]);

  // 🎬 Mask reveal
  const maskReveal = useTransform(
    curtain,
    [0.1, 0.8],
    ["inset(0 50% 0 50%)", "inset(0% 0% 0% 0%)"]
  );

  const opacity = useTransform(curtain, [0.1, 0.6], [0, 1]);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const hasTriggered = useRef(false);

  const trigger = () => {
    if (hasTriggered.current) return;
    hasTriggered.current = true;

    animate(curtain, 1, {
      duration: 8, // ⏳ slower = cinematic
      ease: [0.16, 1, 0.3, 1],
      onComplete: () => {
        setTimeout(() => setShowFinal(true), 800);
      },
    });
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered.current) {
          trigger();
          obs.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="snap-section relative h-screen w-full overflow-hidden bg-white"
    >
      {/* 🎬 TEXT */}
      {!showFinal && (
        <motion.div
          style={{
            clipPath: maskReveal,
            opacity,
          }}
          className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 text-center"
        >
          {/* MAIN */}
          <div className="flex flex-wrap justify-center">
            <AnimatedText text="Where " />
            <AnimatedText text="Green" className="text-[#166534]" />
            <AnimatedText text=" Begins" />
          </div>

          {/* SUB */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-6 text-lg md:text-xl text-black/60 tracking-wide max-w-xl"
          >
            Precision-grown ecosystems for a sustainable future
          </motion.p>
        </motion.div>
      )}

      {/* 🎭 CURTAIN */}
      {!showFinal && (
        <>
          <motion.div
            style={{ x: leftX }}
            className="absolute top-0 left-0 w-1/2 h-full bg-[#166534] z-20"
          />
          <motion.div
            style={{ x: rightX }}
            className="absolute top-0 right-0 w-1/2 h-full bg-[#166534] z-20"
          />
        </>
      )}

      {/* 🎥 FINAL */}
      {showFinal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          {/* WHITE BASE (optional fallback) */}
          <div className="absolute inset-0 bg-white z-0" />

          {/* VIDEO */}
          <video
            className="absolute inset-0 w-full h-full object-cover z-0"
            src="/videos/green2.mp4"
            autoPlay
            muted
            loop
            playsInline
          />

          {/* OVERLAY (very important for visibility) */}
          <div className="absolute inset-0 bg-black/30 z-10" />


          {/* TEXT */}
          <div className="absolute inset-0 flex items-center justify-center text-center z-10 px-6">
            <div>

              <GrowRowText />
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}