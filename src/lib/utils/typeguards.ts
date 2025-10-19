import { Project } from "@/app/(public)/work/[id]/lib/schema";

export const isProject = (x: Project | undefined): x is Project => Boolean(x);