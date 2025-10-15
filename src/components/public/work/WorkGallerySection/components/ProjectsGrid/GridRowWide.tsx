
import { Project } from "@/app/(public)/work/[id]/lib/schema";
import { ProjectThumb } from "../ProjectThumb";
export function GridRowWide({ item }: { item: Project }) {
  return (
    <div className="mb-6">
      <div className="grid gap-6">
        <ProjectThumb key={item.id ?? item.generalInfos.slug} p={item} ratio="3x1" />
      </div>
    </div>
  );
}
