import { validateProjects } from "@/app/(public)/work/[id]/lib/helpers";
import ProjectCardClient from "./ProjectCard.client";
import Placeholder from "@/components/public/common/Placeholder";
import { getBaseUrl } from "@/lib/getBaseUrl";

export const revalidate = 60; // same cache policy as multi-project page
export const dynamicParams = true;

export default async function ProjectCardServer({
  id,
  ratio,
}: {
  id: string;
  ratio: string;
}) {
  async function getProject(id: string) {
    const base = await getBaseUrl();
    const res = await fetch(`${base}/api/public/work/${id}`, {
      next: { revalidate },
    });

    if (res.status === 404) return null;
    if (!res.ok) throw new Error("Failed to fetch project");

    const data = await res.json();
    
    try {
      // validateProjects expects an array — so we wrap single item
      const [validated] = validateProjects([data.item]);
      return validated;
    } catch (err) {
      console.error("❌ Invalid project data:", err);
      return null; // treat as "not found" if invalid
    }
  }

  const project = await getProject(id);

  if (!project) {
    // Graceful fallback if the project is missing/invalid
    return (
      <div className="relative rounded-[2px] overflow-hidden border border-dashed border-neutral-700">
        <Placeholder className="w-full aspect-[2/1]" />
        <div className="absolute inset-0 flex items-center justify-center text-xs opacity-70">
          Project not found: {id}
        </div>
      </div>
    );
  }

  return (
    <ProjectCardClient
      id={project.id}
      title={project.generalInfos.title}
      tagline={project.generalInfos.type}
      aspectRatio={ratio ?? "2/1"}
      heroUrl={project.generalInfos.heroUrl}
      tags={project.generalInfos.tags}
    />
  );
}
