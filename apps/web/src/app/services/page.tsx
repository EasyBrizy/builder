import { Layout } from "@components/Layout";
import { getHtml } from "@utils/api";
import React, { ReactElement } from "react";
import { Brizy, Scripts, Styles } from "ui";

const apiKey = process.env["API_KEY"];

const styles = {
  height: "80px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  backgroundColor: "antiquewhite",
};

const Header = () => (
  <header style={styles}>
    <h1>Services page</h1>
    <p>My Custom header</p>
  </header>
);

const Footer = () => (
  <footer style={styles}>
    <h4>Footer Copyright</h4>
    <p>My Custom footer</p>
  </footer>
);

const Services = async (): Promise<ReactElement> => {
  if (!apiKey) {
    return (
      <Layout>
        <Header />
        <h1>Missing api key</h1>
        <Footer />
      </Layout>
    );
  }

  const data = await getHtml({
    project: apiKey,
    collection: "page",
    item: "about",
  });

  const head = <Styles data={data} />;

  return (
    <Layout head={head}>
      <Header />
      <Brizy data={data} />
      <Footer />
      <Scripts data={data} />
    </Layout>
  );
};

export default Services;
