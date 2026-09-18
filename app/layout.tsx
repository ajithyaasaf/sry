import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AmbientParticles } from "@/components/effects/AmbientParticles";
import { Grain } from "@/components/effects/Grain";
import { ShutdownScreen } from "@/components/ShutdownScreen";

// SHUTDOWN / MAINTENANCE TOGGLE
// Set to true (or NEXT_PUBLIC_APP_SHUTDOWN=true in .env) if you ever need to temporarily shut down the site
const IS_SHUTDOWN = process.env.NEXT_PUBLIC_APP_SHUTDOWN === "true";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#C53041",
};

export const metadata: Metadata = {
  title: IS_SHUTDOWN ? "Notice" : "For Pvi ❤️ | A Very Serious Apology",
  description: IS_SHUTDOWN
    ? "Notice"
    : "I made a ridiculously elaborate website just because you asked for 50 sorries 😂❤️",
  icons: {
    icon: "/emojis/heart.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans selection:bg-[#F5E9E2] selection:text-[#C53041] flex flex-col justify-center relative overflow-x-hidden">
        {/* Background Atmosphere */}
        <AmbientParticles />
        <Grain />

        {/* Content Container */}
        <div className="relative z-10 w-full min-h-screen flex flex-col justify-center">
          {IS_SHUTDOWN ? <ShutdownScreen /> : children}
        </div>
      </body>
    </html>
  );
}
