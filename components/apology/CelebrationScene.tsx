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

  // Subtle confetti / heart sparkles with pure deterministic positions
  const sparkles = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      x: ((i * 37) % 260) - 130,
      y: ((i * 47) % 320) - 160,
      size: 4 + (i % 5) * 2,
      delay: (i * 0.12) % 0.8,
      color: i % 2 === 0 ? "#F05A72" : "#FFD166",
    }));
  }, []);

  return (
    <div className="flex flex-col items-center justify-between px-4 py-8 min-h-[82vh] max-w-sm mx-auto text-center relative overflow-hidden">
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
        <div className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-widest text-[#FFD166] bg-[#FFD166]/10 border border-[#FFD166]/20 px-3 py-1 rounded-full mb-4">
          <Sparkles className="w-3.5 h-3.5" /> Forgiveness Achieved
        </div>
        <HeartGraphic size={76} animate glow className="mb-2" />
      </div>

      {/* Main Celebration Copy */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full my-auto space-y-4 py-6"
      >
        <h2 className="font-serif text-3xl sm:text-4xl text-[#FFF7F1] font-bold">
          YESSS 😭❤️
        </h2>
        <div className="space-y-2 text-sm sm:text-base text-[#CDB9BA]">
          <p className="text-[#FFF7F1] font-medium text-lg">
            Okay, we&apos;re officially good.
          </p>
          <p className="italic text-xs text-[#CDB9BA]/80">Probably.</p>
          <p className="text-xl pt-1">😂❤️</p>
        </div>
      </motion.div>

      {/* CTA Button */}
      <div className="w-full">
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#F05A72] to-[#FF91A4] text-white font-medium text-sm shadow-lg shadow-[#F05A72]/25 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Read my final message</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
}
