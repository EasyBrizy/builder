import { NextFunction, Request, Response } from "express";

export enum ActionTypes {
  "INIT_APP" = "INIT_APP",
  "INIT_PLUGIN" = "INIT_PLUGIN",
}

interface InitApp {
  type: ActionTypes.INIT_APP;
  payload: undefined;
}

interface InitPlugin {
  type: ActionTypes.INIT_PLUGIN;
  payload: { pluginName: string };
}

interface Others {
  type: string;
  payload?: unknown;
}

export type Action = InitPlugin | InitApp | Others;

export type Dispatch<T = Action> = (action: T) => void;

export type Callback = (payload?: unknown) => unknown;

export type Hooks = Record<string, Array<Callback>>;

export interface CoreConfig {
  // eslint-disable-next-line
  plugins: Record<string, any>;
}

export interface RouteData {
  pluginName: string;
  method: "POST" | "GET";
  path: string;
  middleWare?: (req: Request, res: Response, next: NextFunction) => void;
  handler: (req: Request, res: Response, next: NextFunction) => void;
}
