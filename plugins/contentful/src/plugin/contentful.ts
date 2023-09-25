import { Core } from "@brizy/core";
import { AbstractPlugin } from "@brizy/core";

class Contentful extends AbstractPlugin {
  constructor(core: Core) {
    super("Contentful", core);
  }
}

export { Contentful };
