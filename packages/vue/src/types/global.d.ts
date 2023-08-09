import { Builder, HtmlOutputType } from "./types";

export {};
declare global {
  interface Window {
    Builder: Builder<HtmlOutputType>;
    isServer: boolean;
  }
}
