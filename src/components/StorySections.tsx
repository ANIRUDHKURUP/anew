"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ParallaxImage } from "./ParallaxImage";
import { WordReveal, LineReveal, FadeIn } from "./AnimationHelpers";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface StorySection {
  id: string;
  image: string;
  imageAlt: string;
  eyebrow: string;
  lines: string[];
  body: string;
  imageLeft: boolean;
  overlayColor?: string;
}

const storySections: StorySection[] = [
  {
    id: "street",
    image: "/section_street.png",
    imageAlt: "Young man handing out flyers on a crowded street",
    eyebrow: "Chapter I — The Street",
    lines: ["₹600 a day.", "A crowded street.", "A fight to survive."],
    body: "Before the white coat, there were flyers. Before the clinic, there were crowds. Every rupee earned on those streets was a lesson no textbook could teach.",
    imageLeft: false,
    overlayColor: "rgba(0,0,0,0.60)",
  },
  {
    id: "hardwork",
    image: "/section_construction.png",
    imageAlt: "Construction site at dusk",
    eyebrow: "Chapter II — Hard Work",
    lines: ["Another job.", "Another lesson.", "The streets taught resilience."],
    body: "Concrete, scaffold, and sweat. The construction site didn't break him — it forged him. In the hardest labor, he discovered the hardest truth: nothing comes without sacrifice.",
    imageLeft: true,
    overlayColor: "rgba(0,0,0,0.58)",
  },
  {
    id: "ambulance",
    image: "/section_ambulance.png",
    imageAlt: "Ambulance driving at night with emergency lights",
    eyebrow: "Chapter III — Ambulance Nights",
    lines: ["Sirens.", "Emergency calls.", "Long nights that revealed the fragility of life."],
    body: "Racing through darkness, each call was a reminder — life hangs by a thread. Those nights behind the wheel planted the seed of his medical obsession.",
    imageLeft: false,
    overlayColor: "rgba(0,0,0,0.65)",
  },
  {
    id: "observation",
    image: "/section_observation.png",
    imageAlt: "Young man observing people thoughtfully",
    eyebrow: "Chapter IV — Observation",
    lines: ["He wasn't just working.", "He was observing.", "Learning human behavior."],
    body: "While others saw chaos, he saw patterns. In every crowd, he read stories. The streets became his first laboratory, human beings his first study.",
    imageLeft: true,
    overlayColor: "rgba(0,0,0,0.60)",
  },
  {
    id: "transformation",
    image: "/section_studying.png",
    imageAlt: "Medical books, scans and stethoscope on a desk",
    eyebrow: "Chapter V — Transformation",
    lines: ["The streets built the man.", "Science built the doctor."],
    body: "He traded flyers for flashcards. Construction sites for classrooms. The same relentless hunger that survived the streets now devoured textbooks, medical scans, and human anatomy.",
    imageLeft: false,
    overlayColor: "rgba(0,0,0,0.62)",
  },
];

function NumberedRule({ n }: { n: number }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span
        className="font-display text-5xl font-black leading-none select-none"
        style={{
          color: "rgba(192,57,43,0.18)",
          WebkitTextStroke: "1px rgba(192,57,43,0.35)",
          lineHeight: 1,
        }}
      >
        0{n}
      </span>
      <div className="flex-1 h-px" style={{ background: "rgba(192,57,43,0.25)" }} />
    </div>
  );
}

function StorySectionItem({ section, index }: { section: StorySection; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Image slides in from opposite side with scroll
  const rawImgX = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [section.imageLeft ? -60 : 60, 0, 0, section.imageLeft ? -30 : 30]
  );
  const imgX = useSpring(rawImgX, { stiffness: 60, damping: 18 });
  const imgOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.3]);

  // Text side
  const textX = useTransform(
    scrollYProgress,
    [0, 0.3],
    [section.imageLeft ? 40 : -40, 0]
  );
  const textSpringX = useSpring(textX, { stiffness: 60, damping: 18 });
  const textOpacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0.2]);

  return (
    <section
      id={section.id}
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "#060606" }}
    >
      {/* Parallax background */}
      <ParallaxImage
        src={section.image}
        alt={section.imageAlt}
        speed={0.2}
        overlay={section.overlayColor}
      />

      {/* Side image accent — slides in */}
      <motion.div
        style={{ x: imgX, opacity: imgOpacity }}
        className={`absolute top-0 bottom-0 ${section.imageLeft ? "left-0" : "right-0"} w-1/2 hidden lg:block`}
      >
        {/* Gradient mask to blend image edge */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: section.imageLeft
              ? "linear-gradient(to right, rgba(6,6,6,0) 60%, rgba(6,6,6,1) 100%)"
              : "linear-gradient(to left, rgba(6,6,6,0) 60%, rgba(6,6,6,1) 100%)",
          }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 lg:px-24 py-24">
        <motion.div
          style={{ x: textSpringX, opacity: textOpacity }}
          className={`max-w-lg ${section.imageLeft ? "ml-auto" : ""}`}
        >
          {/* Big ghost number */}
          <NumberedRule n={index + 1} />

          {/* Eyebrow */}
          <FadeIn delay={0.05}>
            <p
              className="text-[10px] md:text-xs tracking-[0.4em] uppercase mb-7 font-semibold"
              style={{ color: "#c0392b" }}
            >
              {section.eyebrow}
            </p>
          </FadeIn>

          {/* Lines — clip reveal */}
          <div className="space-y-0 mb-8">
            {section.lines.map((line, i) => (
              <LineReveal
                key={line}
                text={line}
                delay={0.1 + i * 0.16}
                as="h2"
                className="font-display font-bold leading-tight"
                style={{
                  fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                  color: i === section.lines.length - 1 ? "#ffffff" : "rgba(255,255,255,0.55)",
                  display: "block",
                } as React.CSSProperties}
              />
            ))}
          </div>

          {/* Animated red accent bar */}
          <FadeIn delay={0.45}>
            <motion.div
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
              className="h-px mb-6"
              style={{
                background: "linear-gradient(90deg, #c0392b, rgba(192,57,43,0.3))",
                transformOrigin: "left",
                width: "80px",
              }}
            />
          </FadeIn>

          {/* Body copy */}
          <FadeIn delay={0.55}>
            <p
              className="leading-[1.85] text-sm md:text-base"
              style={{
                color: "rgba(255,255,255,0.5)",
                fontWeight: 300,
                letterSpacing: "0.01em",
              }}
            >
              {section.body}
            </p>
          </FadeIn>
        </motion.div>
      </div>
    </section>
  );
}

export default function StorySections() {
  return (
    <>
      {storySections.map((section, i) => (
        <StorySectionItem key={section.id} section={section} index={i} />
      ))}
    </>
  );
}
