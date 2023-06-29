import React, { CSSProperties, ReactElement } from "react";

const styles: CSSProperties = {
  height: "80px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  backgroundColor: "antiquewhite",
};

export const Footer = (): ReactElement => (
  <footer style={styles}>
    <h4>Footer Copyright</h4>
  </footer>
);
