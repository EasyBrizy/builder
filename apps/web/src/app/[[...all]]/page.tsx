import { Layout } from "@components/Layout";
import { getHtml } from "@utils/api";
import { redirect } from "next/navigation";
import React, { ReactElement } from "react";
import { Brizy, Scripts, Styles } from "ui";

const apiKey = process.env["API_KEY"];

interface Props {
  params: { all?: Array<string> };
}

export default async function Page(props: Props): Promise<ReactElement | null> {
  const { params } = props;
  const [item] = params.all ?? [];

  if (!apiKey) {
    redirect("/init");
    return null;
  }

  const data = await getHtml({
    project: apiKey,
    collection: "page",
    item: item,
  });
  const head = <Styles data={data} />;

  return (
    <Layout head={head}>
      <Brizy data={data} />
      <Scripts data={data} />
    </Layout>
  );
}
