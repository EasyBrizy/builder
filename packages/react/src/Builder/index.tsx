import { useEditor } from "@/hooks/useEditor";
import { Config } from "@/hooks/useEditor/types";
import { FC, useRef } from "react";

export interface Props {
  token: string;
  pageData: Record<string, unknown>;
  projectData: Record<string, unknown>;
  pagePreview: string;
}

export const Builder: FC<Props> = (props) => {
  const { token, pageData, projectData, pagePreview } = props;
  const containerRef = useRef<HTMLDivElement>(null);

  const config: Config<"monolith"> = {
    pageData,
    projectData,
    pagePreview,
    container: containerRef.current,
    htmlOutputType: "monolith",

    onSave: (data) => {
      console.log(data);
    },
  };
  const [builderState] = useEditor(token, config);

  return (
    <>
      {builderState.status === "error" ? (
        builderState.error
      ) : (
        <div
          style={{ height: "100vh" }}
          className="container__editor"
          ref={containerRef}
        />
      )}
      <script src="https://cdn.brizylocal.com/pages/3.0.1/index.js"></script>
    </>
  );
};
