import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AmbientParticles } from "@/components/effects/AmbientParticles";
import { Grain } from "@/components/effects/Grain";

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
  themeColor: "#100B0D",
};

export const metadata: Metadata = {
  title: "For Pvi ❤️ | A Very Serious Apology",
  description: "I made a ridiculously elaborate website just because you asked for 50 sorries 😂❤️",
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
      <body className="min-h-full bg-[#100B0D] text-[#FFF7F5] font-sans selection:bg-[#F05A72] selection:text-white flex flex-col justify-center relative overflow-x-hidden">
        {/* Background Atmosphere */}
        <AmbientParticles />
        <Grain />

        {/* Content Container */}
        <div className="relative z-10 w-full min-h-screen flex flex-col justify-center">
          {children}
        </div>
      </body>
    </html>
  );
}
