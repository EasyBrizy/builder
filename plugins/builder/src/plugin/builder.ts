import { Config, HtmlOutputType, Modes } from "../types/Builder/config";
import { LeftSidebarOptionsIds } from "../types/Builder/leftSidebar";
import { AbstractPlugin, Core } from "@brizy/core";

class Builder extends AbstractPlugin {
  constructor(core: Core) {
    super("Builder", core);
  }

  getData = (): Pick<Config<HtmlOutputType>, "projectData" | "pageData"> => {
    return {
      projectData: this.applyFilter("GET_PROJECT_DATA") as Record<
        string,
        unknown
      >,
      pageData: this.applyFilter("GET_PAGE_DATA") as Record<string, unknown>,
    };
  };

  createS3Configuration = () => {
    const AWS = window.AWS;

    if (!AWS)
      throw new Error("Missing AWS, check if you forgot to add AWS script");

    const bucketName = "BUCKET_NAME";
    const bucketRegion = "REGION";
    const IdentityPoolId = "IDENTITY_POOL_ID";

    //TODO: should it be here??
    AWS.config.update({
      region: bucketRegion,
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: IdentityPoolId,
      }),
    });

    return new AWS.S3({
      params: { Bucket: bucketName },
    });
  };

  createBuilderConfiguration = (
    container: HTMLDivElement
  ): Config<HtmlOutputType> => {
    const templates = "https://e-t-cloud.b-cdn.net/1.0.0";

    // AWS
    const s3 = this.createS3Configuration();

    //TODO: should we define createUpload in MockApiClient??
    //@ts-expect-error: object is unknown
    const createUpload = this.applyFilter("GET_API_CLIENT", {}).createUpload;

    return {
      ...this.getData(),
      container,
      htmlOutputType: "monolith",
      mode: Modes.page,
      ui: {
        publish: {
          handler(res, _rej, data) {
            res(data);
            console.log(data);
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
            onOpen() {
              console.log("CMS did OPEN");
            },
            onClose() {
              console.log("CMS did CLOSE");
            },
          },
        },
      },

      //TODO: should pagePreview be defined in mockApiClient?
      pagePreview: this.applyFilter("GET_PREVIEW_LINK") as string,

      api: {
        media: {
          //TODO: write correct url
          mediaResizeUrl: "https://media.brizylocal.com/media",
          addMedia: {
            async handler(resolve, reject) {
              try {
                const file = await createUpload("image/*");
                const fileName = file.name;
                const filePath = `media/${fileName}`;
                const s3Config = {
                  Key: filePath,
                  Body: file,
                };

                // Upload to S3
                s3.upload(s3Config, (err: Error) => {
                  if (err) {
                    reject(`Wrong Upload to S3 ${err.message}`);
                  } else {
                    resolve({ fileName });
                  }
                });
              } catch (e) {
                console.log(e);
                reject("File Uploaded canceled");
              }
            },
          },
        },
        customFile: {
          //TODO: write correct url
          fileUrl: "http://localhost:9000/customFile",
          addFile: {
            async handler(resolve, reject) {
              try {
                const file = await createUpload();
                const fileName = file.name;
                const filePath = `customFile/${fileName}`;
                const s3Config = {
                  Key: filePath,
                  Body: file,
                };

                // Upload to S3
                s3.upload(s3Config, (err: Error) => {
                  if (err) {
                    reject(`Wrong Upload to S3 ${err.message}`);
                  } else {
                    //@ts-expect-error: fileName
                    resolve({ fileName });
                  }
                });
              } catch (e) {
                reject("File Uploaded canceled");
              }
            },
          },
        },
        defaultKits: {
          async getMeta(res, rej) {
            try {
              const kitsUrl = `${templates}/kits`;
              const meta = await fetch(`${kitsUrl}/meta.json`).then((r) =>
                r.json()
              );

              //@ts-expect-error: any
              const data = meta.map((kit) => ({
                ...kit,
                //@ts-expect-error: any
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
                //@ts-expect-error: any
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
                //@ts-expect-error: any
                templates: meta.templates.map((item) => ({
                  ...item,
                  thumbnailSrc: `${layoutsUrl}/thumbs/${item.pages[0].id}.jpg`,
                  //@ts-expect-error: any
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
      },

      onSave: (data) => {
        console.log("Builder did SAVE");
        console.log(data);
      },
    };
  };

  render(container: HTMLDivElement) {
    const token = this.applyFilter("GET_TOKEN");
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
