
import { Project } from "@/app/(public)/work/[id]/lib/schema";
import { ProjectThumb } from "../ProjectThumb";
export function GridRowTwoUp({ items }: { items: Project[] }) {
  return (
    <div className="mb-6">
      <div className="grid md:grid-cols-2 gap-6">
        {items.map((p) => (
          <ProjectThumb key={p.id ?? p.generalInfos.slug} p={p} ratio="1x1" />
        ))}
      </div>
    </div>
  );
}
