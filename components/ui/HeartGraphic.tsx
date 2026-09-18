"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface HeartGraphicProps {
  size?: number;
  className?: string;
  animate?: boolean;
  glow?: boolean;
  inline?: boolean;
}

export function HeartGraphic({
  size = 24,
  className = "",
  animate = false,
  glow = false,
  inline = false,
}: HeartGraphicProps) {
  const heartImg = (
    <Image
      src="/main.svg"
      alt="Heart"
      width={size}
      height={size}
      priority
      className="object-contain select-none pointer-events-none drop-shadow-sm inline-block align-middle"
      style={{ width: `${size}px`, height: `${size}px` }}
    />
  );

  if (inline) {
    return (
      <span className={`inline-flex items-center justify-center align-middle mx-1 ${className}`}>
        {animate ? (
          <motion.span
            animate={{
              scale: [1, 1.22, 1],
            }}
            transition={{
              duration: 1.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="inline-flex items-center justify-center"
          >
            {heartImg}
          </motion.span>
        ) : (
          heartImg
        )}
      </span>
    );
  }

  return (
    <div
      className={`relative inline-flex items-center justify-center align-middle ${className}`}
      style={{ width: size, height: size }}
    >
      {glow && (
        <div
          className="absolute inset-0 rounded-full blur-xl bg-[#F5E9E2]/35 pointer-events-none"
          style={{ transform: "scale(1.3)" }}
        />
      )}
      {animate ? (
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative flex items-center justify-center"
        >
          {heartImg}
        </motion.div>
      ) : (
        <div className="relative flex items-center justify-center">
          {heartImg}
        </div>
      )}
    </div>
  );
}
