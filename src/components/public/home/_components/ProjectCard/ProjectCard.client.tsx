"use client";

import Image from "next/image";
import Placeholder from "@/components/public/common/Placeholder";
import Link from "next/link";

export type ProjectCardClientProps = {
  id: string;
  title: string;
  tagline?: string;
  tags?: string[];
  aspectRatio?: string; // e.g. "2/1"
  heroUrl?: string;
};

export default function ProjectCardClient({
  id,
  title,
  tagline = "",
  tags = [],
  aspectRatio = "2/1",
  heroUrl,
}: ProjectCardClientProps) {
  return (
    <Link
      href={`/work/${id}`}
      aria-label={title}
      key={id}
      className="relative rounded-[2px] overflow-hidden group bg-neutral-50 dark:bg-neutral-900"
    >
      {/* Aspect-ratio wrapper gives the card height */}
      <div className={`relative w-full aspect-[${aspectRatio}]`}>
        {heroUrl ? (
          <Image
            src={heroUrl}
            alt={title}
            fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={false}
          />
        ) : (
          <Placeholder className="w-full h-full" />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white bg-gradient-to-t from-black/70 via-black/30 to-transparent">
          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight drop-shadow-md">
              {title}
            </h3>
            {tagline && (
              <p className="text-sm opacity-80 mt-1 drop-shadow-sm">
                {tagline}
              </p>
            )}
          </div>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="absolute top-4 left-4 flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {tags.map((t, ix) => (
              <span
                key={ix}
                className="rounded-full border border-white/30 px-2 py-0.5 text-[10px] uppercase bg-white/90 text-black backdrop-blur-sm shadow-sm"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
