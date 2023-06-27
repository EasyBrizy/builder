import React, { CSSProperties, ReactElement } from "react";

const styles: CSSProperties = {
  height: "80px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  backgroundColor: "antiquewhite",
};

export const Header = (): ReactElement => (
  <header style={styles}>
    <h1>Services page</h1>
  </header>
);
