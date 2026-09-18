"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { finalQuestionConfig } from "@/content/questions";
import { HeartGraphic } from "@/components/ui/HeartGraphic";
import { ArrowRight, Heart, ThumbsUp, ShieldAlert } from "lucide-react";

interface FinalQuestionProps {
  onSelect: (choice: string) => void;
  onProceed: (choice: string) => void;
}

export function FinalQuestion({ onSelect, onProceed }: FinalQuestionProps) {
  const [selected, setSelected] = useState<"okay" | "angry" | null>(null);

  const config = finalQuestionConfig;

  function handleChoose(choice: "okay" | "angry") {
    setSelected(choice);
    onSelect(choice === "okay" ? config.options.okay.label : config.options.angry.label);
  }

  return (
    <div className="flex flex-col items-center justify-between px-4 py-8 min-h-[82vh] max-w-sm mx-auto text-center">
      {/* Header */}
      <div className="w-full">
        <HeartGraphic size={64} animate glow className="mb-4" />
        <span className="text-xs font-mono uppercase tracking-widest text-[#F5E9E2]/80 font-semibold">
          {config.title}
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#F5E9E2] font-medium mt-2">
          {config.subtitle}
        </h2>
      </div>

      {/* Decision Buttons */}
      <div className="w-full my-auto space-y-4 py-6">
        {!selected ? (
          <div className="space-y-3.5">
            <motion.button
              onClick={() => handleChoose("okay")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              className="w-full py-4 px-6 rounded-2xl bg-[#F5E9E2] text-[#C53041] font-bold text-base shadow-xl shadow-black/25 flex items-center justify-center gap-2 cursor-pointer transition-all hover:bg-white"
            >
              <Heart className="w-5 h-5 fill-[#C53041] text-[#C53041]" />
              <span>{config.options.okay.label}</span>
            </motion.button>

            <motion.button
              onClick={() => handleChoose("angry")}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.96 }}
              className="w-full py-4 px-6 rounded-2xl bg-[#3A060E]/75 border border-[#F5E9E2]/30 text-[#F5E9E2] font-medium text-base hover:border-[#F5E9E2]/60 hover:text-white flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <span>{config.options.angry.label}</span>
            </motion.button>
          </div>
        ) : selected === "okay" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#F5E9E2] text-[#32050B] border-2 border-[#C53041]/20 rounded-3xl p-6 text-center space-y-3 shadow-2xl"
          >
            <div className="w-12 h-12 rounded-full bg-[#C53041]/15 text-[#C53041] flex items-center justify-center mx-auto">
              <ThumbsUp className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#32050B]">
              {config.options.okay.heading}
            </h3>
            <p className="text-sm text-[#C53041] font-semibold">
              {config.options.okay.message}
            </p>
            <p className="text-xs text-[#32050B]/80">
              {config.options.okay.p1}
            </p>
            <p className="text-xs text-[#C53041] font-semibold italic">
              {config.options.okay.p2}
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#F5E9E2] text-[#32050B] border-2 border-[#C53041]/20 rounded-3xl p-6 text-center space-y-3 shadow-2xl"
          >
            <div className="w-12 h-12 rounded-full bg-[#C53041]/15 text-[#C53041] flex items-center justify-center mx-auto">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#32050B]">
              {config.options.angry.heading}
            </h3>
            <p className="text-sm text-[#C53041] font-semibold">
              {config.options.angry.message}
            </p>
            <p className="text-xs text-[#32050B]/80">
              {config.options.angry.p1}
            </p>
            <p className="text-xs text-[#C53041] font-semibold italic">
              {config.options.angry.p2}
            </p>
          </motion.div>
        )}
      </div>

      {/* Advance Button (only after choice) */}
      <div className="w-full">
        {selected && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => onProceed(selected === "okay" ? "okay" : "angry")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-4 px-6 rounded-2xl bg-[#F5E9E2] text-[#C53041] font-bold text-sm shadow-xl shadow-black/25 flex items-center justify-center gap-2 cursor-pointer hover:bg-white transition-all"
          >
            <span>Continue to final note</span>
            <ArrowRight className="w-4 h-4 text-[#C53041]" />
          </motion.button>
        )}
      </div>
    </div>
  );
}
