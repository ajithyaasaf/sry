"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { apologyContent } from "@/content/apology";
import { HeartGraphic } from "@/components/ui/HeartGraphic";
import { ArrowRight, Sparkles, Award } from "lucide-react";

interface SorryCounterProps {
  currentCount: number;
  onIncrement: (newCount: number) => void;
  onNext: () => void;
}

interface FloatingHeart {
  id: number;
  x: number;
  scale: number;
}

export function SorryCounter({ currentCount, onIncrement, onNext }: SorryCounterProps) {
  const [count, setCount] = useState<number>(currentCount || 0);
  const [bonusRevealed, setBonusRevealed] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);

  const { apologies, milestones, bonusSorry } = apologyContent;

  // Active apology message
  const activeMessage =
    count > 0 ? apologies[Math.min(count - 1, apologies.length - 1)] : "Tap the button to start collecting your sorries 😇";

  // Check if current count is a milestone
  const activeMilestone = milestones[count];

  const handleTap = useCallback(() => {
    if (count >= 50) return;

    const nextCount = count + 1;
    setCount(nextCount);
    onIncrement(nextCount);

    // Safe haptic feedback if supported
    try {
      if (typeof window !== "undefined" && "vibrate" in navigator) {
        navigator.vibrate(20);
      }
    } catch {}

    // Spawn subtle transient floating heart
    const id = Date.now() + Math.random();
    const randomX = (Math.random() - 0.5) * 60;
    setFloatingHearts((prev) => [
      ...prev.slice(-8), // Keep max 8 to prevent DOM clutter
      { id, x: randomX, scale: 0.8 + Math.random() * 0.4 },
    ]);

    // Remove after animation
    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== id));
    }, 700);
  }, [count, onIncrement]);

  const handleBonusTap = useCallback(() => {
    setBonusRevealed(true);
    try {
      if (typeof window !== "undefined" && "vibrate" in navigator) {
        navigator.vibrate([30, 40, 50]);
      }
    } catch {}
  }, []);

  const progressPercentage = Math.min(100, (count / 50) * 100);

  return (
    <div className="flex flex-col items-center justify-between px-4 py-2 sm:py-5 min-h-[76vh] sm:min-h-[82vh] max-w-sm mx-auto text-center relative select-none">
      {/* Top Header */}
      <div className="w-full">
        <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#F5E9E2]/80 font-semibold">
          You asked for 50.
        </span>
        <h2 className="font-serif text-xl sm:text-2xl text-[#F5E9E2] font-medium mt-0.5 sm:mt-1">
          So here are your sorries.
        </h2>

        {/* Progress Bar & Counter */}
        <div className="mt-2 sm:mt-3.5 bg-[#3A060E]/75 border border-[#F5E9E2]/20 rounded-2xl p-2 sm:p-3 shadow-md">
          <div className="flex items-center justify-between text-xs font-mono mb-1.5 sm:mb-2 px-1">
            <span className="text-[#F5E9E2]/80">Progress</span>
            <span className="text-[#F5E9E2] font-bold text-xs sm:text-sm">
              {count} <span className="text-[#F5E9E2]/60">/ 50</span>
            </span>
          </div>

          <div className="w-full h-2 sm:h-2.5 bg-[#220408] rounded-full overflow-hidden p-0.5">
            <motion.div
              className="h-full rounded-full bg-[#F5E9E2] shadow-[0_0_8px_rgba(245,233,226,0.5)]"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ type: "spring", stiffness: 180, damping: 20 }}
            />
          </div>
        </div>
      </div>

      {/* Middle Interactive Zone */}
      <div className="w-full my-auto flex flex-col items-center justify-center py-2 sm:py-3 relative">
        {/* Floating pop hearts container */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          {floatingHearts.map((heart) => (
            <motion.div
              key={heart.id}
              initial={{ opacity: 1, y: 0, x: heart.x, scale: heart.scale }}
              animate={{ opacity: 0, y: -90, scale: heart.scale * 1.3 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="absolute z-30"
            >
              <HeartGraphic size={24} glow={false} />
            </motion.div>
          ))}
        </div>

        {count < 50 ? (
          <div className="flex flex-col items-center">
            {/* The Big Touch Button with main.svg heart */}
            <motion.button
              onClick={handleTap}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.03 }}
              className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-[#F5E9E2] p-1.5 shadow-2xl shadow-black/35 flex items-center justify-center cursor-pointer transition-shadow hover:shadow-black/50 focus:outline-none"
              aria-label="Tap to say sorry"
            >
              <div className="w-full h-full rounded-full bg-[#C53041] border-2 border-[#F5E9E2] flex flex-col items-center justify-center gap-1">
                <HeartGraphic size={36} glow={false} />
                <span className="font-serif font-bold text-xl sm:text-2xl text-[#F5E9E2] tracking-wider flex items-center gap-1">
                  SORRY
                </span>
                <span className="text-[10px] sm:text-[11px] font-mono text-[#F5E9E2]/85 font-medium uppercase">
                  Tap #{count + 1}
                </span>
              </div>
            </motion.button>

            {/* Tap instruction */}
            <p className="text-[11px] text-[#F5E9E2]/75 mt-1.5 sm:mt-2.5">
              Tap once for each sorry
            </p>
          </div>
        ) : !bonusRevealed ? (
          /* Reached 50: The Special Bonus 51st Sorry Card */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full bg-[#3A060E]/85 border border-[#F5E9E2]/30 rounded-3xl p-6 shadow-2xl space-y-4 text-center"
          >
            <div className="w-12 h-12 rounded-full bg-[#F5E9E2]/15 flex items-center justify-center mx-auto text-[#F5E9E2]">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#F5E9E2]/80 font-bold">
                Quota Reached!
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-[#F5E9E2] font-medium mt-1">
                {milestones[50]}
              </h3>
            </div>
            <p className="text-xs text-[#F5E9E2]/80">
              {bonusSorry.preamble} {bonusSorry.prompt}
            </p>

            <motion.button
              onClick={handleBonusTap}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-4 px-6 rounded-2xl bg-[#F5E9E2] text-[#C53041] font-bold text-sm shadow-xl shadow-black/25 flex items-center justify-center gap-2 cursor-pointer hover:bg-white transition-all"
            >
              <HeartGraphic size={22} glow={false} />
              <span>{bonusSorry.button}</span>
            </motion.button>
          </motion.div>
        ) : (
          /* Revealed 51st Genuine Sorry - Matched to Image 1: clean card with pulsing heart near Pvi */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-[#F5E9E2] text-[#32050B] rounded-3xl p-6 sm:p-7 shadow-2xl border-2 border-[#C53041]/20 text-center space-y-3"
          >
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#C53041] inline-flex items-center justify-center gap-2 py-1">
              <span>{bonusSorry.message}</span>
              <HeartGraphic size={32} animate inline />
            </h3>
            <p className="text-xs sm:text-sm text-[#32050B]/85 font-medium italic pt-1">
              {bonusSorry.subtext}
            </p>
          </motion.div>
        )}
      </div>

      {/* Bottom Message & Milestone Card */}
      <div className="w-full space-y-2 sm:space-y-3">
        {/* Milestone Toast */}
        <AnimatePresence mode="wait">
          {activeMilestone && count > 0 && count < 50 && (
            <motion.div
              key={count}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="py-1.5 px-3 bg-[#F5E9E2]/15 border border-[#F5E9E2]/30 rounded-xl text-xs font-semibold text-[#F5E9E2] flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F5E9E2]" />
              <span>{activeMilestone}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Current Active Apology Note with heart appended */}
        <div className="bg-[#3A060E]/75 border border-[#F5E9E2]/20 rounded-2xl p-2.5 sm:p-3.5 min-h-[56px] sm:min-h-[70px] flex items-center justify-center text-center shadow-md">
          <p className="text-xs sm:text-base font-medium text-[#F5E9E2] leading-relaxed transition-all inline-flex items-center justify-center flex-wrap gap-1">
            <span>{activeMessage}</span>
            {count > 0 && <HeartGraphic size={16} inline />}
          </p>
        </div>

        {/* Proceed button once 51st sorry is unlocked */}
        {bonusRevealed && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={onNext}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 sm:py-4 px-6 rounded-2xl bg-[#F5E9E2] text-[#C53041] font-bold text-sm shadow-xl shadow-black/25 flex items-center justify-center gap-2 cursor-pointer hover:bg-white transition-all"
          >
            <span>Continue</span>
            <HeartGraphic size={16} inline />
            <ArrowRight className="w-4 h-4 ml-1 text-[#C53041]" />
          </motion.button>
        )}
      </div>
    </div>
  );
}
