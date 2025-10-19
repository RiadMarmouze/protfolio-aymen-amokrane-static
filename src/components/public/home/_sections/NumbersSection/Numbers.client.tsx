"use client";

import { BrandLogo } from "@/lib/types/home";
import Image from "next/image";

export default function NumbersSectionClient({ logos }: { logos: BrandLogo[] }) {
  const loop = [...logos, ...logos];

  // Find the biggest declared width among the logos
  const maxWidth = Math.max(...logos.map((l) => l.width));

  return (
    <div className="group">
      <div className="whitespace-nowrap flex items-center py-4 gap-12 animate-marquee group-hover:[animation-play-state:paused]">
        {loop.map((item, idx) => (
          <span
            key={`${item.name}-${idx}`}
            className="inline-flex items-center text-neutral-600"
          >
            <span
              className="inline-flex  items-center justify-center h-14"
              style={{ width: `${maxWidth}px` }}
            >
              <Image
                src={item.src}
                alt={`${item.name} logo`}
                width={item.width}
                height={item.height}
                priority={false}
                className="object-contain w-full h-full opacity-90"
              />
            </span>

            <span className="uppercase tracking-[0.25em] text-[11px] hidden sm:inline">
              {item.name}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
