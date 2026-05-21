"use client";

import ScrollVelocity from "../components/ui/ScrollVelocity";
import CircularText from "../components/ui/CircularText";

export default function Footer() {
  return (
    <footer className="relative min-h-screen w-full bg-[#166534] overflow-hidden flex items-center justify-center">

      {/* 🔁 BIG SCROLLING TEXT */}
      <div className="absolute inset-0 flex flex-col justify-center z-0 opacity-20">
        <ScrollVelocity
          texts={[
            "ROWGREEN",
            "ROWGREEN",
            "ROWGREEN"
          ]}
          velocity={120}
          className="text-white font-bold tracking-tighter text-[20vw]"
        />
      </div>

      {/* 🎯 CENTER CIRCLE CTA */}
      <div className="relative z-10 flex flex-col items-center justify-center">

        <div className="relative flex items-center justify-center">

          {/* Circular rotating text */}
          <CircularText
            text="LET’S GROW • SAY HELLO • "
            spinDuration={18}
            onHover="slowDown"
            className="text-white"
          />

          {/* Center button */}
          <div className="absolute w-24 h-24 rounded-full bg-white flex items-center justify-center">
            <span className="text-[#166534] text-xl">↗</span>
          </div>

        </div>

      </div>

      {/* TOP BAR (like your reference) */}
      <div className="absolute top-0 left-0 w-full flex justify-between px-6 py-6 text-white/70 text-sm z-20">

        <span>HAVE A PROJECT IN MIND?</span>

        <div className="flex gap-10">
          <span>INSTAGRAM</span>
          <span>LINKEDIN</span>
        </div>

        <span>BACK TO TOP ↑</span>
      </div>

    </footer>
  );
}