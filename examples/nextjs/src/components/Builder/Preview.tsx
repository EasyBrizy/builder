"use client";

import { BuilderComponent, CompilerData } from "@brizy/react";
import React, { ReactElement } from "react";

export interface Props {
  data: CompilerData;
}

export const PreviewBuilder = (props: Props): ReactElement => {
  return <BuilderComponent data={props.data} />;
};
