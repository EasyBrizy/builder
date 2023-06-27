"use client";

import { Connect } from "../Connect";
import { NotFound } from "../NotFound";
import { Install } from "@brizy/docs-react";
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
    <Install token={token} />
  ) : host ? (
    <Connect host={host} />
  ) : (
    <NotFound />
  );
};
