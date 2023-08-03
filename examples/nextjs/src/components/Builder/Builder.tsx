"use client";

import { Builder as Brizy } from "@brizy/react";
import React, { ReactElement } from "react";

export interface Props {
  data: {
    pageData: Record<string, unknown>;
    projectData: Record<string, unknown>;
  };

  pagePreview: string;
}

export const Builder = (props: Props): ReactElement => {
  const { data, pagePreview } = props;
  return (
    <Brizy
      token="demo"
      pageData={data.pageData}
      projectData={data.projectData}
      pagePreview={pagePreview}
    />
  );
};
