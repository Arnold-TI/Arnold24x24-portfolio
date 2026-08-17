import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import type { ReactNode } from "react";
import ProfileContent from "@/components/ProfileContent";
import { Analytics } from '@vercel/analytics/react';
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Arnold's Deep Sea",
  description: "My personal portfolio website",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: ReactNode;
}) {
    return (
        <html lang="es" className={outfit.className}>
        <body className="bg-[#0a0a0a] text-white antialiased">
        <ProfileContent />
        {children}
        <Analytics />
        </body>
        </html>
    );
}
