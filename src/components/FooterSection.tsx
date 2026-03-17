"use client";

import { motion } from "framer-motion";
import { FadeIn } from "./AnimationHelpers";
import { FiInstagram } from "react-icons/fi";
import { FaThreads, FaWhatsapp } from "react-icons/fa6";

export default function FooterSection() {
  return (
    <footer className="relative bg-[#060606] pt-32 pb-12 overflow-hidden flex flex-col">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Minimal Navigation & Contact row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-12">
          
          <FadeIn delay={0.1}>
            <div className="flex flex-col gap-5">
              <a href="#" className="font-display italic text-xl md:text-2xl text-[rgba(255,255,255,0.4)] hover:text-white transition-colors duration-500">
                The Journey
              </a>
              <a href="#empire" className="font-display italic text-xl md:text-2xl text-[rgba(255,255,255,0.4)] hover:text-white transition-colors duration-500">
                The Empire
              </a>
              <a href="#books" className="font-display italic text-xl md:text-2xl text-[rgba(255,255,255,0.4)] hover:text-[#c0392b] transition-colors duration-500">
                Publications
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex flex-col items-start md:items-end gap-6">
              <a href="mailto:HI@dralanvl.com" className="text-xs md:text-sm tracking-[0.2em] uppercase text-[rgba(255,255,255,0.5)] hover:text-white transition-colors duration-500">
                HI@dralanvl.com
              </a>
              <div className="flex gap-8">
                <a href="https://instagram.com/alanvl.md" target="_blank" rel="noopener noreferrer" className="text-[rgba(255,255,255,0.3)] hover:text-white transition-colors duration-500">
                  <FiInstagram size={22} strokeWidth={1.5} />
                </a>
                <a href="https://threads.net/@alanvl.md" target="_blank" rel="noopener noreferrer" className="text-[rgba(255,255,255,0.3)] hover:text-white transition-colors duration-500">
                  <FaThreads size={22} />
                </a>
                <a href="https://wasap.my/+919037020606" target="_blank" rel="noopener noreferrer" className="text-[rgba(255,255,255,0.3)] hover:text-white transition-colors duration-500">
                  <FaWhatsapp size={22} />
                </a>
              </div>
            </div>
          </FadeIn>

        </div>

        {/* Giant Enlarged Minimal Branding */}
        <FadeIn delay={0.3}>
          <div className="w-full border-t border-[rgba(255,255,255,0.05)] pt-12 pb-6 flex flex-col items-center">
            <h2 
              className="font-display font-black text-white leading-none tracking-tight text-center"
              style={{ fontSize: "clamp(3.5rem, 11vw, 12rem)", opacity: 0.95 }}
            >
              DR. ALAN V.L.
            </h2>
          </div>
        </FadeIn>

        {/* Subtle Bottom Bar */}
        <FadeIn delay={0.5}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4">
            <p className="text-[9px] tracking-[0.2em] uppercase text-[rgba(255,255,255,0.2)]">
              © {new Date().getFullYear()} All Rights Reserved
            </p>
            <p className="text-[9px] tracking-[0.3em] font-semibold uppercase text-[#c0392b]">
              The Medical Detective
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-[9px] tracking-[0.1em] uppercase text-[rgba(255,255,255,0.2)] hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-[9px] tracking-[0.1em] uppercase text-[rgba(255,255,255,0.2)] hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Red ambient glow at the very bottom center */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2/3 w-[1000px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(192,57,43,0.08) 0%, transparent 60%)"
        }}
      />
    </footer>
  );
}
