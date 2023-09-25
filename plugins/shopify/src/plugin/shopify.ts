import { demoConfig3 } from "../demoConfig/demo";
import { Core } from "@brizy/core";
import { AbstractPlugin } from "@brizy/core";

class Shopify extends AbstractPlugin {
  constructor(core: Core) {
    super("Shopify", core);
    this.applyHook("ADD_COLLECTION_TYPE", {
      ...demoConfig3.pageData.collectionType,
      editors: [{ name: "Builder", type: "Brizy" }],
    });

    this.applyHook("ADD_COLLECTION_ITEM", {
      pageData: demoConfig3.pageData,
      projectData: demoConfig3.projectData,
      editor: { name: "Builder", type: "Brizy" },
    });
  }
}

export { Shopify };
