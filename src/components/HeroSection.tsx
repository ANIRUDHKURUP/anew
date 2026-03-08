"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import { useRef } from "react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Individual letter animation for the name
function AnimatedName({ name }: { name: string }) {
  const letters = name.split("");
  return (
    <div className="overflow-hidden inline-flex flex-wrap justify-center">
      {letters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: "120%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 1.6 + i * 0.04 }}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
}

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "25%"]), {
    stiffness: 60,
    damping: 20,
  });

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#060606" }}
    >
      {/* ── Animated ambient orbs ── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(192,57,43,0.12) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(192,57,43,0.08) 0%, transparent 70%)",
          bottom: "15%",
          right: "15%",
        }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* ── Animated scan lines ── */}
      {[0, 1].map((i) => (
        <motion.div
          key={i}
          className="absolute left-0 right-0 h-px pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(192,57,43,0.4), transparent)",
            top: `${40 + i * 20}%`,
          }}
          animate={{ opacity: [0, 0.8, 0], y: [0, 160, 320] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 6 + i * 3,
            delay: i * 3,
          }}
        />
      ))}

      {/* ── Corner decorations ── */}
      {[
        { top: "2rem", left: "2rem", borderTop: "1px solid", borderLeft: "1px solid" },
        { top: "2rem", right: "2rem", borderTop: "1px solid", borderRight: "1px solid" },
        { bottom: "2rem", left: "2rem", borderBottom: "1px solid", borderLeft: "1px solid" },
        { bottom: "2rem", right: "2rem", borderBottom: "1px solid", borderRight: "1px solid" },
      ].map((style, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{
            ...style,
            width: 32,
            height: 32,
            borderColor: "rgba(192,57,43,0.4)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3 + i * 0.1 }}
        />
      ))}

      {/* ── Main content fades + parallax out on scroll ── */}
      <motion.div
        style={{ opacity: heroOpacity, y: heroY }}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
      >
        {/* Teaser quote lines — clip up one by one */}
        <div className="mb-14 space-y-1">
          {[
            { text: "I was a jack of all trades.", delay: 0.3 },
            { text: "Master of nothing.", delay: 0.65 },
            { text: "Until I discovered the secret.", delay: 1.0 },
          ].map(({ text, delay }) => (
            <div key={text} className="overflow-hidden">
              <motion.p
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 1, ease: EASE, delay }}
                className="font-display italic"
                style={{
                  fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
                  color: "rgba(255,255,255,0.5)",
                  letterSpacing: "0.02em",
                }}
              >
                {text}
              </motion.p>
            </div>
          ))}
        </div>

        {/* Expanding red rule */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.4, ease: EASE }}
          className="mx-auto mb-10 h-px w-32"
          style={{
            background: "linear-gradient(90deg, transparent, #c0392b 40%, #e74c3c 60%, transparent)",
            transformOrigin: "center",
          }}
        />

        {/* Name — letter by letter */}
        <h1
          className="font-display font-black uppercase tracking-widest mb-5 glow-red"
          style={{ fontSize: "clamp(2.8rem, 9vw, 8rem)", lineHeight: 1 }}
        >
          <AnimatedName name="Dr Alan V.L." />
        </h1>

        {/* Title — slides up */}
        <div className="overflow-hidden mb-3">
          <motion.div
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1, ease: EASE, delay: 2.1 }}
          >
            <span
              className="font-display italic font-semibold"
              style={{
                fontSize: "clamp(1.4rem, 3.5vw, 2.8rem)",
                color: "#c0392b",
                letterSpacing: "0.02em",
              }}
            >
              The Medical Detective
            </span>
          </motion.div>
        </div>

        {/* Roles — fade in */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, letterSpacing: "0.22em" }}
          transition={{ duration: 1.4, delay: 2.5, ease: EASE }}
          className="text-xs md:text-sm uppercase font-medium mb-16"
          style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.22em" }}
        >
          Author&nbsp;&nbsp;·&nbsp;&nbsp;Entrepreneur&nbsp;&nbsp;·&nbsp;&nbsp;Public Speaker
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#street"
            id="btn-explore-journey"
            className="group relative inline-flex items-center justify-center overflow-hidden"
            style={{
              background: "#c0392b",
              color: "#fff",
              padding: "14px 36px",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
              minWidth: "220px",
            }}
          >
            {/* Shimmer on hover */}
            <span
              className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
              }}
            />
            <span className="relative z-10">Explore The Journey</span>
          </a>

          <a
            href="#books"
            id="btn-buy-books-hero"
            className="group inline-flex items-center justify-center relative overflow-hidden"
            style={{
              border: "1px solid rgba(255,255,255,0.2)",
              color: "rgba(255,255,255,0.75)",
              padding: "14px 36px",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
              minWidth: "220px",
              transition: "color 0.3s, border-color 0.3s",
            }}
          >
            <span
              className="absolute inset-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
              style={{ background: "rgba(255,255,255,0.07)" }}
            />
            <span className="relative z-10">Buy My Books</span>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.6, duration: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        style={{ color: "rgba(255,255,255,0.3)" }}
      >
        <motion.div
          className="w-px bg-current"
          style={{ height: 0 }}
          animate={{ height: [0, 48, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 3.8 }}
        />
        <span className="text-[10px] tracking-[0.3em] uppercase mt-1">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <FiChevronDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
