// import Config from "../config"
//
// export default defineNuxtRouteMiddleware((to, from) => {
//   const apiKey = Config.apiKey
//
//   if (!apiKey && to.path !== "/init") {
//     return navigateTo("/init")
//   }
//
//   if (apiKey && from.path === "/init") {
//     return navigateTo("/")
//   }
// })
