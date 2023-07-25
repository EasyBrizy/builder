import { Props } from "./types";
import { BuilderComponent } from "@brizy/react";
import { API } from "@utils/api";
import { validateItem } from "@utils/language";
import { Config, languageCookieKey } from "@utils/types";
import { cookies } from "next/headers";
import React, { ReactElement } from "react";

const getLang = (config: Config): string | undefined => {
  const cookieLang = cookies().get(languageCookieKey)?.value;
  const configLang = config.localisation?.languages;
  return cookieLang ?? configLang;
};

export default async function Page(props: Props): Promise<ReactElement> {
  const { params } = props;
  const [param1, param2] = params.all ?? [];
  const api = API.getInstance();

  const config = await api.getConfig();
  const lang = getLang(config);
  const item = validateItem({ param1, param2, lang });

  const html = await api.getHTMLByItem({
    collection: "page",
    language: lang,
    item: item,
  });

  if (!html) {
    throw Error(`Fail to get html, ${html}`);
  }

  return <BuilderComponent data={html} />;
}
