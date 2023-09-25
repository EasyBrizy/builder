import { AbstractPlugin } from "./AbstractPlugin";
import { PluginManager } from "./PluginManager";
import { Action, Dispatch } from "./type";

export class App {
  private pluginManager: PluginManager;
  private $dispatch: Dispatch | undefined;
  private actions: Set<string> = new Set();

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
}

export default App;
