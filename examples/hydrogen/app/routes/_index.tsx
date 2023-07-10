import { Config } from "../../config";
import { useLoaderData } from "@remix-run/react";
import { LoaderArgs } from "@shopify/remix-oxygen";
import React from "react";
import Page from "~/app/components/Page";
import Init from "~/app/routes/init";

export async function loader({ context }: LoaderArgs) {
  return Config(context);
}

export default function Index() {
  const config = useLoaderData();

  if (!config.apiKey) {
    return <Init />;
  }

  return <Page config={config} />;
}
