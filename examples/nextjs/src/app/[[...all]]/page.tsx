import { Builder } from "@components/Builder";
import { API } from "@utils/api";
import React, { ReactElement } from "react";

interface Props {
  params: { all?: Array<string> };
}

export default async function Page(props: Props): Promise<ReactElement> {
  const { params } = props;
  const [item] = params.all ?? [];
  const api = API.getInstance();

  try {
    const data = await api.getHTMLByItem({
      collection: "page",
      item: item,
    });

    if (!data) {
      throw Error(`Fail to get html, ${data}`);
    }

    return <Builder data={data} />;
  } catch (e) {
    return <h1 style={{ color: "red" }}>Something went wrong...</h1>;
  }
}
