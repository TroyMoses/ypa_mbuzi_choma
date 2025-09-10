import type React from "react";
import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "YPA Mbuzi Choma Restaurant - Authentic Grilled Goat Cuisine",
  description:
    "Experience the finest mbuzi choma (grilled goat) and authentic African cuisine at YPA Restaurant. Book your table today for an unforgettable dining experience.",
  keywords:
    "mbuzi choma, grilled goat, African cuisine, restaurant, authentic food, YPA restaurant",
  authors: [{ name: "YPA Mbuzi Choma Restaurant" }],
  generator: "v0.app",
  openGraph: {
    title: "YPA Mbuzi Choma Restaurant",
    description: "Authentic grilled goat cuisine and African specialties",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased">
        <Suspense fallback={null}>{children}</Suspense>
        <Toaster position="top-right" richColors />
        <Analytics />
      </body>
    </html>
  );
}
