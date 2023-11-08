import { AbstractPlugin } from "../../abstractPlugin/AbstractPlugin";
import { Core } from "../../core";
import { parseItemPreviewData } from "../../core/utils/parsers";
import { HookTypes } from "../../types/type";
import { demoConfig } from "./demoConfig";
import { demoConfig2 } from "./demoConfig2";
import { previewCollection } from "./previewDB";

class MockApiClient extends AbstractPlugin {
  constructor(core: Core) {
    super("Mock Api Client", core);

    this.applyHook(HookTypes.ADD_COLLECTION_TYPE, {
      ...demoConfig.pageData.collectionType,
      editors: [{ name: "Builder", type: "Brizy" }],
    });
    this.applyHook(HookTypes.ADD_COLLECTION_TYPE, {
      ...demoConfig2.pageData.collectionType,
      editors: [{ name: "Builder", type: "Brizy" }],
    });

    this.applyHook(HookTypes.ADD_COLLECTION_ITEM, {
      pageData: demoConfig.pageData,
      projectData: demoConfig.projectData,
      editor: { name: "Builder", type: "Brizy" },
    });
    this.applyHook(HookTypes.ADD_COLLECTION_ITEM, {
      pageData: demoConfig2.pageData,
      projectData: demoConfig2.projectData,
      editor: { name: "Builder", type: "Brizy" },
    });

    // demo hooks (will be removed) later;
    this.addHook(HookTypes.GET_TOKEN, () => "demo");

    this.addHook(HookTypes.GET_PREVIEW_ITEM, this.getPreviewItem);
  }

  getPreviewItem = (itemData: unknown): string | undefined => {
    const parsedItemData = parseItemPreviewData(itemData);

    if (parsedItemData) {
      const { id, slug } = parsedItemData;

      const preview = previewCollection.find((previewItem) => {
        if (
          previewItem.id === id.toLowerCase() &&
          previewItem.slug === slug.toLowerCase()
        )
          return previewItem;
      });

      if (preview) {
        return preview.html;
      }
    }
  };
}

export { MockApiClient };
