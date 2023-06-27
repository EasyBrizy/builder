import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get("tag");
  const token = request.nextUrl.searchParams.get("token");
  const isValidToken = token === process.env["TOKEN"];

  if (tag && isValidToken) {
    revalidateTag(tag);
    return NextResponse.json({ revalidated: true, now: Date.now() });
  }

  return NextResponse.json({ revalidated: false, now: Date.now() });
}
