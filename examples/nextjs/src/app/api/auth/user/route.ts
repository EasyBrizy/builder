import { getSession } from "@lib/withSession";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<Response> {
  try {
    const response = new Response();
    const session = await getSession(req, response);

    if (session.user) {
      return NextResponse.json(session.user);
    }

    return NextResponse.json({ message: "Not Login", success: true });
  } catch (e) {
    return NextResponse.json("Something went wrong", { status: 400 });
  }
}
