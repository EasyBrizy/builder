import { demoConfig } from "../data/demo";
import { AbstractPlugin, Core } from "@brizy/core";

class MockApiClient extends AbstractPlugin {
  constructor(core: Core) {
    super("MockApiClient", core);

    this.addFilter("GET_PROJECT_DATA", () => this.getProject());
    this.addFilter("GET_PAGE_DATA", () => this.getPage());
    this.addFilter("GET_TOKEN", () => this.getToken());
  }

  getProject = () => {
    return demoConfig.projectData;
  };

  getPage = () => {
    return demoConfig.pageData;
  };

  getToken = () => {
    return "demo";
  };
}

export { MockApiClient };
