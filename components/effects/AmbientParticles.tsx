"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export function AmbientParticles() {
  const shouldReduceMotion = useReducedMotion();

  // Generate lightweight deterministic particles
  const particles: Particle[] = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      x: (i * 17) % 100, // percentage across width
      y: (i * 23) % 100, // percentage across height
      size: 2 + (i % 3) * 1.5,
      duration: 10 + (i % 5) * 3,
      delay: (i * 1.2) % 6,
      opacity: 0.15 + (i % 3) * 0.12,
    }));
  }, []);

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#FF91A4]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            boxShadow: "0 0 8px 1px rgba(240, 90, 114, 0.4)",
          }}
          animate={{
            y: ["0px", "-40px", "0px"],
            x: ["0px", `${(p.id % 2 === 0 ? 1 : -1) * 15}px`, "0px"],
            opacity: [p.opacity * 0.4, p.opacity, p.opacity * 0.4],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Subtle warm glow radial gradients */}
      <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-[#F05A72]/10 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-[#FF91A4]/8 blur-3xl" />
    </div>
  );
}
