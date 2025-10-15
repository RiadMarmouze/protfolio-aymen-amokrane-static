import React from "react";

interface SectionTitleProps {
  id?: string;
  children: React.ReactNode;
}

export default function SectionTitle({ id, children }: SectionTitleProps) {
  return (
    <h2
      id={id}
      className="text-4xl md:text-6xl tracking-tight mb-6 leading-[0.95] scroll-mt-24"
    >
      {children}
    </h2>
  );
}