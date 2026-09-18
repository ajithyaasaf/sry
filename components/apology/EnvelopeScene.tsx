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
              <h2 className="font-serif text-xl sm:text-2xl text-[#F5E9E2] font-medium leading-snug">
                {envelope.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#F5E9E2]/80">
                {envelope.subtitle}
              </p>
              <p className="text-xs text-[#F5E9E2] font-semibold pt-1">
                {envelope.tease}
              </p>
            </div>

            {/* Tactile Envelope Container - Fine Silk Cream Envelope Paper */}
            <div
              className="relative w-full max-w-[280px] h-[190px] mb-8 cursor-pointer group"
              onClick={() => setIsOpen(true)}
            >
              {/* Envelope Body */}
              <div className="absolute inset-0 bg-[#F5E9E2] border-2 border-[#C53041]/25 rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden">
                {/* Envelope Flap Lines */}
                <svg
                  className="absolute inset-0 w-full h-full text-[#C53041]/25 pointer-events-none"
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
                  className="relative z-10 w-14 h-14 rounded-full bg-[#C53041] border-2 border-[#F5E9E2] flex items-center justify-center shadow-xl shadow-black/25"
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
              className="w-full py-4 px-6 rounded-2xl bg-[#F5E9E2] text-[#C53041] font-bold text-sm shadow-xl shadow-black/25 flex items-center justify-center gap-2 hover:bg-white transition-all cursor-pointer"
            >
              <Mail className="w-4 h-4 text-[#C53041]" />
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
            {/* The Letter Card in Warm Silk Cream */}
            <div className="w-full bg-[#F5E9E2] text-[#32050B] rounded-3xl p-6 sm:p-7 shadow-2xl border-2 border-[#C53041]/20 text-left relative overflow-hidden mb-6">
              {/* Subtle top stamp */}
              <div className="flex items-center justify-between border-b border-[#C53041]/15 pb-3 mb-5">
                <span className="text-[11px] font-mono tracking-widest text-[#C53041] uppercase font-bold">
                  Official Apology Dispatch
                </span>
                <HeartGraphic size={20} glow={false} />
              </div>

              <h3 className="font-serif text-2xl text-[#32050B] font-bold mb-3">
                {envelope.letterGreeting}
              </h3>

              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#32050B]/90">
                <p className="font-semibold text-[#C53041] text-lg font-serif flex items-center gap-1.5">
                  <span>{envelope.letterBody}</span>
                  <HeartGraphic size={20} inline />
                </p>
                <p className="text-xs sm:text-sm text-[#32050B]/75 italic">
                  {envelope.letterNote}
                </p>
              </div>

              {/* Aji Signoff */}
              <div className="mt-6 pt-3 border-t border-[#C53041]/15 flex justify-end">
                <span className="font-serif italic text-sm text-[#32050B] font-bold inline-flex items-center gap-1">
                  — Aji <HeartGraphic size={16} inline />
                </span>
              </div>
            </div>

            {/* Continue Button */}
            <motion.button
              onClick={onNext}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-4 px-6 rounded-2xl bg-[#F5E9E2] text-[#C53041] font-bold text-sm shadow-xl shadow-black/25 flex items-center justify-center gap-2 cursor-pointer transition-all hover:bg-white"
            >
              <span>{envelope.continueButton}</span>
              <ArrowRight className="w-4 h-4 text-[#C53041]" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
