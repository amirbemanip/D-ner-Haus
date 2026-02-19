import type { Metadata } from "next";
import { Outfit, Syncopate } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Preloader } from "@/components/Preloader";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const syncopate = Syncopate({
  variable: "--font-syncopate",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "DÖNERHAUS | Masterpiece of Taste",
  description: "Premium Döner Experience in Nürnberg. Neudefinition der deutsch-türkischen Street-Food-Kultur.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="scroll-smooth">
      <body
        className={`${outfit.variable} ${syncopate.variable} antialiased bg-obsidian-base text-white font-sans overflow-x-hidden`}
      >
        <Preloader />
        <SmoothScroll>
          <NoiseOverlay />
          <CustomCursor />
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
