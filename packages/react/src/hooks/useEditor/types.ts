import type {
  Config as BuilderConfig,
  Builder,
  HtmlOutputType as BuilderHtmlOutputType,
} from "@/types/Builder/config";

export enum ActionKind {
  idle = "idle",
  init = "init",
  load = "load",
  ready = "ready",
  error = "error",
}

// An interface for our actions
export interface Action {
  type: ActionKind;
  error?: string;
}

// An interface for our state
export interface State {
  status: ActionKind;
  error?: string;
}

type _Config<T extends HtmlOutputType> = Omit<BuilderConfig<T>, "container">;

export interface Config<T extends HtmlOutputType> extends _Config<T> {
  container: HTMLElement | null;
}

export type Instance = {
  save: VoidFunction;
};

export type BuilderGlobal<T extends HtmlOutputType> = Builder<T>;

export type HtmlOutputType = BuilderHtmlOutputType;
