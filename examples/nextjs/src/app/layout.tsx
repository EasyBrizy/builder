import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Brizy",
  description: "Brizy NextJS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
