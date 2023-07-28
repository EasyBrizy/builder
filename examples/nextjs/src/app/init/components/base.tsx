"use client";

import { Install, NotFound, Welcome } from "@brizy/docs-react";
import Config from "@config";
import { getUrl } from "@utils/common";
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useMemo, useRef } from "react";

export interface Props {
  token?: string;
}

export const Base: FC<Props> = (props) => {
  const { token } = props;
  const { builderWelcomeUrl } = Config;
  const router = useRouter();
  const mounted = useRef(false);

  const redirectUrl = useMemo(() => {
    return getUrl("/init");
  }, []);

  useEffect(() => {
    if (mounted.current) {
      return;
    }

    mounted.current = true;

    if (token) {
      const refresh = (): void => {
        setTimeout(() => {
          router.refresh();
          refresh();
        }, 7000);
      };

      refresh();
    }
  }, [router, token]);

  return token ? (
    <Install token={token} />
  ) : redirectUrl ? (
    <Welcome href={`${builderWelcomeUrl}?redirectUrl=${redirectUrl}`} />
  ) : (
    <NotFound />
  );
};
