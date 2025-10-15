import { notFound } from "next/navigation";
import { getBaseUrl } from "@/lib/getBaseUrl";
import ProjectClientPage from "./page.client";
import { validateProjects } from "./lib/helpers";

export const revalidate = 60; // same cache policy as multi-project page
export const dynamicParams = true; // allow fallback for new ids

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

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) notFound();

  return <ProjectClientPage project={project} />;
}
