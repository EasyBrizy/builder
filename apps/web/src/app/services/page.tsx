import { Footer } from "@components/Footer";
import { Header } from "@components/Header";
import { getHtml } from "@utils/api";
import React, { ReactElement } from "react";
import { Brizy } from "ui";

const apiKey = process.env["API_KEY"];

const Services = async (): Promise<ReactElement> => {
  if (!apiKey) {
    return (
      <>
        <Header />
        <h1>Missing api keys</h1>
        <Footer />
      </>
    );
  }

  const data = await getHtml({
    project: apiKey,
    collection: "page",
    item: "about",
  });

  if (!data) {
    return (
      <>
        <Header />
        <h1>Fail to get html</h1>
        <Footer />
      </>
    );
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
