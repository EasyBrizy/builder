import { PageController } from "../controllers/pageController";
import { CompilerData, ConfigType } from "../types/types";
import { Config } from "./config";

interface ClientInterface {
  config: ConfigType;
  readonly page: PageController;
}

export class Client implements ClientInterface {
  private _config: Config;
  readonly page: PageController;

  static buildClient(config: ConfigType): Client {
    const newConfig = new Config(config);
    const client: Client = new Client(newConfig);

    return client;
  }

  constructor(config: ConfigType) {
    this._config = config;
    this.page = new PageController(this.config);
  }

  public getHTML(slug?: string): Promise<CompilerData> {
    return this.page.getHTML(slug);
  }

  public get config() {
    return this._config;
  }
}
