import { AbstractPlugin } from "../../abstractPlugin/AbstractPlugin";
import { Core } from "../../core";
import { HookTypes } from "../../types/type";
import { demoConfig } from "./demoConfig";
import { demoConfig2 } from "./demoConfig2";

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
    this.addHook(HookTypes.GET_TOKEN, () => "YOUR_TOKEN_GOES_HERE");
  }
}

export { MockApiClient };
