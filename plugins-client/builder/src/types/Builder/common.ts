export type Response<R> = (r: R) => void;

export interface CompilerData {
  blocks: {
    freeStyles: Array<unknown>;
    freeScripts: Array<unknown>;
    proStyles?: Array<unknown>;
    proScripts?: Array<unknown>;
    body: string;
  };
}

export type ProjectData = Record<string, unknown>;

export type PageData = Record<string, unknown>;
