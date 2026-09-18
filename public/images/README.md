# Optional Memory Photos
Place your photo here:
- memory.jpg (or .png)

Then in content/memories.ts:
set:
export const memory = {
  enabled: true,
  image: "/images/memory.jpg",
  caption: "One of my favourite people to annoy ❤️"
};

If enabled is false, the website automatically displays an illustrated keepsake instead.