import { AbstractPlugin } from "../../core/AbstractPlugin";
import App from "../../core/App";

// import { Action } from "../../core/type";
// import { demoConfig } from "./demo";

export class BaseApiClient extends AbstractPlugin {
  constructor(app: App) {
    super("BaseApiClient", app);
  }
}
