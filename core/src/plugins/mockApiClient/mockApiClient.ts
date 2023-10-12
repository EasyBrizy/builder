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
        createUpload: this.createUpload,
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
    //TODO: create real preview link
    return "/preview";
  }

  // @ts-expect-error: accept implicitly any
  createUpload(accept) {
    let lock = false;
    return new Promise((resolve, reject) => {
      const el = document.createElement("input");

      el.style.display = "none";
      el.setAttribute("id", String(+new Date()));
      el.setAttribute("type", "file");

      if (accept) {
        el.setAttribute("accept", accept);
      }

      document.body.appendChild(el);

      const handleChange = function () {
        lock = true;
        // @ts-expect-error: files maybe null
        const file = el.files[0];

        if (file) {
          resolve(file);
        } else {
          reject("File not Selected");
        }
        const elInDom = document.getElementById(el.id);

        if (elInDom) {
          document.body.removeChild(elInDom);
        }
      };
      const handleFocus = function () {
        setTimeout(() => {
          const elInDom = document.getElementById(el.id);

          if (!lock && elInDom) {
            reject("cancel");
            document.body.removeChild(elInDom);
          }
        }, 300);
      };

      el.addEventListener("change", handleChange, { once: true });
      window.addEventListener("focus", handleFocus, { once: true });

      // open file select box
      el.click();
    });
  }
}

export { MockApiClient };
