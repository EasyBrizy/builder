import { Core } from "@brizy/builder-sdk";
import { AbstractPlugin } from "@brizy/builder-sdk";

class Contentful extends AbstractPlugin {
  constructor(core: Core) {
    super("Contentful", core);
  }
}

export { Contentful };
