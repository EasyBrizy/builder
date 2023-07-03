import { Client, CompilerData } from "@brizy/react";
import Config from "@config";

//#region API

interface APIData {
  slug?: string;
}

export const brizyHost = "https://beta1.brizydemo.com";
export const linkShareUid = "TGh6Xkll111EfZd";

class API {
  readonly api: string;
  readonly client: Client;

  constructor() {
    this.api = `${brizyHost}/api`;
    this.client = Client.buildClient({ apiKey: Config.apiKey });
  }

  async getHTML(data: APIData): Promise<CompilerData> {
    const { slug } = data;
    return await this.client.page.getPages(slug);
  }
}

let _api: API | undefined = undefined;

const api = (): API => {
  if (_api) {
    return _api;
  }

  _api = new API();
  return _api;
};

//#endregion

//#region GetHTML

interface GetHTML {
  collection: "page";
  item?: string;
}

export const getHtml = async (data: GetHTML): Promise<CompilerData> => {
  return await api().getHTML({ slug: data.item });
};

//#endregion
