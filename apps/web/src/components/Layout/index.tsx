import React, { ReactElement, ReactNode } from "react";

export interface Props {
  head?: ReactNode;
  children?: ReactNode;
}

export const Layout = (props: Props): ReactElement => {
  return (
    <html>
      <head>{props.head}</head>
      <body>{props.children}</body>
    </html>
  );
};
