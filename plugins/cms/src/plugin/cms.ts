import { getConfig } from "../config/getConfig";
import { CMS_ACTIONS } from "../types/types";
import { AbstractPlugin, Core } from "@brizy/core";
import {
  Action, // CollectionItem,
  // CollectionType,
} from "@brizy/core/dist/types/type";
import { CMS } from "@brizy/plugin-cms";
import React from "react";
import { createRoot } from "react-dom/client";

class Cms extends AbstractPlugin {
  collectionType: Array<string> = [];
  rootNode: HTMLElement;

  constructor(core: Core) {
    super("Cms", core);

    // Create the root for CMS packages
    // the cms will be rendered inside bellow node
    const node = document.createElement("div");
    node.id = "cms-root-plugin";
    this.rootNode = node;
    this.createAction("OPEN_CMS");
  }

  initialize = () => {
    super.initialize();

    const collectionTypes = this.core.collectionTypes;

    if (collectionTypes.length === 0) {
      throw new Error("Missing collectionTypes");
    }

    // Append the rootNode on initializing
    document.body.appendChild(this.rootNode);

    const root = createRoot(this.rootNode);
    root.render(
      React.createElement(CMS, {
        config: getConfig(),
      })
    );
  };

  open(): void {
    this.rootNode.style.display = "block";
  }

  close(): void {
    this.rootNode.style.display = "node";
  }

  handleAction(action: Action) {
    switch (action.type) {
      case CMS_ACTIONS.OPEN_CMS: {
        this.open();
        break;
      }
      case CMS_ACTIONS.CLOSE_CMS: {
        this.close();
        break;
      }
    }
  }
}

export { Cms };
