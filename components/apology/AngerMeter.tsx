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
          backgroundColor: `rgba(245, 233, 226, ${glowOpacity * 0.4})`,
          transform: `scale(${0.8 + heatRatio * 0.5})`,
        }}
      />

      <div className="relative z-10 w-full flex flex-col items-center">
        <span className="text-xs font-mono uppercase tracking-widest text-[#F5E9E2]/80 mb-2 font-semibold">
          {angerMeterConfig.title}
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl text-[#F5E9E2] font-medium mb-1">
          How angry are you?
        </h2>
        <p className="text-xs text-[#F5E9E2]/80 mb-6">
          {angerMeterConfig.subtitle}
        </p>

        {/* Big Emoji & Percentage Display in Warm Silk Cream */}
        <motion.div
          key={currentRange.emoji}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-24 h-24 rounded-full bg-[#F5E9E2] border-2 border-[#F5E9E2] flex flex-col items-center justify-center shadow-2xl mb-4"
        >
          <span className="text-4xl select-none">{currentRange.emoji}</span>
          <span className="text-xs font-mono font-bold text-[#C53041] mt-0.5">
            {value}%
          </span>
        </motion.div>

        {/* Dynamic Reaction Text */}
        <div className="min-h-[50px] flex items-center justify-center px-4 mb-6">
          <p className="text-sm font-semibold text-[#F5E9E2] transition-all">
            {currentRange.text}
          </p>
        </div>

        {/* Tactile Touch Slider Card */}
        <div className="w-full bg-[#3A060E]/75 border border-[#F5E9E2]/20 rounded-2xl p-5 mb-8 shadow-2xl">
          <div className="flex items-center justify-between text-xs text-[#F5E9E2]/80 mb-3 px-1 font-medium">
            <span className="flex items-center gap-1 text-[#F5E9E2]/90">😇 Calm</span>
            <span className="flex items-center gap-1 text-[#F5E9E2] font-bold">
              <Flame className="w-3.5 h-3.5 text-[#F5E9E2]" /> Fuming 😤
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
              className="w-full h-3 bg-[#220408] rounded-lg appearance-none cursor-pointer accent-[#F5E9E2] focus:outline-none"
              style={{
                touchAction: "pan-y",
              }}
            />
          </div>

          {/* Quick presets for easy one-thumb tap */}
          <div className="flex justify-between items-center mt-4 pt-3 border-t border-[#F5E9E2]/15 text-[11px] text-[#F5E9E2]/75">
            <button
              type="button"
              onClick={() => {
                setValue(15);
                onChange(15);
              }}
              className="px-2.5 py-1 rounded-lg bg-[#F5E9E2]/10 hover:bg-[#F5E9E2] hover:text-[#C53041] transition-all cursor-pointer"
            >
              Mild
            </button>
            <button
              type="button"
              onClick={() => {
                setValue(50);
                onChange(50);
              }}
              className="px-2.5 py-1 rounded-lg bg-[#F5E9E2]/10 hover:bg-[#F5E9E2] hover:text-[#C53041] transition-all cursor-pointer"
            >
              Medium
            </button>
            <button
              type="button"
              onClick={() => {
                setValue(85);
                onChange(85);
              }}
              className="px-2.5 py-1 rounded-lg bg-[#F5E9E2]/10 hover:bg-[#F5E9E2] hover:text-[#C53041] transition-all cursor-pointer"
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
          className="w-full py-4 px-6 rounded-2xl bg-[#F5E9E2] text-[#C53041] font-bold text-sm shadow-xl shadow-black/25 flex items-center justify-center gap-2 cursor-pointer transition-all hover:bg-white"
        >
          <span>Lock In My Anger Level ({value}%)</span>
          <ArrowRight className="w-4 h-4 text-[#C53041]" />
        </motion.button>
      </div>
    </div>
  );
}
