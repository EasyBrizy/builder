import { AbstractPlugin } from "../../core/AbstractPlugin";
import App from "../../core/App";
import { demoConfig } from "./demo";

export class BaseApiClient extends AbstractPlugin {
  constructor(app: App) {
    super("BaseApiClient", app);
    this.addFilter("GET_API_CLIENT", this.getApiClient);
  }

  getApiClient = () => {
    return {
      getProject: this.getProject,
      getPage: this.getPage,
    };
  };

  getProject = () => {
    return demoConfig.projectData;
  };

  getPage = () => {
    return demoConfig.pageData;
  };
}
