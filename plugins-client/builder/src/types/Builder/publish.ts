import { PageData, ProjectData, Response } from "./common";
import { HtmlOutputType, Output } from "./config";

export interface PublishData {
  projectData?: PageData;
  pageData?: ProjectData;
}

export interface Publish<T extends HtmlOutputType> {
  handler: (
    res: Response<PublishData>,
    rej: Response<string>,
    extra: Output<T>
  ) => void;
}
