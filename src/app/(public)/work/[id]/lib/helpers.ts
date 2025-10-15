import { Project, ProjectsSchema } from "./schema";
import { CarouselItem } from "./types";

export function validateProjects(data: unknown): Project[] {
  const parsed = ProjectsSchema.safeParse(data);
  if (!parsed.success) {
    console.error(parsed.error.flatten());
    throw new Error("Invalid projects data");
  }
  return parsed.data;
}

export function splitList(s: string): string[] {
  return s
    .split(";")
    .map((x) => x.trim())
    .filter(Boolean);
}

export function isUrl(value: string) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

export function ratio(item: CarouselItem) {
  if (item.displayRatio && /^\d+:\d+$/.test(item.displayRatio)) {
    const [w, h] = item.displayRatio.split(":").map(Number);
    if (w > 0 && h > 0) return w / h;
  }
  return item.height > 0 ? item.width / item.height : 16 / 9;
}


