import "./assets/main.css";
import { Install, Welcome, NotFound } from "@/index";
import type { App } from "vue";

export default {
  install: (app: App) => {
    app.component("Install", Install);
    app.component("Welcome", Welcome);
    app.component("NotFound", NotFound);
  },
};

export { Install, Welcome, NotFound };
