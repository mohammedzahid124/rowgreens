"use client";

import { motion, AnimatePresence } from "framer-motion";
import ScrollVelocity from "../components/ui/ScrollVelocity";
import { X } from "lucide-react";
import Link from "next/link";

function MenuItem({ link, onClose }: any) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            type: "spring",
            stiffness: 120,
            damping: 18,
          },
        },
      }}
    >
      <Link
        href={`/#${link.toLowerCase()}`}
        onClick={onClose}
        className="text-[7vw] md:text-[4vw] font-bold text-white tracking-tight hover:opacity-70 transition block"
      >
        {link}
      </Link>
    </motion.div>
  );
}
export default function FullscreenMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] bg-[#166534] flex items-center justify-center overflow-hidden"
        >
            {/* ❌ CLOSE BUTTON */}
<button
  onClick={onClose}
  className="absolute top-6 right-6 z-20"
>
  <X className="w-8 h-8 text-white hover:opacity-70 transition" />
</button>
          {/* 🔁 BACKGROUND SCROLL TEXT */}
          <div
            className="absolute inset-0 flex flex-col justify-center opacity-20"
            style={{ pointerEvents: "none" }}
          >
            <ScrollVelocity
              texts={[
                "ROWGREEN",
                "ROWGREEN",
                "ROWGREEN",
                "ROWGREEN",
                "ROWGREEN",
                "ROWGREEN",
                "ROWGREEN",
                "ROWGREEN",
              ]}
              velocity={120}
              className="text-white font-bold tracking-tighter text-[9vw] leading-[0.8]"
            />
          </div>

          {/* 🎯 MENU LINKS */}
          <motion.div
  initial="hidden"
  animate="visible"
  exit="hidden"
  variants={{
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.8 } },
  }}
  className="relative z-10 grid grid-cols-2 gap-x-32"
>
  {/* LEFT SIDE */}
  <div className="flex flex-col gap-8 items-end text-right">
    {["Home", "Services", "Science"].map((link) => (
      <MenuItem key={link} link={link} onClose={onClose} />
    ))}
  </div>

  {/* RIGHT SIDE */}
  <div className="flex flex-col gap-8 items-start text-left">
    {["Products", "About", "Contact"].map((link) => (
      <MenuItem key={link} link={link} onClose={onClose} />
    ))}
  </div>
</motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
