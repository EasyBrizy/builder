import { Config, HtmlOutputType, Modes } from "../types/Builder/config";
import { LeftSidebarOptionsIds } from "../types/Builder/leftSidebar";
import { AbstractPlugin, Core } from "@brizy/core";

class Builder extends AbstractPlugin {
  constructor(core: Core) {
    super("Builder", core);
  }

  openCMS = () => {
    this.core.dispatch({ type: "OPEN_CMS" }, "Builder");
  };

  closeCMS = () => {
    this.core.dispatch({ type: "CLOSE_CMS" }, "Builder");
  };

  createBuilderConfiguration = (
    container: HTMLDivElement
  ): Config<HtmlOutputType> => {
    const collectionTypes = this.core.collectionTypes;
    const collectionItems = this.core.collectionItems;

    if (collectionTypes.length === 0)
      throw new Error("Missing collection types");

    if (collectionItems.length === 0)
      throw new Error("Missing collection items");

    // Using query params to detect which collectionItem we need to edit in Builder
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const itemId = urlParams.get("id");
    const itemSlug = urlParams.get("slug");

    if (!itemId || !itemSlug) throw new Error("Missing item to edit...");

    const item = collectionItems.filter((item) => {
      if (item.pageData.slug === itemSlug && item.pageData.id === itemId)
        return item;
    })[0];

    const pagePreview = this.applyHook("GET_PREVIEW_LINK", item);

    return {
      ...item,
      container,
      htmlOutputType: "monolith",
      mode: Modes.page,
      ui: {
        publish: {
          handler(res, _rej, data) {
            res(data);
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
            onOpen: () => {
              this.openCMS();
            },
            onClose: this.closeCMS,
          },
        },
      },

      pagePreview: typeof pagePreview === "string" ? pagePreview : undefined,

      onSave: (data) => {
        console.log("Builder did SAVE");
        console.log(data);
      },
    };
  };

  render(container: HTMLDivElement) {
    const token = this.applyHook("GET_TOKEN");

    if (typeof token !== "string") throw new Error("Invalid Token");

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
