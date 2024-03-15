import { Config, HtmlOutputType, Modes } from "../types/Builder/config";
import { LeftSidebarOptionsIds } from "../types/Builder/leftSidebar";
import { createUpload } from "./utils/createUpload";
import { AbstractPlugin, Core } from "@brizy/core-client";

class Builder extends AbstractPlugin {
  constructor(core: Core) {
    super("Builder", core);
  }

  openCMS = () => {
    this.core.dispatch({ type: "OPEN_CMS" }, "Builder");
  };

  closeCMS = () => {
    this.core.dispatch({ type: "CLOSE_CMS" }, "Builder");
  };

  createBuilderConfiguration = (
    container: HTMLDivElement
  ): Config<HtmlOutputType> => {
    const collectionTypes = this.core.collectionTypes;
    const collectionItems = this.core.collectionItems;

    const core = this.core;

    const templates = "https://e-t-cloud.b-cdn.net/1.0.0";

    if (collectionTypes.length === 0)
      throw new Error("Missing collection types");

    if (collectionItems.length === 0)
      throw new Error("Missing collection items");

    // Using query params to detect which collectionItem we need to edit in Builder
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const itemId = urlParams.get("id");
    const itemSlug = urlParams.get("slug");

    if (!itemId || !itemSlug) throw new Error("Missing item to edit...");

    const item = collectionItems.filter((item) => {
      if (item.pageData.slug === itemSlug && item.pageData.id === itemId)
        return item;
    })[0];

    const pagePreview = this.applyHook("GET_PREVIEW_LINK", item);

    return {
      ...item,
      container,
      htmlOutputType: "monolith",
      mode: Modes.page,
      ui: {
        publish: {
          handler(res, _rej, data) {
            res(data);
          },
        },
        leftSidebar: {
          topTabsOrder: [
            LeftSidebarOptionsIds.cms,
            LeftSidebarOptionsIds.addElements,
            LeftSidebarOptionsIds.reorderBlock,
            LeftSidebarOptionsIds.globalStyle,
          ],
          cms: {
            onOpen: () => {
              this.openCMS();
            },
            onClose: this.closeCMS,
          },
        },
      },

      pagePreview: typeof pagePreview === "string" ? pagePreview : undefined,

      onSave: (data) => {
        console.log("Builder did SAVE");
        console.log(data);
      },

      api: {
        defaultKits: {
          async getMeta(res, rej) {
            try {
              const kitsUrl = `${templates}/kits`;
              const meta = await fetch(`${kitsUrl}/meta.json`).then((r) =>
                r.json()
              );

              // @ts-expect-error: ?????????
              const data = meta.map((kit) => ({
                ...kit,
                // @ts-expect-error: ?????????
                blocks: kit.blocks.map((item) => ({
                  ...item,
                  thumbnailSrc: `${kitsUrl}/thumbs/${item.id}.jpg`,
                })),
              }));

              res(data);
            } catch (e) {
              rej("Failed to load meta.json");
            }
          },
          async getData(res, rej, id) {
            const kitsUrl = `${templates}/kits`;
            try {
              const data = await fetch(`${kitsUrl}/resolves/${id}.json`).then(
                (r) => r.json()
              );
              res(data);
            } catch (e) {
              rej("Failed to load resolves for selected DefaultTemplate");
            }
          },
        },
        defaultPopups: {
          async getMeta(res, rej) {
            const popupsUrl = `${templates}/popups`;

            try {
              const meta = await fetch(`${popupsUrl}/meta.json`).then((r) =>
                r.json()
              );

              const data = {
                ...meta,
                // @ts-expect-error: ?????????
                blocks: meta.blocks.map((item) => ({
                  ...item,
                  thumbnailSrc: `${popupsUrl}/thumbs/${item.id}.jpg`,
                })),
              };

              res(data);
            } catch (e) {
              rej("Failed to load meta.json");
            }
          },
          async getData(res, rej, id) {
            const popupsUrl = `${templates}/popups`;
            try {
              const data = await fetch(`${popupsUrl}/resolves/${id}.json`).then(
                (r) => r.json()
              );
              res(data);
            } catch (e) {
              rej("Failed to load resolves for selected DefaultTemplate");
            }
          },
        },
        defaultLayouts: {
          async getMeta(res, rej) {
            const layoutsUrl = `${templates}/layouts`;
            try {
              const meta = await fetch(`${layoutsUrl}/meta.json`).then((r) =>
                r.json()
              );

              const data = {
                ...meta,
                // @ts-expect-error: ?????????
                templates: meta.templates.map((item) => ({
                  ...item,
                  thumbnailSrc: `${layoutsUrl}/thumbs/${item.pages[0].id}.jpg`,
                  // @ts-expect-error: ?????????
                  pages: item.pages.map((page) => ({
                    ...page,
                    thumbnailSrc: `${layoutsUrl}/thumbs/${page.id}.jpg`,
                  })),
                })),
              };

              res(data);
            } catch (e) {
              rej("Failed to load meta.json");
            }
          },
          async getData(res, rej, id) {
            const layoutsUrl = `${templates}/layouts`;
            try {
              const data = await fetch(
                `${layoutsUrl}/resolves/${id}.json`
              ).then((r) => r.json());

              res(data);
            } catch (e) {
              rej("Failed to load resolves for selected DefaultTemplate");
            }
          },
        },
        customFile: {
          fileUrl: "https://easybrizy.b-cdn.net",
          addFile: {
            async handler(resolve, reject) {
              try {
                const file = await createUpload();

                const formData = new FormData();
                formData.append("file", file);

                const result = await core.applyHook("UPLOAD_CUSTOM_FILE", file);

                // @ts-expect-error: unknown
                if (!result.data) {
                  // @ts-expect-error: unknown
                  reject(result);
                }

                // @ts-expect-error: unknown
                resolve({ fileName: result.data });
              } catch (e) {
                reject("File upload failed");
              }
            },
          },
        },
      },
    };
  };

  render(container: HTMLDivElement) {
    const token = this.applyHook("GET_TOKEN");

    if (typeof token !== "string") throw new Error("Invalid Token");

    const config = this.createBuilderConfiguration(container);

    const Builder = window.Builder;

    if (!Builder)
      throw new Error(
        "Missing Builder, check if you forgot to add Builder script"
      );

    Builder.init(token, config, () => {
      console.log("Builder successfully rendered and ready to work");
    });
  }
}

export { Builder };
