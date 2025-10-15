import { HOME_HERO_DATA } from "@/lib/data/home";
import { NextResponse } from "next/server";

export const revalidate = 60;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get("limit") ?? 5);
  const items = HOME_HERO_DATA.slice(0, limit);
  return NextResponse.json({ items });
}
