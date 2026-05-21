"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solidBackground, setSolidBackground] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    // Hide navbar smoothly on scroll down, show on scroll up
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

        {/* LOGO PLACEHOLDER (do not style, just reserve space) */}
        <div className="flex items-center">
          <div
            style={{ width: 48, height: 48, background: "transparent" }}
            aria-label="Logo Placeholder"
          />
          <Link href="/">
            <span className="text-xl font-bold tracking-tighter text-white drop-shadow-md cursor-pointer hover:opacity-80 transition-opacity ml-2">
              RowGreen.
            </span>
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

      {/* Floating Fluid Mobile Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed top-24 right-6 md:right-12 z-60 flex flex-col items-end space-y-6 pointer-events-auto"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
              hidden: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
            }}
          >
            {["Home", "Science", "Products", "About"].map((link) => (
              <motion.div
                key={link}
                variants={{
                  hidden: { opacity: 0, y: -20, scale: 0.9 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 20 } }
                }}
              >
                <Link href={`#${link.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)}>
                  <span className="text-4xl font-bold tracking-tighter text-white drop-shadow-lg hover:opacity-80 transition-opacity cursor-pointer">
                    {link}
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
