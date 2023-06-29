"use client";

import { Error } from "@components/Error";

interface Props {
  error: Error;
  reset: () => void;
}

export default function GlobalError({ error, reset }: Props) {
  return (
    <html>
      <body>
        <Error error={error} onClick={() => reset()} />
      </body>
    </html>
  );
}
