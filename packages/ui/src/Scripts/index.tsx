import { Assets } from "@brizy/assetmanager/dist/types";
import React, { ReactElement } from "react";

export interface Props {
  data: Assets;
}

export const Scripts = (props: Props): ReactElement => {
  const data = props.data;

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
