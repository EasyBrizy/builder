import { Builder } from "@brizy/builder";
import { Core } from "@brizy/core";

const container = document.querySelector("#editor");
const core = new Core();
const builder = new Builder(core);

builder.render(container);

export {};
