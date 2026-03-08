"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
  AnimatePresence,
} from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────
interface SceneConfig {
  id: string;
  image: string | null;
  /**
   * enterAt  — scroll% when this scene starts becoming visible (opacity 0→1)
   * fullAt   — scroll% when this scene is fully opaque
   * leaveAt  — scroll% when this scene starts fading (opacity 1→0)
   * goneAt   — scroll% when this scene is completely gone
   */
  enterAt: number;
  fullAt: number;
  leaveAt: number;
  goneAt: number;
  eyebrow?: string;
  headline: string[];
  sub?: string;
  overlay: string;
  textSide?: "left" | "center" | "right";
  vertPos?: "top" | "center" | "bottom";
  kenBurnsDir?: "in" | "out"; // zoom in or zoom out
}

// ─── Scene timeline (700 vh total → progress 0→1) ─────────────────────────────
const SCENES: SceneConfig[] = [
  // 0 — TITLE CARD (pure black, holds while name wakes up on page load)
  {
    id: "title",
    image: null,
    enterAt: 0,
    fullAt: 0.001,
    leaveAt: 0.09,
    goneAt: 0.15,
    headline: [],                       // name handled separately below
    overlay: "rgba(6,6,6,1)",
    textSide: "center",
    vertPos: "center",
  },
  // 1 — STREET
  {
    id: "street",
    image: "/section_street.png",
    enterAt: 0.11,
    fullAt: 0.17,
    leaveAt: 0.27,
    goneAt: 0.33,
    eyebrow: "Chapter I",
    headline: ["₹600 a day.", "A crowded street."],
    sub: "Before the white coat, there were flyers.",
    overlay: "rgba(0,0,0,0.52)",
    textSide: "left",
    vertPos: "bottom",
    kenBurnsDir: "out",
  },
  // 2 — CONSTRUCTION
  {
    id: "construction",
    image: "/section_construction.png",
    enterAt: 0.29,
    fullAt: 0.35,
    leaveAt: 0.45,
    goneAt: 0.51,
    eyebrow: "Chapter II",
    headline: ["Another job.", "Another lesson."],
    sub: "The construction site didn't break him — it forged him.",
    overlay: "rgba(0,0,0,0.50)",
    textSide: "left",
    vertPos: "bottom",
    kenBurnsDir: "in",
  },
  // 3 — AMBULANCE NIGHT
  {
    id: "ambulance",
    image: "/section_ambulance.png",
    enterAt: 0.47,
    fullAt: 0.53,
    leaveAt: 0.62,
    goneAt: 0.68,
    eyebrow: "Chapter III",
    headline: ["Sirens.", "Long nights."],
    sub: "Life hangs by a thread. He learned that faster than most.",
    overlay: "rgba(0,0,0,0.65)",
    textSide: "right",
    vertPos: "center",
    kenBurnsDir: "out",
  },
  // 4 — OBSERVATION
  {
    id: "observation",
    image: "/section_observation.png",
    enterAt: 0.64,
    fullAt: 0.70,
    leaveAt: 0.78,
    goneAt: 0.83,
    eyebrow: "Chapter IV",
    headline: ["He wasn't just watching.", "He was learning."],
    sub: "The streets became his first laboratory.",
    overlay: "rgba(0,0,0,0.55)",
    textSide: "right",
    vertPos: "center",
    kenBurnsDir: "in",
  },
  // 5 — STUDYING / TRANSFORMATION
  {
    id: "studying",
    image: "/section_studying.png",
    enterAt: 0.79,
    fullAt: 0.85,
    leaveAt: 0.92,
    goneAt: 0.96,
    eyebrow: "Chapter V",
    headline: ["The streets built the man.", "Science built the doctor."],
    overlay: "rgba(0,0,0,0.62)",
    textSide: "center",
    vertPos: "center",
    kenBurnsDir: "out",
  },
  // 6 — DETECTIVE REVEAL (final cinematic beat)
  {
    id: "detective",
    image: "/section_detective.png",
    enterAt: 0.92,
    fullAt: 0.96,
    leaveAt: 0.99,
    goneAt: 1.0,
    headline: ["Disease is a mystery.", "I am the detective."],
    overlay: "rgba(0,0,0,0.68)",
    textSide: "center",
    vertPos: "center",
    kenBurnsDir: "in",
  },
];

