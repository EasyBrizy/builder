import { PagePreview } from "@components/Preview/Preview";
import React, { ReactElement } from "react";

export default async function Preview(): Promise<ReactElement> {
  try {
    return <PagePreview />;
  } catch (e) {
    return <h1 style={{ color: "red" }}>Something went wrong...</h1>;
  }
}
