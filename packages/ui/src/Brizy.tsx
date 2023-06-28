import { Scripts } from "./Scripts";
import { Styles } from "./Styles";
import { CompilerData } from "./types";
import { getAssets, getHtml } from "@brizy/assetmanager";
import { ReactElement } from "react";

export interface Props {
  data: CompilerData;
}

export const Brizy = (props: Props): ReactElement => {
  const assets = getAssets(props.data);

  return (
    <>
      <Styles data={assets} />
      <div
        className="brz brz-root__preview"
        dangerouslySetInnerHTML={{ __html: getHtml(props.data) }}
      />
      <Scripts data={assets} />
    </>
  );
};
