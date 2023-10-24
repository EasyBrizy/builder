import { Core } from "@brizy/core";
import { AbstractPlugin } from "@brizy/core";

class Shopify extends AbstractPlugin {
  constructor(core: Core) {
    super("Shopify", core);
    this.addFilter("GET_COLLECTION_TYPES", this.getCollectionTypes);
  }

  getCollectionTypes(payload: unknown) {
    if (typeof payload === "number") {
      return [(payload + 1).toString()];
    } else {
      return null;
    }
  }
}

export { Shopify };
