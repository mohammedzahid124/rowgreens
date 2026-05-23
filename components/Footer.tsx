"use client";

import ScrollVelocity from "../components/ui/ScrollVelocity";
import CircularText from "../components/ui/CircularText";
import { Phone, Mail, MapPin } from "lucide-react";

import { useState } from "react";


const SOCIALS = [
  { label: "INSTAGRAM", href: "https://instagram.com" },
  { label: "LINKEDIN",  href: "https://linkedin.com" },
  { label: "WHATSAPP",  href: "https://wa.me/1234567890" },
  { label: "FACEBOOK",  href: "https://facebook.com" },
];

function CornerLink({
  href,
  children,
  className = "",
  target = "_blank",
  onClick,
}: {
  href?: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  onClick?: () => void;
}) {
  const base =
    "group relative inline-flex items-center px-3 py-1.5 text-sm md:text-base text-white/80 hover:text-white transition-colors duration-200 tracking-wide cursor-pointer select-none";

  const corners = (
    <>
      <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/40 transition-all duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:border-white" />
      <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:border-white" />
      <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/40 transition-all duration-300 group-hover:-translate-x-0.5 group-hover:translate-y-0.5 group-hover:border-white" />
      <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:border-white" />
    </>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className={`${base} ${className}`}>
        {children}
        {corners}
      </button>
    );
  }

  return (
    <a
      href={href}
      target={target}
      rel="noopener noreferrer"
      className={`${base} ${className}`}
    >
      {children}
      {corners}
    </a>
  );
}

export default function Footer() {
  const [dialog, setDialog] = useState<null | string>(null);
  return (
    <footer id="contact" className="relative min-h-screen w-full bg-[#166534] overflow-hidden flex items-center justify-center">

      {/* ── LAYER 0: scrolling BG text — pointer-events OFF, z lowest ── */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.2 }}
        className="flex flex-col justify-center"
      >
        <ScrollVelocity
          texts={["ROWGREEN", "ROWGREEN", "ROWGREEN"]}
          velocity={120}
          className="text-white font-bold tracking-tighter text-[11vw]"
        />
      </div>

      {/* ── LAYER 1: CircularText — pointer-events OFF so it never blocks ── */}
{/* ── CENTER CONTENT ── */}
<div
style={{
 position: "relative",
 zIndex: 1,
 display: "flex",
 alignItems: "center",
 justifyContent: "center",
 }}
>

{/* Circular Text */}
<div style={{ pointerEvents: "none" }}>
<CircularText
text="LET'S GROW • SAY HELLO • "
spinDuration={18}
onHover="slowDown"
className="text-white"
/>
</div>


<div className="absolute flex items-center justify-center">

  {/* WHITE CIRCLE */}
  <div className="relative bg-white rounded-full w-28 h-28 flex items-center justify-center shadow-lg overflow-hidden">

    {/* ROTATING CIRCULAR TEXT */}
    <svg
      viewBox="0 0 112 112"
      width="112"
      height="112"
      className="absolute inset-0"
      style={{ pointerEvents: "none" }}
    >
      <defs>
        <path
          id="inner-arc"
          d="M 56,56 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
        />
      </defs>

      {/* Spin the entire text group */}
      <g style={{ transformOrigin: "56px 56px", animation: "spin-cw 10s linear infinite" }}>
        <text
          fontSize="8.5"
          fontWeight="600"
          letterSpacing="2.8"
          fill="#16a34a"
          fontFamily="inherit"
        >
          <textPath href="#inner-arc" startOffset="0%">
          D.U.B.A.I     •     U.A.E     •     D.U.B.A.I     •     U.A.E    •
          </textPath>
        </text>
      </g>

      <style>{`
        @keyframes spin-cw {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </svg>

    {/* CENTER ICON */}
    <MapPin className="w-8 h-8 text-green-600 z-10" />

  </div>
</div>
</div>

      {/* ── LAYER 2: Socials — sits above everything, pointer-events ON ── */}
      <div
        style={{
          position: "absolute",
          top: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 50,         // high enough to always be on top
          pointerEvents: "auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        {SOCIALS.map(({ label, href }) => (
          <CornerLink key={label} href={href} target="_blank">
            {label}
          </CornerLink>
        ))}
      </div>
{/* ── BOTTOM BAR (FULL WIDTH DISTRIBUTED) ── */}
<div
className="absolute bottom-0 left-0 right-0 z-50 px-6 py-4"
style={{
 display: "flex",
 justifyContent: "space-between",
 alignItems: "center",
 flexWrap: "wrap",
 gap: "1rem",
}}
>

{/* LEFT — PHONE */}
<CornerLink href="tel:+971509433820" target="_self">
<span className="flex items-center gap-2">
<Phone className="w-4 h-4 text-green-400" />
 +971 50 943 3820
</span>
</CornerLink>

{/* CENTER — LEGAL */}
<div className="flex items-center gap-6 flex-wrap justify-center text-xs md:text-sm">
<CornerLink onClick={() => setDialog("legal")}>LEGAL</CornerLink>
<CornerLink onClick={() => setDialog("documentation")}>DOCUMENTATION</CornerLink>
<CornerLink onClick={() => setDialog("privacy")}>PRIVACY POLICY</CornerLink>
<CornerLink onClick={() => setDialog("terms")}>TERMS OF SERVICE</CornerLink>
</div>

{/* RIGHT — EMAIL */}
<CornerLink href="mailto:gogreen@rowgreens.com" target="_self">
<span className="flex items-center gap-2">
<Mail className="w-4 h-4 text-green-400" />
 gogreen@rowgreens.com
</span>
</CornerLink>

</div>
{/* ── DIALOG MODAL ── */}
{dialog && (
  <div className="fixed inset-0 z-[200] bg-black/60 flex items-center justify-center px-6">
    
    <div className="bg-white text-black max-w-xl w-full p-8 rounded-xl relative">

      {/* CLOSE BUTTON */}
      <button
        onClick={() => setDialog(null)}
        className="absolute top-4 right-4 text-black text-xl"
      >
        ✕
      </button>

      {/* CONTENT */}
      {dialog === "legal" && (
        <>
          <h2 className="text-2xl font-bold mb-4">Legal</h2>
          <p className="text-sm opacity-80">
            RowGreens operates under UAE regulations. All content, products, and
            systems are protected by applicable intellectual property laws.
          </p>
        </>
      )}

      {dialog === "privacy" && (
        <>
          <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
          <p className="text-sm opacity-80">
            We respect your privacy. No personal data is sold or misused. Any
            information collected is used strictly to improve your experience.
          </p>
        </>
      )}

      {dialog === "documentation" && (
        <>
          <h2 className="text-2xl font-bold mb-4">Documentation</h2>
          <p className="text-sm opacity-80">
            Our systems are backed by biomimicry research and environmental
            science. Detailed whitepapers and product documentation are available
            upon request.
          </p>
        </>
      )}

      {dialog === "terms" && (
        <>
          <h2 className="text-2xl font-bold mb-4">Terms of Service</h2>
          <p className="text-sm opacity-80">
            By using RowGreens services, you agree to our usage policies,
            limitations, and operational guidelines. Services are provided as-is
            with ongoing support.
          </p>
        </>
      )}
    </div>
  </div>
)}

    </footer>
  );
}