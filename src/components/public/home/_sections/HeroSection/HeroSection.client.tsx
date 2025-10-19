/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import BigWordRotator from "../../BigWordRotator";
import { Btn } from "@/components/public/common/ui";
import { ArrowUpRight } from "lucide-react";
import { ImageItem } from "@/lib/types/home";

type IntervalHandle = ReturnType<typeof setInterval>;

export default function HeroSectionClient({ images }: { images: ImageItem[] }) {
  const [index, setIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isPaused, setIsPaused] = useState(false); // hover/focus pause
  const timerRef = useRef<IntervalHandle | null>(null);

  const rotationMs = 3000 as const;
  const total = images.length;

  const words = useMemo(
    () => images.map((img) => img.word ?? img.alt ?? ""),
    [images]
  );

  // Keep index in range if images change (e.g., CMS updates)
  useEffect(() => {
    if (!total) return;
    setIndex((i) => (i >= total ? 0 : i));
  }, [total]);

  // Track reduced-motion preference (SSR-safe, reacts to changes)
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(!!mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    if (timerRef.current) return; // don’t double-start
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % Math.max(total, 1));
    }, rotationMs);
  }, [rotationMs, total]);

  // Auto-rotate: only when allowed, not paused, and tab is visible.
  useEffect(() => {
    if (!total) return;
    const shouldRun =
      !prefersReducedMotion && !isPaused && document.visibilityState === "visible";

    if (shouldRun) startTimer();
    else clearTimer();

    const handleVis = () => {
      const visible = document.visibilityState === "visible";
      if (visible && !prefersReducedMotion && !isPaused) startTimer();
      else clearTimer();
    };

    document.addEventListener("visibilitychange", handleVis);
    return () => {
      document.removeEventListener("visibilitychange", handleVis);
      clearTimer();
    };
  }, [total, prefersReducedMotion, isPaused, startTimer, clearTimer]);

  // Keyboard support: Left/Right arrows to navigate
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (!total) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setIndex((i) => (i + 1) % total);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setIndex((i) => (i - 1 + total) % total);
      }
    },
    [total]
  );

  if (!total) return null;

  return (
    <div
      className="relative z-10 w-full h-full flex items-center justify-center"
      aria-roledescription="carousel"
      aria-label="Hero background image carousel"
      role="group"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
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
              <div className="absolute inset-0 pointer-events-none">
                {/* Slightly darker base tint */}
                <div className="absolute inset-0 bg-black/25" />

                {/* Moderate vignette for depth */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.25)_60%,rgba(0,0,0,0.4)_100%)]" />

                {/* Softer top & bottom gradient to guide focus */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-white/10" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Centered content (migrated to client): H1 + BigWordRotator + CTA */}
      <div className="w-full">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 text-center text-white">
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
