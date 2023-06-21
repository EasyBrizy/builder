import "@styles/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brizy",
  description: "Brizy NextJS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
