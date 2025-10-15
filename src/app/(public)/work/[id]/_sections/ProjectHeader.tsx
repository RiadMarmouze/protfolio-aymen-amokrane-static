import Link from "next/link";
import { ArrowLeft, StickyNote } from "lucide-react";
import { Btn } from "@/components/public/common/ui";

export function ProjectHeader({
  aboutOpen,
  onToggleAbout,
}: {
  aboutOpen: boolean;
  onToggleAbout: () => void;
}) {
  return (
    <header className=" w-full" role="banner">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 py-4 sm:gap-6 md:gap-8 md:py-6">
        <div className="flex w-full items-center justify-between gap-2 sm:gap-4">
          <Link href="/work" aria-label="Back to work">
            <Btn className="group relative flex px-3 py-1.5 text-sm">
              {/* Text (stays visible and centered) */}
              <span className="hidden sm:inline whitespace-nowrap transition-all duration-300 ease-out group-hover:translate-x-3 group-hover:opacity-0">
                Back to work
              </span>
              <span className="sm:hidden whitespace-nowrap transition-all duration-300 ease-out group-hover:translate-x-3 group-hover:opacity-0">
                Back
              </span>

              {/* Arrow: moves to center when hovering */}
              <ArrowLeft
                size={16}
                aria-hidden
                className="pointer-events-none absolute left-1/2 -translate-x-1/2 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-[-50%] group-hover:opacity-100"
              />
            </Btn>
          </Link>
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

            {/* Note Icon */}
            <StickyNote
              size={16}
              aria-hidden
              className="pointer-events-none absolute left-1/2 -translate-x-1/2 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-[-50%] group-hover:opacity-100"
            />
          </Btn>
        </div>
      </div>
    </header>
  );
}
