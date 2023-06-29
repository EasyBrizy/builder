import Config from "@config";
import { getHtml } from "@utils/api";
import React, { ReactElement } from "react";
import { Brizy } from "ui";

interface Props {
  params: { all?: Array<string> };
}

export default async function Page(props: Props): Promise<ReactElement> {
  const { params } = props;
  const [item] = params.all ?? [];
  const apiKey = Config.apiKey;

  if (!apiKey) {
    throw Error("Missing api key");
  }

  const data = await getHtml({
    project: apiKey,
    collection: "page",
    item: item,
  });

  if (!data) {
    throw Error(`Fail to get html, ${data}`);
  }

  return <Brizy data={data} />;
}
