"use client";
import { memo } from "react";
import { ProjectThumb } from "./components/ProjectThumb";
import { ProjectsGrid } from "./components/ProjectsGrid";
import { Project } from "@/app/(public)/work/[id]/lib/schema";
import Container from "../../layout/Container";

export type WorkSectionProps = Readonly<{
  projects: Project[];
  latest?: Project;
}>;

export const WorkSection = memo(function WorkSection({
  projects,
  latest,
}: WorkSectionProps) {
  return (
    <>
      <section>
        <Container className="pb-16">
          {latest && (
            <div className="mb-6">
              <ProjectThumb p={latest} ratio="2x1" />
            </div>
          )}
          <ProjectsGrid projects={projects} />
        </Container>
      </section>
    </>
  );
});
