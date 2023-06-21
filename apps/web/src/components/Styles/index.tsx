import { getAssets } from "@brizy/assetmanager";
import { CompilerData } from "@utils/api";
import React, { ReactElement } from "react";

export interface Props {
  data: CompilerData;
}

export const Styles = (props: Props): ReactElement => {
  const data = getAssets(props.data);

  return (
    <>
      {data.styles.map((style, i) => {
        if (style.type === "link") {
          return <link key={i} {...style.attr} />;
        }

        return (
          <style
            key={i}
            {...style.attr}
            dangerouslySetInnerHTML={{ __html: style.html }}
          />
        );
      })}
    </>
  );
};
