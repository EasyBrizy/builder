import { MValue } from "../types";
import { isNullish } from "./isNullish";

export const throwOnNullish =
  <T>(msg: string) =>
  (t: MValue<T>): T => {
    if (isNullish(t)) {
      throw new Error(msg);
    }

    return t;
  };
