import { BrizyBuilder } from "@components/Brizy";
import React, { ReactElement } from "react";

export default async function Admin(): Promise<ReactElement> {
  try {
    return <BrizyBuilder />;
  } catch (e) {
    return <h1 style={{ color: "red" }}>Something went wrong...</h1>;
  }
}
