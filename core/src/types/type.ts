export interface DefaultEvents {
  fetchCollectionsByName: (
    p: Record<string, unknown>
  ) => Record<string, unknown>;
  fetchCollections: () => Record<string, unknown>;
}

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

export type Filters = Record<string, Array<Callback>>;
