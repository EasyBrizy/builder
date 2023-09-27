export type Callback = (payload?: unknown) => unknown;

export type Filters = Record<string, Array<Callback>>;
