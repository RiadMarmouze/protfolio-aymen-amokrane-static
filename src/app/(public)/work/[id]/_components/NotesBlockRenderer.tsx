import React from "react";
import { isUrl, splitList } from "../lib/helpers";
import { Block } from "../lib/schema";
import Image from "next/image";
/** -------------------------------------------------------------------------
 * Notes content renderer
 *  - Groups content under Subheadings
 *  - Renders lists, inline lists (URL-aware), quotes, paragraphs
 *  - Honors Heading blocks as large section dividers
 * ------------------------------------------------------------------------ */
export function NotesBlockRenderer({ blocks }: { blocks: Block[] }) {
  if (!blocks.length) {
    return <p className="text-gray-500">No notes yet.</p>;
  }

  const sections = groupBlocks(blocks);

  return (
    <div className="space-y-8">
      {sections.map((section, i) => (
        <section key={i} className="space-y-2">
          {section.kind === "heading" ? (
            <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-700">
              {section.title}
            </h2>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
              {/* label (subheading) */}
              <div className="sm:col-span-1">
                <h3 className="font-semibold text-gray-800">{section.title}</h3>
              </div>
              {/* body */}
              <div className="sm:col-span-2 space-y-2">
                {section.items.map((b, idx) => (
                  <BlockLine key={idx} block={b} />
                ))}
              </div>
            </div>
          )}
        </section>
      ))}
    </div>
  );
}

/** Group into display-friendly chunks:
 * - Heading blocks become standalone "heading" sections
 * - Subheading blocks start a label/value section; following blocks collected
 *   until next Subheading or Heading
 */
function groupBlocks(
  blocks: Block[]
): Array<
  | { kind: "heading"; title: string }
  | { kind: "subsection"; title: string; items: Block[] }
> {
  const out: Array<
    | { kind: "heading"; title: string }
    | { kind: "subsection"; title: string; items: Block[] }
  > = [];

  let current: { kind: "subsection"; title: string; items: Block[] } | null =
    null;

  for (const b of blocks) {
    if (b.type === "heading") {
      // flush current subsection
      if (current) {
        out.push(current);
        current = null;
      }
      out.push({ kind: "heading", title: b.content });
      continue;
    }

    if (b.type === "subheading") {
      // flush previous subsection
      if (current) out.push(current);
      current = { kind: "subsection", title: b.content, items: [] };
      continue;
    }

    if (!current) {
      // orphan non-subheading content: wrap in an unlabeled section
      current = { kind: "subsection", title: "", items: [] };
    }
    current.items.push(b);
  }

  if (current) out.push(current);
  return out;
}

/** Render a single block line inside a subsection body */
function BlockLine({ block }: { block: Block }) {
  switch (block.type) {
    case "paragraph":
      return <p className="text-gray-700">{block.content}</p>;

    case "quote":
      return (
        <blockquote className="border-l-2 border-gray-300 pl-3 italic text-gray-700">
          {block.content}
        </blockquote>
      );

    case "list": {
      const items = splitList(block.content);
      return (
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          {items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      );
    }

    case "inlineList":
      return (
        <dl className="grid grid-cols-[auto,1fr] gap-x-3 gap-y-1">
          {block.content.map((kv, i) => (
            <React.Fragment key={i}>
              <dt className="text-gray-800 font-medium">{kv.key}</dt>
              <dd className="text-gray-700">
                {isUrl(kv.value) ? (
                  <a
                    href={kv.value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:text-blue-700"
                  >
                    {kv.value}
                  </a>
                ) : (
                  kv.value
                )}
              </dd>
            </React.Fragment>
          ))}
        </dl>
      );

    case "image":
      return (
        <div className="grid grid-cols-2 gap-2">
          {block.content.map((m) => (
            <div
              key={m.url}
              className="relative aspect-[4/3] w-full overflow-hidden rounded-md border border-gray-200"
            >
              <Image
                src={m.url}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                placeholder="empty"
              />
            </div>
          ))}
        </div>
      );

    case "imageGrid":
      return (
        <div className="grid grid-cols-2 gap-2">
          {block.content.map((m) => (
            <div
              key={m.url}
              className="relative aspect-[4/3] w-full overflow-hidden rounded-md border border-gray-200"
            >
              <Image
                src={m.url}
                alt={m.alt ?? ""}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                placeholder="empty"
              />
            </div>
          ))}
        </div>
      );

    case "carousel":
      return (
        <p className="text-gray-500">
          {/* keep simple here; use your carousel component if you have one */}(
          {block.content.length} media items)
        </p>
      );

    // headings/subheadings are handled at the grouping level
    case "heading":
    case "subheading":
    default:
      return null;
  }
}
