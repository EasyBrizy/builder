import { Scripts } from "@brizy/assetmanager/dist/types";
import { useCallback, useEffect } from "react";

const isBrizyInitScript = (script: Scripts): boolean => {
  return script.name === "initMain";
};

const setScriptAttributes = (
  scriptElement: HTMLScriptElement,
  scriptData: Scripts
) => {
  if (typeof scriptData.attr?.name === "string") {
    scriptElement.setAttribute("name", scriptData.attr.name);
  }

  if (typeof scriptData.attr?.className === "string") {
    scriptElement.className = scriptData.attr.className;
  }
};

const useLoadScript = (scripts: Scripts[]) => {
  let domScripts: HTMLScriptElement[] = [];

  const createScript = useCallback(async (script: Scripts): Promise<void> => {
    const scriptElement = document.createElement("script");

    if (script.html && !isBrizyInitScript(script)) {
      setScriptAttributes(scriptElement, script);

      scriptElement.innerHTML = script.html;
      document.body.appendChild(scriptElement);
      domScripts = [...domScripts, scriptElement];
      return Promise.resolve();
    }

    if (script.attr?.src) {
      setScriptAttributes(scriptElement, script);

      scriptElement.src = script.attr.src as string;
      scriptElement.defer = !!script.attr.defer;

      return new Promise((resolve, reject) => {
        scriptElement.onload = () => resolve();
        scriptElement.onerror = () =>
          reject(new Error(`Failed to load script: ${script.attr?.src}`));
        document.body.appendChild(scriptElement);
        domScripts = [...domScripts, scriptElement];
      });
    }

    return Promise.resolve();
  }, []);
  const loadScriptsSequentially = async (scripts: Scripts[]) => {
    for (const script of scripts) {
      await createScript(script);
    }
  };

  useEffect(() => {
    const isServer = window.isServer;

    if (isServer) return;

    loadScriptsSequentially(scripts)
      .then(() => {
        try {
          // @ts-expect-error: Brz and jQuery doesn't exist
          window?.Brz.emit("init.dom", jQuery(document.body));
        } catch (e: unknown) {
          console.error("Error on Brizy init.dom", e);
        }
      })
      .catch((error: Error) => {
        console.log(error);
      });

    return () => {
      domScripts.forEach((script) => document.body.removeChild(script));
      domScripts = [];
    };
  }, [scripts]);
};

export { useLoadScript };
