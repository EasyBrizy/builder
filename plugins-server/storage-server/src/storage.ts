import { getHtml, uploadFileToCDN } from "./services/services";
import {
  AbstractPlugin,
  Core,
  Request,
  Response,
  NextFunction,
} from "@brizy/core-server";
import fs from "fs";
import multer from "multer";

class Storage extends AbstractPlugin {
  public upload = multer();

  constructor(core: Core) {
    super("Storage", core);
  }

  initialize() {
    super.initialize();

    // region Routes

    this.core.registerRoute({
      pluginName: this.name,
      path: "/upload",
      middleWare: this.upload.single("file").bind(this),
      handler: this.uploadCustomFileHandler,
      method: "POST",
    });

    this.core.registerRoute({
      pluginName: this.name,
      path: "/preview/save",
      handler: this.uploadHTMLHandler,
      method: "POST",
    });

    this.core.registerRoute({
      pluginName: this.name,
      path: "/preview/get",
      handler: this.getHtmlHandler,
      method: "POST",
    });

    // endregion Routes
  }

  // region getHtmlHandler

  getHtmlHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, slug } = req.body;

      const HTML = await getHtml({ id, slug });

      return res.status(200).json({ data: HTML });
    } catch (e) {
      next(e);
    }
  };

  // endregion getHtmlHandler

  // region uploadCustomFileHandler
  uploadCustomFileHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const result = await uploadFileToCDN({ file: req.file });
      res.status(201).json({ data: result });
    } catch (error) {
      next(error);
    }
  };

  // endregion uploadCustomFileHandler

  // region uploadHTMLHandler

  uploadHTMLHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id, slug, html } = req.body;

      const directoryPath = "./generated_html";

      if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath);
      }

      const fileName = `id=${id}slug=${slug}.html`;
      const filePath = `./generated_html/${fileName}`;

      fs.writeFile(filePath, html, async (err) => {
        if (err) {
          return res
            .status(500)
            .send({ message: "An error occurred when saving HTML file." });
        } else {
          const result = await uploadFileToCDN({ filePath });
          return res
            .status(200)
            .send({ message: "HTML file successfully saved", data: result });
        }
      });
    } catch (e) {
      next(e);
    }
  };

  // endregion uploadHTMLHandler
}

export { Storage };
