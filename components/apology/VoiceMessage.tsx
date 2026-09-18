"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { voiceConfig } from "@/content/voice";
import { Play, Pause, Volume2, ArrowRight, Mic } from "lucide-react";

interface VoiceMessageProps {
  onNext: () => void;
}

export function VoiceMessage({ onNext }: VoiceMessageProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioAvailable, setAudioAvailable] = useState<boolean | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Check if audio file is available
    const audio = new Audio();
    audio.src = voiceConfig.audioPath;

    const onCanPlay = () => {
      setAudioAvailable(true);
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const onError = () => {
      setAudioAvailable(false);
    };

    audio.addEventListener("canplaythrough", onCanPlay);
    audio.addEventListener("error", onError);

    // Initial check
    audio.load();

    return () => {
      audio.removeEventListener("canplaythrough", onCanPlay);
      audio.removeEventListener("error", onError);
      audio.pause();
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn("Audio play prevented:", err);
      });
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      if (!duration && audioRef.current.duration) {
        setDuration(audioRef.current.duration);
      }
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs === 0) return "0:00";
    const mins = Math.floor(secs / 60);
    const remainder = Math.floor(secs % 60);
    return `${mins}:${remainder < 10 ? "0" : ""}${remainder}`;
  };

  // If audio is confirmed missing, provide an automatic gentle bypass
  if (audioAvailable === false) {
    return (
      <div className="flex flex-col items-center justify-between px-4 py-8 min-h-[82vh] max-w-sm mx-auto text-center">
        <div className="w-full">
          <span className="text-xs font-mono uppercase tracking-widest text-[#FF91A4] font-semibold">
            One more thing...
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#FFF7F1] font-medium mt-1">
            Almost at the finish line!
          </h2>
        </div>

        <div className="w-full my-auto py-6 bg-[#191013] border border-[#FFF7F5]/10 rounded-3xl p-6 shadow-xl space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#F05A72]/15 flex items-center justify-center mx-auto text-[#FF91A4]">
            <Mic className="w-5 h-5" />
          </div>
          <p className="font-serif text-lg text-[#FFF7F1]">
            &ldquo;Now prepare yourself for the final verdict.&rdquo;
          </p>
          <p className="text-xs text-[#CDB9BA]">
            You have endured 50+ sorries. Let&apos;s see if it actually worked 😂
          </p>
        </div>

        <div className="w-full">
          <motion.button
            onClick={onNext}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#F05A72] to-[#FF91A4] text-white font-medium text-sm shadow-lg shadow-[#F05A72]/25 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Proceed to the verdict</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-between px-4 py-8 min-h-[82vh] max-w-sm mx-auto text-center">
      {/* Hidden Native Audio Element */}
      <audio
        ref={audioRef}
        src={voiceConfig.audioPath}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onLoadedMetadata={() => {
          if (audioRef.current) setDuration(audioRef.current.duration);
        }}
      />

      {/* Header */}
      <div className="w-full">
        <span className="text-xs font-mono uppercase tracking-widest text-[#FF91A4] font-semibold flex items-center justify-center gap-1.5">
          <Volume2 className="w-3.5 h-3.5" /> Voice Note
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl text-[#FFF7F1] font-medium mt-1">
          {voiceConfig.title}
        </h2>
        <p className="text-xs text-[#CDB9BA] mt-1">{voiceConfig.subtitle}</p>
      </div>

      {/* Touch-Friendly Player Card */}
      <div className="w-full my-auto py-6">
        <div className="bg-[#191013] border border-[#F05A72]/25 rounded-3xl p-6 shadow-2xl space-y-5">
          {/* Big Circular Play Button */}
          <motion.button
            onClick={togglePlay}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#F05A72] to-[#FF91A4] text-white mx-auto flex items-center justify-center shadow-xl shadow-[#F05A72]/30 cursor-pointer"
            aria-label={isPlaying ? "Pause voice message" : "Play voice message"}
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 fill-current" />
            ) : (
              <Play className="w-8 h-8 fill-current ml-1" />
            )}
          </motion.button>

          {/* Progress Bar & Timers */}
          <div className="space-y-2">
            <div className="w-full h-2 bg-[#100B0D] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#F05A72] rounded-full transition-all"
                style={{
                  width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
                }}
              />
            </div>
            <div className="flex justify-between text-[11px] font-mono text-[#CDB9BA]">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <p className="text-xs text-[#FFF7F5]/80 font-medium">
            {isPlaying ? "Playing voice note... 🎙️" : "Tap to listen"}
          </p>
        </div>
      </div>

      {/* Next Button */}
      <div className="w-full">
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#F05A72] to-[#FF91A4] text-white font-medium text-sm shadow-lg shadow-[#F05A72]/25 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Continue ❤️</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
}
