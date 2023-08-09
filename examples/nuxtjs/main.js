import { createNuxtApp } from "#app";
import App from "./app.vue";
import { Welcome, NotFound, Install } from "@brizy/docs-vue";
import "@brizy/docs-vue/dist/index.css";
import { BuilderComponent } from "@brizy/vue";

const app = createNuxtApp(App);

app.component("Welcome", Welcome);
app.component("NotFound", NotFound);
app.component("Install", Install);
app.component("BuilderComponent", BuilderComponent);
app.mount("#app");
