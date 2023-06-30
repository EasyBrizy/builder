import { BuilderComponent } from "@brizy/react";
import { Error as ControlError } from "@components/Error";
import { Footer } from "@components/Footer";
import { Header } from "@components/Header";
import Config from "@config";
import { getHtml } from "@utils/api";
import React, { ReactElement } from "react";

const Services = async (): Promise<ReactElement> => {
  const apiKey = Config.apiKey;

  if (!apiKey) {
    const err = Error("Missing api keys");
    return (
      <>
        <Header />
        <ControlError error={err} />
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
    const err = Error("Missing api keys");
    return (
      <>
        <Header />
        <ControlError error={err} />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <BuilderComponent data={data} />

      <Footer />
    </>
  );
};

export default Services;
