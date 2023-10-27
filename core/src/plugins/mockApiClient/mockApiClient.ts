import { Core } from "../../index";
import { AbstractPlugin } from "../../index";
import { FilterTypes } from "../../types/type";
import { demoConfig } from "./demoConfig";

class MockApiClient extends AbstractPlugin {
  constructor(core: Core) {
    super("MockApiClient", core);
    this.addFilter(FilterTypes.GET_PROJECT_DATA, this.getProjectData);
    this.addFilter(FilterTypes.GET_PAGE_DATA, this.getPageData);
    this.addFilter(FilterTypes.GET_TOKEN, this.getToken);
    this.addFilter(FilterTypes.GET_API_CLIENT, this.getClient);
    this.addFilter(FilterTypes.GET_PREVIEW_LINK, this.getPreviewLink);
  }

  getClient = (client: unknown) => {
    if (typeof client === "object") {
      return {
        ...client,
        getPage: this.getPageData,
        getProject: this.getProjectData,
        getToken: this.getToken,
        getPreviewLink: this.getPreviewLink,
      };
    } else {
      throw new Error("Wrong API client");
    }
  };

  getPageData() {
    return demoConfig.pageData;
  }

  getProjectData() {
    return demoConfig.projectData;
  }

  getToken() {
    return "demo";
  }

  getPreviewLink() {
    return "/preview";
  }
}

export { MockApiClient };
