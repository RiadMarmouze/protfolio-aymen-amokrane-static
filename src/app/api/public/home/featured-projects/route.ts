import { NextResponse } from "next/server";
import { repoGetFeaturedRefsByPage } from "@/lib/repositories/projects";

/**
 * GET /api/featured-projects
 * Fetches featured project references ordered by `order` (ascending)
 * and supports Firestore cursor-based pagination.
 *
 * Query Parameters:
 * - limit (number): Number of items to return (default: 12, max: 100)
 * - cursor (string): Base64-encoded document snapshot for pagination
 *
 * Example:
 *   /api/featured-projects?limit=12
 *   /api/featured-projects?limit=12&cursor=<base64-string>
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const pageSize = Math.min(Number(searchParams.get("limit") ?? 12), 100);
  const cursor = searchParams.get("cursor");

  let lastDoc: any = null;

  // Decode Firestore cursor if provided (expecting base64-encoded JSON)
  if (cursor) {
    try {
      const decoded = JSON.parse(Buffer.from(cursor, "base64").toString("utf8"));
      lastDoc = decoded._firestoreDoc ?? null;
    } catch (err) {
      console.warn("⚠️ Invalid cursor parameter:", err);
    }
  }

  const { data, lastVisible } = await repoGetFeaturedRefsByPage(pageSize, lastDoc);

  // Encode the next cursor for client pagination
  const nextCursor =
    lastVisible && typeof window === "undefined"
      ? Buffer.from(JSON.stringify({ _firestoreDoc: lastVisible })).toString("base64")
      : null;

  return NextResponse.json({
    items: data,
    nextCursor,
  });
}
