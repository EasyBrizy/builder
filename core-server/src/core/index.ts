import { AbstractPlugin } from "../abstractPlugin/AbstractPlugin";
import { PluginManager } from "../pluginManager/PluginManager";
import {
  Action,
  Callback,
  CoreConfig,
  Dispatch,
  Hooks,
  RouteData,
} from "../types/type";
import cors from "cors";
import express, {
  Express,
  NextFunction,
  Request,
  Response,
  Router,
} from "express";

class Core {
  private pluginManager: PluginManager;
  private $dispatch: Dispatch | undefined;
  private actions: Set<string> = new Set();
  private hooks: Hooks = {};
  private config: CoreConfig;

  // Express
  private app: Express;
  private router = Router();
  private routes: RouteData[] = [];

  constructor(config: CoreConfig) {
    this.pluginManager = new PluginManager();
    this.config = config;

    this.app = express();

    // TODO: REMOVE CORS FROM HERE
    // will do it next PR
    this.app.use(cors());
    this.app.use(express.json({ limit: "50mb" }));
  }

  public registerRoute(data: RouteData) {
    const { pluginName, path, middleWare, handler, method } = data;

    this.routes.push({ pluginName, path, middleWare, handler, method });
  }

  private applyRoutes(routes: RouteData[]) {
    const emptyMiddleware = (_: Request, __: Response, next: NextFunction) => {
      next();
    };

    routes.forEach((route: RouteData) => {
      if (route.method === "POST") {
        this.router.post(
          route.path,
          route.middleWare ? route.middleWare : emptyMiddleware,
          route.handler
        );
      }

      if (route.method === "GET") {
        this.router.get(
          route.path,
          route.middleWare ? route.middleWare : emptyMiddleware,
          route.handler
        );
      }

      // Will add PUT method and so on in future when it will be needed
    });

    this.app.use("/api", this.router);
  }

  private startServer(port: string) {
    this.applyRoutes(this.routes);

    this.app.listen(port, () => {
      console.log(`Server started on PORT: ${port}`);
    });
  }

  // region Old

  private initAction() {
    return this.createAction("INIT_APP");
  }

  public setDispatch(dispatch: Dispatch) {
    this.$dispatch = dispatch;
  }

  public start(port: string = "5050") {
    this.dispatch(this.initAction(), this);

    this.pluginManager.initializePlugins(this.config.plugins, this);

    this.startServer(port);
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

  // endregion Old
}

export { Core };
