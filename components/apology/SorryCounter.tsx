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
    <div className="flex flex-col items-center justify-between px-4 py-6 min-h-[84vh] max-w-sm mx-auto text-center relative select-none">
      {/* Top Header */}
      <div className="w-full">
        <span className="text-xs font-mono uppercase tracking-widest text-[#FF91A4] font-semibold">
          You asked for 50.
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl text-[#FFF7F1] font-medium mt-1">
          So here are your sorries.
        </h2>

        {/* Progress Bar & Counter */}
        <div className="mt-4 bg-[#191013] border border-[#FFF7F5]/10 rounded-2xl p-3 shadow-md">
          <div className="flex items-center justify-between text-xs font-mono mb-2 px-1">
            <span className="text-[#CDB9BA]">Progress</span>
            <span className="text-[#FF91A4] font-bold text-sm">
              {count} <span className="text-[#CDB9BA]/60">/ 50</span>
            </span>
          </div>

          <div className="w-full h-2.5 bg-[#100B0D] rounded-full overflow-hidden p-0.5">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#F05A72] to-[#FF91A4]"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ type: "spring", stiffness: 180, damping: 20 }}
            />
          </div>
        </div>
      </div>

      {/* Middle Interactive Zone */}
      <div className="w-full my-auto flex flex-col items-center justify-center py-4 relative">
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
              className="w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-gradient-to-tr from-[#C42A46] via-[#F05A72] to-[#FF91A4] p-1.5 shadow-2xl shadow-[#F05A72]/40 flex items-center justify-center cursor-pointer transition-shadow hover:shadow-[#F05A72]/60 focus:outline-none"
              aria-label="Tap to say sorry"
            >
              <div className="w-full h-full rounded-full bg-[#191013] border-2 border-[#FFF7F1]/20 flex flex-col items-center justify-center gap-1">
                <HeartGraphic size={36} glow={false} />
                <span className="font-serif font-bold text-lg sm:text-xl text-[#FFF7F1] tracking-wider flex items-center gap-1">
                  SORRY
                </span>
                <span className="text-[10px] font-mono text-[#FF91A4] font-medium uppercase">
                  Tap #{count + 1}
                </span>
              </div>
            </motion.button>

            {/* Tap instruction */}
            <p className="text-[11px] text-[#CDB9BA]/70 mt-3">
              Tap once for each sorry
            </p>
          </div>
        ) : !bonusRevealed ? (
          /* Reached 50: The Special Bonus 51st Sorry Card */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full bg-[#22161A] border border-[#F05A72]/40 rounded-3xl p-6 shadow-2xl space-y-4 text-center"
          >
            <div className="w-12 h-12 rounded-full bg-[#F05A72]/20 flex items-center justify-center mx-auto text-[#FF91A4]">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#FF91A4] font-bold">
                Quota Reached!
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-[#FFF7F1] font-medium mt-1">
                {milestones[50]}
              </h3>
            </div>
            <p className="text-xs text-[#CDB9BA]">
              {bonusSorry.preamble} {bonusSorry.prompt}
            </p>

            <motion.button
              onClick={handleBonusTap}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#F05A72] to-[#FF91A4] text-white font-semibold text-sm shadow-xl shadow-[#F05A72]/30 flex items-center justify-center gap-2 cursor-pointer"
            >
              <HeartGraphic size={22} glow={false} />
              <span>{bonusSorry.button}</span>
            </motion.button>
          </motion.div>
        ) : (
          /* Revealed 51st Genuine Sorry - Matched to Image 2 with Heart after Pvi. */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-[#FFF7F1] text-[#100B0D] rounded-3xl p-6 sm:p-7 shadow-2xl border border-[#F7ECE4] text-center space-y-3"
          >
            <div className="mb-2">
              <HeartGraphic size={56} animate glow={false} className="mx-auto" />
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F05A72] inline-flex items-center justify-center gap-1.5">
              <span>{bonusSorry.message}</span>
              <HeartGraphic size={26} inline />
            </h3>
            <p className="text-xs sm:text-sm text-[#100B0D]/80 font-medium italic pt-1">
              {bonusSorry.subtext}
            </p>
          </motion.div>
        )}
      </div>

      {/* Bottom Message & Milestone Card */}
      <div className="w-full space-y-3">
        {/* Milestone Toast */}
        <AnimatePresence mode="wait">
          {activeMilestone && count > 0 && count < 50 && (
            <motion.div
              key={count}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="py-2 px-3.5 bg-gradient-to-r from-[#F05A72]/20 to-[#FF91A4]/20 border border-[#F05A72]/40 rounded-xl text-xs font-semibold text-[#FF91A4] flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{activeMilestone}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Current Active Apology Note with heart appended */}
        <div className="bg-[#191013] border border-[#FFF7F5]/10 rounded-2xl p-4 min-h-[76px] flex items-center justify-center text-center shadow-md">
          <p className="text-sm sm:text-base font-medium text-[#FFF7F1] leading-relaxed transition-all inline-flex items-center justify-center flex-wrap gap-1">
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
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#F05A72] to-[#FF91A4] text-white font-medium text-sm shadow-lg shadow-[#F05A72]/25 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Continue</span>
            <HeartGraphic size={16} inline />
            <ArrowRight className="w-4 h-4 ml-1" />
          </motion.button>
        )}
      </div>
    </div>
  );
}
