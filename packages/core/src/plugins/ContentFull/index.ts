import { AbstractPlugin } from "../../core/AbstractPlugin";
import App from "../../core/App";

export class ContentFull extends AbstractPlugin {
  constructor(app: App) {
    super("ContentFull", app);
    this.addFilter("GET_API_CLIENT", this.getClient);
    this.addFilter("GET_COLLECTION_TYPES", this.getCollectionTypes);
  }

  getClient = (client: any) => {
    console.log("client", client);

    return { ...client, getPage: this.getPage };
  };

  getPage() {
    return {
      name: "FROM Contentful",
    };
  }

  getCollectionTypes(payload: unknown) {
    if (typeof payload === "number") {
      return payload + 1;
    } else {
      return null;
    }
  }
}
