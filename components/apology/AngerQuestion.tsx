"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { initialQuestion } from "@/content/questions";
import { ArrowRight, Check } from "lucide-react";

interface AngerQuestionProps {
  initialChoice: string;
  onSelect: (choice: string) => void;
  onNext: () => void;
}

export function AngerQuestion({ initialChoice, onSelect, onNext }: AngerQuestionProps) {
  const [selected, setSelected] = useState<string>(initialChoice || "");

  const currentOption = initialQuestion.options.find((opt) => opt.id === selected);

  function handleSelect(id: string, label: string) {
    setSelected(id);
    onSelect(label);
  }

  return (
    <div className="flex flex-col items-center justify-center px-4 py-8 min-h-[80vh] max-w-sm mx-auto text-center">
      {/* Title */}
      <span className="text-xs font-mono uppercase tracking-widest text-[#F5E9E2]/80 mb-2 font-semibold">
        {initialQuestion.title}
      </span>
      <h2 className="font-serif text-2xl sm:text-3xl text-[#F5E9E2] font-medium mb-6">
        {initialQuestion.question}
      </h2>

      {/* Options */}
      <div className="w-full space-y-3.5 mb-6">
        {initialQuestion.options.map((opt) => {
          const isChosen = selected === opt.id;
          return (
            <motion.button
              key={opt.id}
              onClick={() => handleSelect(opt.id, opt.label)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.97 }}
              className={`w-full py-4 px-5 rounded-2xl border text-left font-medium text-sm flex items-center justify-between transition-all cursor-pointer shadow-md ${
                isChosen
                  ? "bg-[#F5E9E2] border-2 border-[#F5E9E2] text-[#C53041] font-bold shadow-xl shadow-black/25"
                  : "bg-[#3A060E]/75 border border-[#F5E9E2]/20 text-[#F5E9E2]/85 hover:border-[#F5E9E2]/45"
              }`}
            >
              <span className="text-base">{opt.label}</span>
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                  isChosen
                    ? "bg-[#C53041] border-[#C53041] text-[#F5E9E2]"
                    : "border-[#F5E9E2]/30"
                }`}
              >
                {isChosen && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Playful Response Card */}
      <div className="w-full min-h-[70px] mb-6">
        <AnimatePresence mode="wait">
          {currentOption && (
            <motion.div
              key={currentOption.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-3.5 bg-[#F5E9E2]/15 border border-[#F5E9E2]/30 rounded-xl text-xs text-[#F5E9E2] font-medium"
            >
              {currentOption.response}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Next Button */}
      <motion.button
        onClick={onNext}
        disabled={!selected}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        className="w-full py-4 px-6 rounded-2xl bg-[#F5E9E2] text-[#C53041] font-bold text-sm shadow-xl shadow-black/25 flex items-center justify-center gap-2 cursor-pointer transition-all hover:bg-white disabled:opacity-40 disabled:pointer-events-none"
      >
        <span>Let&apos;s see the damage</span>
        <ArrowRight className="w-4 h-4 text-[#C53041]" />
      </motion.button>
    </div>
  );
}
