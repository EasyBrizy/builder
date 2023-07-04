import { getReqCookieLang, setReqCookieLang } from "@utils/cookie";
import { Config, languageCookieKey } from "@utils/types";
import { NextRequest, NextResponse } from "next/server";

interface Data {
  param1: string;
  param2?: string;
  lang?: string;
}

export const validateItem = (data: Data): string | undefined => {
  const { param1, param2, lang } = data;

  if (param1 && param2) {
    return param2;
  }

  if (param1 === lang) {
    return undefined;
  }

  return param1;
};

export const languageRedirect = (
  config: Config,
  request: NextRequest,
  path: string
) => {
  if (request.cookies.has(languageCookieKey)) {
    const lang = getReqCookieLang(request);
    const [, pathLang, item] = path.split("/");

    const confLang = config.localisation?.current;
    const cookieLang = request.cookies.get(languageCookieKey).value;

    if (!confLang) {
      let pathTo = "";

      if (pathLang === cookieLang) {
        if (item) {
          pathTo = item;
        } else {
          pathTo = "/";
        }
      }

      const r = NextResponse.redirect(new URL(pathTo, request.url));

      r.cookies.delete(languageCookieKey);

      return r;
    }
    if (pathLang && item) {
      return setReqCookieLang({ cookieLang: cookieLang, configLang: confLang });
    }

    if (pathLang === lang) {
      return setReqCookieLang({ cookieLang: cookieLang, configLang: confLang });
    }

    const _path = `/${lang}/${path}`;
    const r = NextResponse.redirect(new URL(_path, request.url));

    if (confLang !== cookieLang) {
      return r.cookies.set(languageCookieKey, confLang);
    }

    return r;
  }

  if (config.localisation) {
    const lang = config.localisation.current;
    const _path = `/${lang}/${path}`;

    if (_path === path) {
      return NextResponse.next();
    }

    const response = NextResponse.redirect(new URL(_path, request.url));

    response.cookies.set(languageCookieKey, lang);

    return response;
  }
  return NextResponse.next();
};
