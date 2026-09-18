"use client";

import { motion } from "framer-motion";
import { apologyContent } from "@/content/apology";
import { HeartGraphic } from "@/components/ui/HeartGraphic";
import { ArrowRight } from "lucide-react";

interface IntroSceneProps {
  onNext: () => void;
}

export function IntroScene({ onNext }: IntroSceneProps) {
  const { intro } = apologyContent;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.7,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center text-center px-4 py-8 min-h-[80vh] max-w-sm mx-auto"
    >
      {/* Heart Visual */}
      <motion.div variants={itemVariants} className="mb-6">
        <HeartGraphic size={80} animate glow />
      </motion.div>

      {/* Intro Lines */}
      <motion.h1
        variants={itemVariants}
        className="font-serif text-3xl sm:text-4xl text-[#F5E9E2] font-medium tracking-tight mb-4"
      >
        {intro.greeting}
      </motion.h1>

      <motion.div variants={itemVariants} className="space-y-3 mb-8">
        <p className="text-lg text-[#F5E9E2] font-semibold">{intro.line1}</p>
        {"line2" in intro && Boolean((intro as Record<string, unknown>).line2) && (
          <p className="text-base text-[#F5E9E2]/80 italic">
            {String((intro as Record<string, unknown>).line2)}
          </p>
        )}
        <p className="text-sm text-[#F5E9E2]/90">{intro.line3}</p>
        <p className="text-sm font-semibold text-[#F5E9E2]">{intro.line4}</p>
      </motion.div>

      {/* CTA Button with Heart */}
      <motion.div variants={itemVariants} className="w-full">
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          className="w-full py-4 px-6 rounded-2xl bg-[#F5E9E2] text-[#C53041] font-bold text-base shadow-xl shadow-black/25 flex items-center justify-center gap-2 cursor-pointer transition-all hover:bg-white active:opacity-95"
        >
          <span>{intro.button}</span>
          <HeartGraphic size={18} inline />
          <ArrowRight className="w-4 h-4 ml-0.5 text-[#C53041]" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
