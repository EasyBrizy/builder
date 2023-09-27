export default defineNuxtRouteMiddleware(async (to, from) => {
  const apiKey = useRuntimeConfig().public.API_KEY;

  if (!apiKey && to.fullPath !== "/init") {
    await navigateTo({ path: "/init" });
  } else if (apiKey && to.fullPath === "/init") {
    await navigateTo("/");
  } else {
    await abortNavigation();
  }
});
