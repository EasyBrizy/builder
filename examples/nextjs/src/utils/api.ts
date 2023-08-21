import { Client, CompilerData } from "@brizy/react";
import Config from "@config";
import { demoConfig } from "@utils/demo";

//#region API

interface APIData {
  collection: "page";
  item?: string;
}

class API {
  private static instance: API;
  private readonly client: Client;

  private constructor() {
    this.client = Client.buildClient({
      apiKey: Config.apiKey,
    });
  }

  public static getInstance(): API {
    if (!API.instance) {
      API.instance = new API();
    }

    return API.instance;
  }

  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  public getItem(_: APIData): Promise<{
    pageData: Record<string, unknown>;
    projectData: Record<string, unknown>;
  }> {
    return Promise.resolve(demoConfig);
  }

  public getPageHTML({ item }: APIData): Promise<CompilerData> {
    return this.client.getHTML(item);
  }
}

export { API };

//#endregion
