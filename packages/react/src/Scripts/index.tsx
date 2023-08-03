import { useLoadScript } from "../hooks/useLoadScript";
import { Assets } from "@brizy/assetmanager/dist/types";
import { ReactElement } from "react";

export interface Props {
  data: Assets;
}

const isServer = typeof window === "undefined";

export const Scripts = (props: Props): ReactElement => {
  const { data } = props;

  useLoadScript(data.scripts);

  return (
    <>
      {data.scripts.map((s, i) =>
        s.html ? (
          <script
            key={i}
            {...s.attr}
            dangerouslySetInnerHTML={{ __html: s.html }}
          />
        ) : (
          <script key={i} {...s.attr}></script>
        )
      )}
      {isServer && <script>window.isServer = true;</script>}
    </>
  );
};
