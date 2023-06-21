import { getAssets } from "@brizy/assetmanager";
import { CompilerData } from "@utils/api";
import Script from "next/script";
import React, { ReactElement } from "react";

export interface Props {
  data: CompilerData;
}

export const Scripts = (props: Props): ReactElement => {
  const data = getAssets(props.data);

  return (
    <>
      {data.scripts.map((s, i) =>
        s.html ? (
          <Script
            key={i}
            {...s.attr}
            dangerouslySetInnerHTML={{ __html: s.html }}
          />
        ) : (
          <Script key={i} {...s.attr}></Script>
        )
      )}
    </>
  );
};
