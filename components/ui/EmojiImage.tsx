"use client";

import { useState } from "react";
import Image from "next/image";
import { emojis, EmojiKey } from "@/content/emojis";

interface EmojiImageProps {
  emojiKey: EmojiKey;
  size?: number;
  className?: string;
}

export function EmojiImage({ emojiKey, size = 32, className = "" }: EmojiImageProps) {
  const [hasError, setHasError] = useState(false);
  const asset = emojis[emojiKey];

  if (!asset) return null;

  if (hasError) {
    return (
      <span
        style={{ fontSize: `${size * 0.8}px`, lineHeight: 1 }}
        className={`inline-block select-none ${className}`}
        role="img"
        aria-label={asset.alt}
      >
        {asset.fallbackEmoji}
      </span>
    );
  }

  return (
    <span
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={asset.src}
        alt={asset.alt}
        width={size}
        height={size}
        onError={() => setHasError(true)}
        className="object-contain pointer-events-none"
      />
    </span>
  );
}
