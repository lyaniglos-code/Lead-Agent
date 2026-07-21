import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// next/font downloads and self-hosts these Google fonts at build time, so no
// external request is made at runtime (faster + privacy-friendly). Each font
// exposes a CSS variable we reference from globals.css / Tailwind.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata is rendered into <head> for every page by default. Individual pages
// can override or extend it. Good titles/descriptions matter for the SEO and
// social previews a public portfolio project should have.
export const metadata: Metadata = {
  title: "LeadPilot — AI Lead Follow-Up Agent",
  description:
    "Capture leads, score them with AI, and send personalized follow-ups automatically.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
