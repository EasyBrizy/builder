import { AbstractPlugin } from "../abstractPlugin/AbstractPlugin";
import { PluginManager } from "../pluginManager/PluginManager";
import { Action, Dispatch } from "../types/type";
import { Callback, Filters } from "../types/type";

class Core {
  private pluginManager: PluginManager;
  private $dispatch: Dispatch | undefined;
  private actions: Set<string> = new Set();
  private filters: Filters = {};

  constructor() {
    this.pluginManager = new PluginManager();
  }

  private initAction() {
    return this.createAction("INIT_APP");
  }

  public setDispatch(dispatch: Dispatch) {
    this.$dispatch = dispatch;
  }

  public start() {
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

  //#region Filters

  // Creating filter
  public addFilter<T extends string, U extends Callback>(
    filterName: T,
    callback: U
  ): void {
    if (!this.filters[filterName]) {
      this.filters[filterName] = [];
    }
    this.filters[filterName].push(callback);
  }

  // Checking for existing filters
  public getFilters(): Filters {
    return this.filters;
  }

  // Removing filter
  public removeFilter<T extends string>(filterName: T): void {
    delete this.filters[filterName];
  }

  // Executing filter
  public applyFilter<T extends string, U>(filterName: T, payload?: U): unknown {
    const handlers = this.filters[filterName];

    if (handlers) {
      let result: unknown = payload;

      handlers.forEach((cb) => {
        result = cb(result);
      });

      return result;
    }

    return payload;
  }

  //#endregion
}

export { Core };
