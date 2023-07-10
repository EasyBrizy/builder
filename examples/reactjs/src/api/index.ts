import Config from "../config";
import { Client, CompilerData } from "@brizy/react";

//#region API

interface APIData {
  collection: "page";
  item?: string;
}

class API {
  private static instance: API;
  private readonly client: Client;

  private constructor() {
    this.client = Client.buildClient({ apiKey: Config.apiKey });
  }

  public static getInstance(): API {
    if (!API.instance) {
      API.instance = new API();
    }

    return API.instance;
  }

  public getHTMLByItem({ item }: APIData): Promise<CompilerData> {
    return this.client.page.getPages(item);
  }
}

export { API };

//#endregion
