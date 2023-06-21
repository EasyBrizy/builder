import { makeUrl } from "@utils/common";

//#region API

interface APIData {
  projectId: string;
  slug?: string;
}

export const brizyHost = "https://beta1.brizy.cloud";
export const linkShareUid = "9SchW5Xxw2JhcnY";

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

    console.log("get from", url);

    return fetch(url, { next: { tags: ["html"], revalidate: 6000 } });
  }
}

const api = new API();

//#endregion

//#region GetHTML

interface GetHTML {
  projectId: string;
  pageSlug?: string;
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
  try {
    const res = await api.getHTML({
      slug: data.pageSlug,
      projectId: data.projectId,
    });
    const r = await res.json();

    if (r.blocks) {
      return r;
    }

    throw new Error("Fail to get html");
  } catch (e) {
    if (process.env["NODE_ENV"] !== "production") {
      console.error(e);
    }
    return { blocks: { freeStyles: [], freeScripts: [], body: "" } };
  }
};

//#endregion
