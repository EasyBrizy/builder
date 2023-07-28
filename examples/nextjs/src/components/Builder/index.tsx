"use client";

import { BuilderComponent, CompilerData } from "@brizy/react";
import React, { ReactElement } from "react";

export interface Props {
  data: CompilerData;
}

export const Builder = (props: Props): ReactElement => {
  return <BuilderComponent data={props.data} />;
};
