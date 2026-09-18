export interface MemoryConfig {
  enabled: boolean;
  image: string;
  caption: string;
  subcaption?: string;
}

export const memory: MemoryConfig = {
  enabled: false,
  image: "/images/memory.jpg",
  caption: "My only favourite place is... ❤️",
  subcaption: "Just a small reminder that don't stress yourself for everthing",
};
