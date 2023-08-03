interface Style {
  type: "style";
  attr: Record<string, string>;
  html: string;
}

interface Link {
  type: "link";
  attr: Record<string, string>;
}

export type Styles = Style | Link;

export interface Scripts {
  attr?: Record<string, string | boolean>;
  html?: string;
  name?: string;
}

export interface AssetCommon {
  attr?: Record<string, string>;
}

export interface File extends AssetCommon {
  type: "file";
  url: string;
}

export interface Inline extends AssetCommon {
  type: "inline";
  content: string;
}

export interface Code {
  type: "code";
  content: string;
}

export interface Asset {
  name: string;
  score: number;
  content: File | Inline | Code;
  pro: boolean;
}

export interface AssetLibsMap extends Asset {
  selectors: string[];
}

interface Google {
  name: "google";
  type: "google-font";
  score: number;
  content: {
    type: "file";
    url: string;
    attr: Record<string, string>;
  };
  pro: boolean;
}

interface Upload {
  name: "upload";
  type: "uploaded-font";
  score: number;
  content: {
    type: "file";
    url: string;
    attr: Record<string, string>;
  };
  pro: boolean;
}

export type Fonts = Google | Upload;

export interface FreeStyles {
  main: Asset;
  generic: Asset[];
  libsMap: AssetLibsMap[];
  libsSelectors: string[];
  pageFonts: Fonts[];
  pageStyles: Asset[];
}

export interface FreeScripts {
  main: Asset;
  generic: Asset[];
  libsMap: AssetLibsMap[];
  libsSelectors: string[];
}

export interface ProStyles {
  main: Asset;
  generic: Asset[];
  libsMap: AssetLibsMap[];
  libsSelectors: string[];
}

export interface ProScripts {
  main: Asset;
  generic: Asset[];
  libsMap: AssetLibsMap[];
  libsSelectors: string[];
}

export interface Assets {
  styles: Array<Styles>;
  scripts: Array<Scripts>;
}

export interface CompilerData {
  blocks: {
    freeStyles: FreeStyles;
    freeScripts: FreeScripts;
    proStyles?: ProStyles;
    proScripts?: ProScripts;
    body: string;
  };
}

export interface CompilerDataEntry {
  blocks: {
    freeStyles: Array<unknown>;
    freeScripts: Array<unknown>;
    proStyles?: Array<unknown>;
    proScripts?: Array<unknown>;
    body: string;
  };
}
