import { Footer } from "@components/Footer";
import { Header } from "@components/Header";
import Config from "@config";
import { getHtml } from "@utils/api";
import React, { ReactElement } from "react";
import { Brizy } from "ui";

const Services = async (): Promise<ReactElement> => {
  const apiKey = Config.apiKey;

  if (!apiKey) {
    return (
      <>
        <Header />
        <h1>Missing api keys</h1>
        <Footer />
      </>
    );
  }
  let data;

  try {
    data = await getHtml({
      project: apiKey,
      collection: "page",
      item: "about",
    });
  } catch (e) {
    data = null;
  }

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
