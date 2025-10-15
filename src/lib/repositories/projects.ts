/* eslint-disable @typescript-eslint/no-explicit-any */
import { Project } from "@/app/(public)/work/[id]/lib/schema";
import { firestore } from "@/lib/firebase/client";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  limit,
  orderBy,
  query,
  where,
  startAfter,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { FeaturedRef } from "../types/home";

/**
 * Fetches a list of published projects from the 'projects' collection.
 * Projects are ordered by their `updatedAt` field in descending order.
 *
 * @param {number} [max=24] - Maximum number of projects to fetch.
 * @returns {Promise<Project[]>} An array of published projects.
 */
export async function repoGetPublishedProjects(max = 24): Promise<Project[]> {
  try {
    const q = query(
      collection(firestore, "projects"),
      where("published", "==", true),
      orderBy("updatedAt", "desc"),
      limit(max)
    );
    const snap = await getDocs(q);
    console.log("✅ Projects:", snap.docs);
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
  } catch (err) {
    console.error("[repoGetPublishedProjects] error:", err);
    return [];
  }
}

/**
 * Retrieves a single published project by its document ID or slug.
 * If the document ID doesn’t exist, it attempts to find a document
 * with a matching `slug` field.
 *
 * @param {string} id - The document ID or slug of the project.
 * @returns {Promise<Project | null>} The project data if found and published, otherwise `null`.
 */
export async function repoGetProjectById(id: string): Promise<Project | null> {
  try {
    // Try direct document lookup first
    const ref = doc(firestore, "projects", id);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      const data = snap.data() as any;
      if (data?.published === true) {
        return { id: snap.id, ...(data as any) } as Project;
      }
      // Exists but not published → treat as not found for public repo
      return null;
    }

    // Fallback lookup by slug
    const q = query(
      collection(firestore, "projects"),
      where("slug", "==", id),
      where("published", "==", true),
      limit(1)
    );
    const qsnap = await getDocs(q);

    if (!qsnap.empty) {
      const d = qsnap.docs[0];
      return { id: d.id, ...(d.data() as any) } as Project;
    }

    return null;
  } catch (err) {
    console.error("[repoGetProjectById] error:", err);
    return null;
  }
}

/**
 * Get featured project references with pagination.
 * Fetches from 'featured_projects', ordered by numeric `order` ascending.
 * Uses Firestore cursor pagination via `startAfter`.
 *
 * @param {number} pageSize - Number of refs to load per page.
 * @param {QueryDocumentSnapshot<DocumentData> | null} lastDoc - Last doc from previous page (for cursor).
 * @returns {Promise<{ data: FeaturedRef[]; lastVisible: QueryDocumentSnapshot<DocumentData> | null }>}
 */
export async function repoGetFeaturedRefsByPage(
  pageSize = 12,
  lastDoc: QueryDocumentSnapshot<DocumentData> | null = null
): Promise<{ data: FeaturedRef[]; lastVisible: QueryDocumentSnapshot<DocumentData> | null }> {
  try {
    const baseQuery = query(
      collection(firestore, "featured_projects"),
      orderBy("order", "asc"),
      limit(pageSize)
    );

    const q = lastDoc ? query(baseQuery, startAfter(lastDoc)) : baseQuery;

    const snap = await getDocs(q);
    
    const data: FeaturedRef[] = snap.docs
      .map((d) => {
        const v = d.data() as any;
        if (!v?.id) return null;
        return {
          id: String(v.id),
          ratio: String(v?.ratio ?? "16/9"),
          order: Number(v?.order ?? 0),
        } as FeaturedRef;
      })
      .filter(Boolean) as FeaturedRef[];

    const lastVisible = snap.docs.length ? snap.docs[snap.docs.length - 1] : null;

    return { data, lastVisible };
  } catch (err) {
    console.error("[repoGetFeaturedRefsByPage] error:", err);
    return { data: [], lastVisible: null };
  }
}