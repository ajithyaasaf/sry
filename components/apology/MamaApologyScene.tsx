"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface MamaApologySceneProps {
  onNext: () => void;
}

export function MamaApologyScene({ onNext }: MamaApologySceneProps) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-8 min-h-[78vh] max-w-sm mx-auto text-center space-y-6">
      {/* Quiet, sincere card in our silk cream and dark crimson palette */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full bg-[#3A060E]/85 border border-[#F5E9E2]/25 rounded-3xl p-6 sm:p-7 shadow-2xl text-left space-y-4 relative overflow-hidden"
      >
        <span className="text-[11px] font-mono tracking-widest text-[#F5E9E2]/60 uppercase font-semibold block">
          From the heart
        </span>

        <p className="font-serif text-lg sm:text-xl text-[#F5E9E2] font-medium leading-relaxed">
          Pvi sorry for not being able to come during mama&apos;s final moments.
        </p>

        <p className="text-sm sm:text-base text-[#F5E9E2]/80 leading-relaxed italic">
          I know I can&apos;t just say sorry
        </p>

        <p className="text-sm sm:text-base text-[#F5E9E2]/90 leading-relaxed">
          But, trust me... I really wanted to be there and hld you tght...
        </p>

        <p className="text-sm sm:text-base text-[#F5E9E2]/90 leading-relaxed">
          Not being able to be there is something I&apos;ll regret forever.
        </p>

        <div className="pt-2 border-t border-[#F5E9E2]/15">
          <p className="font-serif text-lg sm:text-xl text-[#F5E9E2] font-semibold">
            I&apos;m truly sorry.
          </p>
        </div>

        <div className="pt-1 flex justify-end">
          <span className="font-serif text-xs text-[#F5E9E2]/60 italic font-medium">
            — Aji
          </span>
        </div>
      </motion.div>

      {/* Gentle, quiet Continue button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="w-full pt-1"
      >
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          className="w-full py-4 px-6 rounded-2xl bg-[#F5E9E2] text-[#C53041] font-bold text-sm shadow-xl shadow-black/25 flex items-center justify-center gap-2 cursor-pointer hover:bg-white transition-all"
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4 text-[#C53041]" />
        </motion.button>
      </motion.div>
    </div>
  );
}
