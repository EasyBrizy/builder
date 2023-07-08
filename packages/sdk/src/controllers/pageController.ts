import { Resource } from "../client/resource";
import { CompilerData, ConfigType } from "../types/types";
import { makeUrl } from "@brizy/utils";

export class PageController {
  private resource: Resource;
  constructor(config: ConfigType) {
    this.resource = new Resource(config);
  }

  //#region getPages

  async getPages(slug?: string): Promise<CompilerData> {
    const baseURL = `${this.resource.getDomain()}/projects/${this.resource.getApiKey()}/pages/compiled/html`;
    const params = {
      placeholders_enabled: "1",
      content_type: "array",
      ...(slug && { page_slug: slug }),
    };

    const url: string = makeUrl(baseURL, params);

    try {
      const response: Response = await fetch(url);
      const rj = await response.json();

      if (rj.blocks) {
        return rj;
      }

      if (typeof rj === "object" && "message" in rj) {
        throw new Error(rj.message);
      } else {
        throw new Error("Fail to get html");
      }
    } catch (e) {
      throw new Error("Something went wrong, please try again...");
    }
  }

  //#endregion
}
