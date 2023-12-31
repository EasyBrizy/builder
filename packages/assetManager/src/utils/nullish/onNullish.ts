/* eslint-disable no-unused-vars */
import { Nullish } from "../types";
import { isNullish } from "./isNullish";

export function onNullish<T>(orElse: T, v: T | Nullish): T;
export function onNullish<T>(orElse: T): (v: T | Nullish) => T;
export function onNullish<T>(
  ...args: [T] | [T, T | Nullish]
): T | ((v: T | Nullish) => T) {
  return args.length === 1
    ? (v: T | Nullish): T => (isNullish(v) ? args[0] : v)
    : isNullish(args[1])
    ? args[0]
    : args[1];
}
