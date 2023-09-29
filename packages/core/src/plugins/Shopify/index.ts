import { AbstractPlugin } from "../../core/AbstractPlugin";
import App from "../../core/App";

export class Shopify extends AbstractPlugin {
  constructor(app: App) {
    super("Shopify", app);
    this.addFilter("GET_COLLECTION_TYPES", this.getCollectionTypes);
  }

  getCollectionTypes(payload: unknown) {
    if (typeof payload === "number") {
      return payload + 1;
    } else {
      return null;
    }
  }
}
