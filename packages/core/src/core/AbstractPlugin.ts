import { Callback, Filters } from "../types/types";
import App from "./App";
import { Action, ActionTypes } from "./type";

export abstract class AbstractPlugin {
  public name: string;
  protected app: App;

  protected constructor(name: string, app: App) {
    this.name = name;
    this.app = app;
    app.registerPlugin(this);
  }

  // Define initialize methods
  public initialize() {
    this.dispatchAction(this.initAction());
  }

  // Define action creator method
  public createAction<T extends string>(type: T, payload?: Action["payload"]) {
    return this.app.createAction(type, { ...payload, pluginName: this.name });
  }

  // Define dispatch creator method
  public dispatchAction(action: Action) {
    this.app.dispatch(action, this);
  }

  // Define initAction
  public initAction(): Action {
    return this.createAction(ActionTypes.INIT_PLUGIN, {
      pluginName: this.name,
    });
  }

  // Define setDispatch method
  public handleAction(action: Action): void {
    console.log(`handleAction: ${this.name}, ${JSON.stringify(action)}`);
  }

  //#region Filters

  // Creating filter
  public addFilter<T extends string, U extends Callback>(
    filterName: T,
    callback: U
  ): void {
    this.app.addFilter(filterName, callback);
  }

  // Checking for existing filters
  public getFilters(): Filters {
    return this.app.getFilters();
  }

  // Removing filter
  public removeFilter<T extends string>(filterName: T): void {
    this.app.removeFilter(filterName);
  }

  // Executing filter
  public applyFilter<T extends string, P>(filterName: T, payload?: P): unknown {
    return this.app.applyFilter(filterName, payload);
  }

  //#endregion
}
