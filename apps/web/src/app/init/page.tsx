"use client";

import { Install, NotFound, Welcome } from "@brizy/docs-react";
import { brizyHost, linkShareUid } from "@utils/api";
import { getBaseUrl } from "@utils/common";
import { useSearchParams } from "next/navigation";
import React, { ReactElement, useMemo } from "react";

const Init = (): ReactElement => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const host = useMemo(() => {
    return getBaseUrl();
  }, []);
  return (
    <>
      {token ? (
        <Install token={token} />
      ) : host ? (
        <Welcome
          href={`${brizyHost}/share/${linkShareUid}?redirectUrl=${host}/init`}
        />
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default Init;
