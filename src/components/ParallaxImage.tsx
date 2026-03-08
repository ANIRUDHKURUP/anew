"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number;
  overlay?: string;
}

export function ParallaxImage({
  src,
  alt,
  speed = 0.25,
  overlay = "rgba(0,0,0,0.65)",
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Smooth out the parallax to avoid jitter
  const rawY = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}%`, `${speed * 100}%`]);
  const y = useSpring(rawY, { stiffness: 80, damping: 20, mass: 0.5 });

  // Slight scale on entrance
  const scale = useTransform(scrollYProgress, [0, 0.15], [1.08, 1]);
  const springScale = useSpring(scale, { stiffness: 80, damping: 20, mass: 0.5 });

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div
        style={{ y }}
        className="absolute inset-[-25%] w-[150%] h-[150%]"
      >
        <motion.img
          src={src}
          alt={alt}
          style={{ scale: springScale }}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </motion.div>

      {/* Multi-layer overlay for depth */}
      <div
        className="absolute inset-0"
        style={{ background: overlay }}
      />
      {/* Vignette edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 40%, rgba(0,0,0,0.75) 100%)",
        }}
      />
      {/* Bottom gradient to blend into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(6,6,6,0.95))",
        }}
      />
      {/* Top gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to top, transparent, rgba(6,6,6,0.6))",
        }}
      />
    </div>
  );
}
