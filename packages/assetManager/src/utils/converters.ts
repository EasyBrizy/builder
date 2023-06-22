import {
  Asset,
  AssetLibsMap,
  CompilerData,
  CompilerDataEntry,
  Fonts,
  FreeScripts,
  FreeStyles,
} from "../types";
import { pipe } from "./fp/pipe";
import { throwOnNullish } from "./nullish/throwOnNullish";
import * as Arr from "./reader/array";
import * as Obj from "./reader/object";
import * as Str from "./reader/string";
import { MValue } from "./types";
import { mPipe } from "fp-utilities/dist/mPipe";
import { optional } from "fp-utilities/dist/parsers/parse";
import { parseStrict } from "fp-utilities/dist/parsers/parseStrict";

const readStyles = parseStrict<Record<string, unknown>, FreeStyles>({
  main: pipe(
    mPipe(
      Obj.readKey("main"),
      Obj.read,
      (v) => v as unknown as Asset | undefined
    ),
    throwOnNullish("Invalid blocks: main")
  ),
  generic: pipe(
    mPipe(Obj.readKey("generic"), Arr.read, (v) => (v as Asset[]) ?? []),
    throwOnNullish("Invalid blocks: generic")
  ),
  libsMap: pipe(
    mPipe(
      Obj.readKey("libsMap"),
      Arr.read,
      (v) => v as unknown as AssetLibsMap[] | undefined
    ),
    throwOnNullish("Invalid blocks: libsMap")
  ),
  libsSelectors: pipe(
    mPipe(Obj.readKey("libsSelectors"), Arr.readWithItemReader(Str.read)),
    throwOnNullish("Invalid blocks: libsSelectors")
  ),
  pageFonts: pipe(
    mPipe(
      Obj.readKey("pageFonts"),
      Arr.read,
      (v) => v as unknown as Fonts[] | undefined
    ),
    throwOnNullish("Invalid blocks: pageFonts")
  ),
  pageStyles: pipe(
    mPipe(
      Obj.readKey("pageStyles"),
      Obj.read,
      (v) => v as unknown as Asset[] | undefined
    ),
    throwOnNullish("Invalid blocks: pageStyles")
  ),
});

const readScripts = parseStrict<Record<string, unknown>, FreeScripts>({
  main: pipe(
    mPipe(
      Obj.readKey("main"),
      Obj.read,
      (v) => v as unknown as Asset | undefined
    ),
    throwOnNullish("Invalid blocks: main")
  ),
  generic: pipe(
    mPipe(Obj.readKey("generic"), Arr.read, (v) => (v as Asset[]) ?? []),
    throwOnNullish("Invalid blocks: generic")
  ),
  libsMap: pipe(
    mPipe(
      Obj.readKey("libsMap"),
      Arr.read,
      (v) => v as unknown as AssetLibsMap[] | undefined
    ),
    throwOnNullish("Invalid blocks: libsMap")
  ),
  libsSelectors: pipe(
    mPipe(Obj.readKey("libsSelectors"), Arr.readWithItemReader(Str.read)),
    throwOnNullish("Invalid blocks: libsSelectors")
  ),
});

const blocksReader = parseStrict<
  Record<string, unknown>,
  CompilerData["blocks"]
>({
  freeStyles: pipe(
    mPipe(Obj.readKey("freeStyles"), Obj.read, readStyles),
    throwOnNullish("Invalid blocks: freeStyles")
  ),
  freeScripts: pipe(
    mPipe(Obj.readKey("freeScripts"), Obj.read, readScripts),
    throwOnNullish("Invalid blocks: freeScripts")
  ),
  body: pipe(
    mPipe(Obj.readKey("body"), Str.read),
    throwOnNullish("Invalid blocks: body")
  ),
  proStyles: optional(mPipe(Obj.readKey("proStyles"), Obj.read, readStyles)),
  proScripts: optional(mPipe(Obj.readKey("proScripts"), Obj.read, readScripts)),
});

const reader = parseStrict<CompilerDataEntry, CompilerData>({
  blocks: pipe(
    mPipe(Obj.readKey("blocks"), Obj.read, blocksReader),
    throwOnNullish("Invalid: blocks")
  ),
});

export const parseCompileData = (
  data: CompilerDataEntry
): MValue<CompilerData> => {
  if (!data.blocks) {
    return undefined;
  }

  try {
    return reader(data);
  } catch (e) {
    return undefined;
  }
};
