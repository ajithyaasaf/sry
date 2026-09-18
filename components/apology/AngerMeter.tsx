"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { angerMeterConfig } from "@/content/questions";
import { ArrowRight, Flame } from "lucide-react";

interface AngerMeterProps {
  initialValue: number;
  onChange: (val: number) => void;
  onNext: () => void;
}

export function AngerMeter({ initialValue, onChange, onNext }: AngerMeterProps) {
  const [value, setValue] = useState<number>(initialValue ?? 60);

  // Find corresponding range
  const currentRange =
    angerMeterConfig.ranges.find((r) => value >= r.min && value <= r.max) ||
    angerMeterConfig.ranges[2];

  function handleSliderChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = parseInt(e.target.value, 10);
    setValue(val);
    onChange(val);
  }

  // Calculate dynamic glow and heat color
  const heatRatio = value / 100;
  const glowOpacity = 0.1 + heatRatio * 0.45;

  return (
    <div className="flex flex-col items-center justify-center px-4 py-8 min-h-[82vh] max-w-sm mx-auto text-center relative">
      {/* Dynamic Background Heat Glow */}
      <div
        className="absolute w-64 h-64 rounded-full blur-3xl pointer-events-none transition-all duration-300"
        style={{
          backgroundColor: `rgba(240, 90, 114, ${glowOpacity})`,
          transform: `scale(${0.8 + heatRatio * 0.5})`,
        }}
      />

      <div className="relative z-10 w-full flex flex-col items-center">
        <span className="text-xs font-mono uppercase tracking-widest text-[#FF91A4] mb-2 font-semibold">
          {angerMeterConfig.title}
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl text-[#FFF7F1] font-medium mb-1">
          How angry are you?
        </h2>
        <p className="text-xs text-[#CDB9BA] mb-6">
          {angerMeterConfig.subtitle}
        </p>

        {/* Big Emoji & Percentage Display */}
        <motion.div
          key={currentRange.emoji}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-24 h-24 rounded-full bg-[#191013] border-2 border-[#F05A72]/40 flex flex-col items-center justify-center shadow-xl mb-4"
        >
          <span className="text-4xl select-none">{currentRange.emoji}</span>
          <span className="text-xs font-mono font-bold text-[#FF91A4] mt-0.5">
            {value}%
          </span>
        </motion.div>

        {/* Dynamic Reaction Text */}
        <div className="min-h-[50px] flex items-center justify-center px-4 mb-6">
          <p className="text-sm font-medium text-[#FFF7F1] transition-all">
            {currentRange.text}
          </p>
        </div>

        {/* Tactile Touch Slider */}
        <div className="w-full bg-[#191013] border border-[#FFF7F5]/10 rounded-2xl p-5 mb-8 shadow-inner">
          <div className="flex items-center justify-between text-xs text-[#CDB9BA] mb-3 px-1 font-medium">
            <span className="flex items-center gap-1">😇 Calm</span>
            <span className="flex items-center gap-1 text-[#F05A72]">
              <Flame className="w-3.5 h-3.5" /> Fuming 😤
            </span>
          </div>

          <div className="relative flex items-center">
            <input
              type="range"
              min="0"
              max="100"
              value={value}
              onChange={handleSliderChange}
              aria-label="Anger percentage slider"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={value}
              className="w-full h-3 bg-[#100B0D] rounded-lg appearance-none cursor-pointer accent-[#F05A72] focus:outline-none focus:ring-2 focus:ring-[#F05A72]/50"
              style={{
                touchAction: "pan-y",
              }}
            />
          </div>

          {/* Quick presets for easy one-thumb tap */}
          <div className="flex justify-between items-center mt-4 pt-3 border-t border-[#FFF7F5]/5 text-[11px] text-[#CDB9BA]">
            <button
              type="button"
              onClick={() => {
                setValue(15);
                onChange(15);
              }}
              className="px-2 py-1 rounded hover:text-[#FFF7F1] transition-colors"
            >
              Mild
            </button>
            <button
              type="button"
              onClick={() => {
                setValue(50);
                onChange(50);
              }}
              className="px-2 py-1 rounded hover:text-[#FFF7F1] transition-colors"
            >
              Medium
            </button>
            <button
              type="button"
              onClick={() => {
                setValue(85);
                onChange(85);
              }}
              className="px-2 py-1 rounded hover:text-[#FFF7F1] transition-colors"
            >
              Maximum 🌋
            </button>
          </div>
        </div>

        {/* Lock In Button */}
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#F05A72] to-[#FF91A4] text-white font-medium text-sm shadow-lg shadow-[#F05A72]/25 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Lock In My Anger Level ({value}%)</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
}
