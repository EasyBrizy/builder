import {
  ActionKind,
  Action,
  BuilderGlobal,
  Instance,
  Config,
  State,
  HtmlOutputType,
} from "./types";
import { useEffect, useReducer, useRef } from "react";

function reducer(_: State, action: Action) {
  const { type, error } = action;
  switch (type) {
    case ActionKind.idle: {
      return { status: ActionKind.idle };
    }
    case ActionKind.init: {
      return { status: ActionKind.init };
    }
    case ActionKind.load: {
      return { status: ActionKind.load };
    }
    case ActionKind.ready: {
      return { status: ActionKind.ready };
    }
    case ActionKind.error: {
      return { status: ActionKind.error, error };
    }
  }
}

export const useEditor = <T extends HtmlOutputType>(
  token: string,
  config: Config<T>
): [State, Instance | undefined] => {
  const [state, dispatch] = useReducer(reducer, {
    status: ActionKind.idle,
  });
  const builderInstance = useRef<Instance>();
  const builderGlobal = useRef<BuilderGlobal<T>>();

  useEffect(() => {
    const builder = window.Builder;

    if (!builder) {
      dispatch({
        type: ActionKind.error,
        error: "missing window.Builder",
      });
      return;
    }

    dispatch({ type: ActionKind.init });
    builderGlobal.current = builder;
  }, []);

  useEffect(() => {
    if (state.status === ActionKind.init) {
      const builder = builderGlobal.current;
      const node = config.container;

      if (!node) {
        dispatch({
          type: ActionKind.error,
          error: "Invalid Node ref",
        });
        return;
      }

      if (!builder) {
        dispatch({
          type: ActionKind.error,
          error: "Something went wrong",
        });
        return;
      }

      const instance = (api: Instance) => {
        builderInstance.current = api;
      };

      const _onLoad = () => {
        dispatch({ type: ActionKind.ready });
        config.onLoad?.();
      };

      const _config = {
        ...config,
        container: node,
        onLoad: _onLoad,
      };

      dispatch({ type: ActionKind.load });
      builder.init(token, _config, instance);
    }
  }, [state, token, config]);

  return [state, builderInstance.current];
};
