import { Base } from "./components/base";
import React, { ReactElement } from "react";

interface Props {
  searchParams: { [key: string]: string | undefined };
}

const Init = (props: Props): ReactElement => {
  const token = props.searchParams.token;

  return <Base token={token} />;
};

export default Init;
