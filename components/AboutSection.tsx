"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  AnimatePresence,
} from "framer-motion";

const WORDS = ["Grow", "Sustain", "Nourish", "Evolve"];

function AnimatedWord({ word }: { word: string }) {
  const letters = word.split("");

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.05, // enter left → right
          },
        },
        exit: {
          transition: {
            staggerChildren: 0.05,
            staggerDirection: -1, // exit right → left
          },
        },
      }}
      style={{
        position: "absolute",
        display: "flex",
        gap: "0.05em",
      }}
    >
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { y: 100, opacity: 0 },
            visible: { y: 0, opacity: 1 },
            exit: { y: -100, opacity: 0 },
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
          style={{
            display: "inline-block",
            fontSize: "clamp(5rem, 14vw, 10rem)", // BIG STATEMENT
            fontWeight: 800,
            color: "#166534",
            letterSpacing: "-0.04em",
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
}
function TypewriterText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;

      if (i === text.length) clearInterval(interval);
    }, 60); // adjust speed here

    return () => clearInterval(interval);
  }, [text]);

  return (
    <h2
      style={{
        fontSize: "3.2rem",
        fontWeight: 600,
        color: "#111",
        lineHeight: 1.2,
        maxWidth: "520px",
      }}
    >
      {displayed}
      <span
        style={{
          marginLeft: "4px",
          animation: "blink 1s infinite",
        }}
      >
        |
      </span>

      {/* blinking cursor */}
      <style jsx>{`
        @keyframes blink {
          0%, 50%, 100% { opacity: 1; }
          25%, 75% { opacity: 0; }
        }
      `}</style>
    </h2>
  );
}
export default function AboutSection() {
  const [currentWord, setCurrentWord] = useState(0);
  const [showFinal, setShowFinal] = useState(false);

  const curtain = useMotionValue(0);

  const topY = useTransform(curtain, [0, 1], ["0%", "-100%"]);
  const bottomY = useTransform(curtain, [0, 1], ["0%", "100%"]);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const hasTriggered = useRef(false);

  const trigger = () => {
    if (hasTriggered.current) return;
    hasTriggered.current = true;

    // 🎭 CURTAIN animation (independent)
    animate(curtain, 1, {
      duration: 20,
      ease: [0.2, 0.8, 0.2, 1],
    });

    // 🧠 WORD SEQUENCE CONTROL (separate timeline)
    let index = 0;

    const runSequence = () => {
      setCurrentWord(index);

      index++;

      if (index >= WORDS.length) {
        // after last word → go to final
        setTimeout(() => setShowFinal(true), 1200);
        return;
      }

      setTimeout(runSequence, 2000); // ⏱ controls readability
    };

    runSequence();
  };

  // Scroll trigger
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
      className="snap-section"
      style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        background: "#ffffff",
      }}
    >
      {/* WORDS (ONLY ONE AT A TIME) */}
      {!showFinal && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AnimatePresence mode="wait">
            <AnimatedWord key={currentWord} word={WORDS[currentWord]} />
          </AnimatePresence>
        </div>
      )}

      {/* CURTAIN */}
      {!showFinal && (
        <>
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "50%",
              background: "#166534",
              zIndex: 20,
              y: topY,
            }}
          />
          <motion.div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "50%",
              background: "#166534",
              zIndex: 20,
              y: bottomY,
            }}
          />
        </>
      )}

      {/* FINAL STATE */}
      {/* FINAL STATE */}
      {showFinal && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "4rem",
          }}
        >
          {/* LEFT → TYPEWRITER TEXT */}
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
            }}
          >
            <TypewriterText text="We grow possibilities." />
          </div>

          {/* RIGHT → IMAGE */}
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <img
              src="/about-section.png" // ✅ your image
              alt="About"
              style={{
                height: "85%",
                width: "auto",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
}