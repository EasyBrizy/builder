import { AbstractPlugin } from "../../core/AbstractPlugin";
import App from "../../core/App";

export class Builder extends AbstractPlugin {
  apiClient: any;

  constructor(app: App) {
    super("Builder", app);
  }

  initialize() {
    super.initialize();
    const client = this.applyFilter("GET_API_CLIENT", {});

    if (!client) {
      throw Error("Missing API Client");
    }

    this.apiClient = client;
    this.addFilter("BUILDER_CREATED", () => this);
  }

  render() {
    const cms = this.applyFilter("GET_CMS", {});
    const project = this.apiClient.getProject();
    const page = this.apiClient.getPage();

    console.log("builder project:", project);
    console.log("builder page:", page);

    console.log("builder cms:", cms);

    return "Builder rendered";
  }
}
