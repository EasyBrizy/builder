import "@styles/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brizy",
  description: "Brizy Self-hosted",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
