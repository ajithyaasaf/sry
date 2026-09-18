"use client";

import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

export function ShutdownScreen() {
  return (
    <main className="w-full min-h-screen flex items-center justify-center px-4 py-8 relative">
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md mx-auto"
      >
        <div className="relative rounded-3xl p-8 sm:p-10 bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-center overflow-hidden">
          {/* Subtle decorative glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#C53041]/30 rounded-full blur-3xl pointer-events-none" />

          {/* Status Indicator */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-white/[0.06] border border-white/15 flex items-center justify-center text-[#F5E9E2]/80 shadow-inner"
          >
            <AlertCircle className="w-7 h-7 stroke-[1.75]" />
          </motion.div>

          {/* Status pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-xs font-medium text-[#F5E9E2]/70 tracking-wider uppercase mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 animate-pulse" />
            Notice
          </div>

          {/* Main Message requested by user */}
          <h1 className="font-serif text-2xl sm:text-3xl text-[#F5E9E2] font-normal leading-snug tracking-tight mb-3">
            sorry something is wrong with the user
          </h1>

          <p className="text-sm text-[#F5E9E2]/60 font-sans max-w-xs mx-auto leading-relaxed">
            Avantaye ennanu kelu.....
          </p>
        </div>
      </motion.div>
    </main>
  );
}
