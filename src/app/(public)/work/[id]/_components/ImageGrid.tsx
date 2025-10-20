import { toAspectRatio } from "@/lib/utils/helpers";
import Image from "next/image";

type GridItem = {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
  displayRatio?: string;
};

export function ImageGrid({
  items,
  columns = 3,
  className,
  object = "cover", // "cover" | "contain"
}: {
  items: ReadonlyArray<GridItem>;
  columns?: 2 | 3 | 4;
  className?: string;
  object?: "cover" | "contain";
}) {
  const colClass =
    ({ 2: "grid-cols-2", 3: "grid-cols-3", 4: "grid-cols-4" }[columns]) ??
    "grid-cols-3";

  return (
    <div className={`grid gap-3 ${colClass} ${className ?? ""}`}>
      {items.map((it, idx) => {
        const aspect = toAspectRatio(it.displayRatio, it.width, it.height); // "3 / 2", etc.

        return (
          <div
            key={idx}
            className="relative w-full overflow-hidden"
            style={{ aspectRatio: aspect }} // keeps the ratio as width changes
          >
            {/* Using unoptimized to avoid next.config domain setup for demo; remove after configuring remotePatterns */}
            <Image
              src={it.url}
              alt={it.alt ?? ""}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={object === "cover" ? "object-cover" : "object-contain"}
              unoptimized
              priority={idx === 0}
            />
          </div>
        );
      })}
    </div>
  );
}
