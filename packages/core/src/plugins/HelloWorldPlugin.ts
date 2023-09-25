import { AbstractPlugin } from "../core/AbstractPlugin";
import App from "../core/App";

export class HelloWorldPlugin extends AbstractPlugin {
  constructor(app: App) {
    super("HelloWorldPlugin", app);
  }

  public greet() {
    return "Hello from HelloWorldPlugin!";
  }
}
