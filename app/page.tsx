"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMounted } from "@/lib/useMounted";
import { Music } from "lucide-react";

import { IntroScene } from "@/components/apology/IntroScene";
import { MamaApologyScene } from "@/components/apology/MamaApologyScene";
import { SongScene } from "@/components/apology/SongScene";
import { PlayfulTransitionScene } from "@/components/apology/PlayfulTransitionScene";
import { EnvelopeScene } from "@/components/apology/EnvelopeScene";
import { AngerQuestion } from "@/components/apology/AngerQuestion";
import { AngerMeter } from "@/components/apology/AngerMeter";
import { SorryCounter } from "@/components/apology/SorryCounter";
import { PlayfulQuestions } from "@/components/apology/PlayfulQuestions";
import { MemoryScene } from "@/components/apology/MemoryScene";
import { VoiceMessage } from "@/components/apology/VoiceMessage";
import { FinalQuestion } from "@/components/apology/FinalQuestion";
import { CelebrationScene } from "@/components/apology/CelebrationScene";
import { FinalMessage } from "@/components/apology/FinalMessage";

const STORAGE_KEY = "pvi_apology_progress_v4";

interface SavedProgress {
  scene?: number;
  angerChoice?: string;
  angerLevel?: number;
  smiling?: string;
  deserved?: string;
  customDeservedNote?: string;
  keepSayingSorry?: string;
  sorryCount?: number;
  finalChoice?: string;
}

