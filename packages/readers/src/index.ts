import { NewType } from "./NewType";
import { pipe } from "./fp/pipe";
import { isNullish } from "./isNullish";
import { onNullish } from "./onNullish";
import * as Arr from "./reader/array";
import * as Json from "./reader/json";
import * as Num from "./reader/number";
import * as Obj from "./reader/object";
import * as Str from "./reader/string";
import { MNullish } from "./reader/types";
import { ResponseWithBody } from "./reader/types";
import { Dictionary } from "./reader/types";
import { Choice } from "./reader/types";
import { Reader } from "./reader/types";
import { throwOnNullish } from "./throwOnNullish";
import { Nothing, MNothing } from "fp-utilities";

export {
  isNothing,
  isT,
  orElse,
  pass,
  liftA2,
  mPipe,
  match,
  match2,
  parse,
  parseStrict,
  or,
} from "fp-utilities";

export { Arr, Json, Num, Obj, Str, pipe, throwOnNullish, onNullish, isNullish };

export type {
  NewType,
  MNullish,
  ResponseWithBody,
  Dictionary,
  Reader,
  Choice,
  Nothing,
  MNothing,
};
