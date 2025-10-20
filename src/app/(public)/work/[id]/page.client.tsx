"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { StickyNote } from "lucide-react";
import { Btn } from "@/components/public/common/ui";
import type { Project } from "./lib/schema";
import { ContentBlockRenderer } from "./_components/ContentBlockRendrer";
import { NotesBlockRenderer } from "./_components/NotesBlockRenderer";

export default function ProjectClientPage({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const [showFloating, setShowFloating] = useState(false);
  const inlineBtnRef = useRef<HTMLButtonElement | null>(null);

  // Escape to close
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  // Observe header button visibility
  useEffect(() => {
    const btn = inlineBtnRef.current;
    if (!btn) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowFloating(!entry.isIntersecting),
      { threshold: 0.1 }
    );

    observer.observe(btn);
    return () => observer.disconnect();
  }, []);

  const { title, summary, tags } = project.generalInfos;

  return (
    <main className="min-h-screen p-6 pt-[var(--nav-h)]">
      {/* Floating button - appears only when inline button leaves view */}
      <motion.div
        initial={false} // prevent first-paint animation flash
        animate={{
          opacity: showFloating ? 1 : 0,
          scale: showFloating ? 1 : 0.8,
          pointerEvents: showFloating ? "auto" : "none",
        }}
        transition={{ duration: 0.25 }}
        className="fixed right-6 z-50 top-[calc(var(--nav-h)+12px)]"
      >
        <Btn
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 px-3 py-1.5 text-sm shadow-md rounded-full"
          aria-expanded={open}
          aria-controls="notes-panel"
          aria-pressed={open}
          title={open ? "Hide Notes" : "Show Notes"}
        >
          <span className="hidden sm:inline">
            {open ? "Hide Notes" : "Show Notes"}
          </span>
          <StickyNote size={16} />
        </Btn>
      </motion.div>

      {/* Header */}
      <header className="space-y-3 py-4">
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        <p className="text-base text-muted-foreground max-w-2xl">{summary}</p>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-full border text-xs uppercase tracking-wider"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Inline toggle button (visible at top) */}
          <Btn
            ref={inlineBtnRef}
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm shadow-md rounded-full"
            aria-expanded={open}
            aria-controls="notes-panel"
          >
            <span className="hidden sm:inline">
              {open ? "Hide Notes" : "Show Notes"}
            </span>
            <StickyNote size={16} />
          </Btn>
        </div>
      </header>

      {/* Content + Notes */}
      <div className="flex  overflow-hidden border-t">
        {/* Left: Content */}
        <motion.section
          layout // smoother width reflow
          initial={false} // ✨ prevents first-mount animation
          animate={{ width: open ? "50%" : "100%" }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.3, 1] }}
          className={`will-change-transform ${open ? "pr-4" : "pr-0"}`}
        >
          <article className="space-y-4">
            {project.contentBlocksInfos
              .slice()
              .sort((a, b) => a.order - b.order)
              .map((b) => (
                <ContentBlockRenderer key={`${b.type}-${b.order}`} block={b} />
              ))}
          </article>
        </motion.section>

        {/* Right: Notes */}
        <motion.aside
          id="notes-panel"
          aria-label="Project Notes"
          layout
          initial={false} // ✨ prevents first-mount animation
          animate={{
            width: open ? "50%" : "0%",
            opacity: open ? 1 : 0,
          }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.3, 1] }}
          className={` border-l p-4 overflow-hidden will-change-transform ${open ? "pl-4" : "pl-0"}`}
        >
          {project.notesBlocksInfos?.length ? (
            <NotesBlockRenderer
              blocks={[...project.notesBlocksInfos].sort(
                (a, b) => a.order - b.order
              )}
            />
          ) : (
            <p className="text-sm text-muted-foreground">No notes yet.</p>
          )}
        </motion.aside>
      </div>
    </main>
  );
}