function getStoredProgress(): SavedProgress | null {
  if (typeof window === "undefined") return null;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

export default function ApologyPage() {
  const isMounted = useMounted();

  // Lazy state initializers so values hydrate seamlessly
  const [scene, setScene] = useState<number>(() => {
    return getStoredProgress()?.scene ?? 1;
  });

  const [angerChoice, setAngerChoice] = useState<string>(() => {
    return getStoredProgress()?.angerChoice ?? "";
  });

  const [angerLevel, setAngerLevel] = useState<number>(() => {
    return getStoredProgress()?.angerLevel ?? 65;
  });

  const [smiling, setSmiling] = useState<string>(() => {
    return getStoredProgress()?.smiling ?? "";
  });

  const [deserved, setDeserved] = useState<string>(() => {
    return getStoredProgress()?.deserved ?? "";
  });

  const [customDeservedNote, setCustomDeservedNote] = useState<string>(() => {
    return getStoredProgress()?.customDeservedNote ?? "";
  });

  const [keepSayingSorry, setKeepSayingSorry] = useState<string>(() => {
    return getStoredProgress()?.keepSayingSorry ?? "";
  });

  const [sorryCount, setSorryCount] = useState<number>(() => {
    return getStoredProgress()?.sorryCount ?? 0;
  });

  const [finalChoice, setFinalChoice] = useState<string>(() => {
    return getStoredProgress()?.finalChoice ?? "";
  });

  // Continuous Background Song Controller (starts in SongScene, plays across scenes, stops at FinalMessage)
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isSongPlaying, setIsSongPlaying] = useState(false);
  const [songSrc, setSongSrc] = useState("/audio/song.mp3");

  const startAndProceed = useCallback((targetScene: number) => {
    const audio = audioRef.current;
    if (audio && !isSongPlaying) {
      audio
        .play()
        .then(() => {
          setIsSongPlaying(true);
        })
        .catch((err) => {
          console.warn("Audio play error:", err);
        });
    }
    setScene(targetScene);
  }, [isSongPlaying]);

  const toggleSong = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isSongPlaying) {
      audio.pause();
      setIsSongPlaying(false);
    } else {
      audio
        .play()
        .then(() => {
          setIsSongPlaying(true);
        })
        .catch((err) => {
          console.warn("Audio play error:", err);
          setIsSongPlaying(false);
        });
    }
  }, [isSongPlaying]);


  // Persist progress to local storage
  useEffect(() => {
    if (!isMounted) return;
    try {
      const payload = {
        scene,
        angerChoice,
        angerLevel,
        smiling,
        deserved,
        customDeservedNote,
        keepSayingSorry,
        sorryCount,
        finalChoice,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {}
  }, [
    isMounted,
    scene,
    angerChoice,
    angerLevel,
    smiling,
    deserved,
    customDeservedNote,
    keepSayingSorry,
    sorryCount,
    finalChoice,
  ]);

  function handleRestart() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsSongPlaying(false);
    }
    setScene(1);
    setAngerChoice("");
    setAngerLevel(65);
    setSmiling("");
    setDeserved("");
    setCustomDeservedNote("");
    setKeepSayingSorry("");
    setSorryCount(0);
    setFinalChoice("");
  }

  const collectedAnswers = {
    angerChoice,
    angerLevel,
    smiling,
    deserved,
    customDeservedNote,
    keepSayingSorry,
    finalChoice,
    sorryCount,
  };

  const sceneVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.3, ease: "easeIn" as const } },
  };

  // Avoid hydration mismatch before mounting
  if (!isMounted) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="w-8 h-8 rounded-full border-2 border-[#F5E9E2] border-t-transparent animate-spin" />
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen flex flex-col justify-center items-center relative overflow-hidden py-4">
      <AnimatePresence mode="wait">
        {scene === 1 && (
          <motion.div
            key="scene-1"
            variants={sceneVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full"
          >
            <IntroScene onNext={() => setScene(2)} />
          </motion.div>
        )}

        {scene === 2 && (
          <motion.div
            key="scene-2"
            variants={sceneVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full"
          >
            <MamaApologyScene onNext={() => setScene(3)} />
          </motion.div>
        )}

        {scene === 3 && (
          <motion.div
            key="scene-3"
            variants={sceneVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full"
          >
            <SongScene
              isPlaying={isSongPlaying}
              onProceed={() => startAndProceed(4)}
            />
          </motion.div>
        )}

        {scene === 4 && (
          <motion.div
            key="scene-4"
            variants={sceneVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full"
          >
            <PlayfulTransitionScene onNext={() => setScene(5)} />
          </motion.div>
        )}

        {scene === 5 && (
          <motion.div
            key="scene-5"
            variants={sceneVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full"
          >
            <EnvelopeScene onNext={() => setScene(6)} />
          </motion.div>
        )}

        {scene === 6 && (
          <motion.div
            key="scene-6"
            variants={sceneVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full"
          >
            <AngerQuestion
              initialChoice={angerChoice}
              onSelect={setAngerChoice}
              onNext={() => setScene(7)}
            />
          </motion.div>
        )}

        {scene === 7 && (
          <motion.div
            key="scene-7"
            variants={sceneVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full"
          >
            <AngerMeter
              initialValue={angerLevel}
              onChange={setAngerLevel}
              onNext={() => setScene(8)}
            />
          </motion.div>
        )}

        {scene === 8 && (
          <motion.div
            key="scene-8"
            variants={sceneVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full"
          >
            <SorryCounter
              currentCount={sorryCount}
              onIncrement={setSorryCount}
              onNext={() => setScene(9)}
            />
          </motion.div>
        )}

        {scene === 9 && (
          <motion.div
            key="scene-9"
            variants={sceneVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full"
          >
            <PlayfulQuestions
              answers={{ smiling, deserved, customDeservedNote, keepSayingSorry }}
              onAnswer={(key, val) => {
                if (key === "smiling") setSmiling(val);
                if (key === "deserved") setDeserved(val);
                if (key === "customDeservedNote") setCustomDeservedNote(val);
                if (key === "keepSayingSorry") setKeepSayingSorry(val);
              }}
              onNext={() => setScene(10)}
            />
          </motion.div>
        )}

        {scene === 10 && (
          <motion.div
            key="scene-10"
            variants={sceneVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full"
          >
            <MemoryScene onNext={() => setScene(11)} />
          </motion.div>
        )}

        {scene === 11 && (
          <motion.div
            key="scene-11"
            variants={sceneVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full"
          >
            <VoiceMessage onNext={() => setScene(12)} />
          </motion.div>
        )}

        {scene === 12 && (
          <motion.div
            key="scene-12"
            variants={sceneVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full"
          >
            <FinalQuestion
              onSelect={setFinalChoice}
              onProceed={(decision) => {
                if (decision === "okay") {
                  setScene(13);
                } else {
                  setScene(14);
                }
              }}
            />
          </motion.div>
        )}

        {scene === 13 && (
          <motion.div
            key="scene-13"
            variants={sceneVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full"
          >
            <CelebrationScene onNext={() => setScene(14)} />
          </motion.div>
        )}

        {scene === 14 && (
          <motion.div
            key="scene-14"
            variants={sceneVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full"
          >
            <FinalMessage
              answers={collectedAnswers}
              onRestart={handleRestart}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Root audio element that plays continuously across scenes until scene 12 */}
      <audio
        ref={audioRef}
        src={songSrc}
        loop
        playsInline
        preload="auto"
        onError={() => {
          if (songSrc === "/audio/song.mp3") {
            setSongSrc("/audio/sng-3.mp3");
          } else if (songSrc === "/audio/sng-3.mp3") {
            setSongSrc("/audio/sng-2.mp3");
          }
        }}
        onPause={() => setIsSongPlaying(false)}
        onPlay={() => setIsSongPlaying(true)}
      />

      {/* Subtle floating music indicator on subsequent scenes including final message */}
      {isSongPlaying && scene >= 4 && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={toggleSong}
          className="fixed top-4 right-4 z-50 py-1.5 px-3 rounded-full bg-[#3A060E]/85 border border-[#F5E9E2]/30 text-[#F5E9E2] shadow-lg backdrop-blur-sm flex items-center gap-1.5 text-xs font-mono cursor-pointer hover:bg-[#3A060E] active:scale-95 transition-transform"
          aria-label="Pause or play song"
        >
          <Music className="w-3.5 h-3.5 animate-pulse text-[#F5E9E2]" />
          <span className="text-[11px] font-sans">Playing</span>
        </motion.button>
      )}
    </main>
  );
}
