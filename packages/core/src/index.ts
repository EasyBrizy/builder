import { App } from "./core/App";
import { Builder } from "./plugins/Builder";
import { CustomPlugin } from "./plugins/CustomPlugin";
import { HelloWorldPlugin } from "./plugins/HelloWorldPlugin";

export { App } from "./core/App";
export { CustomPlugin } from "./plugins/CustomPlugin";
export { HelloWorldPlugin } from "./plugins/HelloWorldPlugin";
export { Builder } from "./plugins/Builder";
// export { BaseApiClient } from "./plugins/BaseApiClient";

const app = new App();

app.setDispatch((action) => {
  console.log("app:", action.type);
});

// Register plugins

// new BaseApiClient(app);
const builder = new Builder(app);
new HelloWorldPlugin(app);
new CustomPlugin(app);

app.start();

builder.render();
