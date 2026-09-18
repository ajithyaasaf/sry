export interface EmojiAsset {
  src: string;
  fallbackEmoji: string;
  alt: string;
}

export const emojis = {
  heart: {
    src: "/emojis/heart.png",
    fallbackEmoji: "❤️",
    alt: "Pvi & Ajith Heart",
  },
  annoyed: {
    src: "/emojis/annoyed.png",
    fallbackEmoji: "😒",
    alt: "Annoyed face",
  },
  angry: {
    src: "/emojis/angry.png",
    fallbackEmoji: "😤",
    alt: "Angry face",
  },
  happy: {
    src: "/emojis/happy.png",
    fallbackEmoji: "🥰",
    alt: "Happy face",
  },
  sad: {
    src: "/emojis/sad.png",
    fallbackEmoji: "🥺",
    alt: "Sad face",
  },
  confused: {
    src: "/emojis/confused.png",
    fallbackEmoji: "👀",
    alt: "Suspicious face",
  },
  angel: {
    src: "/emojis/angel.png",
    fallbackEmoji: "😇",
    alt: "Innocent face",
  },
} as const;

export type EmojiKey = keyof typeof emojis;
