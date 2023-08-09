<script lang="js">
import { ref, onMounted, onBeforeUnmount } from "vue";
const isBrizyInitScript = (script) => {
  return script.name === "initMain";
};
const setScriptAttributes = (scriptElement, scriptData) => {
  if (scriptData.attr?.name) {
    scriptElement.setAttribute("name", scriptData.attr.name);
  }
  if (scriptData.attr?.className) {
    scriptElement.className = scriptData.attr.className;
  }
};
function useLoadScript(scripts){
  const domScripts = ref([]);
  const createScript = async (script) => {
    const scriptElement = document.createElement("script");
    if (script.html && !isBrizyInitScript(script)) {
      setScriptAttributes(scriptElement, script);
      scriptElement.innerHTML = script.html;
      document.body.appendChild(scriptElement);
      domScripts.value = [...domScripts.value, scriptElement];
      return Promise.resolve();
    }
    if (script.attr?.src) {
      setScriptAttributes(scriptElement, script);
      scriptElement.src = script.attr.src;
      scriptElement.defer = !!script.attr.defer;
      return new Promise((resolve, reject) => {
        scriptElement.onload = () => resolve();
        scriptElement.onerror = () =>
            reject(new Error(`Failed to load script: ${script.attr?.src}`));
        document.body.appendChild(scriptElement);
        domScripts.value = [...domScripts.value, scriptElement];
      });
    }
    return Promise.resolve();
  };
  const loadScriptsSequentially = async (scripts) => {
    for (const script of scripts) {
      await createScript(script);
    }
  };
  onMounted(() => {
    const isServer = window.isServer;
    if (isServer) return;
    loadScriptsSequentially(scripts)
        .then(() => {
          try {
            window?.Brz.emit("init.dom", jQuery(document.body));
          } catch (e) {
            console.error("Error on Brizy init.dom", e);
          }
        })
        .catch((error) => {
          console.log(error);
        });
  });
  onBeforeUnmount(() => {
    domScripts.value.forEach((script) => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    });
    domScripts.value = [];
  });
};
export default useLoadScript;
</script>