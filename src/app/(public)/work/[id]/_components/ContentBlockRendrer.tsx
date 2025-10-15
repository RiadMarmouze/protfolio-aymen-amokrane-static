import { Block } from "../lib/schema";
import { Direction, Mode, Transition } from "../lib/types";
import { CarouselWrapper } from "./CarouselWrapper";
import { ImageGrid } from "./ImageGrid";
import { InlineList } from "./InlineList";
import Image from "next/image";

export function ContentBlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "heading":
      return (
        <h2 className="mt-8 text-2xl font-bold">{block.content as string}</h2>
      );
    case "subheading":
      return (
        <h3 className="mt-6 text-xl font-semibold">
          {block.content as string}
        </h3>
      );
    case "paragraph":
      return (
        <p className="mt-4 leading-relaxed text-gray-700">
          {block.content as string}
        </p>
      );
    case "quote":
      return (
        <blockquote className="mt-4 border-l-4 border-gray-300 pl-4 italic text-gray-600">
          {block.content as string}
        </blockquote>
      );
    case "list":
      return (
        <ul className="mt-4 list-disc pl-6 text-gray-700">
          {(block.content as string).split(/;\s*/).map((li) => (
            <li key={li}>{li}</li>
          ))}
        </ul>
      );
    case "inlineList":
      return (
        <InlineList
          items={block.content as Array<{ key: string; value: string }>}
        />
      );
    case "image": {
      const item = block.content?.[0] as
        | {
            url: string;
            alt?: string;
            caption?: string;
            link?: string;
            width: number;
            height: number;
            displayRatio?: string;
          }
        | undefined;

      if (!item) return null;
      const ratio =
        (item.displayRatio && /^\d+:\d+$/.test(item.displayRatio)
          ? (() => {
              const [w, h] = item.displayRatio.split(":").map(Number);
              return w > 0 && h > 0 ? w / h : undefined;
            })()
          : undefined) ??
        (item.height > 0 ? item.width / item.height : undefined);

      const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) =>
        item.link ? (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            {children}
          </a>
        ) : (
          <>{children}</>
        );

      return (
        <figure
          className="relative mt-4 w-full overflow-hidden rounded-2xl bg-neutral-100"
          style={
            ratio ? ({ aspectRatio: ratio } as React.CSSProperties) : undefined
          }
        >
          <Wrapper>
            <Image
              src={item.url}
              alt={item.alt ?? block.meta?.alt ?? ""}
              // Use intrinsic size for crisp output & proper srcset generation
              width={item.width}
              height={item.height}
              sizes="100vw"
              className="h-full w-full object-cover"
              // If you add blurDataURL in your data, you can enable the blur placeholder:
              // placeholder="blur"
              // blurDataURL={item.blurDataURL}
              priority={false}
              loading="lazy"
              decoding="async"
            />
          </Wrapper>

          {/* Optional caption overlay (remove if you don’t want it) */}
          {(item.caption ?? block.meta?.label) && (
            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent px-3 pb-2 pt-10 text-xs text-white">
              {item.caption ?? block.meta?.label}
            </figcaption>
          )}
        </figure>
      );
    }

    case "imageGrid":
      return (
        <ImageGrid
          items={block.content as Array<{ url: string; alt?: string }>}
          columns={(block.meta?.columns as 2 | 3 | 4 | undefined) ?? 3}
          className="mt-4"
        />
      );
    case "carousel":
      return (
        <CarouselWrapper
          items={
            block.content as Array<{
              url: string;
              alt?: string;
              caption?: string;
              link?: string;
              width: number;
              height: number;
              displayRatio?: string;
            }>
          }
          mode={(block.meta?.mode ?? "auto") as Mode}
          intervalMs={block.meta?.intervalMs ?? 3000}
          slideDurationMs={block.meta?.slideDurationMs ?? 500}
          transition={(block.meta?.transition ?? "ease-in-out") as Transition}
          direction={(block.meta?.direction ?? "rtl") as Direction}
          loop={block.meta?.loop ?? true}
          pauseOnHover={block.meta?.pauseOnHover ?? true}
          showIndicators={block.meta?.showIndicators ?? true}
          showArrows={block.meta?.showArrows ?? true}
          arrowSize={block.meta?.arrowSize ?? 22}
          displayRatio={block.meta?.displayRatio ?? "16:9"}
          className="mt-4"
        />
      );
    default:
      return null;
  }
}
