import { Footer } from "@components/Footer";
import { Header } from "@components/Header";
import { getHtml } from "@utils/api";
import React, { ReactElement } from "react";
import { Brizy } from "ui";

const apiKey = process.env["API_KEY"];

const Services = async (): Promise<ReactElement> => {
  if (!apiKey) {
    throw new Error("Missing api keys");
  }

  const data = await getHtml({
    project: apiKey,
    collection: "page",
    item: "about",
  });

  if (!data) {
    throw new Error("Fail to get html");
  }

  return (
    <>
      <Header />

      <Brizy data={data} />

      <Footer />
    </>
  );
};

export default Services;
