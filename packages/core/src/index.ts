import { App } from "./core/App";
import { BaseApiClient } from "./plugins/BaseApiClient";
import { Builder } from "./plugins/Builder";
import { Cms } from "./plugins/Cms";
import { ContentFull } from "./plugins/ContentFull";
import { HelloWorldPlugin } from "./plugins/HelloWorldPlugin";
import { Shopify } from "./plugins/Shopify";

export { App } from "./core/App";
export { CustomPlugin } from "./plugins/CustomPlugin";
export { HelloWorldPlugin } from "./plugins/HelloWorldPlugin";
export { Builder } from "./plugins/Builder";
export { Cms } from "./plugins/Cms";
export { Shopify } from "./plugins/Shopify";

const app = new App();

app.setDispatch((action) => {
  console.log("app:", action.type);
});

// Register plugins

new BaseApiClient(app);
new ContentFull(app);
new Shopify(app);
new Cms(app);

const builder = new Builder(app);
const helloPlugin = new HelloWorldPlugin(app);

helloPlugin.greet();

app.start();

builder.render();
