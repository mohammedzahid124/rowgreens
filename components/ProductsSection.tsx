"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const PRODUCTS = [
 {
id: "terra-seed",
slug: "terra-seed",
video: "/videos/green1.mp4",
headline: "Pure Green Energy.",
subtitle: "Grown autonomously using precision aquaponics.",
 },
 {
id: "aura-light",
slug: "aura-light",
video: "/videos/green2.mp4",
headline: "Refreshing Mint.",
subtitle: "Harvested at peak molecular bio-rhythm.",
 },
 {
id: "verdant-base",
slug: "verdant-base",
video: "/videos/green3.mp4",
headline: "Crisp. Clean. Alive.",
subtitle: "Absolute architectural integration.",
 }
];

function ProductBlock({ product }: { product: typeof PRODUCTS[0] }) {
const containerRef = useRef<HTMLDivElement>(null);
const { scrollYProgress } = useScroll({
target: containerRef,
offset: ["start end", "end start"]
 });

// Parallax subtle scaling
const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

return (
<div ref={containerRef} className="h-screen w-full overflow-hidden bg-black sticky top-0 snap-section">
<motion.div style={{ scale }} className="absolute inset-0 w-full h-full">
<video
className="w-full h-full object-cover opacity-60"
src={product.video}
autoPlay
muted
loop
playsInline
/>
</motion.div>
<div className="absolute inset-0 bg-black/30" /> {/* Darken overlay for contrast */}
<motion.div
style={{ y }}
className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-20"
>
<h2 className="text-6xl md:text-9xl font-bold tracking-tighter text-white mb-6 drop-shadow-2xl">
{product.headline}
</h2>
<p className="text-xl md:text-2xl text-white font-light tracking-wide mb-10 max-w-2xl drop-shadow-lg">
{product.subtitle}
</p>
<Link href={`/products/${product.slug}`}>
<button className="flex items-center space-x-3 px-8 py-4 bg-white text-black rounded-full hover:bg-brand-primary hover:text-white transition-all duration-300 transform hover:scale-105 group font-medium tracking-wide relative z-30">
<span>Know More</span>
<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
</button>
</Link>
</motion.div>
</div>
 );
}

export default function ProductsSection() {
return (
<section id="products" className="relative w-full bg-black">
{PRODUCTS.map((product) => (
<ProductBlock key={product.id} product={product} />
 ))}
</section>
 );
}