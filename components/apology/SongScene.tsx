"use client";

import { motion } from "framer-motion";
import { Play, ArrowRight, Music } from "lucide-react";

interface SongSceneProps {
  isPlaying: boolean;
  onProceed: () => void;
}

export function SongScene({ isPlaying, onProceed }: SongSceneProps) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-8 min-h-[75vh] max-w-sm mx-auto text-center space-y-6">
      {/* Header and personal note */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full space-y-3"
      >
        <div className="w-10 h-10 rounded-full bg-[#F5E9E2]/15 border border-[#F5E9E2]/25 flex items-center justify-center mx-auto text-[#F5E9E2]">
          <Music className={`w-4 h-4 ${isPlaying ? "animate-pulse" : ""}`} />
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl text-[#F5E9E2] font-medium leading-snug">
          I don&apos;t really know what else to say...
        </h2>

        <p className="text-sm text-[#F5E9E2]/80 italic">
          So I picked a little something for you.
        </p>
      </motion.div>

      {/* Play Button - Starts the song & immediately proceeds to the next scene */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="w-full py-2 space-y-3"
      >
        <motion.button
          onClick={onProceed}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-4 px-6 rounded-2xl bg-[#F5E9E2] text-[#C53041] font-bold text-sm shadow-xl flex items-center justify-center gap-2.5 cursor-pointer hover:bg-white transition-all"
          aria-label="Play song and continue"
        >
          <Play className="w-4 h-4 fill-current ml-0.5" />
          <span>Play</span>
        </motion.button>

        {/* Continue Button - Also starts the song & immediately proceeds to next scene */}
        <motion.button
          onClick={onProceed}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          className="w-full py-3.5 px-6 rounded-2xl bg-[#3A060E]/75 border border-[#F5E9E2]/25 text-[#F5E9E2] text-sm font-semibold hover:border-[#F5E9E2]/50 hover:text-white shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
          aria-label="Continue to next step"
        >
          <span>Continue ❤️</span>
          <ArrowRight className="w-4 h-4 text-[#F5E9E2]" />
        </motion.button>
      </motion.div>
    </div>
  );
}
