import { Core } from "../core";
import { Action, ActionTypes, Callback, Hooks } from "../types/type";

abstract class AbstractPlugin {
  public name: string;
  protected core: Core;

  protected constructor(name: string, core: Core) {
    this.name = name;
    this.core = core;
    core.registerPlugin(this);
  }

  // Define initialize methods
  public initialize() {
    this.dispatchAction(this.initAction());
  }

  // Define action creator method
  public createAction<T extends string>(type: T, payload?: Action["payload"]) {
    return this.core.createAction(
      type,
      typeof payload === "object" && payload !== null
        ? { ...payload, pluginName: this.name }
        : { pluginName: this.name }
    );
  }

  // Define dispatch creator method
  public dispatchAction(action: Action) {
    this.core.dispatch(action, this);
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

  //#region Hooks

  // Creating hook
  public addHook<T extends string, U extends Callback>(
    hookName: T,
    callback: U
  ): void {
    this.core.addHook(hookName, callback);
  }

  // Checking for existing hooks
  public getHooks(): Hooks {
    return this.core.getHooks();
  }

  // Removing hook
  public removeHook<T extends string>(hookName: T): void {
    this.core.removeHook(hookName);
  }

  // Executing hook
  public applyHook<T extends string, P>(hookName: T, payload?: P): unknown {
    return this.core.applyHook(hookName, payload);
  }

  //#endregion
}

export { AbstractPlugin };
