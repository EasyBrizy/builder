import { CompilerData } from "./types";
import { getHtml } from "@brizy/assetmanager";
import React, { ReactElement } from "react";

export interface Props {
  data: CompilerData;
}

export const Brizy = (props: Props): ReactElement => (
  <div
    className="brz brz-root__preview"
    dangerouslySetInnerHTML={{ __html: getHtml(props.data) }}
  />
);
