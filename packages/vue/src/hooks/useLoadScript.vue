<script>
import { ref, onMounted, onBeforeUnmount } from "vue";

const isBrizyInitScript = (script) => {
  return script.name === "initMain";
};

const setScriptAttributes = (scriptElement, scriptData) => {
  if (typeof scriptData.attr?.name === "string") {
    scriptElement.setAttribute("name", scriptData.attr.name);
  }

  if (typeof scriptData.attr?.className === "string") {
    scriptElement.className = scriptData.attr.className;
  }
};

const useLoadScript = (scripts) => {
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
          // @ts-expect-error: Brz and jQuery doesn't exist
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
    domScripts.value.forEach((script) => document.body.removeChild(script));
    domScripts.value = [];
  });
};

export default {
  setup() {
    useLoadScript;
  },
};
</script>
