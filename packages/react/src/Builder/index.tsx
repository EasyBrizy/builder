import { useEditor } from "@/hooks/useEditor";
import { Config } from "@/hooks/useEditor/types";
import { LeftSidebarOptionsIds } from "@/types/Builder/leftSidebar";
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

    ui: {
      publish: {
        handler(res, _rej, data) {
          res(data);
          console.log(data);
        },
      },
      leftSidebar: {
        topTabsOrder: [
          LeftSidebarOptionsIds.cms,
          LeftSidebarOptionsIds.addElements,
          LeftSidebarOptionsIds.reorderBlock,
          LeftSidebarOptionsIds.globalStyle,
        ],
        cms: {
          onOpen() {
            console.log("Open the CMS");
          },
          onClose() {
            console.log("CMS Still Closed");
          },
        },
      },
    },

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
      <script src="https://cdn.brizylocal.com/pages/3.1.0/index.js"></script>
    </>
  );
};
