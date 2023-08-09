import reducer, { ActionKind } from "./reducer";
import useReducer from "./useReducer";
import { ref } from "vue";

export default function (token, config) {
  const [state, dispatch] = useReducer(reducer, { status: ActionKind.idle });
  const builderInstance = ref(null);
  const builderGlobal = ref(null);
  const builder = window.Builder;

  if (!builder) {
    dispatch({
      type: ActionKind.error,
      error: "missing window.Builder",
    });
    return;
  }
  dispatch({ type: ActionKind.init });
  builderGlobal.value = builder;

  if (state.value.status === ActionKind.init) {
    const builder = builderGlobal.value;
    const node = config.container.value;

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
    const instance = (api) => {
      builderInstance.value = api;
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

  return {
    state,
    instance: builderInstance,
  };
}
