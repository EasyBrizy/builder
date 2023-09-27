import { AbstractPlugin } from "../core/AbstractPlugin";
import App from "../core/App";

export class HelloWorldPlugin extends AbstractPlugin {
  constructor(app: App) {
    super("HelloWorldPlugin", app);
    this.addFilter("APP_TEST", (hello) => `${hello}: word`);
  }

  public greet() {
    return "Hello from HelloWorldPlugin!";
  }

  // Example getCollection filter
  public getCollectionById(id: number): unknown {
    return this.applyFilter("GET_COLLECTION_BY_ID", { id });
  }
}
