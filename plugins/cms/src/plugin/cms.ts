import { CMS_ACTIONS } from "../types/types";
import { AbstractPlugin, Core } from "@brizy/core";
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

    const collectionTypes = this.applyHook("GET_COLLECTION_TYPES");

    if (!collectionTypes) throw new Error("Missing collectionTypes");

    if (
      !Array.isArray(collectionTypes) ||
      !collectionTypes.every((item) => "id" in item && "title" in item)
    )
      throw new Error("Wrong collectionType present");

    this.collectionType = collectionTypes;

    const collections = this.applyHook(
      "GET_COLLECTION_ITEMS"
    ) as Array<CollectionItem>;

    const CMSMarkup = `
        <div style="width: 1100px; height: 100vh; border: 2px solid chocolate; background: honeydew; margin: 0; padding: 0; box-sizing: border-box;">
            ${this.renderItems(collections)}
        </div>`;

    const CMSNode = document.createElement("div");
    CMSNode.id = "_cms";
    CMSNode.innerHTML = CMSMarkup;
    CMSNode.style.top = "0";
    CMSNode.style.left = "48px";
    CMSNode.style.position = "fixed";
    CMSNode.style.display = "none";

    document.body.appendChild(CMSNode);
  };

  renderItems = (items: Array<CollectionItem>) => {
    return items.map((collection: CollectionItem) => {
      return `<ul style="display: flex;">
          <li style="margin-left: 15px;">Title: ${
            collection.pageData.title
          }</li>
          <li style="margin-left: 15px;">Slug: ${collection.pageData.slug}</li>
          <li style="margin-left: 15px;">Status: ${
            collection.pageData.status
          }</li>
          <li style="margin-left: 15px;">CollectionType: ${
            (collection.pageData.collectionType as CollectionType).title
          }</li>
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
    console.log("CMS open effect");

    const cmsNode = document.querySelector<HTMLElement>("#_cms");
    if (cmsNode) {
      cmsNode.style.display = "block";
    }
  };

  close = () => {
    console.log("CMS close effect");

    const cmsNode = document.querySelector<HTMLElement>("#_cms");
    if (cmsNode) {
      cmsNode.style.display = "none";
    }
  };

  handleAction(action: Action) {
    if (action.type === CMS_ACTIONS.OPEN_CMS) {
      this.open();
    }

    if (action.type === CMS_ACTIONS.CLOSE_CMS) {
      this.close();
    }
  }
}

export { Cms };
