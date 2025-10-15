// app/layout.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Aymen Portfolio — We Doing",
    template: "%s — Aymen Portfolio",
  },
  description: "Black & White Halftone portfolio site",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full ">
      <body className="min-h-screen  antialiased bg-white text-black">
        {children}

        {/* Shared halftone background overlay (root only) */}
        <div className="pointer-events-none fixed inset-0 opacity-[0.05] bg-[linear-gradient(transparent_23px,_#000_24px),linear-gradient(90deg,transparent_23px,_#000_24px)] bg-[size:24px_24px]" />
      </body>
    </html>
  );
}
