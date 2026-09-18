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
    onAnswer("deserved", val ? `Custom: ${val}` : "Something else.......");
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
    <div className="flex flex-col items-center justify-between px-4 py-2 sm:py-5 min-h-[76vh] sm:min-h-[82vh] max-w-sm mx-auto text-center">
      {/* Header */}
      <div className="w-full">
        <div className="flex items-center justify-center gap-1 mb-1 sm:mb-2">
          {checkinQuestions.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentStep
                ? "w-8 bg-[#F5E9E2]"
                : idx < currentStep
                  ? "w-4 bg-[#F5E9E2]/60"
                  : "w-4 bg-[#F5E9E2]/15"
                }`}
            />
          ))}
        </div>

        <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#F5E9E2]/80 font-semibold">
          {question.title}
        </span>
        <h2 className="font-serif text-xl sm:text-2xl text-[#F5E9E2] font-medium mt-0.5 sm:mt-1 mb-2.5 sm:mb-4">
          {question.question}
        </h2>
      </div>

      {/* Options List */}
      <div className="w-full space-y-1.5 sm:space-y-2 my-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-1.5 sm:space-y-2"
          >
            {question.options.map((opt) => {
              const isSelected =
                currentChoice === opt.label ||
                (opt.label.includes("Something else") && isSomethingElseSelected);
              return (
                <div key={opt.id} className="space-y-1.5">
                  <motion.button
                    onClick={() => handleSelect(opt.label)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.97 }}
                    className={`w-full py-2.5 sm:py-3.5 px-3.5 sm:px-4 rounded-xl sm:rounded-2xl border text-left font-medium text-xs sm:text-sm flex items-center justify-between transition-all cursor-pointer shadow-md ${isSelected
                      ? "bg-[#F5E9E2] border-2 border-[#F5E9E2] text-[#C53041] font-bold shadow-xl shadow-black/25"
                      : "bg-[#3A060E]/75 border border-[#F5E9E2]/20 text-[#F5E9E2]/85 hover:border-[#F5E9E2]/45"
                      }`}
                  >
                    <span className="text-xs sm:text-sm">{opt.label}</span>
                    <div
                      className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border flex items-center justify-center transition-colors ${isSelected
                        ? "bg-[#C53041] border-[#C53041] text-[#F5E9E2]"
                        : "border-[#F5E9E2]/30"
                        }`}
                    >
                      {isSelected && <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />}
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
                          placeholder="Type what I deserve..."
                          value={customText}
                          onChange={handleCustomTextChange}
                          autoFocus
                          className="w-full py-2 sm:py-2.5 pl-8 pr-3 bg-[#220408] border border-[#F5E9E2]/40 rounded-xl text-xs sm:text-sm text-[#F5E9E2] placeholder-[#F5E9E2]/40 focus:outline-none focus:border-[#F5E9E2] shadow-inner"
                        />
                        <Edit3 className="w-3.5 h-3.5 text-[#F5E9E2] absolute left-2.5 pointer-events-none" />
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
      <div className="w-full space-y-2 sm:space-y-3 pt-1 sm:pt-2">
        <div className="min-h-[36px] sm:min-h-[42px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {currentOptionData && (
              <motion.div
                key={currentOptionData.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="py-1.5 sm:py-2 px-3 sm:px-4 bg-[#F5E9E2]/15 border border-[#F5E9E2]/30 rounded-xl text-xs text-[#F5E9E2] font-medium"
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
          className="w-full py-3 sm:py-4 px-6 rounded-2xl bg-[#F5E9E2] text-[#C53041] font-bold text-sm shadow-xl shadow-black/25 flex items-center justify-center gap-2 cursor-pointer hover:bg-white disabled:opacity-40 disabled:pointer-events-none transition-all"
        >
          <span>
            {currentStep < checkinQuestions.length - 1 ? "Next Question" : "Continue"}
          </span>
          <ArrowRight className="w-4 h-4 text-[#C53041]" />
        </motion.button>
      </div>
    </div>
  );
}
