import Script from "next/script";
import React, { ReactElement } from "react";
import { getScripts } from "ui";

export interface Props {
  data: Array<string>;
}

export const Scripts = (props: Props): ReactElement => {
  const scripts = getScripts(props.data);

  return (
    <>
      {scripts.map((s, i) =>
        s.html ? (
          <Script
            key={i}
            {...s.attr}
            dangerouslySetInnerHTML={{ __html: s.html }}
          />
        ) : (
          <Script key={i} {...s.attr}></Script>
        )
      )}
    </>
  );
};
