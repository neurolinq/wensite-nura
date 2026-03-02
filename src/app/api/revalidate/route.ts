// src/app/api/revalidate/route.ts
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST() {
  // ❌ Before (Next.js 15 and below)
  // revalidateTag('strapi-data');

  // ✅ After (Next.js 16+)
  // 'max' provides stale-while-revalidate behavior
  revalidateTag("strapi-data", "max");

  return NextResponse.json({ revalidated: true });
}
