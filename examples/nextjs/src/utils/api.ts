import { Client, CompilerData } from "@brizy/react";
import BuilderConfig from "@builderConfig";
import { Config } from "@utils/types";

//#region API

interface APIData {
  collection: "page";
  language?: string;
  item?: string;
}

interface Slugs {
  item?: string;
  language?: string;
}
const determineSlug = (data: Slugs): string | undefined => {
  const { item, language } = data;

  if (language && item) {
    return `${item}-${language}`;
  }

  return item;
};

class API {
  private static instance: API;
  private readonly client: Client;

  private constructor() {
    this.client = Client.buildClient({ apiKey: BuilderConfig.apiKey });
  }

  public static getInstance(): API {
    if (!API.instance) {
      API.instance = new API();
    }

    return API.instance;
  }

  public getConfig(): Promise<Config> {
    return Promise.resolve({
      localisation: {
        current: "ru",
        languages: ["en", "ru"],
      },
    });
  }

  public getHTMLByItem({ item, language }: APIData): Promise<CompilerData> {
    const slug = determineSlug({ language, item });

    switch (slug) {
      case "about-ru": {
        return this.client.page.getPages("test2");
      }
      case "post-3-en": {
        return this.client.page.getPages("login");
      }
      case "post-3-ru": {
        return this.client.page.getPages("news");
      }
      case "about-en": {
        return this.client.page.getPages("home-en");
      }
      case "home-en": {
        return this.client.page.getPages("news");
      }
      default: {
        return this.client.page.getPages(slug);
      }
    }
  }
}

export { API };

//#endregion
