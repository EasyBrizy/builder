import { Client, CompilerData } from "@brizy/react";
import Config from "@config";
import { demoConfig } from "@utils/demo";

//#region API
interface SystemPage {
  comingSoon?: string;
  maintenance?: string;
  pageNotFound?: string;
  protectedProject?: {
    slug: string;
    password: string;
  };
  resetPasswordPage?: string;
}
interface BuilderConfig {
  systemPage?: SystemPage;
}

const systemPage: SystemPage = {
  // Page shown while site is in development
  comingSoon: "", // /coming-soon

  // Page shown while down for maintenance
  maintenance: "", // /maintenance

  // Used to show missing links
  pageNotFound: "", // /page-not-found

  // Password-protected page:
  protectedProject: {
    slug: "/protected-page",
    password: "9a66a9d073d56cead9ceb03d79dfad4e",
  },

  // Used to retrieve account password
  resetPasswordPage: "",
};

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

  public getConfig(): Promise<BuilderConfig> {
    return new Promise((res) => {
      res({ systemPage });
    });
  }
}

export { API };

//#endregion
