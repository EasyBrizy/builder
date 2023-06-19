"use client";

import { Connect } from "../Connect";
import { Docs } from "../Docs";
import { NotFound } from "../NotFound";
import { getBaseUrl } from "@utils/common";
import { useSearchParams } from "next/navigation";
import React, { ReactElement, useMemo } from "react";

export const Init = (): ReactElement => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const host = useMemo(() => {
    return getBaseUrl();
  }, []);

  return token ? (
    <Docs token={token} />
  ) : host ? (
    <Connect host={host} />
  ) : (
    <NotFound />
  );
};
