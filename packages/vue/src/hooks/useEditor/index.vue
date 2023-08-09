<script lang="ts">
import {
    ActionKind,
    BuilderGlobal,
    Instance,
    Config,
    Action,
    State,
    HtmlOutputType,
} from "./types";
import { ref, onMounted, onUpdated, readonly, getCurrentInstance } from "vue";

function useReducer(reducer: any, initialArg: any) {
    const state = ref(initialArg);
    const dispatch = (action: any) => {
        state.value = reducer(state.value, action);
    };

    return [readonly(state), dispatch] as const;
}

const reducer = (state: State, action: Action): State => {
    const { type, error } = action;
    switch (type) {
        case ActionKind.idle:
            return { status: ActionKind.idle };
        case ActionKind.init:
            return { status: ActionKind.init };
        case ActionKind.load:
            return { status: ActionKind.load };
        case ActionKind.ready:
            return { status: ActionKind.ready };
        case ActionKind.error:
            return { status: ActionKind.error, error };
        default:
            return state;
    }
};

export default {
    name: "useEditor",
    methods: {
        useEditor: <T extends HtmlOutputType>(
            token: string,
            config: Config<T>
        ): [Readonly<State>, Instance | undefined] => {
            const [state, dispatch] = useReducer(reducer, { status: ActionKind.idle });

            const builderInstance = ref<Instance | undefined>(undefined);
            const builderGlobal = ref<BuilderGlobal<HtmlOutputType> | undefined>(
                undefined
            );

            onMounted(() => {
                const instance = getCurrentInstance();
                const builder = instance?.appContext.config.globalProperties.$builder;

                if (!builder) {
                    dispatch({ type: ActionKind.error, error: "missing window.Builder" });
                    return;
                }

                builderGlobal.value = builder;
            });

            onUpdated(() => {
                if (state.value.status === ActionKind.init) {
                    const builder = builderGlobal.value;
                    const node = config.container;

                    if (!node) {
                        dispatch({ type: ActionKind.error, error: "Invalid Node ref" });
                        return;
                    }

                    if (!builder) {
                        dispatch({ type: ActionKind.error, error: "Something went wrong" });
                        return;
                    }

                    const instance = (api: Instance) => {
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
            });

            return [state, builderInstance.value];
        },
    },
};
</script>
