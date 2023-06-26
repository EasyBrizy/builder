import { CompilerData } from "../types";
import { getAssets } from "@brizy/assetmanager";
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
          <script
            key={i}
            {...s.attr}
            dangerouslySetInnerHTML={{ __html: s.html }}
          />
        ) : (
          <script key={i} {...s.attr}></script>
        )
      )}
    </>
  );
};
