/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import BigWordRotator from "../../BigWordRotator";
import { Btn } from "@/components/public/common/ui";
import { ArrowUpRight } from "lucide-react";
import { ImageItem } from "@/lib/types/home";

export default function HeroSectionClient({ images }: { images: ImageItem[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const words = useMemo(
    () => images.map((img) => img.word ?? img.alt ?? ""),
    [images]
  );
  const total = images.length;
  const rotationMs = 3000;

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return (
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
    );
  }, []);

  // Single timer drives both the carousel and the words
  useEffect(() => {
    if (!total || prefersReducedMotion || paused) return;
    timerRef.current && clearInterval(timerRef.current);
    timerRef.current = setInterval(
      () => setIndex((i) => (i + 1) % total),
      rotationMs
    );
    return () => {
      timerRef.current && clearInterval(timerRef.current);
    };
  }, [total, prefersReducedMotion, paused, rotationMs]);

  if (!total) return null;

  return (
    <div
      className="relative z-10 w-full h-full flex items-center justify-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Hero background image carousel"
    >
      {/* Background slides */}
      <div className="absolute inset-0 -z-10">
        {images.map((img, i) => {
          const isActive = i === index;
          return (
            <div
              key={img.src + i}
              className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
              aria-hidden={!isActive}
            >
              <Image
                priority={i === 0}
                loading={i === 0 ? "eager" : "lazy"}
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-white/40 to-white/10" />
            </div>
          );
        })}
      </div>

      {/* Centered content (migrated to client): H1 + BigWordRotator + CTA */}
      <div className="w-full">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 text-center">
          {/* H1 */}
          <h1
            className="
              font-semibold tracking-tight leading-[0.92]
              text-[clamp(2.5rem,8vw,5.5rem)]
              md:text-[clamp(3.5rem,7vw,7rem)]
            "
          >
            DOING
          </h1>

          {/* Rotator (controlled by `index`) */}
          <div
            className="
              mt-1 font-semibold tracking-tight
              text-[clamp(2.2rem,7.8vw,5rem)]
              md:text-[clamp(3rem,6.8vw,6.5rem)]
            "
          >
            <BigWordRotator
              words={words}
              activeIndex={index}
              className="
                font-semibold tracking-tight
                text-[clamp(2.2rem,7.8vw,5rem)]
                md:text-[clamp(3rem,6.8vw,6.5rem)]
              "
            />
          </div>

          {/* CTA */}
          <div className="mt-6 sm:mt-8">
            <Link
              href="/contact"
              aria-label="Contact — Available for work"
              className="
                inline-block
                focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2
                motion-reduce:transition-none
              "
            >
              <Btn
                className="
                  group relative inline-flex items-center justify-center gap-3 sm:gap-4
                  rounded-full border-2 border-black bg-white text-black
                  px-5 py-3 sm:px-7 sm:py-3.5 lg:px-9 lg:py-4
                  text-xs sm:text-sm lg:text-base
                  uppercase tracking-[0.15em] sm:tracking-[0.2em]
                  hover:bg-black hover:text-white transition-colors duration-300
                  min-h-11 sm:min-h-12
                "
              >
                <span className="relative flex items-center justify-center w-5 h-5 text-current">
                  <span
                    className="absolute inset-0 rounded-full animate-pulse-ring
                    [background:radial-gradient(circle,currentColor_60%,transparent_100%)] opacity-70"
                    aria-hidden
                  />
                  <span className="relative w-2.5 h-2.5 rounded-full bg-current" />
                </span>
                <span className="pb-[1px]">AVAILABLE FOR WORK</span>
                <ArrowUpRight
                  strokeWidth={3}
                  className="
                    w-5 h-5 lg:h-6 pb-[1px]
                    transition-transform duration-300
                    motion-safe:group-hover:translate-x-1 motion-safe:group-hover:-translate-y-1
                    motion-reduce:transition-none
                  "
                  aria-hidden
                />
              </Btn>
            </Link>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1} of ${total}`}
            aria-pressed={i === index}
            className={`
              h-2.5 w-2.5 rounded-full border transition
              border-black/50
              ${i === index ? "bg-black/80" : "bg-white/60 hover:bg-white"}
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black
            `}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>

      {/* SR-only announcement for current word */}
      <div className="sr-only" aria-live="polite">
        {words[index]}
      </div>
    </div>
  );
}
