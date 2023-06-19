import { Layout } from "@components/Layout";
import { Scripts } from "@components/Scripts";
import { Styles } from "@components/Styles";
import { getHtml } from "@utils/api";
import { arrayToPathApi } from "@utils/common";
import { redirect } from "next/navigation";
import React, { ReactElement } from "react";
import { Brizy } from "ui";

const token = process.env["API_KEY"];

interface Props {
  params: { slug?: Array<string> };
}

export default async function Page(props: Props): Promise<ReactElement | null> {
  const { params } = props;
  const [mode, slug] = params.slug ?? [];
  const isHome = mode === undefined;
  const pageSlug = arrayToPathApi([mode, slug]);

  if (!token) {
    redirect("/init");
    return null;
  }

  const data = await getHtml({ pageSlug, token });
  const head = <Styles data={data.styles} />;

  return (
    <Layout head={head}>
      <Brizy html={data.html} />
      <Scripts data={data.scripts} />
    </Layout>
  );
}
