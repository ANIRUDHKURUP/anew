"use client";

// ScrollUI is intentionally minimal for the cinematic experience.
// The progress bar is handled by CinematicJourney's ProgressHUD for the scroll journey,
// and the regular sections below the journey have their own subtle progress via this component.

import { useScroll, useSpring, useTransform, motion } from "framer-motion";

export default function ScrollUI() {
  const { scrollYProgress } = useScroll();
  // Only show once the cinematic journey has ended (after ~87% of page height)
  const opacity = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      style={{ opacity, scaleX, transformOrigin: "left" }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[10000]"
      aria-hidden
      id="scroll-progress-top"
    >
      <div
        className="w-full h-full"
        style={{ background: "linear-gradient(90deg, #c0392b, #e74c3c)" }}
      />
    </motion.div>
  );
}
