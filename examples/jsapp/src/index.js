import { Builder } from "@brizy/builder";
import { Core } from "@brizy/core";
import { MockApiClient } from "@brizy/mock-api-client";

const container = document.querySelector("#editor");
const core = new Core();
const builder = new Builder(core);
new MockApiClient(core);

builder.render(container);

export {};
