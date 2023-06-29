"use client";

import { Error as Control } from "@components/Error";
import { ReactElement } from "react";

interface Props {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: Props): ReactElement {
  return <Control error={error} onClick={() => reset()} />;
}
