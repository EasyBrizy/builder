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

export enum HookTypes {
  GET_API_CLIENT = "GET_API_CLIENT",
  GET_PROJECT_DATA = "GET_PROJECT_DATA",
  GET_PAGE_DATA = "GET_PAGE_DATA",
  GET_TOKEN = "GET_TOKEN",
  GET_COLLECTION_TYPES = "GET_COLLECTION_TYPES",
  ADD_COLLECTION_TYPE = "ADD_COLLECTION_TYPE",
  GET_COLLECTION_ITEMS = "GET_COLLECTION_ITEMS",
  ADD_COLLECTION_ITEM = "ADD_COLLECTION_ITEM",
  BUILDER_EDIT_LINK = "BUILDER_EDIT_LINK",
  EDIT_ITEM = "EDIT_ITEM",
  GET_PREVIEW_ITEM = "GET_PREVIEW_ITEM",
  GET_PREVIEW_LINK = "GET_PREVIEW_LINK",
}

export interface Editor {
  name: string;
  type: string;
}

export interface CollectionType {
  title: string;
  id: string;
  editors: Array<Editor>;
}

export interface CollectionItem {
  pageData: Record<string, unknown>;
  projectData: Record<string, unknown>;
  editor: Editor;
}
