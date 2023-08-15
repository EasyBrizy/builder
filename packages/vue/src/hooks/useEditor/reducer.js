export const ActionKind = {
  idle: "idle",
  init: "init",
  load: "load",
  ready: "ready",
  error: "error",
};

export default function (state, action) {
  switch (action.type) {
    case ActionKind.idle:
    case ActionKind.init:
    case ActionKind.load:
    case ActionKind.ready:
      return { ...state, status: action.type };
    case ActionKind.error:
      return { ...state, status: ActionKind.error, error: action.error };
    default:
      return state;
  }
}
