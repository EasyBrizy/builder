import { createResponse, getSession } from "@lib/withSession";
import { API } from "@utils/api";
import { getError } from "@utils/common";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const data = await req.json();
    const api = API.getInstance();
    const user = await api.signUp(data);
    const response = new Response();
    const session = await getSession(req, response);

    session.user = user;

    await session.save();

    return createResponse(response, JSON.stringify({ success: true }));
  } catch (e: unknown) {
    console.error(e);
    const message = getError(e, "Something went wrong when try to SignUp");
    return NextResponse.json(message, { status: 400 });
  }
}
