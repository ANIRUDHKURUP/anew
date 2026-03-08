"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ParallaxImage } from "./ParallaxImage";
import { WordReveal, LineReveal, FadeIn } from "./AnimationHelpers";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const bullets = [
  {
    icon: "🔬",
    title: "Pattern Recognition",
    text: "Where others see symptoms, Dr Alan sees stories. He reads between the lines of lab reports, scanners, and human histories to decode what others miss.",
  },
  {
    icon: "🩻",
    title: "Complex Case Solver",
    text: "Patients who've cycled through specialists for years find answers in a single consultation — because he treats the whole human, not just the condition.",
  },
  {
    icon: "🧬",
    title: "Root Cause Medicine",
    text: "True healing begins at the origin. His approach dissolves the mystery of chronic illness by tracing every symptom back to its invisible root.",
  },
];

export default function DetectiveSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const rawX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [-60, 0, 0, -30]);
  const x = useSpring(rawX, { stiffness: 60, damping: 18 });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.2]);

  return (
    <section
      id="detective"
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "#060606" }}
    >
      <ParallaxImage
        src="/section_detective.png"
        alt="Doctor analyzing medical reports and X-rays"
        speed={0.18}
        overlay="rgba(0,0,0,0.68)"
      />

      {/* Deep red scrim from left */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: "linear-gradient(105deg, rgba(192,57,43,0.18) 0%, transparent 55%)",
        }}
      />

      {/* Red flicker line */}
      <motion.div
        className="absolute top-0 left-0 bottom-0 w-[2px] z-[2]"
        style={{
          background: "linear-gradient(to bottom, transparent, #c0392b 30%, #c0392b 70%, transparent)",
        }}
        animate={{ opacity: [0.3, 0.9, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 lg:px-24 py-28">
        <motion.div style={{ x, opacity }} className="max-w-xl">

          <FadeIn delay={0.05}>
            <p
              className="text-[10px] tracking-[0.4em] uppercase font-semibold mb-7"
              style={{ color: "#c0392b" }}
            >
              Chapter VI — The Medical Detective
            </p>
          </FadeIn>

          <div className="mb-3">
            <LineReveal
              text="Disease is a mystery."
              delay={0.1}
              as="h2"
              className="font-display font-black leading-none"
              style={{
                fontSize: "clamp(2.2rem, 5vw, 4rem)",
                color: "rgba(255,255,255,0.6)",
                display: "block",
              } as React.CSSProperties}
            />
            <LineReveal
              text="I am the detective."
              delay={0.3}
              as="h2"
              className="font-display font-black leading-none"
              style={{
                fontSize: "clamp(2.2rem, 5vw, 4rem)",
                color: "#c0392b",
                display: "block",
              } as React.CSSProperties}
            />
          </div>

          {/* Expanding rule */}
          <FadeIn delay={0.45}>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
              className="h-px my-8"
              style={{
                background: "linear-gradient(90deg, #c0392b, rgba(192,57,43,0.2))",
                transformOrigin: "left",
                width: "100px",
              }}
            />
          </FadeIn>

          {/* Bullets */}
          <div className="space-y-6">
            {bullets.map(({ icon, title, text }, i) => (
              <FadeIn key={title} delay={0.55 + i * 0.16}>
                <motion.div
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="group flex gap-4 cursor-default"
                >
                  <div
                    className="w-10 h-10 shrink-0 flex items-center justify-center text-lg mt-0.5"
                    style={{
                      background: "rgba(192,57,43,0.08)",
                      border: "1px solid rgba(192,57,43,0.2)",
                    }}
                  >
                    {icon}
                  </div>
                  <div>
                    <h3
                      className="font-semibold text-sm mb-1 tracking-wide transition-colors duration-300 group-hover:text-red-400"
                      style={{ color: "#fff", letterSpacing: "0.05em" }}
                    >
                      {title.toUpperCase()}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "rgba(255,255,255,0.45)", fontWeight: 300 }}
                    >
                      {text}
                    </p>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
