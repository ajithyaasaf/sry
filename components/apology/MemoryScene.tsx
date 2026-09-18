"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { memory } from "@/content/memories";
import { HeartGraphic } from "@/components/ui/HeartGraphic";
import { ArrowRight, Sparkles } from "lucide-react";

interface MemorySceneProps {
  onNext: () => void;
}

export function MemoryScene({ onNext }: MemorySceneProps) {
  const [imageError, setImageError] = useState(false);

  const showRealPhoto = memory.enabled && !imageError;

  return (
    <div className="flex flex-col items-center justify-between px-4 py-8 min-h-[82vh] max-w-sm mx-auto text-center">
      {/* Top Header */}
      <div className="w-full">
        <span className="text-xs font-mono uppercase tracking-widest text-[#FF91A4] font-semibold flex items-center justify-center gap-1">
          <Sparkles className="w-3.5 h-3.5" /> A small reminder
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl text-[#FFF7F1] font-medium mt-1">
          {showRealPhoto ? "One of our memories" : "Just so you remember"}
        </h2>
      </div>

      {/* Centerpiece: Polaroid or Keepsake card */}
      <div className="w-full my-auto py-4">
        {showRealPhoto ? (
          /* Polaroid Frame with Real Photo */
          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#FFF7F1] text-[#100B0D] p-4 pb-6 rounded-2xl shadow-2xl border border-[#F7ECE4] mx-auto max-w-[280px]"
          >
            <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-[#191013] mb-3">
              <Image
                src={memory.image}
                alt={memory.caption}
                fill
                sizes="(max-width: 430px) 280px, 320px"
                className="object-cover"
                onError={() => setImageError(true)}
              />
            </div>
            <p className="font-serif text-xs sm:text-sm text-[#100B0D] font-medium italic px-1">
              &ldquo;{memory.caption}&rdquo;
            </p>
          </motion.div>
        ) : (
          /* Illustrated Romantic Keepsake Fallback */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#191013] border border-[#F05A72]/25 rounded-3xl p-6 shadow-2xl relative overflow-hidden text-center space-y-4"
          >
            <div className="my-2">
              <HeartGraphic size={64} animate glow />
            </div>

            <div className="space-y-2">
              <p className="font-serif text-lg sm:text-xl text-[#FFF7F1] font-medium">
                {memory.caption}
              </p>
              <p className="text-xs text-[#CDB9BA] leading-relaxed">
                {memory.subcaption || "Even when you're angry, you're still the cutest person I know."}
              </p>
            </div>

            <div className="pt-2">
              <span className="inline-block py-1 px-3 rounded-full bg-[#F05A72]/10 border border-[#F05A72]/20 text-[11px] font-mono text-[#FF91A4]">
                Forever favorite ❤️
              </span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Next Button */}
      <div className="w-full">
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#F05A72] to-[#FF91A4] text-white font-medium text-sm shadow-lg shadow-[#F05A72]/25 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Continue ❤️</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
}
