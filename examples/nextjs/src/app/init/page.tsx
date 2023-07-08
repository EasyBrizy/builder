"use client";

import { Install, NotFound, Welcome } from "@brizy/docs-react";
import Config from "@config";
import { getUrl } from "@utils/common";
import { useSearchParams } from "next/navigation";
import React, { ReactElement, useMemo } from "react";

const Init = (): ReactElement => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const redirectUrl = useMemo(() => {
    return getUrl("/init");
  }, []);
  const { builderWelcomeUrl } = Config;

  return (
    <>
      {token ? (
        <Install token={token} />
      ) : redirectUrl ? (
        <Welcome href={`${builderWelcomeUrl}?redirectUrl=${redirectUrl}`} />
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default Init;
