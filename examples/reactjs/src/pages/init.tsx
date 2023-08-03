import Config from "../config";
import { getUrl } from "../utils/common";
import { Install, Welcome } from "@brizy/docs-react";
import { ReactElement, useMemo } from "react";
import { useLocation } from "react-router-dom";

const Init = (): ReactElement => {
  const query = new URLSearchParams(useLocation().search);
  const token = query.get("token");
  const { builderWelcomeUrl } = Config;

  const redirectUrl = useMemo(() => {
    return getUrl("/init");
  }, []);

  return (
    <>
      {token ? (
        <Install token={token} />
      ) : (
        <Welcome href={`${builderWelcomeUrl}?redirectUrl=${redirectUrl}`} />
      )}
    </>
  );
};

export default Init;
