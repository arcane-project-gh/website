import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const geist = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arcane Project | DayZ Community Servers",
  description: "Building a new standard for the DayZ experience",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full dark antialiased font-sans",
        geist.variable,
        geistMono.variable,
      )}
    >
      <body className="min-h-full flex flex-col max-w-6xl mx-auto">
        <Analytics />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
