export type Reader<T> = (v: unknown) => T | undefined;

export type ObjWithUnknowns<K extends string> = {
  [k in K]: unknown;
};

export interface ResponseWithBody<T> {
  status: number;
  ok: boolean;
  data: T;
}

export type MValue<A> = A | undefined;
export type Nullish = undefined | null;
export type Literal = string | number;
export type Choice = {
  title: string;
  value: Literal;
};
export type MNullish<T> = T | Nullish;

export type Response<R> = (r: R) => void;

export type Dictionary<T> = {
  [k: string]: T | undefined;
};
