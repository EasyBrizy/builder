import { Scripts } from "./Scripts";
import { Styles } from "./Styles";
import { CompilerData } from "./types";
import { getAssets, getHtml } from "@brizy/assetmanager";
import { ReactElement, useEffect, useRef } from "react";

export interface Props {
  data: CompilerData;
}

export const BuilderComponent = (props: Props): ReactElement => {
  const assets = getAssets(props.data);
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = nodeRef.current;

    if (node) {
      const b = node.ownerDocument.body;
      b.classList.add("brz");
    }

    return () => {
      if (node) {
        const b = node.ownerDocument.body;
        b.classList.remove("brz");
      }
    };
  }, []);

  return (
    <>
      <Styles data={assets} />
      <div
        ref={nodeRef}
        className="brz brz-root__preview"
        dangerouslySetInnerHTML={{ __html: getHtml(props.data) }}
      />
      <Scripts data={assets} />
    </>
  );
};
