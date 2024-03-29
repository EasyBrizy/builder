import { AbstractPlugin } from "../abstractPlugin/AbstractPlugin";
import { Core } from "../core";
import { Action } from "../types/type";

class PluginManager {
  private plugins: AbstractPlugin[] = [];

  public preInstallPlugin(plugin: AbstractPlugin): void {
    this.plugins.push(plugin);
  }

  public registerPlugin(plugin: AbstractPlugin) {
    if (this.plugins.find((p) => p.name === plugin.name)) {
      throw Error(`The plugin ${plugin.name} already registered`);
    }

    this.plugins.push(plugin);
  }

  // eslint-disable-next-line
  public initializePlugins(plugins: Record<string, any>, core: Core) {
    // Server-plugins init (from config), equals new ServerPlugin(Core);
    for (const plugin in plugins) {
      new plugins[plugin](core);
    }

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
