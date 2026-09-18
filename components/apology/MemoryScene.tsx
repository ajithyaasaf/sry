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
    <div className="flex flex-col items-center justify-center px-4 py-8 min-h-[75vh] max-w-sm mx-auto text-center space-y-6">
      {/* Top Header */}
      <div className="w-full">
        <span className="text-xs font-mono uppercase tracking-widest text-[#F5E9E2]/80 font-semibold flex items-center justify-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-[#F5E9E2]" /> A small reminder
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl text-[#F5E9E2] font-medium mt-1">
          {showRealPhoto ? "One of our memories" : "Just so you remember"}
        </h2>
      </div>

      {/* Centerpiece: Polaroid or Keepsake card */}
      <div className="w-full">
        {showRealPhoto ? (
          /* Polaroid Frame with Real Photo in Warm Silk Cream */
          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#F5E9E2] text-[#32050B] p-4 pb-6 rounded-2xl shadow-2xl border-2 border-[#C53041]/20 mx-auto max-w-[280px]"
          >
            <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-[#3A060E] mb-3">
              <Image
                src={memory.image}
                alt={memory.caption}
                fill
                sizes="(max-width: 430px) 280px, 320px"
                className="object-cover"
                onError={() => setImageError(true)}
              />
            </div>
            <p className="font-serif text-xs sm:text-sm text-[#32050B] font-medium italic px-1">
              &ldquo;{memory.caption}&rdquo;
            </p>
          </motion.div>
        ) : (
          /* Illustrated Romantic Keepsake Fallback */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#3A060E]/75 border border-[#F5E9E2]/25 rounded-3xl p-6 shadow-2xl relative overflow-hidden text-center space-y-4"
          >
            <div className="my-2">
              <HeartGraphic size={64} animate glow />
            </div>

            <div className="space-y-2">
              <p className="font-serif text-lg sm:text-xl text-[#F5E9E2] font-medium">
                {memory.caption}
              </p>
              <p className="text-xs text-[#F5E9E2]/80 leading-relaxed">
                {memory.subcaption || "Just a small reminder that don't eat biscuits"}
              </p>
            </div>

            <div className="pt-2">
              <span className="inline-block py-1 px-3.5 rounded-full bg-[#F5E9E2]/15 border border-[#F5E9E2]/30 text-[11px] font-mono text-[#F5E9E2]">
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
          className="w-full py-4 px-6 rounded-2xl bg-[#F5E9E2] text-[#C53041] font-bold text-sm shadow-xl shadow-black/25 flex items-center justify-center gap-2 cursor-pointer hover:bg-white transition-all"
        >
          <span>Continue ❤️</span>
          <ArrowRight className="w-4 h-4 text-[#C53041]" />
        </motion.button>
      </div>
    </div>
  );
}
