import { Client, CompilerData } from "@brizy/react";

//#region API

interface APIData {
  collection: "page";
  item?: string;
}

class API {
  private static instance: API;
  private readonly client: Client;

  private constructor(apiKey: string) {
    this.client = Client.buildClient({ apiKey });
  }
  public static getInstance(apiKey: string): API {
    if (!API.instance) {
      API.instance = new API(apiKey);
    }

    return API.instance;
  }

  public getHTMLByItem({ item }: APIData): Promise<CompilerData> {
    return this.client.page.getPages(item);
  }
}

export { API };

//#endregion
