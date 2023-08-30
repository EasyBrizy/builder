import { useRoute } from "vue-router";

export default function (context) {
  const route = useRoute();
  const apiKey = useRuntimeConfig().public.API_KEY;

  if (!apiKey && route.path !== "/init") {
    context.redirect("/init"); // Use the context to perform redirection
  }

  if (apiKey && route.path === "/init") {
    context.redirect("/"); // Use the context to perform redirection
  }
}
