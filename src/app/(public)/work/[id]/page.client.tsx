"use client";
import React, { useCallback, useEffect, useState } from "react";
import { ProjectHeader } from "./_sections/ProjectHeader";
import { AnimatePresence, motion } from "framer-motion";
import { NotesDrawer } from "./_sections/NotesDrawer";
import { ContentBlocks } from "./_sections/ContentBlocks";
import { Project } from "./lib/schema";
function useEscapeClose(active: boolean, onClose: () => void) {
  const handler = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!active) return;
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [active, handler]);
}

export default function ProjectClientPage({ project }: { project: Project }) {
  const [noteDrawerOpen, setNoteDrawerOpen] = useState(false);
  useEscapeClose(noteDrawerOpen, () => setNoteDrawerOpen(false));
  return (
    <main className="min-h-screen">
      <ProjectHeader
        aboutOpen={noteDrawerOpen}
        onToggleAbout={() => setNoteDrawerOpen((v) => !v)}
      />
      {/* Content + Notes */}
      <div className="relative">
        <div className={`flex  ${noteDrawerOpen ? "gap-4" : "gap-0"}`}>
          <motion.section
            initial={false}
            animate={{
              width: noteDrawerOpen ? "50%" : "100%",
              scaleX: noteDrawerOpen ? 0.94 : 1, // horizontal-only to avoid top gap
              scaleY: 1,
            }}
            transition={{ type: "spring", stiffness: 180, damping: 22 }}
            className="origin-top-right"
            aria-label="Project Content"
          >
            <ContentBlocks project={project} />
          </motion.section>

          <AnimatePresence>
            {noteDrawerOpen && (
              <NotesDrawer
                onClose={() => setNoteDrawerOpen(false)}
                project={project}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
