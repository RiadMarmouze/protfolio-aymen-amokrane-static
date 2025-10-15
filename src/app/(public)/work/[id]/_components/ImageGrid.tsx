
import Image from "next/image";

export function ImageGrid({
  items,
  columns = 3,
  className,
}: {
  items: ReadonlyArray<{ url: string; alt?: string }>;
  columns?: 2 | 3 | 4;
  className?: string;
}) {
  const colClass = { 2: "grid-cols-2", 3: "grid-cols-3", 4: "grid-cols-4" }[columns] ?? "grid-cols-3";
  return (
    <div className={`grid gap-3 ${colClass} ${className ?? ""}`}>
      {items.map((it, idx) => (
        <div key={idx} className="relative h-48 w-full overflow-hidden rounded-xl sm:h-64">
          {/* Using unoptimized to avoid next.config domain setup for demo; remove when configuring remotePatterns */}
          <Image
            src={it.url}
            alt={it.alt ?? ""}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            unoptimized
            priority={idx === 0}
          />
        </div>
      ))}
    </div>
  );
}
