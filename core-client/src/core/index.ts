import { AbstractPlugin } from "../abstractPlugin/AbstractPlugin";
import { PluginManager } from "../pluginManager/PluginManager";
import { MockApiClient } from "../plugins/mockApiClient/mockApiClient";
import {
  Action,
  Callback,
  CollectionItem,
  CollectionType,
  Dispatch,
  Hooks,
  HookTypes,
} from "../types/type";
import { isServer } from "./utils/common";
import { parseCollectionItem, parseCollectionType } from "./utils/parsers";

class Core {
  private pluginManager: PluginManager;
  private $dispatch: Dispatch | undefined;
  private actions: Set<string> = new Set();
  private hooks: Hooks = {};

  collectionTypes: Array<CollectionType> = [];
  collectionItems: Array<CollectionItem> = [];

  constructor() {
    this.pluginManager = new PluginManager();

    this.addHook(HookTypes.ADD_COLLECTION_TYPE, (collectionType) => {
      const parsed = parseCollectionType(collectionType);

      if (parsed) {
        this.collectionTypes.push(parsed);
      } else {
        console.warn("Attempt to add invalid CollectionType");
      }
    });

    this.addHook(HookTypes.GET_COLLECTION_TYPES, () => this.collectionTypes);

    this.addHook(HookTypes.ADD_COLLECTION_ITEM, (collectionItem) => {
      const parsed = parseCollectionItem(collectionItem);

      if (parsed) {
        this.collectionItems.push(parsed);
      } else {
        console.warn("Attempt to add invalid CollectionItem");
      }
    });

    this.addHook(HookTypes.GET_COLLECTION_ITEMS, () => this.collectionItems);

    // Create link for EDIT button and Preview button || Temporary solution
    this.addHook(HookTypes.BUILDER_EDIT_LINK, (collectionItem) => {
      const parsed = parseCollectionItem(collectionItem);

      if (parsed) {
        return `${window.location.origin}/editor/?id=${parsed.pageData.id}&slug=${parsed.pageData.slug}`;
      } else {
        return undefined;
      }
    });

    this.addHook(HookTypes.GET_PREVIEW_LINK, (collectionItem) => {
      const parsed = parseCollectionItem(collectionItem);

      if (parsed) {
        return `${window.location.origin}/preview/?id=${parsed.pageData.id}&slug=${parsed.pageData.slug}`;
      } else {
        return undefined;
      }
    });

    this.addHook("UPLOAD_CUSTOM_FILE", async (file) => {
      const formData = new FormData();
      // @ts-expect-error: unknown
      formData.append("file", file);

      // eslint-disable-next-line
      const response = await fetch(`${process.env.HOST}/upload`, {
        method: "POST",
        body: formData,
      });

      return await response.json();
    });

    this.pluginManager.preInstallPlugin(new MockApiClient(this));
  }

  private initAction() {
    return this.createAction("INIT_APP");
  }

  public setDispatch(dispatch: Dispatch) {
    this.$dispatch = dispatch;
  }

  public start() {
    if (isServer()) return;

    this.dispatch(this.initAction(), this);

    this.pluginManager.initializePlugins();
  }

  public dispatch<T extends Action>(action: T, initiator: unknown) {
    this.$dispatch?.(action);
    this.pluginManager.dispatch(action, initiator);
  }

  public createAction<T extends string, P>(type: T, payload?: P) {
    this.registerAction(type);

    if (payload !== undefined) {
      return { type, payload };
    }

    return { type };
  }

  public registerAction<T extends string>(type: T) {
    this.actions.add(type);
  }

  public getActions(): Set<string> {
    return this.actions;
  }

  public registerPlugin(plugin: AbstractPlugin) {
    this.pluginManager.registerPlugin(plugin);
  }

  public addHook<T extends string, U extends Callback>(
    hookName: T,
    callback: U
  ): void {
    if (!this.hooks[hookName]) {
      this.hooks[hookName] = [];
    }
    this.hooks[hookName].push(callback);
  }

  public getHooks(): Hooks {
    return this.hooks;
  }

  public removeHook<T extends string>(hookName: T): void {
    delete this.hooks[hookName];
  }

  public applyHook<T extends string, U = unknown>(
    hookName: T,
    payload?: U
  ): unknown {
    const handlers = this.hooks[hookName];

    if (handlers) {
      let result: unknown = payload;

      handlers.forEach((cb) => {
        result = cb(result);
      });

      return result;
    }

    return payload;
  }
}

export { Core };
