import { NextResponse } from "next/server";
import { repoGetFeaturedRefsByPage } from "@/lib/repositories/projects";
import { QueryDocumentSnapshot } from "firebase/firestore";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const pageSize = Math.min(Number(searchParams.get("limit") ?? 12), 100);
  const cursor = searchParams.get("cursor");

  let lastDoc: QueryDocumentSnapshot | null = null;

  if (cursor) {
    try {
      const decoded = JSON.parse(Buffer.from(cursor, "base64").toString("utf8"));
      lastDoc = decoded._firestoreDoc ?? null;
    } catch (err) {
      console.warn("⚠️ Invalid cursor parameter:", err);
    }
  }

  const { data, lastVisible } = await repoGetFeaturedRefsByPage(pageSize, lastDoc);

  const nextCursor =
    lastVisible && typeof window === "undefined"
      ? Buffer.from(JSON.stringify({ _firestoreDoc: lastVisible })).toString("base64")
      : null;

  return NextResponse.json({
    items: data,
    nextCursor,
  });
}
