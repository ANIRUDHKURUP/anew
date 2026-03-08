"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { WordReveal, LineReveal, FadeIn } from "./AnimationHelpers";
import { FiCalendar, FiBook } from "react-icons/fi";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Static particles
const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 90 + 5}%`,
  left: `${Math.random() * 90 + 5}%`,
  size: Math.random() * 2 + 1,
  duration: 3 + Math.random() * 4,
  delay: Math.random() * 3,
}));

export default function FinalSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 1.2]);

  return (
    <section
      id="contact"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#060606" }}
    >
      {/* ── Scroll-driven expanding glow ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(192,57,43,0.2) 0%, transparent 65%)",
          scale: glowScale,
        }}
      />

      {/* ── Pulsing glow ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 45% 35% at 50% 50%, rgba(192,57,43,0.12) 0%, transparent 60%)",
        }}
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.05, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Floating dust particles ── */}
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            background: "rgba(192,57,43,0.6)",
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}

      {/* ── Horizontal structural lines ── */}
      {[15, 30, 70, 85].map((top) => (
        <div
          key={top}
          className="absolute left-0 right-0 h-px pointer-events-none"
          style={{
            top: `${top}%`,
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.025), transparent)",
          }}
        />
      ))}

      {/* Corner decorations */}
      {[
        { top: "3rem", left: "3rem", borderTop: "1px solid", borderLeft: "1px solid" },
        { top: "3rem", right: "3rem", borderTop: "1px solid", borderRight: "1px solid" },
        { bottom: "3rem", left: "3rem", borderBottom: "1px solid", borderLeft: "1px solid" },
        { bottom: "3rem", right: "3rem", borderBottom: "1px solid", borderRight: "1px solid" },
      ].map((style, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{ ...style, width: 28, height: 28, borderColor: "rgba(192,57,43,0.35)" }}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
        />
      ))}

      {/* ── Content ── */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <FadeIn delay={0.1}>
          <p
            className="text-[10px] tracking-[0.45em] uppercase font-semibold mb-14"
            style={{ color: "rgba(192,57,43,0.8)" }}
          >
            The End. The Beginning.
          </p>
        </FadeIn>

        {/* Quote */}
        <div className="mb-10 space-y-1">
          <LineReveal
            text="Success wasn't inherited."
            delay={0.2}
            as="p"
            className="font-display italic"
            style={{
              fontSize: "clamp(1.8rem, 5vw, 3.8rem)",
              color: "rgba(255,255,255,0.6)",
              display: "block",
            } as React.CSSProperties}
          />
          <LineReveal
            text="It was diagnosed."
            delay={0.45}
            as="p"
            className="font-display italic font-bold"
            style={{
              fontSize: "clamp(1.8rem, 5vw, 3.8rem)",
              color: "#ffffff",
              display: "block",
            } as React.CSSProperties}
          />
        </div>

        {/* Expanding red rule */}
        <FadeIn delay={0.6}>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.7 }}
            className="mx-auto mb-12 h-px w-36"
            style={{
              background: "linear-gradient(90deg, transparent, #c0392b 35%, #e74c3c 65%, transparent)",
              transformOrigin: "center",
            }}
          />
        </FadeIn>

        {/* Name */}
        <WordReveal
          text="Dr Alan V.L."
          as="h2"
          className="font-display font-black uppercase tracking-widest glow-red"
          style={{
            fontSize: "clamp(2.8rem, 7vw, 6rem)",
            color: "#fff",
            display: "block",
            lineHeight: 1,
            marginBottom: "0.5rem",
          } as React.CSSProperties}
          baseDelay={0.7}
          wordDelay={0.12}
        />

        <FadeIn delay={1}>
          <p
            className="font-display italic mb-16"
            style={{
              fontSize: "clamp(1.1rem, 2.5vw, 1.8rem)",
              color: "#c0392b",
            }}
          >
            The Medical Detective
          </p>
        </FadeIn>

        {/* CTAs */}
        <FadeIn delay={1.15}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#books"
              id="btn-buy-books-final"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden"
              style={{
                background: "#c0392b",
                color: "#fff",
                padding: "15px 40px",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
                minWidth: "220px",
              }}
            >
              {/* Shimmer */}
              <span
                className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)" }}
              />
              <FiBook className="relative z-10" size={15} />
              <span className="relative z-10">Buy My Books</span>
            </a>

            <a
              href="mailto:contact@dralan.in"
              id="btn-book-session"
              className="group inline-flex items-center justify-center gap-2 relative overflow-hidden"
              style={{
                border: "1px solid rgba(255,255,255,0.2)",
                color: "rgba(255,255,255,0.75)",
                padding: "15px 40px",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
                minWidth: "220px",
              }}
            >
              <span
                className="absolute inset-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ background: "rgba(255,255,255,0.06)" }}
              />
              <FiCalendar className="relative z-10" size={15} />
              <span className="relative z-10">Book a Session</span>
            </a>
          </div>
        </FadeIn>

        {/* Footer */}
        <FadeIn delay={1.35}>
          <p
            className="mt-24 text-[10px] tracking-[0.3em] uppercase"
            style={{ color: "rgba(255,255,255,0.18)" }}
          >
            © {new Date().getFullYear()} Dr Alan V.L. · The Medical Detective · All Rights Reserved
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
