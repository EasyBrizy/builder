// import Config from "../config/index.vue";

export default function ({ redirect, route }) {
  // const apiKey = Config.setup().apiKey.value;
  const apiKey =
    "dfad15fb19615244b81a9439cb3dfa59ab55204dd9278925a3648e3a37beeaff";

  if (!apiKey && route.path !== "/init") {
    return redirect("/init");
  }

  if (apiKey && route.path === "/init") {
    return redirect(route.fullPath);
  }
}
