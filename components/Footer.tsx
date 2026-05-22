"use client";

import ScrollVelocity from "../components/ui/ScrollVelocity";
import CircularText from "../components/ui/CircularText";

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
  return (
    <footer className="relative min-h-screen w-full bg-[#166534] overflow-hidden flex items-center justify-center">

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
      <div
        aria-hidden="true"
        style={{ position: "relative", zIndex: 1, pointerEvents: "none" }}
      >
        <CircularText
          text="LET'S GROW • SAY HELLO • "
          spinDuration={18}
          onHover="slowDown"
          className="text-white"
        />
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

      {/* ── LAYER 2: Bottom bar ── */}
      <div
        style={{
          position: "absolute",
          bottom: "1.5rem",
          left: 0,
          right: 0,
          zIndex: 50,
          pointerEvents: "auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
        }}
      >
        <CornerLink href="mailto:hello@rowgreen.ae" target="_self">
          HAVE A PROJECT IN MIND?
        </CornerLink>

        <CornerLink onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          BACK TO TOP ↑
        </CornerLink>
      </div>

    </footer>
  );
}