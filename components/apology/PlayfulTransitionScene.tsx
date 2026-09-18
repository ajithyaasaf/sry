"use client";

import { motion } from "framer-motion";
import { HeartGraphic } from "@/components/ui/HeartGraphic";
import { ArrowRight, Mail } from "lucide-react";

interface PlayfulTransitionSceneProps {
  onNext: () => void;
}

export function PlayfulTransitionScene({ onNext }: PlayfulTransitionSceneProps) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-8 min-h-[75vh] max-w-sm mx-auto text-center space-y-7">
      {/* Visual Transition */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <HeartGraphic size={72} animate glow />
      </motion.div>

      {/* Transition copy */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="w-full space-y-3"
      >
        <span className="text-xs font-mono uppercase tracking-widest text-[#F5E9E2]/80 font-bold block">
          Chapter 2
        </span>

        <h2 className="font-serif text-2xl sm:text-3xl text-[#F5E9E2] font-semibold leading-snug">
          Okay... that was the serious one.
        </h2>

        <p className="text-sm sm:text-base text-[#F5E9E2]/90 leading-relaxed font-medium">
          Now let&apos;s deal with those 50 sorries you asked for. ✨
        </p>
      </motion.div>

      {/* Button to proceed to the envelope */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="w-full pt-2"
      >
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-4 px-6 rounded-2xl bg-[#F5E9E2] text-[#C53041] font-bold text-sm shadow-xl shadow-black/25 flex items-center justify-center gap-2 cursor-pointer hover:bg-white transition-all"
        >
          <Mail className="w-4 h-4 text-[#C53041]" />
          <span>Open Envelope</span>
          <ArrowRight className="w-4 h-4 text-[#C53041]" />
        </motion.button>
      </motion.div>
    </div>
  );
}
