import { languageCookieKey } from "@utils/types";
import { NextRequest, NextResponse } from "next/server";

interface Data {
  configLang: string;
  cookieLang: string;
}

export const getReqCookieLang = (request: NextRequest): string =>
  request.cookies.get(languageCookieKey)?.value;

export const setReqCookieLang = (data: Data): Response => {
  const { cookieLang, configLang } = data;

  const r = NextResponse.next();

  if (configLang !== cookieLang) {
    r.cookies.set(languageCookieKey, configLang);

    return r;
  }

  return r;
};
