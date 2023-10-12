import { Core } from "@brizy/core";
import { AbstractPlugin } from "@brizy/core";

class Builder extends AbstractPlugin {
  constructor(core: Core) {
    super("Builder", core);
  }

  render(container: HTMLDivElement) {
    const token = this.applyFilter("GET_TOKEN");
    const projectData = this.applyFilter("GET_PROJECT_DATA");
    const pageData = this.applyFilter("GET_PAGE_DATA");

    const config = {
      projectData,
      pageData,
      container,
    };

    //@ts-expect-error: builder
    const Builder = window.Builder;

    Builder.init(token, config, () => {
      console.log("Builder successfully rendered and ready to work");
    });
  }
}

export { Builder };
