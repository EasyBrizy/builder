import { CMS_ACTIONS } from "../types/types";
import "./style.css";
import { AbstractPlugin, Core } from "@brizy/core";
import { Action, CollectionType } from "@brizy/core/dist/types/type";
import CMSPlugin from "@brizy/plugin-cms";
import "@brizy/plugin-cms/dist/index.css";
import {
  GetIntegrations,
  Integrations,
} from "@brizy/plugin-cms/lib/types/GetIntegrations";
import { Locale } from "@brizy/plugin-cms/lib/types/Locale";

class Cms extends AbstractPlugin {
  collectionType: Array<string> = [];
  data: GetIntegrations;

  constructor(core: Core) {
    super("Cms", core);

    this.data = { data: [] };

    this.createAction(CMS_ACTIONS.OPEN_CMS);
    this.createAction(CMS_ACTIONS.RENDER_CMS);

    const collectionTypes = this.core.collectionTypes;

    const integrations: Integrations[] = collectionTypes.map(
      (collectionType: CollectionType) => {
        return {
          name: collectionType.title,
          pages: [
            {
              id: 7,
              name: collectionType.title,
              subItems: [],
              logo: "",
              iframeUrl: "http://localhost:9000/", // here will be @brizy/contentful plugin page
            },
          ],
        };
      }
    );

    this.data = {
      data: integrations,
    };
  }

  initialize = () => {
    super.initialize();

    console.log(this.core.applyHook("GET_COLLECTION_TYPES"));
  };

  open = () => {
    const cmsNode = document.querySelector<HTMLElement>("#cms__root");
    if (cmsNode) {
      cmsNode.style.display = "block";
    }
  };

  close = () => {
    const cmsNode = document.querySelector<HTMLElement>("#cms__root");
    if (cmsNode) {
      cmsNode.style.display = "none";
    }
  };

  renderCms = () => {
    const CMSNode = document.createElement("div");
    CMSNode.id = "cms__root";
    document.body.appendChild(CMSNode);

    const cms = new CMSPlugin({
      origin: "*",
      development: true,
      locale: "en" as Locale,
      onClose: close,
      getIntegrations: () => this.getIntegrations(),
    });

    cms.render(CMSNode);
  };

  handleAction(action: Action) {
    if (action.type === CMS_ACTIONS.OPEN_CMS) this.open();

    if (action.type === CMS_ACTIONS.CLOSE_CMS) this.close();

    if (action.type === CMS_ACTIONS.RENDER_CMS) this.renderCms();
  }

  getIntegrations = (): Promise<GetIntegrations> =>
    new Promise<GetIntegrations>((resolve) =>
      setTimeout(() => resolve(this.data), 2000)
    );
}

export { Cms };
