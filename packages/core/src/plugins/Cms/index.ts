import { AbstractPlugin } from "../../core/AbstractPlugin";
import App from "../../core/App";

export class Cms extends AbstractPlugin {
  collectionType: Array<string> = [];

  constructor(app: App) {
    super("Cms", app);
  }

  initialize() {
    super.initialize();
    const collectionTypes = this.applyFilter("GET_COLLECTION_TYPES", 0);

    if (!collectionTypes) {
      throw Error("Missing collectionTypes");
    }

    //@ts-expect-error: ""
    this.collectionType = collectionTypes;
    this.addFilter("CMS_CREATED", () => this);
    this.addFilter("GET_CMS", this.render);
  }

  render = () => {
    const type = this.collectionType;

    return `<iframe> ${JSON.stringify(type)}`;
  };
}
