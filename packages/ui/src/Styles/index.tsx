import { CompilerData } from "../types";
import { getAssets } from "@brizy/assetmanager";
import React, { ReactElement } from "react";

export interface Props {
  data: CompilerData;
}

export const Styles = (props: Props): ReactElement => {
  const data = getAssets(props.data);

  return (
    <>
      {data.styles.map((s, i) =>
        s.type === "link" ? (
          <link key={i} {...s.attr} />
        ) : (
          <style
            key={i}
            {...s.attr}
            dangerouslySetInnerHTML={{ __html: s.html }}
          />
        )
      )}
    </>
  );
};
