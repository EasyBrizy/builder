import { AbstractPlugin } from "./AbstractPlugin";
import { Action } from "./type";

export class PluginManager {
  private plugins: AbstractPlugin[] = [];

  public preInstallPlugin(plugin: AbstractPlugin): void {
    this.plugins.push(plugin);
    plugin.initialize();
  }

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
