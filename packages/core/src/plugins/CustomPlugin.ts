import { AbstractPlugin } from "../core/AbstractPlugin";
import App from "../core/App";
import { Action } from "../core/type";

export class CustomPlugin extends AbstractPlugin {
  constructor(app: App) {
    super("CustomPlugin", app);
  }

  public customFunction() {
    const action = this.createAction("FROM_CUSTOM_PLUGIN", {
      test: "asdasdasd",
    });

    this.dispatchAction(action);
    return "Custom functionality from CustomPlugin.";
  }

  handleAction(action: Action) {
    console.log("CustomPlugin", action.type);
  }
}
