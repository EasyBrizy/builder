import { Builder, BuilderComponent } from "@/index";
import { Client } from "@brizy/sdk";
import type { CompilerData } from "@brizy/sdk";
import { App } from "vue";

export default function (app: App): void {
  app.component("BuilderComponent", BuilderComponent);
  app.component("Builder", Builder);
}

export { BuilderComponent, Builder };
export { Client, type CompilerData };
