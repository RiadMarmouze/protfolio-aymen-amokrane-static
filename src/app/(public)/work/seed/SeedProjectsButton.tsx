/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { firestore } from "@/lib/firebase/client";
import { writeBatch, doc, collection } from "firebase/firestore";
import { projects } from "@/app/(public)/work/seed/data";
export type ProjectInput = {
  generalInfos: {
    id: string;
    title: string;
    type: string;
    year: number;
    slug: string;
    summary: string;
    tags: readonly string[]; // <- change
    teamMembers: ReadonlyArray<{
      name: string;
      role: string;
      profileUrl?: string;
    }>;
  };
  contentBlocksInfos: ReadonlyArray<any>;
  notesBlocksInfos: ReadonlyArray<any>;
};
export default function SeedProjectsButton() {
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  async function seed() {
    setPending(true);
    setResult(null);

    try {
      const batch = writeBatch(firestore);

      // Optional: de-dupe the input array by a stable field (e.g., title or slug)
      // If you don't need this, you can remove the de-dupe block entirely.
      const seen = new Set<string>();
      const list: ProjectInput[] = [];
      for (const p of projects) {
        const key =
          (p as any)?.general?.slug ??
          (p as any)?.general?.title ??
          JSON.stringify(p);
        if (seen.has(key)) continue;
        seen.add(key);
        list.push(p);
      }

      for (const p of list) {
        // ✅ Let Firestore generate the ID
        const ref = doc(collection(firestore, "projects")); // auto-id ref

        // Keep your provided timestamps if present; otherwise use now
        const createdAt =
          typeof (p as any)?.general?.createdAt === "number"
            ? (p as any).general.createdAt
            : Date.now();
        const updatedAt =
          typeof (p as any)?.general?.updatedAt === "number"
            ? (p as any).general.updatedAt
            : Date.now();

        // Ensure the generated id is stored in the document so your app can reference it
        const payload = {
          ...p,
          ...(p as any).general,
          id: ref.id, // <-- write back the generated id
          published: (p as any)?.general?.published ?? true,
          createdAt,
          updatedAt,
        };

        batch.set(ref, payload, { merge: true });
      }

      await batch.commit();
      setResult(`Seeded ${list.length} project(s) successfully.`);
    } catch (err: any) {
      console.error("[SeedProjects] error:", err);
      setResult(err?.message ?? "Failed to seed projects.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={seed}
        disabled={pending}
        className="rounded-lg px-4 py-2 border hover:bg-muted disabled:opacity-50"
      >
        {pending ? "Seeding…" : "Seed projects → Firestore"}
      </button>
      {result && (
        <span className="text-sm text-muted-foreground">{result}</span>
      )}
    </div>
  );
}
