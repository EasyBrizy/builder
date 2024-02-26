import { Core } from "@brizy/core-client";
import { AbstractPlugin } from "@brizy/core-client";

class Contentful extends AbstractPlugin {
  constructor(core: Core) {
    super("Contentful", core);
  }
}

export { Contentful };
