import { StickyNote } from "lucide-react";
import { Btn } from "@/components/public/common/ui";
import type { Project } from "../lib/schema";

export function ProjectHeader({
  project,
  aboutOpen,
  onToggleAbout,
}: {
  project: Project;
  aboutOpen: boolean;
  onToggleAbout: () => void;
}) {
  const { title, summary, tags } = project.generalInfos;

  return (
    <header
      className="relative space-y-3 text-center sm:text-left"
      role="banner"
    >
      {/* Title + tags block (left), no back button */}
      <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h1>
      <p className="text-base text-muted-foreground sm:text-lg max-w-2xl mx-auto sm:mx-0">
        {summary}
      </p>

      <div className=" flex items-center justify-between">
        <div className="flex flex-wrap justify-center sm:justify-start gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="px-3 py-1 rounded-full border-2 text-xs uppercase tracking-[0.15em] border-black "
            >
              {t}
            </span>
          ))}
        </div>
        {/* Floating Notes Button (stays on screen even when header is offscreen) */}
        <Btn
          onClick={onToggleAbout}
          className="group relative flex px-3 py-1.5 text-sm"
          aria-expanded={aboutOpen}
          aria-controls="project-notes"
        >
          <span className="hidden sm:inline whitespace-nowrap transition-all duration-300 ease-out group-hover:translate-x-3 group-hover:opacity-0">
            Project Notes
          </span>
          <span className="sm:hidden whitespace-nowrap transition-all duration-300 ease-out group-hover:translate-x-3 group-hover:opacity-0">
            Notes
          </span>
          <StickyNote
            size={16}
            aria-hidden
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-[-50%] group-hover:opacity-100"
          />
        </Btn>
      </div>
    </header>
  );
}
