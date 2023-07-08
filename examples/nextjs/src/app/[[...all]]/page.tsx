import { BuilderComponent } from "@brizy/react";
import { API } from "@utils/api";
import React, { ReactElement } from "react";

interface Props {
  params: { all?: Array<string> };
}

export default async function Page(props: Props): Promise<ReactElement> {
  const { params } = props;
  const [item] = params.all ?? [];
  const api = API.getInstance();

  const data = await api.getHTMLByItem({
    collection: "page",
    item: item,
  });

  if (!data) {
    throw Error(`Fail to get html, ${data}`);
  }

  return <BuilderComponent data={data} />;
}
