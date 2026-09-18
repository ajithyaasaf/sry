"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { apologyContent } from "@/content/apology";
import { HeartGraphic } from "@/components/ui/HeartGraphic";
import { ArrowRight, Mail } from "lucide-react";

interface EnvelopeSceneProps {
  onNext: () => void;
}

export function EnvelopeScene({ onNext }: EnvelopeSceneProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { envelope } = apologyContent;

  return (
    <div className="flex flex-col items-center justify-center px-4 py-8 min-h-[82vh] max-w-sm mx-auto text-center">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="envelope-closed"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="w-full flex flex-col items-center"
          >
            {/* Context Heading */}
            <div className="mb-6 space-y-2">
              <h2 className="font-serif text-xl sm:text-2xl text-[#FFF7F1] font-medium leading-snug">
                {envelope.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#CDB9BA]">
                {envelope.subtitle}
              </p>
              <p className="text-xs text-[#FF91A4] font-medium pt-1">
                {envelope.tease}
              </p>
            </div>

            {/* Tactile Envelope Container */}
            <div
              className="relative w-full max-w-[280px] h-[190px] mb-8 cursor-pointer group"
              onClick={() => setIsOpen(true)}
            >
              {/* Envelope Body */}
              <div className="absolute inset-0 bg-[#22161A] border-2 border-[#FFF7F1]/20 rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden">
                {/* Envelope Flap Lines */}
                <svg
                  className="absolute inset-0 w-full h-full text-[#FFF7F1]/10 pointer-events-none"
                  viewBox="0 0 280 190"
                  fill="none"
                >
                  <path d="M0 0 L140 110 L280 0" stroke="currentColor" strokeWidth="2" />
                  <path d="M0 190 L105 105" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M280 190 L175 105" stroke="currentColor" strokeWidth="1.5" />
                </svg>

                {/* Wax Seal with our main.svg heart */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.92 }}
                  className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-tr from-[#C42A46] to-[#F05A72] border-2 border-[#FFF7F1]/40 flex items-center justify-center shadow-lg shadow-[#F05A72]/30"
                >
                  <HeartGraphic size={28} glow={false} />
                </motion.div>
              </div>
            </div>

            {/* Open Button */}
            <motion.button
              onClick={() => setIsOpen(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3.5 px-6 rounded-2xl bg-[#FFF7F1] text-[#100B0D] font-semibold text-sm shadow-lg flex items-center justify-center gap-2 hover:bg-[#FFF7F1]/95 transition-all cursor-pointer"
            >
              <Mail className="w-4 h-4 text-[#F05A72]" />
              <span>{envelope.button}</span>
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="envelope-opened"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="w-full flex flex-col items-center"
          >
            {/* The Letter Card */}
            <div className="w-full bg-[#FFF7F1] text-[#100B0D] rounded-3xl p-6 sm:p-7 shadow-2xl border border-[#F7ECE4] text-left relative overflow-hidden mb-6">
              {/* Subtle top stamp */}
              <div className="flex items-center justify-between border-b border-[#100B0D]/10 pb-3 mb-5">
                <span className="text-[11px] font-mono tracking-widest text-[#F05A72] uppercase font-bold">
                  Official Apology Dispatch
                </span>
                <HeartGraphic size={20} glow={false} />
              </div>

              <h3 className="font-serif text-2xl text-[#100B0D] font-bold mb-3">
                {envelope.letterGreeting}
              </h3>

              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#100B0D]/85">
                <p className="font-medium text-[#F05A72] text-lg font-serif flex items-center gap-1.5">
                  <span>{envelope.letterBody}</span>
                  <HeartGraphic size={20} inline />
                </p>
                <p className="text-xs sm:text-sm text-[#100B0D]/75 italic">
                  {envelope.letterNote}
                </p>
              </div>

              {/* Aji Signoff */}
              <div className="mt-6 pt-3 border-t border-[#100B0D]/10 flex justify-end">
                <span className="font-serif italic text-sm text-[#100B0D] font-bold inline-flex items-center gap-1">
                  — Aji <HeartGraphic size={16} inline />
                </span>
              </div>
            </div>

            {/* Continue Button */}
            <motion.button
              onClick={onNext}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#F05A72] to-[#FF91A4] text-white font-medium text-sm shadow-lg shadow-[#F05A72]/25 flex items-center justify-center gap-2 cursor-pointer transition-transform"
            >
              <span>{envelope.continueButton}</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
