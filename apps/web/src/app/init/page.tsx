"use client";

import { Install, NotFound, Welcome } from "@brizy/docs-react";
import { brizyHost, linkShareUid } from "@utils/api";
import { getUrl } from "@utils/common";
import { useSearchParams } from "next/navigation";
import React, { ReactElement, useMemo } from "react";

const Init = (): ReactElement => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const redirectUrl = useMemo(() => {
    return getUrl("/init");
  }, []);

  return (
    <>
      {token ? (
        <Install token={token} />
      ) : redirectUrl ? (
        <Welcome
          href={`${brizyHost}/share/${linkShareUid}?redirectUrl=${redirectUrl}`}
        />
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default Init;
