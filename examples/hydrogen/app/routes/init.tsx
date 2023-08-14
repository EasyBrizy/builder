import { Config } from "../../config";
import { getUrl } from "../../utils/common";
import { Install, Welcome } from "@brizy/docs-react";
import { useLoaderData, useLocation } from "@remix-run/react";
import { LoaderArgs } from "@shopify/remix-oxygen";
import { useEffect, useState } from "react";

export async function loader({ context }: LoaderArgs) {
  return Config(context);
}

export default function Init() {
  const config = useLoaderData();
  const builderWelcomeUrl = config.builderWelcomeUrl;
  const query = new URLSearchParams(useLocation().search);
  const token = query.get("token");

  const [redirectUrl, setRedirectUrl] = useState("");

  useEffect(() => {
    setRedirectUrl(getUrl("/init"));
  }, []);

  if (token) {
    return <Install token={token} />;
  }

  return <Welcome href={`${builderWelcomeUrl}?redirectUrl=${redirectUrl}`} />;
}
