import { Config, HtmlOutputType, Modes } from "../types/Builder/config";
import { LeftSidebarOptionsIds } from "../types/Builder/leftSidebar";
import { AbstractPlugin, Core } from "@brizy/core";
import { CollectionItem, CollectionType } from "@brizy/core/dist/types/type";

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

  getCollectionTypes = () => this.applyHook("GET_COLLECTION_TYPES");

  getCollectionItems = () => this.applyHook("GET_COLLECTION_ITEMS");

  createBuilderConfiguration = (
    container: HTMLDivElement
  ): Config<HtmlOutputType> => {
    const pagePreview = this.applyHook("GET_PREVIEW_LINK");
    const collectionTypes = this.getCollectionTypes() as Array<CollectionType>;
    const collectionItems = this.getCollectionItems() as Array<CollectionItem>;

    // Check if collectionTypes are valid
    if (
      !collectionTypes ||
      (Array.isArray(collectionTypes) && collectionTypes.length === 0)
    )
      throw new Error("Missing collection types");

    // Check if collectionItems are valid
    if (
      !collectionItems ||
      (Array.isArray(collectionItems) && collectionItems.length === 0)
    )
      throw new Error("Missing collection items");

    // Using query params to detect which collectionItem we need to edit in Builder
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const collectionType = urlParams.get("type");
    const pageSlug = urlParams.get("slug");

    if (!collectionType || !pageSlug)
      throw new Error("Missing item to edit...");

    const item = collectionItems.filter((item) => {
      if (
        item.pageData.slug === pageSlug &&
        (item.pageData.collectionType as CollectionType).title ===
          collectionType
      )
        return item;
    })[0];

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
