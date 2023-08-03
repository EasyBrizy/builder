import { Builder } from "@components/Builder";
import { API } from "@utils/api";
import React, { ReactElement } from "react";

interface Props {
  params: { all?: Array<string> };
}

export default async function Admin(props: Props): Promise<ReactElement> {
  const { params } = props;
  const [item] = params.all ?? [];
  const api = API.getInstance();

  try {
    const data = await api.getItem({ item, collection: "page" });

    return <Builder data={data} pagePreview="/preview" />;
  } catch (e) {
    return <h1 style={{ color: "red" }}>Something went wrong...</h1>;
  }
}
