import { AbstractPlugin, Core } from "@brizy/core";

class Cms extends AbstractPlugin {
  collectionType: Array<string> = [];

  constructor(core: Core) {
    super("Cms", core);
  }

  initialize() {
    const collectionTypes = this.applyFilter("GET_COLLECTION_TYPES", 0);

    if (!collectionTypes) throw new Error("Missing collectionTypes");

    if (
      !Array.isArray(collectionTypes) ||
      !collectionTypes.every((item) => typeof item === "string")
    ) {
      throw new Error("Wrong collectionType present");
    }

    this.collectionType = collectionTypes;
    this.addFilter("CMS_CREATED", () => this);
    this.addFilter("GET_CMS", this.render);
  }

  render = () => {
    const type = this.collectionType;

    return `<iframe> ${JSON.stringify(type)}`;
  };
}

export { Cms };
