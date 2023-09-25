import { AbstractPlugin } from "../../core/AbstractPlugin";
import App from "../../core/App";

export class Builder extends AbstractPlugin {
  apiClient = null;

  constructor(app: App) {
    super("Builder", app);
  }

  init() {
    // this.apiClient = this.app.filter("GET_AP_CLIENT", null);
    // this.builder = new Builder(this.apiClient);
    // this.builder = app.filter(this.BULDER_CREATED, this.builder);
  }

  render() {
    // const project = this.apiClient.getProject();
    // console.log("Buidler rendered");
    return "Builder rendered";
  }
}
