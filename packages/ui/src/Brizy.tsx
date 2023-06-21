import { getHtml } from "@brizy/assetmanager";
import React, { ReactElement } from "react";

export interface CompilerData {
  blocks: {
    freeStyles: Array<unknown>;
    freeScripts: Array<unknown>;
    proStyles?: Array<unknown>;
    proScripts?: Array<unknown>;
    body: string;
  };
}

export interface Props {
  data: CompilerData;
}

export const Brizy = (props: Props): ReactElement => (
  <div
    className="brz brz-root__preview"
    dangerouslySetInnerHTML={{ __html: getHtml(props.data) }}
  />
);
