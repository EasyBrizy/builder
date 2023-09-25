import { isNullish } from "./isNullish";
import { MValue } from "./reader/types";

export const throwOnNullish =
  <T>(msg: string) =>
  (t: MValue<T>): T => {
    if (isNullish(t)) {
      throw new Error(msg);
    }

    return t;
  };
