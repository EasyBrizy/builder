import Config from "@config";
import { systemPages } from "@utils/systemPages";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const base = request.url;
  const path = request.nextUrl.pathname;
  const apiKey = Config.apiKey;

  if (!apiKey && path !== "/init") {
    return NextResponse.redirect(new URL("/init", base));
  }

  if (apiKey && path === "/init") {
    return NextResponse.redirect(new URL("/", base));
  }

  return await systemPages(request, NextResponse.next);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
