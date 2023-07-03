import { ConfigType } from "../types/types";

export class Config {
  apiKey: string;
  devServer?: boolean;

  constructor(config: ConfigType) {
    this.apiKey = config.apiKey;
    this.devServer = config.devServer;
  }
}
