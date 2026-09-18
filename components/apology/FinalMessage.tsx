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
      {/* Top Heart with Easter Egg */}
      <div className="w-full flex flex-col items-center">
        <div
          onClick={handleHeartTap}
          className="cursor-pointer active:scale-90 transition-transform"
          title="Tap me"
        >
          <HeartGraphic size={64} animate={false} glow />
        </div>

        <AnimatePresence>
          {easterEggTriggered && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-xs text-[#FFD166] font-medium mt-2 bg-[#FFD166]/10 px-3 py-1 rounded-full border border-[#FFD166]/20"
            >
              Okay, why are you still tapping this? 😂❤️
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* The Warm Paper Apology Letter - Matches user screenshot Image 4 */}
      <div className="w-full my-auto py-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#FFF7F1] text-[#100B0D] rounded-3xl p-6 sm:p-7 shadow-2xl border border-[#F7ECE4] text-left relative overflow-hidden"
        >
          <span className="text-[11px] font-mono tracking-widest text-[#F05A72] uppercase font-bold block mb-2">
            Final Dispatch
          </span>

          <h3 className="font-serif text-2xl font-bold text-[#100B0D] mb-1">
            {finalCard.title}
          </h3>

          <p className="font-serif text-xl text-[#F05A72] font-semibold mb-4 inline-flex items-center gap-1.5">
            <span>{finalCard.heading}</span>
            <HeartGraphic size={22} inline />
          </p>

          <div className="space-y-3 text-xs sm:text-sm text-[#100B0D]/85 leading-relaxed font-sans">
            <p>{finalCard.p1}</p>
            <p className="italic text-[#100B0D]/70">{finalCard.p2}</p>
            <p className="font-medium text-[#100B0D]">{finalCard.p3}</p>
            {/* Replaced 'Now come talk to me' with cute teasing line */}
            <p className="font-semibold text-[#F05A72] text-sm pt-1">
              {finalCard.p4}
            </p>
          </div>

          {/* Signoff: — Aji [heart] as requested in Image 1 */}
          <div className="mt-5 pt-3 border-t border-[#100B0D]/10 flex justify-end">
            <span className="font-serif italic font-bold text-[#100B0D] text-sm inline-flex items-center gap-1">
              {finalCard.signoff} <HeartGraphic size={18} inline />
            </span>
          </div>
        </motion.div>
      </div>

      {/* Message Textbox & Direct Firebase Submission Zone */}
      <div className="w-full space-y-4">
        {!responseId ? (
          <form onSubmit={handleSubmit} className="space-y-3 text-left">
            <div className="flex items-center gap-1.5 text-xs text-[#FFF7F1] font-medium">
              <MessageSquare className="w-3.5 h-3.5 text-[#FF91A4]" />
              <span>Leave a note / roast for Aji ❤️</span>
            </div>

            <div className="relative">
              <textarea
                value={pviMessage}
                onChange={(e) => setPviMessage(e.target.value)}
                placeholder="Type anything you want to tell Aji before sending... (optional) ✍️"
                rows={3}
                className="w-full p-3.5 bg-[#191013] border border-[#FFF7F5]/15 rounded-2xl text-xs sm:text-sm text-[#FFF7F5] placeholder-[#CDB9BA]/40 focus:outline-none focus:border-[#F05A72] transition-colors resize-none shadow-inner"
              />
            </div>

            {submitError && (
              <p className="text-xs text-[#FF91A4] bg-[#F05A72]/15 p-3 rounded-xl border border-[#F05A72]/30 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{submitError}</span>
              </p>
            )}

            <motion.button
              type="submit"
              disabled={submitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#F05A72] to-[#FF91A4] text-white font-semibold text-sm shadow-xl shadow-[#F05A72]/30 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? "Sending to Aji..." : "Send to Aji ❤️"}</span>
            </motion.button>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#22161A] border border-[#F05A72]/30 rounded-3xl p-6 text-center space-y-3 shadow-xl"
          >
            <div className="w-12 h-12 rounded-full bg-[#F05A72]/15 flex items-center justify-center mx-auto">
              <HeartGraphic size={28} animate />
            </div>
            <h4 className="font-serif text-xl font-bold text-[#FFF7F1] flex items-center justify-center gap-1.5">
              <span>Delivered to Aji</span>
              <HeartGraphic size={20} inline />
            </h4>
            <p className="text-sm text-[#FF91A4] font-medium">
              He got all your answers and your note!
            </p>
            <p className="text-xs text-[#CDB9BA] leading-relaxed pt-1">
              Now go tease him in real life and demand your apology snacks from Him 😂❤️
            </p>
          </motion.div>
        )}

        {/* Restart Button */}
        <button
          onClick={onRestart}
          className="inline-flex items-center justify-center gap-1.5 text-xs text-[#CDB9BA]/70 hover:text-[#FFF7F5] transition-colors py-2 px-4 rounded-xl cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Start Again</span>
        </button>
      </div>
    </div>
  );
}
