"use client";

import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { WordReveal, FadeIn, StaggerContainer } from "./AnimationHelpers";
import { FiArrowRight } from "react-icons/fi";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const books = [
  {
    id: "book-rich-ambulance",
    title: "The Rich Ambulance Driver",
    image: "/book_rich_ambulance.png",
    description:
      "A raw, unflinching account of the nights behind the wheel — and what they cost, and what they revealed. The book that started it all.",
    buyUrl: "#",
    accent: "#c0392b",
    number: "01",
  },
  {
    id: "book-forbidden-sex-ed",
    title: "The Forbidden Sex Education",
    image: "/book_forbidden_sex_ed.png",
    description:
      "The conversations nobody is brave enough to have. Dr Alan dismantles taboos with clinical honesty and uncommon courage.",
    buyUrl: "#",
    accent: "#8e44ad",
    number: "02",
  },
  {
    id: "book-blue-collar",
    title: "From Blue Collar to White Coat",
    image: "/book_blue_collar.png",
    description:
      "The true story of a transformation that defied every statistic. From construction dust to diagnostic precision — one man's impossible climb.",
    buyUrl: "#",
    accent: "#c9a96e",
    number: "03",
  },
];

// ─── 3D Tilt Card ──────────────────────────────────────────────────────────────
function TiltBookCard({ book, index }: { book: typeof books[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 120, damping: 20 });
  const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 70, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1, ease: EASE, delay: index * 0.18 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          perspective: 1000,
        }}
        className="group relative flex flex-col cursor-default"
        id={book.id}
      >
        {/* ── Book Cover ── */}
        <div
          className="relative overflow-hidden book-shine mb-0"
          style={{ aspectRatio: "2/3", borderRadius: "2px" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <motion.img
            src={book.image}
            alt={book.title}
            className="w-full h-full object-cover"
            style={{ transformStyle: "preserve-3d", translateZ: 20 }}
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.6, ease: EASE }}
          />

          {/* Dynamic glare */}
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
            style={{
              background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.1) 0%, transparent 60%)`,
              transition: "opacity 0.4s ease",
            }}
          />

          {/* Bottom gradient */}
          <div
            className="absolute bottom-0 left-0 right-0 h-2/3 pointer-events-none"
            style={{
              background: `linear-gradient(to top, ${book.accent}CC 0%, transparent 100%)`,
              opacity: 0,
              transition: "opacity 0.5s ease",
            }}
          />

          {/* Book number badge */}
          <div
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center"
            style={{
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(4px)",
              border: `1px solid ${book.accent}60`,
            }}
          >
            <span
              className="font-display font-bold text-xs"
              style={{ color: book.accent }}
            >
              {book.number}
            </span>
          </div>
        </div>

        {/* ── Card Body ── */}
        <div
          className="flex-1 p-6 border-l border-r border-b flex flex-col"
          style={{
            borderColor: `${book.accent}30`,
            background: "rgba(255,255,255,0.015)",
            backdropFilter: "blur(2px)",
          }}
        >
          {/* Accent top stroke */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.3 + index * 0.15 }}
            className="absolute top-0 left-0 right-0 h-[2px] origin-left"
            style={{ background: book.accent }}
          />

          <h3
            className="font-display font-bold leading-snug mb-3"
            style={{
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              color: "#fff",
            }}
          >
            {book.title}
          </h3>

          <p
            className="text-sm leading-relaxed mb-6 flex-1"
            style={{ color: "rgba(255,255,255,0.45)", fontWeight: 300 }}
          >
            {book.description}
          </p>

          {/* Buy button */}
          <a
            href={book.buyUrl}
            id={`btn-buy-${book.id}`}
            className="group/btn relative inline-flex items-center justify-between gap-2 w-full px-5 py-3.5 overflow-hidden"
            style={{
              background: "transparent",
              border: `1px solid ${book.accent}60`,
              color: book.accent,
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            {/* Fill on hover */}
            <span
              className="absolute inset-0 scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 origin-left"
              style={{ background: book.accent }}
            />
            <span className="relative z-10 transition-colors duration-300 group-hover/btn:text-white">
              Buy Now
            </span>
            <FiArrowRight
              className="relative z-10 transition-all duration-300 group-hover/btn:translate-x-1 group-hover/btn:text-white"
              size={14}
              style={{ color: book.accent }}
            />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function BooksSection() {
  return (
    <section
      id="books"
      className="relative py-36 min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "#070707" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(192,57,43,0.06) 0%, transparent 65%)",
        }}
      />

      {/* Horizontal rules */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)" }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-16 lg:px-24 translate-x-[170px]">
        {/* Header */}
        <div className="mb-20 flex flex-col items-center text-center">
          <FadeIn delay={0.05}>
            <div className="flex items-center gap-4 justify-center mb-5">
              <span className="w-8 h-px bg-[#c0392b] opacity-80" />
              <p
                className="text-[10px] tracking-[0.45em] uppercase font-semibold m-0"
                style={{ color: "#c0392b" }}
              >
                Chapter VIII — Author
              </p>
              <span className="w-8 h-px bg-[#c0392b] opacity-80" />
            </div>
          </FadeIn>

          <WordReveal
            text="Words That Change Lives"
            as="h2"
            className="font-display font-black text-center"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              color: "#fff",
              lineHeight: 1.05,
              display: "block",
              textAlign: "center",
            }}
            baseDelay={0.1}
            wordDelay={0.07}
          />

          <FadeIn delay={0.5}>
            <p
              className="text-sm md:text-base max-w-md mx-auto mt-4 text-center"
              style={{ color: "rgba(255,255,255,0.4)", fontWeight: 300, lineHeight: 1.8 }}
            >
              Three books. Three perspectives. One relentless drive to share truth.
            </p>
          </FadeIn>
        </div>

        {/* Book cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start translate-y-[30px]">
          {books.map((book, i) => (
            <TiltBookCard key={book.id} book={book} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
