import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import NextAuthProvider from "./auth-provider";
import { QueryProvider } from "@/providers/query-provider";
import { AudioProvider } from "@/context/audio-context";
import { GlobalAudioPlayer } from "@/components/audio/global-audio-player";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QuranTrack - Track Your Quran Reading Progress",
  description: "A mobile-first web application to track your Quran reading progress",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextAuthProvider>
          <QueryProvider>
            <AudioProvider>
              {children}
              <GlobalAudioPlayer />
            </AudioProvider>
          </QueryProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
