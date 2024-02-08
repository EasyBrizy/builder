import { Core, HookTypes, AbstractPlugin } from "@brizy/builder-sdk";

class Storage extends AbstractPlugin {
  constructor(core: Core) {
    super("Storage", core);
  }

  initialize() {
    super.initialize();

    this.applyHook(HookTypes.SET_STORAGE, this);
  }
  getBunnyCdnConfig = () => {
    return {
      hostname: "storage.bunnycdn.com",
      storageZoneName: "easybrizy",
      accessKey: "YOUR_TOKEN_GOES_HERE",
    };
  };

  public uploadCustomFile = async (file: File): Promise<File> => {
    const config = this.getBunnyCdnConfig();

    const url = `https://${config.hostname}/${config.storageZoneName}/${file.name}`;

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          AccessKey: config.accessKey,
          "Content-Type": "application/octet-stream",
        },
        body: file,
      });

      if (!response.ok) {
        console.error(
          `File upload failed. Status: ${response.status}, StatusText: ${response.statusText}`
        );
        return Promise.reject("File upload filed");
      }
    } catch (e) {
      console.error("An error occurred during file upload:", e);
      throw e;
    }

    return Promise.resolve(file);
  };
}

export { Storage };
