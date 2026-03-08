"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ─── Shared easing ───────────────────────────────────────────────────────────
const EASE_CINEMATIC: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ─── SectionReveal ────────────────────────────────────────────────────────────
interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}
export function SectionReveal({ children, className = "", delay = 0 }: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-12% 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 56 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: EASE_CINEMATIC, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── FadeIn ──────────────────────────────────────────────────────────────────
interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  distance?: number;
}
export function FadeIn({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 48,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-8% 0px" });
  const axes = {
    up: { y: distance, x: 0 },
    left: { y: 0, x: -distance },
    right: { y: 0, x: distance },
    none: { y: 0, x: 0 },
  };
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...axes[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 1.1, ease: EASE_CINEMATIC, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── WordReveal — reveals each word with a clip-path wipe ─────────────────────
interface WordRevealProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  baseDelay?: number;
  wordDelay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}
export function WordReveal({
  text,
  className = "",
  style,
  baseDelay = 0,
  wordDelay = 0.05,
  as: Tag = "h2",
}: WordRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-8% 0px" });
  const words = text.split(" ");
  return (
    <div ref={ref} aria-label={text}>
      <Tag className={className} style={{ ...style, display: "block" }} aria-hidden>
        {words.map((word, i) => (
          <span
            key={i}
            style={{ display: "inline-block", overflow: "hidden", marginRight: "0.3em", verticalAlign: "bottom" }}
          >
            <motion.span
              style={{ display: "inline-block" }}
              initial={{ y: "110%", opacity: 0 }}
              animate={isInView ? { y: "0%", opacity: 1 } : {}}
              transition={{
                duration: 0.85,
                ease: EASE_CINEMATIC,
                delay: baseDelay + i * wordDelay,
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </Tag>
    </div>
  );
}

// ─── LineReveal — clips a full line up from below ────────────────────────────
interface LineRevealProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}
export function LineReveal({ text, className = "", style, delay = 0, as: Tag = "p" }: LineRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-8% 0px" });
  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={{ y: "105%" }}
        animate={isInView ? { y: "0%" } : {}}
        transition={{ duration: 0.9, ease: EASE_CINEMATIC, delay }}
      >
        <Tag className={className} style={style}>{text}</Tag>
      </motion.div>
    </div>
  );
}

// ─── ScaleReveal — scale + fade reveal ───────────────────────────────────────
interface ScaleRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}
export function ScaleReveal({ children, className = "", delay = 0 }: ScaleRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 1, ease: EASE_CINEMATIC, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── SlideIn — slides in from left or right with image ────────────────────────
interface SlideInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  from?: "left" | "right";
}
export function SlideIn({ children, className = "", delay = 0, from = "left" }: SlideInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-8% 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: from === "left" ? -80 : 80 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 1.1, ease: EASE_CINEMATIC, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── StaggerContainer — staggers children with a container variant ────────────
interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  initialDelay?: number;
}
export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.12,
  initialDelay = 0,
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: initialDelay,
        staggerChildren: staggerDelay,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 36 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_CINEMATIC } },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={itemVariants}>{children}</motion.div>}
    </motion.div>
  );
}
