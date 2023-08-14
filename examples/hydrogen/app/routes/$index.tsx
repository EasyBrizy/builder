import { Config } from "../../config";
import { useLoaderData } from "@remix-run/react";
import { LoaderArgs } from "@shopify/remix-oxygen";
import Page from "~/app/components/Page";

export async function loader({ context }: LoaderArgs) {
  return Config(context);
}

export default function Index() {
  const config = useLoaderData();
  return <Page config={config} />;
}
