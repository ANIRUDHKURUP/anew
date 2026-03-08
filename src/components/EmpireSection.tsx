"use client";

import { motion } from "framer-motion";
import { WordReveal, FadeIn } from "./AnimationHelpers";
import { FiExternalLink } from "react-icons/fi";
import { TbBuildingHospital, TbPill, TbFlask } from "react-icons/tb";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const companies = [
  {
    name: "Neem Rosa International",
    tagline: "Nature-integrated healthcare solutions for a modern world.",
    detail: "Bridging traditional plant wisdom with modern clinical science.",
    icon: TbFlask,
    color: "#2ecc71",
    number: "01",
  },
  {
    name: "Medmelo Ventures Private Limited",
    tagline: "Innovation at the intersection of medicine and entrepreneurship.",
    detail: "Building the next generation of healthcare enterprises across India.",
    icon: TbBuildingHospital,
    color: "#c0392b",
    number: "02",
  },
  {
    name: "Medmelo Pharmacy",
    tagline: "Patient-first pharmacy care — quality medicines, trusted guidance.",
    detail: "Redefining what a pharmacy can mean in a community's health journey.",
    icon: TbPill,
    color: "#c9a96e",
    number: "03",
  },
];

function CompanyCard({ company, index }: { company: typeof companies[0]; index: number }) {
  const Icon = company.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1, ease: EASE, delay: index * 0.2 }}
      whileHover={{ y: -10 }}
      className="group relative overflow-hidden cursor-default"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Ghost number background */}
      <div
        className="absolute -right-4 -bottom-4 font-display font-black select-none pointer-events-none"
        style={{
          fontSize: "8rem",
          color: "transparent",
          WebkitTextStroke: `1px ${company.color}15`,
          lineHeight: 1,
          transition: "opacity 0.4s ease",
        }}
      >
        {company.number}
      </div>

      {/* Top accent line — slides in on entry */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.35 + index * 0.2 }}
        className="absolute top-0 left-0 right-0 h-[2px] origin-left"
        style={{ background: `linear-gradient(90deg, ${company.color}, transparent)` }}
      />

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 25% 25%, ${company.color}14, transparent 65%)`,
        }}
      />

      <div className="relative z-10 p-8">
        {/* Icon */}
        <motion.div
          className="w-12 h-12 flex items-center justify-center mb-6"
          style={{
            background: `${company.color}12`,
            border: `1px solid ${company.color}30`,
          }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.3 }}
        >
          <Icon size={22} style={{ color: company.color }} />
        </motion.div>

        <h3
          className="font-display font-bold text-lg mb-2 leading-snug"
          style={{ color: "#fff" }}
        >
          {company.name}
        </h3>

        <p
          className="text-sm leading-relaxed mb-2 font-medium"
          style={{ color: "rgba(255,255,255,0.55)" }}
        >
          {company.tagline}
        </p>

        <p
          className="text-xs leading-relaxed mb-7"
          style={{ color: "rgba(255,255,255,0.3)", fontWeight: 300 }}
        >
          {company.detail}
        </p>

        {/* Hover-revealed CTA */}
        <span
          className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.2em] uppercase opacity-40 group-hover:opacity-100 transition-all duration-400"
          style={{ color: company.color }}
        >
          Learn more <FiExternalLink size={11} />
        </span>
      </div>
    </motion.div>
  );
}

export default function EmpireSection() {
  return (
    <section
      id="empire"
      className="relative py-36 overflow-hidden"
      style={{ background: "#060606" }}
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(192,57,43,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(192,57,43,0.03) 1px, transparent 1px)",
          backgroundSize: "100px 100px",
        }}
      />
      {/* Top divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
        {/* Section header */}
        <div className="mb-20">
          <FadeIn delay={0.05}>
            <p
              className="text-[10px] tracking-[0.45em] uppercase font-semibold mb-5"
              style={{ color: "#c0392b" }}
            >
              Chapter VII
            </p>
          </FadeIn>

          <WordReveal
            text="The Empire He Built"
            as="h2"
            className="font-display font-black"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              color: "#fff",
              display: "block",
              lineHeight: 1.05,
              marginBottom: "1rem",
            } as React.CSSProperties}
            baseDelay={0.1}
            wordDelay={0.08}
          />

          <FadeIn delay={0.5}>
            <p
              className="text-sm md:text-base max-w-md mt-4"
              style={{ color: "rgba(255,255,255,0.38)", fontWeight: 300, lineHeight: 1.8 }}
            >
              From survival to scale — Dr Alan founded companies that are reshaping healthcare across India.
            </p>
          </FadeIn>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {companies.map((company, i) => (
            <CompanyCard key={company.name} company={company} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
