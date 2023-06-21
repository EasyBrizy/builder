import { Layout } from "@components/Layout";
import { Scripts } from "@components/Scripts";
import { Styles } from "@components/Styles";
import { getHtml } from "@utils/api";
import { arrayToPathApi } from "@utils/common";
import { redirect } from "next/navigation";
import React, { ReactElement } from "react";
import { Brizy } from "ui";

const apiKey = process.env["API_KEY"];

interface Props {
  params: { all?: Array<string> };
}

export default async function Page(props: Props): Promise<ReactElement | null> {
  const { params } = props;
  const [mode, slug] = params.all ?? [];
  const isHome = mode === undefined;
  const pageSlug = isHome ? undefined : arrayToPathApi([mode, slug]);

  if (!apiKey) {
    redirect("/init");
    return null;
  }

  const data = await getHtml({ pageSlug, projectId: apiKey });
  const head = <Styles data={data} />;

  return (
    <Layout head={head}>
      <Brizy data={data} />
      <Scripts data={data} />
    </Layout>
  );
}
