import { CMS_ACTIONS } from "../types/types";
import { AbstractPlugin, Core } from "@brizy/builder-sdk";
import {
  Action,
  CollectionItem,
  CollectionType,
} from "@brizy/core/dist/types/type";

class Cms extends AbstractPlugin {
  collectionType: Array<string> = [];

  constructor(core: Core) {
    super("Cms", core);

    this.createAction("OPEN_CMS");
  }

  initialize = () => {
    super.initialize();

    const collectionTypes = this.core.collectionTypes;
    const collectionsItems = this.core.collectionItems;

    if (collectionTypes.length === 0)
      throw new Error("Missing collectionTypes");

    const CMSMarkup = `
        <div style="width: 1100px; height: 100vh; border: 2px solid chocolate; background: honeydew; margin: 0; padding: 0; box-sizing: border-box;">
            ${this.renderItems(collectionsItems)}
        </div>`;

    const CMSNode = document.createElement("div");

    CMSNode.id = "CMS";
    CMSNode.innerHTML = CMSMarkup;
    CMSNode.style.top = "0";
    CMSNode.style.left = "48px";
    CMSNode.style.position = "fixed";
    CMSNode.style.display = "none";

    document.body.appendChild(CMSNode);
  };

  renderItems = (items: Array<CollectionItem>) => {
    return items.map((collection) => {
      return `
          <ul style="display: flex;">
            <li style="margin-left: 15px;">
              Title: ${collection.pageData.title}
            </li>
            <li style="margin-left: 15px;">
              Slug: ${collection.pageData.slug}
            </li>
            <li style="margin-left: 15px;">
              Status: ${collection.pageData.status}
            </li>
            <li style="margin-left: 15px;">
              CollectionType: ${
                (collection.pageData.collectionType as CollectionType).title
              }
            </li>
            <li style="margin-left: 150px;">
              <a href="${this.applyHook(
                "BUILDER_EDIT_LINK",
                collection
              )}">Edit</a>
          </li>
      </ul>`;
    });
  };

  open = () => {
    const cmsNode = document.querySelector<HTMLElement>("#CMS");
    if (cmsNode) cmsNode.style.display = "block";
  };

  close = () => {
    const cmsNode = document.querySelector<HTMLElement>("#CMS");
    if (cmsNode) cmsNode.style.display = "none";
  };

  handleAction(action: Action) {
    if (action.type === CMS_ACTIONS.OPEN_CMS) this.open();

    if (action.type === CMS_ACTIONS.CLOSE_CMS) this.close();
  }
}

export { Cms };
