import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Free TTS - Text to Speech Converter",
  description: "Convert text to natural-sounding speech with Google's Language Model technology",
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
        {children}
        <div className="text-center text-xs text-muted-foreground pb-3">
          Created by <a href="https://github.com/thvroyal" target="_blank" rel="noopener noreferrer">@thvroyal</a>
        </div>
      </body>
    </html>
  );
}