// ─── Safe useTransform — ensures keyframes array is strictly increasing ────────
function safeTransform(
  sv: MotionValue<number>,
  input: number[],
  output: (string | number)[]
): MotionValue<string | number> {
  // Clamp duplicates to a tiny offset
  const safe = input.map((v, i) => (i > 0 && v <= input[i - 1] ? input[i - 1] + 0.0001 : v));
  return useTransform(sv, safe, output) as MotionValue<string | number>;
}

// ─── Single Cinematic Scene ───────────────────────────────────────────────────
function CinematicScene({
  config,
  scroll,
}: {
  config: SceneConfig;
  scroll: MotionValue<number>;
}) {
  const { enterAt, fullAt, leaveAt, goneAt } = config;

  // Scene opacity crossfade
  const opacity = useTransform(
    scroll,
    [enterAt, fullAt, leaveAt, goneAt],
    [0, 1, 1, 0]
  );

  // Ken Burns scale — direction configurable
  const kbStart = config.kenBurnsDir === "in" ? 1.0 : 1.12;
  const kbEnd   = config.kenBurnsDir === "in" ? 1.12 : 1.0;
  const scale   = useTransform(scroll, [enterAt, goneAt], [kbStart, kbEnd]);

  // Vertical parallax on background image
  const imgY = useTransform(scroll, [enterAt, goneAt], ["-6%", "6%"]);

  // Text appears/disappears slightly inside the scene window
  const tEnter = Math.min(fullAt + 0.025, leaveAt - 0.01);
  const tLeave = Math.max(leaveAt - 0.015, tEnter + 0.005);

  const textOpacity = useTransform(
    scroll,
    [fullAt, tEnter, tLeave, leaveAt],
    [0, 1, 1, 0]
  );
  const textY = useTransform(scroll, [fullAt, leaveAt], ["18px", "-18px"]);

  const alignClass =
    config.textSide === "center"
      ? "items-center text-center"
      : config.textSide === "right"
      ? "items-end text-right"
      : "items-start text-left";

  const vertClass =
    config.vertPos === "top"
      ? "justify-start pt-28"
      : config.vertPos === "bottom"
      ? "justify-end pb-24"
      : "justify-center";

  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 overflow-hidden will-change-[opacity]"
    >
      {/* ── Background image with Ken Burns ── */}
      {config.image && (
        <motion.div
          style={{ scale, y: imgY, originX: "50%", originY: "50%" }}
          className="absolute inset-[-12%] will-change-transform"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={config.image}
            alt=""
            className="w-full h-full object-cover"
            style={{ pointerEvents: "none", userSelect: "none" }}
          />
        </motion.div>
      )}

      {/* ── Multi-layer overlay ── */}
      <div className="absolute inset-0" style={{ background: config.overlay }} />
      {/* Edge vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 85% 85% at 50% 50%, transparent 30%, rgba(0,0,0,0.75) 100%)",
        }}
      />
      {/* Bottom feather */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(6,6,6,0.9))" }}
      />

      {/* ── Text overlay ── */}
      {config.headline.length > 0 && (
        <div className={`absolute inset-0 flex flex-col ${vertClass} ${alignClass} px-10 md:px-20 lg:px-28`}>
          <motion.div
            style={{ opacity: textOpacity, y: textY }}
            className="max-w-2xl"
          >
            {config.eyebrow && (
              <p
                className="text-[9px] tracking-[0.5em] uppercase font-semibold mb-4"
                style={{ color: "#c0392b" }}
              >
                — {config.eyebrow} —
              </p>
            )}

            <div className="mb-4">
              {config.headline.map((line, i) => (
                <h2
                  key={i}
                  className="font-display font-black leading-[1.05]"
                  style={{
                    fontSize: "clamp(2rem, 5.5vw, 4.5rem)",
                    color:
                      i === config.headline.length - 1
                        ? "#ffffff"
                        : "rgba(255,255,255,0.5)",
                    letterSpacing: "-0.02em",
                    display: "block",
                  }}
                >
                  {line}
                </h2>
              ))}
            </div>

            {config.sub && (
              <p
                className="text-sm md:text-base leading-relaxed font-light"
                style={{
                  color: "rgba(255,255,255,0.5)",
                  maxWidth: "380px",
                  marginTop: "0.5rem",
                  display: config.textSide === "center" ? "block" : "block",
                }}
              >
                {config.sub}
              </p>
            )}
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

// ─── Title Card Scene (special — uses mount-time CSS animations) ──────────────
function TitleCardScene({ scroll }: { scroll: MotionValue<number> }) {
  const opacity = useTransform(scroll, [0, 0.001, 0.09, 0.15], [1, 1, 1, 0]);

  const scrollHintOpacity = useTransform(scroll, [0, 0.04], [1, 0]);

  const nameY = useTransform(scroll, [0.001, 0.09], ["0px", "-30px"]);

  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{ background: "#060606" }}
      />

      {/* Ambient red glow */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: "70vw",
          height: "70vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(192,57,43,0.1) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Animated scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(192,57,43,0.5), transparent)",
          top: "50%",
        }}
        animate={{ opacity: [0, 0.8, 0], y: ["-50vh", "0vh", "50vh"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
      />

      {/* Corner brackets */}
      {[
        { top: "2rem", left: "2rem", borderTop: "1px solid", borderLeft: "1px solid" },
        { top: "2rem", right: "2rem", borderTop: "1px solid", borderRight: "1px solid" },
        { bottom: "2rem", left: "2rem", borderBottom: "1px solid", borderLeft: "1px solid" },
        { bottom: "2rem", right: "2rem", borderBottom: "1px solid", borderRight: "1px solid" },
      ].map((s, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{ ...s, width: 28, height: 28, borderColor: "rgba(192,57,43,0.4)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8 + i * 0.1, duration: 0.8 }}
        />
      ))}

      {/* Name block — mount-time animation */}
      <motion.div
        style={{ y: nameY }}
        className="relative z-10 text-center px-6"
      >
        {/* Teaser lines */}
        <div className="mb-10 space-y-1">
          {[
            { text: "I was a jack of all trades.", delay: 0.3 },
            { text: "Master of nothing.", delay: 0.65 },
            { text: "Until I discovered the secret.", delay: 1.0 },
          ].map(({ text, delay }) => (
            <div key={text} className="overflow-hidden">
              <motion.p
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay }}
                className="font-display italic"
                style={{
                  fontSize: "clamp(1rem, 2.2vw, 1.4rem)",
                  color: "rgba(255,255,255,0.45)",
                }}
              >
                {text}
              </motion.p>
            </div>
          ))}
        </div>

        {/* Red rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-8 h-px w-32"
          style={{
            background:
              "linear-gradient(90deg, transparent, #c0392b 40%, #e74c3c 60%, transparent)",
            transformOrigin: "center",
          }}
        />

        {/* Name */}
        <div className="overflow-hidden mb-4">
          <motion.h1
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black uppercase glow-red"
            style={{
              fontSize: "clamp(3.5rem, 10vw, 9rem)",
              lineHeight: 1,
              letterSpacing: "-0.01em",
              color: "#fff",
            }}
          >
            Dr Alan V.L.
          </motion.h1>
        </div>

        {/* Subtitle */}
        <div className="overflow-hidden mb-2">
          <motion.p
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1, delay: 2.05, ease: [0.16, 1, 0.3, 1] }}
            className="font-display italic font-semibold"
            style={{
              fontSize: "clamp(1.2rem, 3vw, 2.4rem)",
              color: "#c0392b",
            }}
          >
            The Medical Detective
          </motion.p>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 2.7 }}
          className="text-xs tracking-[0.3em] uppercase mt-2"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          Author&nbsp;·&nbsp;Entrepreneur&nbsp;·&nbsp;Public Speaker
        </motion.p>
      </motion.div>

      {/* Scroll to begin */}
      <motion.div
        style={{ opacity: scrollHintOpacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2, duration: 1 }}
      >
        <motion.div
          className="w-px bg-white/30"
          animate={{ height: [0, 40, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 3.2 }}
        />
        <p
          className="text-[9px] tracking-[0.35em] uppercase mt-1"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          Scroll
        </p>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px" }}
        >
          ↓
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ─── Chapter HUD ─────────────────────────────────────────────────────────────
function ChapterHUD({ scroll }: { scroll: MotionValue<number> }) {
  const [activeChapter, setActiveChapter] = useState<string | null>(null);

  useEffect(() => {
    const unsub = scroll.on("change", (v) => {
      const active = SCENES.find(
        (s) => s.eyebrow && v >= s.fullAt - 0.01 && v <= s.leaveAt + 0.01
      );
      setActiveChapter(active?.eyebrow ?? null);
    });
    return unsub;
  }, [scroll]);

  return (
    <AnimatePresence mode="wait">
      {activeChapter && (
        <motion.div
          key={activeChapter}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 12 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-8 left-8 z-50 pointer-events-none"
        >
          <p
            className="text-[9px] tracking-[0.4em] uppercase font-semibold"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            {activeChapter}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Bottom Progress HUD ──────────────────────────────────────────────────────
function ProgressHUD({ scroll }: { scroll: MotionValue<number> }) {
  const scaleX = useSpring(
    useTransform(scroll, [0, 1], [0, 1]),
    { stiffness: 100, damping: 30 }
  );

  // Fade out once journey ends
  const hudOpacity = useTransform(scroll, [0.95, 1], [1, 0]);

  return (
    <motion.div
      style={{ opacity: hudOpacity }}
      className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none"
    >
      <motion.div
        id="scroll-progress"
        style={{ scaleX }}
      />
    </motion.div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function CinematicJourney() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <>
      {/* Global HUDs — live outside sticky so they stay fixed */}
      <ChapterHUD scroll={scrollYProgress} />
      <ProgressHUD scroll={scrollYProgress} />

      {/* ── The 700vh scroll container ── */}
      <div ref={containerRef} style={{ height: "700vh" }} className="relative">
        {/* Sticky 100vh viewport that holds all scenes */}
        <div className="sticky top-0 h-screen overflow-hidden" style={{ background: "#060606" }}>

          {/* ── All scenes stacked absolutely ── */}
          <div className="absolute inset-0">
            {/* Special title card */}
            <TitleCardScene scroll={scrollYProgress} />

            {/* Image-driven scenes */}
            {SCENES.filter((s) => s.id !== "title").map((scene) => (
              <CinematicScene
                key={scene.id}
                config={scene}
                scroll={scrollYProgress}
              />
            ))}
          </div>

          {/* ── Letterbox bars (top + bottom) ── */}
          <div
            className="absolute top-0 left-0 right-0 h-12 pointer-events-none z-30"
            style={{ background: "linear-gradient(to bottom, rgba(6,6,6,0.9), transparent)" }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none z-30"
            style={{ background: "linear-gradient(to top, rgba(6,6,6,1), transparent)" }}
          />
        </div>
      </div>

      {/* ── Transition bridge into Empire/Books sections ── */}
      <div
        className="relative z-10 h-24"
        style={{
          background:
            "linear-gradient(to bottom, rgba(6,6,6,1) 0%, rgba(6,6,6,1) 100%)",
        }}
      />
    </>
  );
}
