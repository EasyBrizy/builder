import { Layout } from "@components/Layout";
import React, { FC } from "react";

export interface Props {}

const Page: FC<Props> = (props) => {
  return (
    <Layout>
      <div>
        <h1>About</h1>
        <p className="text-3xl font-bold underline">Hello</p>
      </div>
    </Layout>
  );
};

export default Page;
