"use client";

import { useEffect, useState, useCallback } from "react";
import { Lock, RefreshCw, Calendar, Flame, Smile, CheckCircle, ArrowLeft, MessageSquareQuote, Gift } from "lucide-react";
import Link from "next/link";
import { HeartGraphic } from "@/components/ui/HeartGraphic";

interface StoredResponse {
  responseId: string;
  angerChoice?: string;
  angerLevel?: number;
  smiling?: string;
  deserved?: string;
  customDeservedNote?: string;
  keepSayingSorry?: string;
  finalChoice?: string;
  sorryCount: number;
  pviMessage?: string;
  completedAt: string;
  timestamp: number;
}

export default function ResponsesPage() {
  const [key, setKey] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      return params.get("key") || sessionStorage.getItem("admin_key") || "";
    }
    return "";
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [responses, setResponses] = useState<StoredResponse[]>([]);

  const fetchResponses = useCallback(async (accessKey: string) => {
    if (!accessKey) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/responses?key=${encodeURIComponent(accessKey)}`);
      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setResponses(data.responses || []);
        sessionStorage.setItem("admin_key", accessKey);
      } else {
        setIsAuthenticated(false);
        setError(data.error || "Incorrect access key. Please try again.");
      }
    } catch {
      setError("Network error connecting to the server.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-fetch if key was present on initial load
  useEffect(() => {
    if (!key) return;
    let cancelled = false;

    async function initialFetch() {
      try {
        const res = await fetch(`/api/responses?key=${encodeURIComponent(key)}`);
        const data = await res.json();
        if (!cancelled) {
          if (res.ok && data.success) {
            setIsAuthenticated(true);
            setResponses(data.responses || []);
            sessionStorage.setItem("admin_key", key);
          } else {
            setIsAuthenticated(false);
            setError(data.error || "Incorrect access key.");
          }
        }
      } catch {
        if (!cancelled) setError("Network error connecting to the server.");
      }
    }

    initialFetch();

    return () => {
      cancelled = true;
    };
  }, [key]);

  function handleLoginSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!key.trim()) return;
    fetchResponses(key.trim());
  }

  return (
    <main className="min-h-screen bg-[#100B0D] text-[#FFF7F5] p-4 md:p-8 flex flex-col items-center">
      {/* Top Bar */}
      <div className="w-full max-w-2xl flex items-center justify-between pb-6 border-b border-[#FFF7F5]/10 mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-[#CDB9BA] hover:text-[#FF91A4] transition-colors py-2 px-3 rounded-lg bg-[#191013] border border-[#FFF7F5]/10"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Apology
        </Link>
        <div className="flex items-center gap-1.5 text-xs text-[#FF91A4] font-medium tracking-wide">
          <HeartGraphic size={16} inline /> Aji&apos;s Private Dashboard
        </div>
      </div>

      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl md:text-4xl text-[#FFF7F1] mb-2 font-medium inline-flex items-center justify-center gap-2">
            <span>Pvi&apos;s Responses</span>
            <HeartGraphic size={28} inline />
          </h1>
          <p className="text-sm text-[#CDB9BA]">
            Direct Firebase Firestore responses from Pvi&apos;s interactive apology journey.
          </p>
        </div>

        {!isAuthenticated ? (
          <div className="bg-[#191013] border border-[#F05A72]/20 rounded-2xl p-6 md:p-8 max-w-md mx-auto shadow-2xl backdrop-blur-sm">
            <div className="w-12 h-12 rounded-full bg-[#F05A72]/10 border border-[#F05A72]/20 flex items-center justify-center mx-auto mb-4 text-[#FF91A4]">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="text-center text-lg font-medium text-[#FFF7F1] mb-1">
              Private Access for Aji
            </h2>
            <p className="text-center text-xs text-[#CDB9BA] mb-6">
              Enter your access key to view Pvi&apos;s submitted choices and note.
            </p>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="Enter secret key (default: aji123)..."
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  className="w-full px-4 py-3 bg-[#100B0D] border border-[#FFF7F5]/15 rounded-xl text-sm text-[#FFF7F5] placeholder-[#CDB9BA]/40 focus:outline-none focus:border-[#F05A72] transition-colors"
                  autoFocus
                />
              </div>

              {error && (
                <p className="text-xs text-[#FF91A4] bg-[#F05A72]/10 p-3 rounded-lg border border-[#F05A72]/20">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#F05A72] to-[#FF91A4] text-white font-medium text-sm shadow-lg shadow-[#F05A72]/20 hover:opacity-95 active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
              >
                {loading ? "Checking key..." : "Unlock Responses"}
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <span className="text-xs text-[#CDB9BA]">
                Total submissions:{" "}
                <strong className="text-[#FFF7F1]">{responses.length}</strong>
              </span>
              <button
                onClick={() => fetchResponses(key)}
                disabled={loading}
                className="inline-flex items-center gap-1.5 text-xs text-[#FF91A4] hover:underline cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </button>
            </div>

            {responses.length === 0 ? (
              <div className="bg-[#191013] border border-[#FFF7F5]/10 rounded-2xl p-8 text-center text-[#CDB9BA]">
                <p className="text-sm">No responses submitted yet.</p>
                <p className="text-xs text-[#CDB9BA]/60 mt-1">
                  Once Pvi taps &ldquo;Send my answers to Aji ❤️&rdquo;, her choices will appear here immediately!
                </p>
              </div>
            ) : (
              responses.map((item, idx) => (
                <article
                  key={item.responseId || idx}
                  className="bg-[#191013] border border-[#FFF7F5]/10 rounded-2xl p-5 md:p-6 shadow-xl space-y-4 relative overflow-hidden transition-all hover:border-[#F05A72]/30"
                >
                  <div className="flex items-center justify-between border-b border-[#FFF7F5]/10 pb-3">
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#FF91A4] bg-[#F05A72]/10 px-2 py-0.5 rounded">
                        {item.responseId}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-[#CDB9BA]">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.completedAt}</span>
                    </div>
                  </div>

                  {/* Personal Note from Pvi */}
                  {item.pviMessage && (
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-[#22161A] to-[#191013] border border-[#F05A72]/30 space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-[#FF91A4]">
                        <MessageSquareQuote className="w-4 h-4" />
                        <span>Pvi&apos;s Note for Aji:</span>
                      </div>
                      <p className="text-sm text-[#FFF7F1] italic leading-relaxed pl-5">
                        &ldquo;{item.pviMessage}&rdquo;
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-[#100B0D]/70 p-3 rounded-xl border border-[#FFF7F5]/5">
                      <span className="text-[#CDB9BA] flex items-center gap-1 mb-1">
                        <Flame className="w-3.5 h-3.5 text-[#F05A72]" /> Anger Level:
                      </span>
                      <p className="text-sm font-semibold text-[#FFF7F1]">
                        {item.angerLevel !== undefined ? `${item.angerLevel} / 100` : "N/A"}
                      </p>
                    </div>

                    <div className="bg-[#100B0D]/70 p-3 rounded-xl border border-[#FFF7F5]/5">
                      <span className="text-[#CDB9BA] flex items-center gap-1 mb-1">
                        Initial Feeling:
                      </span>
                      <p className="text-sm font-semibold text-[#FFF7F1]">
                        {item.angerChoice || "N/A"}
                      </p>
                    </div>

                    <div className="bg-[#100B0D]/70 p-3 rounded-xl border border-[#FFF7F5]/5">
                      <span className="text-[#CDB9BA] flex items-center gap-1 mb-1">
                        <Smile className="w-3.5 h-3.5 text-[#FFD166]" /> Smiling Yet:
                      </span>
                      <p className="text-sm font-semibold text-[#FFF7F1]">
                        {item.smiling || "N/A"}
                      </p>
                    </div>

                    <div className="bg-[#100B0D]/70 p-3 rounded-xl border border-[#FFF7F5]/5">
                      <span className="text-[#CDB9BA] flex items-center gap-1 mb-1">
                        <Gift className="w-3.5 h-3.5 text-[#FF91A4]" /> What I Deserve:
                      </span>
                      <p className="text-sm font-semibold text-[#FFF7F1]">
                        {item.deserved || "N/A"}
                      </p>
                      {item.customDeservedNote && (
                        <p className="text-[11px] text-[#FF91A4] mt-0.5 italic">
                          &ldquo;{item.customDeservedNote}&rdquo;
                        </p>
                      )}
                    </div>

                    <div className="bg-[#100B0D]/70 p-3 rounded-xl border border-[#FFF7F5]/5">
                      <span className="text-[#CDB9BA] mb-1 block">Keep Saying Sorry:</span>
                      <p className="text-sm font-semibold text-[#FFF7F1]">
                        {item.keepSayingSorry || "N/A"}
                      </p>
                    </div>

                    <div className="bg-[#100B0D]/70 p-3 rounded-xl border border-[#FFF7F5]/5">
                      <span className="text-[#CDB9BA] mb-1 block">Sorries Delivered:</span>
                      <p className="text-sm font-semibold text-[#FF91A4] inline-flex items-center gap-1">
                        <span>50 + 1 Bonus</span>
                        <HeartGraphic size={14} inline />
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#FFF7F5]/10 flex items-center justify-between">
                    <span className="text-xs text-[#CDB9BA]">Final Verdict:</span>
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1.5 ${
                        item.finalChoice?.toLowerCase().includes("okay")
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-[#F05A72]/15 text-[#FF91A4] border border-[#F05A72]/25"
                      }`}
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      {item.finalChoice || "Pending"}
                    </span>
                  </div>
                </article>
              ))
            )}
          </div>
        )}
      </div>
    </main>
  );
}
