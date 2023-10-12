import { Builder } from "./Builder/config";

declare global {
  interface Window {
    Builder: Builder;
    isServer: boolean;
    //TODO: write correct type for AWS
    AWS: any;
  }
}
