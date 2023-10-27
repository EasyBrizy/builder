import { PageData, ProjectData } from "../types/Builder/common";
import { Config, HtmlOutputType, Modes } from "../types/Builder/config";
import { LeftSidebarOptionsIds } from "../types/Builder/leftSidebar";
import { AbstractPlugin, Core } from "@brizy/core";

class Builder extends AbstractPlugin {
  constructor(core: Core) {
    super("Builder", core);
  }

  createBuilderConfiguration = (
    container: HTMLDivElement
  ): Config<HtmlOutputType> => {
    const projectData = this.applyFilter("GET_PROJECT_DATA");
    const pageData = this.applyFilter("GET_PAGE_DATA");
    const previewLink = this.applyFilter("GET_PREVIEW_LINK");

    return {
      pageData: pageData as PageData,
      projectData: projectData as ProjectData,
      container,
      htmlOutputType: "monolith",
      mode: Modes.page,
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
              console.log("CMS did OPEN");
            },
            onClose() {
              console.log("CMS did CLOSE");
            },
          },
        },
      },
      pagePreview: typeof previewLink === "string" ? previewLink : undefined,

      onSave: (data) => {
        console.log("Builder did SAVE");
        console.log(data);
      },
    };
  };

  render(container: HTMLDivElement) {
    const token = this.applyFilter("GET_TOKEN");
    const config = this.createBuilderConfiguration(container);

    const Builder = window.Builder;

    if (!Builder)
      throw new Error(
        "Missing Builder, check if you forgot to add Builder script"
      );

    Builder.init(token, config, () => {
      console.log("Builder successfully rendered and ready to work");
    });
  }
}

export { Builder };
