import SectionTitle from "@/components/SectionTitle";
import ProjectCardServer from "../../_components/ProjectCard/ProjectCard.server";
import Container from "@/components/public/layout/Container";
import { getBaseUrl } from "@/lib/getBaseUrl";
import { FeaturedRef } from "@/lib/types/home";

export const revalidate = 60;

async function getFeaturedProjects(limit = 12) {
  const base = await getBaseUrl();
  const res = await fetch(`${base}/api/public/home/featured-projects?limit=${limit}`, {
    next: { revalidate: 60 },
  });
  

  if (!res.ok) {
    return { items: [] as FeaturedRef[], nextCursor: null as string | null };
  }

  const data = (await res.json()) as {
    items: (FeaturedRef & { ratio?: string })[];
    nextCursor?: string | null;
  };

  return {
    items: data.items ?? [],
    nextCursor: data.nextCursor ?? null,
  };
}

export default async function FeaturedProjectsServer() {
  const { items: featured } = await getFeaturedProjects(12);

  return (
    <section>
      <Container>
        <SectionTitle>Featured projects</SectionTitle>

        <div className="grid md:grid-cols-2 gap-6">
          {featured.map((p) => (
            <ProjectCardServer key={p.id} id={p.id} ratio={p?.ratio ?? "16/9"} />
          ))}
        </div>
      </Container>
    </section>
  );
}
