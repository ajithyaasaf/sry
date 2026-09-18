"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { apologyContent } from "@/content/apology";
import { HeartGraphic } from "@/components/ui/HeartGraphic";
import { Send, RotateCcw, AlertCircle, MessageSquare } from "lucide-react";

interface FinalMessageProps {
  answers: {
    angerChoice: string;
    angerLevel: number;
    smiling: string;
    deserved: string;
    customDeservedNote?: string;
    keepSayingSorry: string;
    finalChoice: string;
    sorryCount: number;
  };
  onRestart: () => void;
}

export function FinalMessage({ answers, onRestart }: FinalMessageProps) {
  const { finalCard } = apologyContent;
  const [submitting, setSubmitting] = useState(false);
  const [pviMessage, setPviMessage] = useState("");
  const [responseId, setResponseId] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [easterEggCount, setEasterEggCount] = useState(0);
  const [easterEggTriggered, setEasterEggTriggered] = useState(false);

  // Easter egg: tap heart 5 times
  function handleHeartTap() {
    const next = easterEggCount + 1;
    setEasterEggCount(next);
    if (next >= 5) {
      setEasterEggTriggered(true);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    try {
      const payload = {
        ...answers,
        pviMessage: pviMessage.trim() || undefined,
      };

      const res = await fetch("/api/response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setResponseId(data.responseId);
        // NO WhatsApp redirect! Answers and note are directly saved in Firebase!
      } else {
        setSubmitError(
          data.error || "Oops, something got stuck! Tap send one more time 🥺❤️"
        );
      }
    } catch {
      setSubmitError("Connection was sleepy for a second. Tap send again ❤️");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-between px-4 py-8 min-h-[85vh] max-w-sm mx-auto text-center">
      {/* The Warm Paper Apology Letter in Silk Cream */}
      <div className="w-full my-auto py-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#F5E9E2] text-[#32050B] rounded-3xl p-6 sm:p-7 shadow-2xl border-2 border-[#C53041]/20 text-left relative overflow-hidden"
        >
          <span className="text-[11px] font-mono tracking-widest text-[#C53041] uppercase font-bold block mb-2">
            Final Dispatch
          </span>

          <h3 className="font-serif text-2xl font-bold text-[#32050B] mb-1 flex items-baseline gap-1.5 flex-nowrap">
            <span>{finalCard.title}</span>
            <span
              onClick={handleHeartTap}
              className="cursor-pointer active:scale-90 transition-transform inline-flex items-baseline"
            >
              <HeartGraphic size={20} animate align="baseline" />
            </span>
          </h3>

          <p className="font-serif text-xl text-[#C53041] font-semibold mb-4">
            {finalCard.heading}
          </p>

          <div className="space-y-3 text-xs sm:text-sm text-[#32050B]/90 leading-relaxed font-sans">
            <p>{finalCard.p1}</p>
            <p className="italic text-[#32050B]/75">{finalCard.p2}</p>
            <p className="font-medium text-[#32050B]">{finalCard.p3}</p>
            {finalCard.p4 && (
              <p className="font-semibold text-[#C53041] text-sm pt-1">
                {finalCard.p4}
              </p>
            )}

            {"lyrics" in finalCard && Boolean((finalCard as Record<string, unknown>).lyrics) && (
              <div className="pt-3 pb-1 border-t border-[#C53041]/15 my-2">
                <p className="font-serif italic text-xs sm:text-sm text-[#C53041] font-semibold leading-relaxed whitespace-pre-line tracking-wide">
                  &ldquo;{String((finalCard as Record<string, unknown>).lyrics)}&rdquo;
                </p>
              </div>
            )}
          </div>

          {/* Signoff: — Aji [heart] */}
          <div className="mt-5 pt-3 border-t border-[#C53041]/15 flex justify-end">
            <span className="font-serif italic font-bold text-[#32050B] text-sm inline-flex items-center gap-1">
              {finalCard.signoff} <HeartGraphic size={18} inline />
            </span>
          </div>
        </motion.div>

        <AnimatePresence>
          {easterEggTriggered && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-xs text-[#F5E9E2] font-semibold mt-3 bg-[#F5E9E2]/15 px-3.5 py-1.5 rounded-full border border-[#F5E9E2]/30 inline-block text-center"
            >
              Okay, why are you still tapping this? 😂❤️
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Message Textbox & Direct Firebase Submission Zone */}
      <div className="w-full space-y-4">
        {!responseId ? (
          <form onSubmit={handleSubmit} className="space-y-3 text-left">
            <div className="flex items-center gap-1.5 text-xs text-[#F5E9E2] font-semibold">
              <MessageSquare className="w-3.5 h-3.5 text-[#F5E9E2]" />
              <span>Leave a note / roast for Aji ❤️</span>
            </div>

            <div className="relative">
              <textarea
                value={pviMessage}
                onChange={(e) => setPviMessage(e.target.value)}
                placeholder="Type anything you want to tell Aji before sending... ✍️"
                rows={3}
                className="w-full p-3.5 bg-[#220408] border border-[#F5E9E2]/30 rounded-2xl text-xs sm:text-sm text-[#F5E9E2] placeholder-[#F5E9E2]/40 focus:outline-none focus:border-[#F5E9E2] transition-colors resize-none shadow-inner"
              />
            </div>

            {submitError && (
              <p className="text-xs text-[#F5E9E2] bg-[#F5E9E2]/15 p-3 rounded-xl border border-[#F5E9E2]/30 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0 text-[#F5E9E2]" />
                <span>{submitError}</span>
              </p>
            )}

            <motion.button
              type="submit"
              disabled={submitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-4 px-6 rounded-2xl bg-[#F5E9E2] text-[#C53041] font-bold text-sm shadow-xl shadow-black/25 flex items-center justify-center gap-2 cursor-pointer transition-all hover:bg-white disabled:opacity-50"
            >
              <Send className="w-4 h-4 text-[#C53041]" />
              <span>{submitting ? "Sending to Aji..." : "Send to Aji ❤️"}</span>
            </motion.button>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#F5E9E2] text-[#32050B] border-2 border-[#C53041]/20 rounded-3xl p-6 text-center space-y-3 shadow-2xl"
          >
            <div className="w-12 h-12 rounded-full bg-[#C53041]/15 flex items-center justify-center mx-auto">
              <HeartGraphic size={28} animate />
            </div>
            <h4 className="font-serif text-xl font-bold text-[#32050B] flex items-center justify-center gap-1.5">
              <span>Delivered to Aji</span>
              <HeartGraphic size={20} inline />
            </h4>
            <p className="text-sm text-[#C53041] font-bold">
              He got all your answers and your note!
            </p>
            <p className="text-xs text-[#32050B]/85 leading-relaxed pt-1">
              Now go tease him in real life and demand your apology snacks from Him 😂❤️
            </p>
          </motion.div>
        )}

        {/* Restart Button */}
        <button
          onClick={onRestart}
          className="inline-flex items-center justify-center gap-1.5 text-xs text-[#F5E9E2]/75 hover:text-white transition-colors py-2 px-4 rounded-xl cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Start Again</span>
        </button>
      </div>
    </div>
  );
}
