export interface CompilerData {
  blocks: {
    freeStyles: Array<unknown>;
    freeScripts: Array<unknown>;
    proStyles?: Array<unknown>;
    proScripts?: Array<unknown>;
    body: string;
  };
}
interface Style {
  type: "style";
  attr: Record<string, string>;
  html: string;
}
interface Link {
  type: "link";
  attr: Record<string, string>;
}
export interface Scripts {
  attr?: Record<string, string | boolean>;
  html?: string;
}

export interface Assets {
  styles: Array<Styles>;
  scripts: Array<Scripts>;
}
export type Styles = Style | Link;
