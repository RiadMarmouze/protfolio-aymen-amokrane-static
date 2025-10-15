"use client";

import * as React from "react";
import { X } from "lucide-react";
import { NotesBlockRenderer } from "../_components/NotesBlockRenderer";
import type { Project } from "../lib/schema";
import { motion } from "framer-motion";

export function NotesDrawer({
  onClose,
  project,
}: {
  onClose: () => void;
  project: Project;
}) {
  return (
    <motion.aside
      id="project-notes"
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: "50%", opacity: 1 }}
      exit={{ width: 0, opacity: 0 }}
      transition={{ type: "tween", duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="border-l-2 border-black bg-white overflow-y-auto sticky top-[var(--nav-h,64px)] h-[calc(100vh-var(--nav-h,64px))]"
      aria-label="Project notes and details"
    >
      <div className="px-5 py-4 sticky top-0 bg-white border-b-2 border-black flex items-center justify-between z-10">
        <div className="font-medium">Project Notes</div>
        <button
          className="rounded-full border-2 p-1 hover:bg-black hover:text-white"
          onClick={onClose}
          aria-label="Close notes"
        >
          <X size={16} />
        </button>
      </div>

      <div className="px-5 py-5 text-sm grid gap-5">
        {/* Content */}
        <div className="px-5 py-5 text-sm">
          {project.notesBlocksInfos?.length ? (
            <NotesBlockRenderer
              blocks={[...project.notesBlocksInfos].sort(
                (a, b) => a.order - b.order
              )}
            />
          ) : (
            <p className="text-gray-500">No notes yet.</p>
          )}
        </div>
      </div>
    </motion.aside>
  );
}
