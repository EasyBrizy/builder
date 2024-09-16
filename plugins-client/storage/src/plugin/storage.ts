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

    // @ts-expect-error: unknown
    this.addHook("PREVIEW_SAVE", async ({ id, slug, html }) => {
      try {
        const response = await fetch(
          `${this.core.config.apiUrl}/preview/save`,
          {
            method: "POST",
            headers: {
              "Content-Type": "Application/json",
            },
            body: JSON.stringify({ id, slug, html }),
          }
        );

        return await response.json();
      } catch (e) {
        console.error(e);
      }
    });

    // @ts-expect-error: unknown
    this.core.addHook("PREVIEW_GET", async ({ id, slug }) => {
      try {
        const response = await fetch(`${this.core.config.apiUrl}/preview/get`, {
          method: "POST",
          headers: {
            "Content-Type": "Application/json",
          },
          body: JSON.stringify({ id, slug }),
        });

        const result = await response.json();
        return result.data;
      } catch (e) {
        console.error(e);
      }
    });
  }

  initialize() {
    super.initialize();
  }
}

export { Storage };
