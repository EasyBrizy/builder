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

class Core {
  private pluginManager: PluginManager;
  private $dispatch: Dispatch | undefined;
  private actions: Set<string> = new Set();
  private hooks: Hooks = {};

  collectionTypes: Array<CollectionType> = [];
  collectionItems: Array<CollectionItem> = [];

  constructor() {
    this.pluginManager = new PluginManager();

    //#region predefined Hooks

    this.addHook(HookTypes.ADD_COLLECTION_TYPE, (collectionType) => {
      if (collectionType) {
        this.collectionTypes.push(collectionType as CollectionType);
      }
    });

    this.addHook(HookTypes.GET_COLLECTION_TYPES, () => this.collectionTypes);

    this.addHook(HookTypes.ADD_COLLECTION_ITEM, (collectionItem) => {
      this.collectionItems.push(collectionItem as CollectionItem);
    });

    this.addHook(HookTypes.GET_COLLECTION_ITEMS, () => this.collectionItems);

    // Create link for EDIT button
    // Temporary solution
    this.addHook(HookTypes.BUILDER_EDIT_LINK, (collection) => {
      return `${window.location.origin}/admin/?type=${
        // @ts-expect-error: unknown
        collection.pageData.collectionType.title
      }&slug=${(collection as CollectionItem).pageData.slug}`;
    });

    //#endregion

    this.pluginManager.preInstallPlugin(new MockApiClient(this));
  }

  public setDispatch(dispatch: Dispatch) {
    this.$dispatch = dispatch;
  }

  public start() {
    if (isServer()) return;

    // Init App
    this.dispatch(this.initAction(), this);

    // Initialize the plugins
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

  // Creating hook
  public addHook<T extends string, U extends Callback>(
    hookName: T,
    callback: U
  ): void {
    if (!this.hooks[hookName]) {
      this.hooks[hookName] = [];
    }
    this.hooks[hookName].push(callback);
  }

  //#region Hooks

  // Checking for existing hooks
  public getHooks(): Hooks {
    return this.hooks;
  }

  // Removing hook
  public removeHook<T extends string>(hookName: T): void {
    delete this.hooks[hookName];
  }

  // Executing hook
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

  private initAction() {
    return this.createAction("INIT_APP");
  }

  //#endregion
}

export { Core };
