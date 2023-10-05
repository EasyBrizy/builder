import { AbstractPlugin } from "../abstractPlugin/AbstractPlugin";
import { Action } from "../types/type";

class PluginManager {
  private plugins: AbstractPlugin[] = [];

  public registerPlugin(plugin: AbstractPlugin) {
    if (this.plugins.find((p) => p.name === plugin.name)) {
      throw Error(`The plugin ${plugin.name} already registered`);
    }

    this.plugins.push(plugin);
  }

  public initializePlugins() {
    this.plugins.forEach((plugin) => {
      plugin.initialize();
    });
  }

  public dispatch<T extends Action>(action: T, initiator: unknown) {
    this.plugins.forEach((plugin) => {
      // Exclude initiator dispatcher
      if (plugin !== initiator) {
        plugin.handleAction(action);
      }
    });
  }
}

export { PluginManager };
