import { GridRowWide } from "./GridRowWide";
import { GridRowTwoUp } from "./GridRowTwoUp";
import { GridRowFeature } from "./GridRowFeature";
import { isProject } from "@/lib/utils/typeguards";
import { Project } from "@/app/(public)/work/[id]/lib/schema";
import { RowType } from "@/app/(public)/work/[id]/lib/types";
import { order } from "@/lib/data/work";

export type ProjectsGridProps = Readonly<{ projects: Project[] }>;

type Row = { type: RowType; items: Project[]; key: string };

const pid = (p: Project) =>
  p.id ?? p.generalInfos.slug ?? String(p.generalInfos?.title);

const rowKey = (type: RowType, items: Project[]) =>
  `${type}__${items.map((p) => pid(p)).join("__")}`;

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  // visual rhythm
  const rows: Row[] = [];

  let i = 0;
  let t = 0;
  while (i < projects.length) {
    const type = order[t % order.length];

    if (type === "WIDE") {
      const items = [projects[i]].filter(isProject);
      if (items.length) {
        rows.push({ type, items, key: rowKey(type, items) });
      }
      i += 1;
    } else {
      const items = [projects[i], projects[i + 1]].filter(isProject);
      if (items.length) {
        rows.push({ type, items, key: rowKey(type, items) });
      }
      i += 2;
    }
    t++;
  }

  return (
    <div>
      {rows.map((row) => {
        switch (row.type) {
          case "WIDE":
            // key is derived from the project's identity, not the index
            return <GridRowWide key={row.key} item={row.items[0]} />;
          case "TWO_UP":
            return <GridRowTwoUp key={row.key} items={row.items} />;
          case "FEATURE":
          default:
            return <GridRowFeature key={row.key} items={row.items} />;
        }
      })}
    </div>
  );
}
