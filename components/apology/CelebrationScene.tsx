"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { HeartGraphic } from "@/components/ui/HeartGraphic";
import { ArrowRight, Sparkles } from "lucide-react";

interface CelebrationSceneProps {
  onNext: () => void;
}

export function CelebrationScene({ onNext }: CelebrationSceneProps) {
  const shouldReduceMotion = useReducedMotion();

  // Subtle confetti / heart sparkles with pure deterministic positions in cream and crimson
  const sparkles = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      x: ((i * 37) % 260) - 130,
      y: ((i * 47) % 320) - 160,
      size: 4 + (i % 5) * 2,
      delay: (i * 0.12) % 0.8,
      color: i % 2 === 0 ? "#F5E9E2" : "#C53041",
    }));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center px-4 py-8 min-h-[75vh] max-w-sm mx-auto text-center relative overflow-hidden space-y-8">
      {/* Gentle Floating Confetti particles */}
      {!shouldReduceMotion && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          {sparkles.map((s) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
              animate={{
                opacity: [0, 1, 0.8, 0],
                scale: [0, 1.2, 1, 0.5],
                x: s.x,
                y: s.y,
              }}
              transition={{
                duration: 2.5,
                delay: s.delay,
                ease: "easeOut",
              }}
              className="absolute rounded-full"
              style={{
                width: s.size,
                height: s.size,
                backgroundColor: s.color,
                boxShadow: `0 0 10px ${s.color}`,
              }}
            />
          ))}
        </div>
      )}

      {/* Header */}
      <div className="w-full">
        <div className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-widest text-[#F5E9E2] bg-[#F5E9E2]/15 border border-[#F5E9E2]/30 px-3.5 py-1 rounded-full mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#F5E9E2]" /> Forgiveness Achieved
        </div>
        <HeartGraphic size={76} animate glow className="mb-2" />
      </div>

      {/* Main Celebration Copy */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full space-y-3"
      >
        <h2 className="font-serif text-3xl sm:text-4xl text-[#F5E9E2] font-bold">
          YESSS 😭❤️
        </h2>
        <div className="space-y-2 text-sm sm:text-base text-[#F5E9E2]/85">
          <p className="text-[#F5E9E2] font-semibold text-lg">
            Okay, we&apos;re officially good.
          </p>
          <p className="italic text-xs text-[#F5E9E2]/80">Probably.</p>
          <p className="text-xl pt-1">😂❤️</p>
        </div>
      </motion.div>

      {/* CTA Button */}
      <div className="w-full pt-2">
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-4 px-6 rounded-2xl bg-[#F5E9E2] text-[#C53041] font-bold text-sm shadow-xl shadow-black/25 flex items-center justify-center gap-2 cursor-pointer hover:bg-white transition-all"
        >
          <span>Read my final message</span>
          <ArrowRight className="w-4 h-4 text-[#C53041]" />
        </motion.button>
      </div>
    </div>
  );
}
