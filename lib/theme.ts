export const theme = {
  colors: {
    // The two pure signature colors requested by user:
    crimson: "#C53041",
    cream: "#F5E9E2",

    // Luxury velvet canvas tonal scale (derived solely from #C53041)
    crimsonLight: "#D94254",
    crimsonMid: "#9E1C2B",
    crimsonDark: "#660E1A",
    crimsonDeep: "#3A060E",

    // Cream parchment tonal scale (derived solely from #F5E9E2)
    creamPure: "#FFFFFF",
    creamSoft: "#F5E9E2",
    creamMuted: "rgba(245, 233, 226, 0.75)",
    creamFaint: "rgba(245, 233, 226, 0.15)",
    creamBorder: "rgba(245, 233, 226, 0.25)",

    // Typography
    textLight: "#F5E9E2",
    textMuted: "rgba(245, 233, 226, 0.75)",
    textDark: "#32050B",
    textDarkMuted: "rgba(50, 5, 11, 0.75)",
  },
  typography: {
    heading: "var(--font-playfair)",
    body: "var(--font-sans)",
  },
} as const;
