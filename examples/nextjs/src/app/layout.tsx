import "@styles/globals.css";
import { Metadata } from "next";
import { ReactElement, ReactNode } from "react";

export const metadata: Metadata = {
  title: "Brizy",
  description: "Brizy NextJS",
};

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props): ReactElement {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
