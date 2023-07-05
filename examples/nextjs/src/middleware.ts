import Config from "@config";
import { builderRedirects } from "@utils/common";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const apiKey = Config.apiKey;

  if (!apiKey && path !== "/init") {
    return NextResponse.redirect(new URL("/init", request.url));
  }

  if (apiKey && path === "/init") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  for (const basePath in builderRedirects) {
    if (path.startsWith(`/${basePath}`)) {
      const toUrl = new URL(`/${builderRedirects[basePath]}`, request.url);

      return NextResponse.redirect(toUrl);
    }
  }

  return NextResponse.next();
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
