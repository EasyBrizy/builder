import { ConfigType } from "../types/types";

export class Resource {
  private apiKey: string;
  private domain: string;

  constructor(config: ConfigType) {
    this.apiKey = config.apiKey;
    this.domain = config.devServer
      ? "https://beta1.brizydemo.com/api"
      : "https://www.brizy.cloud/api";

    if (!this.apiKey) {
      throw new Error("API key not provided. Cannot make the request");
    }
  }

  getApiKey(): string {
    return this.apiKey;
  }

  getDomain(): string {
    return this.domain;
  }
}
