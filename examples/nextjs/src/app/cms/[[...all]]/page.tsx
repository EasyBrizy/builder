import React, { ReactElement } from "react";

export default async function Editor(): Promise<ReactElement> {
  try {
    return <h1>Hi</h1>;
  } catch (e) {
    return <h1 style={{ color: "red" }}>Something went wrong...</h1>;
  }
}
