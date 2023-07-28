import { Builder } from "@components/Builder";
import { Error as ControlError } from "@components/Error";
import { Footer } from "@components/Footer";
import { Header } from "@components/Header";
import { API } from "@utils/api";
import React, { ReactElement } from "react";

const Services = async (): Promise<ReactElement> => {
  let data;

  try {
    const api = API.getInstance();
    data = await api.getHTMLByItem({
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
      <Builder data={data} />
      <Footer />
    </>
  );
};

export default Services;
