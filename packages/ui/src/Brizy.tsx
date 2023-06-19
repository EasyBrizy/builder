import React, { ReactElement } from "react";

export interface Props {
  html: string;
}

export const Brizy = (props: Props): ReactElement => (
  <div
    className="brz-root__preview"
    dangerouslySetInnerHTML={{ __html: props.html }}
  />
);
