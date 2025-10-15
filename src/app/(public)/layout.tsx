// app/(site)/layout.tsx
import Footer from "@/components/public/common/Footer";
import NavBar from "@/components/public/common/Navbar";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Aymen Portfolio — We Doing",
  description: "Black & White Halftone portfolio site",
};

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <NavBar />
      {/* Keep page content below the nav; avoid inline styles */}
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}
