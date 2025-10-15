"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CarouselItem, Direction, Mode, Transition } from "../lib/types";

/** Parse "W:H" → number, else undefined */
function parseRatioString(r?: string): number | undefined {
  if (!r || !/^\d+:\d+$/.test(r)) return undefined;
  const [w, h] = r.split(":").map(Number);
  if (w > 0 && h > 0) return w / h;
  return undefined;
}

/** Prefer item's displayRatio; else compute from width/height; fallback 16/9 */
function computeItemRatio(item: CarouselItem): number {
  return (
    parseRatioString(item.displayRatio) ??
    (item.height > 0 ? item.width / item.height : 16 / 9)
  );
}

function easing(transition: Transition) {
  switch (transition) {
    case "linear":
      return "linear";
    case "ease":
      return "ease";
    default:
      return "cubic-bezier(0.4, 0, 0.2, 1)";
  }
}

export function CarouselClient({
  items,
  mode = "auto",
  intervalMs = 3000,
  slideDurationMs = 500,
  transition = "ease-in-out",
  direction = "rtl",
  loop = true,
  pauseOnHover = true,
  showIndicators = true,
  showArrows = true,
  className = "",
  arrowSize = 22,
  /** keep this prop name */
  displayRatio, // e.g. "16:9"; if provided, it overrides per-slide ratio
}: {
  items: ReadonlyArray<CarouselItem>;
  mode?: Mode;
  intervalMs?: number;
  slideDurationMs?: number;
  transition?: Transition;
  direction?: Direction;
  loop?: boolean;
  pauseOnHover?: boolean;
  showIndicators?: boolean;
  showArrows?: boolean;
  className?: string;
  arrowSize?: number;
  displayRatio?: string; // 👈 kept
}) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const count = items.length;

  // Per-slide ratios
  const ratios = useMemo(() => items.map(computeItemRatio), [items]);

  // Container ratio: explicit displayRatio prop first, else current slide
  const containerRatio =
    parseRatioString(displayRatio) ?? ratios[index] ?? 16 / 9;

  // Clamp index on items change
  useEffect(() => {
    if (count === 0) setIndex(0);
    else setIndex((i) => (i >= count ? 0 : i));
  }, [count]);

  const next = () =>
    setIndex((i) => {
      if (count === 0) return 0;
      if (loop) return (i + 1) % count;
      return Math.min(i + 1, Math.max(0, count - 1));
    });

  const prev = () =>
    setIndex((i) => {
      if (count === 0) return 0;
      if (loop) return (i - 1 + count) % count;
      return Math.max(i - 1, 0);
    });

  // Autoplay
  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    const shouldAuto =
      (mode === "auto" || mode === "clickAuto") && count > 1 && intervalMs > 0;
    if (!shouldAuto) return;

    timerRef.current = setInterval(() => {
      setIndex((i) => {
        if (count === 0) return 0;
        if (loop) return (i + 1) % count;
        return Math.min(i + 1, Math.max(0, count - 1));
      });
    }, intervalMs);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [mode, intervalMs, loop, count]);

  const handleMouseEnter = () => {
    if (!pauseOnHover) return;
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    if (!(mode === "auto" || mode === "clickAuto")) return;
    if (timerRef.current) return;
    if (count > 1 && intervalMs > 0) {
      timerRef.current = setInterval(() => {
        setIndex((i) => {
          if (count === 0) return 0;
          if (loop) return (i + 1) % count;
          return Math.min(i + 1, Math.max(0, count - 1));
        });
      }, intervalMs);
    }
  };

  const tf = easing(transition);
  const moveLeftToRight = direction === "ltr";
  const translatePercent = moveLeftToRight ? index * 100 : -index * 100;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Use explicit displayRatio if provided, else slide's own ratio */}
      <div className="relative w-full" style={{ aspectRatio: containerRatio }}>
        <div
          className="absolute inset-0 flex"
          style={{
            width: `${count * 100}%`,
            transform: `translateX(${translatePercent}%)`,
            transitionProperty: "transform",
            transitionDuration: `${slideDurationMs}ms`,
            transitionTimingFunction: tf,
          }}
          onClick={() => {
            if (mode === "clickAuto") next();
          }}
        >
          {items.map((item) => (
            <Slide key={item.url} item={item} />
          ))}
        </div>
      </div>

      {items[index]?.caption && (
        <div className="pointer-events-none absolute bottom-3 left-3 right-3 rounded-xl bg-black/50 px-3 py-2 text-sm text-white">
          {items[index].caption}
        </div>
      )}

      {showArrows && mode === "clickAuto" && count > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            className="group absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md backdrop-blur transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-black/50"
            onClick={prev}
          >
            <ChevronLeft
              size={arrowSize}
              className="text-gray-900 transition-transform group-active:-translate-x-0.5"
              strokeWidth={2.5}
            />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            className="group absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md backdrop-blur transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-black/50"
            onClick={next}
          >
            <ChevronRight
              size={arrowSize}
              className="text-gray-900 transition-transform group-active:translate-x-0.5"
              strokeWidth={2.5}
            />
          </button>
        </>
      )}

      {showIndicators && count > 1 && (
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
          {items.map((it, i) => (
            <button
              key={it.url}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 w-2 rounded-full ${
                i === index ? "bg-white" : "bg-white/50"
              }`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function Slide({ item }: { item: CarouselItem }) {
  return (
    <div className="relative h-full w-full flex-[0_0_100%]">
      {item.link ? (
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block h-full w-full"
        >
          <Image
            src={item.url}
            alt={item.alt ?? ""}
            /** 👉 use the intrinsic dimensions now */
            width={item.width}
            height={item.height}
            className="object-contain"
            // placeholder="blur" blurDataURL={item.blurDataURL}
            priority={false}
            loading="lazy"
            decoding="async"
          />
        </a>
      ) : (
        <Image
          src={item.url}
          alt={item.alt ?? ""}
          /** 👉 use the intrinsic dimensions now */
          width={item.width}
          height={item.height}
          className="object-contain"
          // placeholder="blur" blurDataURL={item.blurDataURL}
          priority={false}
          loading="lazy"
          decoding="async"
        />
      )}
    </div>
  );
}
