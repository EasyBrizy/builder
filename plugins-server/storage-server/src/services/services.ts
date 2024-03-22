import ApiError from "../exceptions/ApiError";
import fs from "fs";
import path from "path";
import process from "process";

// region Upload To CDN

export const uploadFileToCDN = async ({
  file,
  filePath,
}: {
  file?: Express.Multer.File;
  filePath?: string;
}) => {
  const config = {
    hostname: process.env.BUNNY_HOST_NAME,
    storageZoneName: process.env.BUNNY_STORAGE_ZONE_NAME,
    accessKey: process.env.BUNNY_ACCESS_KEY,
  };

  if (!config.accessKey) {
    throw ApiError.BadRequest("No BUNNY_CDN accessKey was provided...");
  }

  let _fileName = "";
  let _fileContent;

  if (file) {
    _fileName = file.originalname;
    _fileContent = Buffer.from(file.buffer);
  } else if (filePath) {
    _fileName = path.basename(filePath);
    _fileContent = fs.readFileSync(filePath);
  } else {
    throw new Error("No file or filePath was provided...");
  }

  const url = `https://${config.hostname}/${config.storageZoneName}/${_fileName}`;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        AccessKey: config.accessKey,
        "Content-Type": "application/octet-stream",
      },
      body: _fileContent,
    });

    if (!response.ok) {
      throw new ApiError(
        response.status,
        `File upload failed. StatusText: ${response.statusText}`
      );
    }

    return _fileName;
  } catch (e) {
    console.error(e);
    // @ts-expect-error: typeof e = unknown
    throw new ApiError(500, e);
  }
};

// endregion Upload to CDN

// region getHtml
export const getHtml = async ({ id, slug }: { id: string; slug: string }) => {
  try {
    const response = await fetch(
      `https://nextjsstorage2.b-cdn.net/id=${id}slug=${slug}.html?${Math.floor(
        Math.random() * 100
      )}`
    );

    return await response.text();
  } catch (e) {
    // @ts-expect-error: typeof e is unknown
    throw new Error(e);
  }
};
// endregion getHtml
