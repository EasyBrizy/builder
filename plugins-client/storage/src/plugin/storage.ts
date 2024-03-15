import { Core, AbstractPlugin } from "@brizy/core-client";

class Storage extends AbstractPlugin {
  constructor(core: Core) {
    super("Storage", core);

    this.addHook("UPLOAD_CUSTOM_FILE", async (file) => {
      const formData = new FormData();
      // @ts-expect-error: unknown
      formData.append("file", file);

      const response = await fetch(`${this.core.config.apiUrl}/upload`, {
        method: "POST",
        body: formData,
      });

      return await response.json();
    });
  }

  initialize() {
    super.initialize();
  }
}

export { Storage };
