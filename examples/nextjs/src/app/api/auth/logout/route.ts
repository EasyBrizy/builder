import { createResponse, getSession } from "@lib/withSession";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const response = new Response();
    const session = await getSession(req, response);

    await session.destroy();

    return createResponse(response, JSON.stringify({ success: true }));
  } catch (e) {
    return NextResponse.json("Fail to logout", { status: 400 });
  }
}
