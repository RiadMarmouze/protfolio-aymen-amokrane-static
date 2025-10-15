"use client";
import { Achievement } from "@/lib/types/home";
import * as React from "react";

// Lightweight progressive reveal; respects reduced motion.
export default function AchievementsClient({ items }: { items: Achievement[] }) {
  const ref = React.useRef<HTMLUListElement | null>(null);
  const [seen, setSeen] = React.useState(false);

  React.useEffect(() => {
    if (!ref.current || typeof window === "undefined") return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) {
      setSeen(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setSeen(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <ul ref={ref} className="space-y-8 md:space-y-10">
      {items.map(({ title, subtitle }, i) => (
        <li
          key={`${title}-${i}`}
          className={`transition-opacity duration-700 ${
            seen ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: seen ? `${i * 60}ms` : undefined }}
        >
          <h3 className="text-xl md:text-2xl font-semibold">{title}</h3>
          {subtitle && (
            <p className="text-neutral-500 md:text-neutral-600 text-sm md:text-base max-w-2xl">
              {subtitle}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}
