import ApiError from "./exceptions/ApiError";
import {
  AbstractPlugin,
  Core,
  Request,
  Response,
  NextFunction,
} from "@brizy/core-server";
import fs from "fs";
import multer from "multer";
import * as process from "process";

class Storage extends AbstractPlugin {
  public upload = multer({ dest: "uploads/customfile" });

  constructor(core: Core) {
    super("Storage", core);
  }

  initialize() {
    super.initialize();

    this.core.registerRoute({
      pluginName: this.name,
      path: "/upload",
      middleWare: this.upload.single("file").bind(this),
      handler: this.uploadCustomFileHandler.bind(this),
      method: "POST",
    });

    this.core.registerRoute({
      pluginName: this.name,
      path: "/something",
      handler: (_: Request, res: Response) => {
        res.status(200).json("something");
      },
      method: "GET",
    });

    console.warn("Storage-Server plugin has been initialized...");
  }

  async uploadCustomFileHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    try {
      const result = await this.uploadCustomFile(req.file);
      res.status(201).json({ data: result });
    } catch (error) {
      next(error);
    }
  }

  async uploadCustomFile(file: Express.Multer.File) {
    const config = {
      hostname: process.env.BUNNY_HOST_NAME,
      storageZoneName: process.env.BUNNY_STORAGE_ZONE_NAME,
      accessKey: process.env.BUNNY_ACCESS_KEY,
    };

    if (!config.accessKey) {
      throw ApiError.BadRequest("No BUNNY_CDN accessKey was provided...");
    }

    const url = `https://${config.hostname}/${config.storageZoneName}/${file.originalname}`;

    const fileContent = fs.readFileSync(file.path);

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        AccessKey: config.accessKey,
        "Content-Type": "application/octet-stream",
      },
      body: fileContent,
    });

    if (!response.ok) {
      throw new ApiError(
        response.status,
        `File upload failed. StatusText: ${response.statusText}`
      );
    }

    return file.originalname;
  }
}

export { Storage };
