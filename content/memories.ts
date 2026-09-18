export interface MemoryConfig {
  enabled: boolean;
  image: string;
  caption: string;
  subcaption?: string;
}

export const memory: MemoryConfig = {
  enabled: false,
  image: "/images/memory.jpg",
  caption: "One of my favourite people to annoy ❤️",
  subcaption: "Just a small reminder of why you love me (hopefully) 😂",
};
