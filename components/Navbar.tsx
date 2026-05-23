"use client";
import FullscreenMenu from "@/components/FullscreenMenu";
import React, { useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import Link from "next/link";
import Image from "next/image"; // <-- add this
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solidBackground, setSolidBackground] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }

    if (latest > 50) {
      setSolidBackground(true);
    } else {
      setSolidBackground(false);
    }
  });

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 inset-x-0 z-50 transition-colors duration-500 flex items-center justify-between px-6 py-4 md:px-12 md:py-6 bg-transparent"
      >
        {/* LOGO */}
        <div className="flex items-center">
  <Link href="/" className="flex items-center gap-0">
    <Image
  src="/log.png"
  alt="RowGreens Logo"
  width={120}
  height={120}
  priority
  className="w-14 md:w-28 h-auto object-contain -mt-3"
/>

    <h1 className="text-lg md:text-3xl font-bold leading-none">
      <span className="text-white">
        Row
      </span>

      <span className="text-green-600 ">
        Greens
      </span>
    </h1>
  </Link>
</div>

        {/* Universal Menu Toggle */}
        <div className="z-70">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? (
              <X className="w-8 h-8 text-white drop-shadow-md hover:opacity-80 transition-opacity" />
            ) : (
              <Menu className="w-8 h-8 text-white drop-shadow-md hover:opacity-80 transition-opacity" />
            )}
          </button>
        </div>
      </motion.nav>
            <FullscreenMenu
  open={mobileMenuOpen}
  onClose={() => setMobileMenuOpen(false)}
/>
      {/* Floating Fluid Mobile Dropdown */}
      
    </>
  );
}