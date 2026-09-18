"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { checkinQuestions } from "@/content/questions";
import { ArrowRight, Check, Edit3 } from "lucide-react";

interface PlayfulQuestionsProps {
  answers: {
    smiling: string;
    deserved: string;
    customDeservedNote?: string;
    keepSayingSorry: string;
  };
  onAnswer: (
    key: "smiling" | "deserved" | "keepSayingSorry" | "customDeservedNote",
    value: string
  ) => void;
  onNext: () => void;
}

export function PlayfulQuestions({ answers, onAnswer, onNext }: PlayfulQuestionsProps) {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [customText, setCustomText] = useState<string>(answers.customDeservedNote || "");

  const question = checkinQuestions[currentStep];
  const questionKey = question.id as "smiling" | "deserved" | "keepSayingSorry";

  const currentChoice = answers[questionKey] || selectedOption;
  const currentOptionData = question.options.find((opt) => opt.label === currentChoice);

  function handleSelect(label: string) {
    setSelectedOption(label);
    if (label.includes("Something else")) {
      onAnswer(questionKey, customText ? `Custom: ${customText}` : label);
    } else {
      onAnswer(questionKey, label);
    }
  }

  function handleCustomTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setCustomText(val);
    onAnswer("customDeservedNote", val);
    onAnswer("deserved", val ? `Custom: ${val}` : "Something else... ✍️");
  }

  function handleStepAdvance() {
    if (currentStep < checkinQuestions.length - 1) {
      setCurrentStep((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      onNext();
    }
  }

  const isSomethingElseSelected = currentChoice?.includes("Something else") || currentChoice?.startsWith("Custom:");

  return (
    <div className="flex flex-col items-center justify-between px-4 py-8 min-h-[82vh] max-w-sm mx-auto text-center">
      {/* Header */}
      <div className="w-full">
        <div className="flex items-center justify-center gap-1 mb-2">
          {checkinQuestions.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentStep
                  ? "w-8 bg-[#F05A72]"
                  : idx < currentStep
                  ? "w-4 bg-[#FF91A4]/60"
                  : "w-4 bg-[#FFF7F5]/10"
              }`}
            />
          ))}
        </div>

        <span className="text-xs font-mono uppercase tracking-widest text-[#FF91A4] font-semibold">
          {question.title}
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl text-[#FFF7F1] font-medium mt-1 mb-5">
          {question.question}
        </h2>
      </div>

      {/* Options List */}
      <div className="w-full space-y-2.5 my-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-2.5"
          >
            {question.options.map((opt) => {
              const isSelected =
                currentChoice === opt.label ||
                (opt.label.includes("Something else") && isSomethingElseSelected);
              return (
                <div key={opt.id} className="space-y-2">
                  <motion.button
                    onClick={() => handleSelect(opt.label)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.97 }}
                    className={`w-full py-3.5 px-4 rounded-2xl border text-left font-medium text-sm flex items-center justify-between transition-all cursor-pointer shadow-md ${
                      isSelected
                        ? "bg-[#22161A] border-[#F05A72] text-[#FFF7F1] shadow-[#F05A72]/20"
                        : "bg-[#191013] border-[#FFF7F5]/10 text-[#CDB9BA] hover:border-[#FFF7F5]/25"
                    }`}
                  >
                    <span className="text-sm sm:text-base">{opt.label}</span>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-[#F05A72] border-[#F05A72] text-white"
                          : "border-[#FFF7F5]/20"
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </motion.button>

                  {/* Expandable Custom Textbox when "Something else" is selected */}
                  {opt.label.includes("Something else") && isSomethingElseSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-1"
                    >
                      <div className="relative flex items-center">
                        <input
                          type="text"
                          placeholder="Type what I deserve... (e.g. Ice cream, treats 🍫)"
                          value={customText}
                          onChange={handleCustomTextChange}
                          autoFocus
                          className="w-full py-3 pl-9 pr-4 bg-[#100B0D] border border-[#F05A72]/50 rounded-xl text-xs sm:text-sm text-[#FFF7F5] placeholder-[#CDB9BA]/40 focus:outline-none focus:border-[#F05A72] shadow-inner"
                        />
                        <Edit3 className="w-4 h-4 text-[#FF91A4] absolute left-3 pointer-events-none" />
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer / Feedback & Advance */}
      <div className="w-full space-y-4 pt-3">
        <div className="min-h-[46px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {currentOptionData && (
              <motion.div
                key={currentOptionData.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="py-2.5 px-4 bg-[#22161A]/80 border border-[#F05A72]/20 rounded-xl text-xs text-[#FF91A4] font-medium"
              >
                {currentOptionData.response}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          onClick={handleStepAdvance}
          disabled={!currentChoice}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#F05A72] to-[#FF91A4] text-white font-medium text-sm shadow-lg shadow-[#F05A72]/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
        >
          <span>{currentStep < checkinQuestions.length - 1 ? "Next Question" : "Continue"}</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
}
