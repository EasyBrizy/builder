import { Assets } from "@brizy/assetmanager/dist/types";
import { ReactElement } from "react";

export interface Props {
  data: Assets;
}

export const Styles = (props: Props): ReactElement => {
  const data = props.data;

  return (
    <>
      {data.styles.map((s, i) =>
        s.type === "link" ? (
          <link key={i} {...s.attr} />
        ) : (
          <style
            key={i}
            {...s.attr}
            dangerouslySetInnerHTML={{ __html: s.html }}
          />
        )
      )}
    </>
  );
};
