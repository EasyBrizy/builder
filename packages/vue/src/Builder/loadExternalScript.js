import useEditor from "@/hooks/useEditor";

export default async function loadExternalScript(token, config) {
  function loadScript(scriptSrc) {
    const script = document.createElement("script");
    script.src = scriptSrc;
    script.defer = true;
    script.onload = onScriptLoad;
    script.onerror = onScriptError;
    document.body.appendChild(script);
  }

  function onScriptLoad() {
    return useEditor(token, config);
  }

  function onScriptError() {
    console.error("Error loading external script.");
  }

  loadScript("https://cdn.brizylocal.com/pages/2.1.35/index.js");
}
