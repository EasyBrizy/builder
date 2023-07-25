import BuilderConfig from "@builderConfig";
import { API } from "@utils/api";
import { getReqCookieLang } from "@utils/cookie";
import { languageRedirect } from "@utils/language";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const generateURL = (locale: string, path: string, request: NextRequest): URL =>
  new URL(locale ? `${locale}${path}` : path, request.url);

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const apiKey = BuilderConfig.apiKey;
  const api = API.getInstance();
  const config = await api.getConfig();

  if (!apiKey && path !== "/init") {
    return NextResponse.redirect(
      generateURL(getReqCookieLang(request), "/init", request)
    );
  }

  if (apiKey && path === "/init") {
    return NextResponse.redirect(
      generateURL(getReqCookieLang(request), "/", request)
    );
  }

  return languageRedirect(config, request, path);
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
