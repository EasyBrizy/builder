import { makeUrl } from "@utils/common";

//#region API

interface APIData {
  projectId: string;
  slug?: string;
}

export const brizyHost = "https://beta1.brizy.cloud";
export const linkShareUid = "TGh6Xkll111EfZd";

class API {
  readonly api: string;

  constructor() {
    this.api = `${brizyHost}/api`;
  }

  getHTML(data: APIData): Promise<Response> {
    const { projectId, slug } = data;
    const url = makeUrl(
      `${this.api}/projects/${projectId}/pages/compiled/html`,
      {
        placeholders_enabled: "1",
        content_type: "array",
        ...(slug && { page_slug: slug }),
      }
    );

    return fetch(url, { next: { tags: ["html"], revalidate: 6000 } });
  }
}

const api = new API();

//#endregion

//#region GetHTML

interface GetHTML {
  project: string;
  collection: "page";
  item?: string;
}

export interface CompilerData {
  blocks: {
    freeStyles: Array<unknown>;
    freeScripts: Array<unknown>;
    proStyles?: Array<unknown>;
    proScripts?: Array<unknown>;
    body: string;
  };
}

export const getHtml = async (data: GetHTML): Promise<CompilerData> => {
  const res = await api.getHTML({
    projectId: data.project,
    slug: data.item,
  });
  const r = await res.json();

  if (r.blocks) {
    return r;
  }

  if (typeof r === "object" && "message" in r) {
    throw new Error(r.message);
  } else {
    throw new Error("Fail to get html");
  }
};

//#endregion
