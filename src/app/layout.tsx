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
      </body>
    </html>
  );
}
