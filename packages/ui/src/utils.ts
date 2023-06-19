import * as cheerio from "cheerio";
import { isT } from "fp-utilities";

interface Scripts {
  attr?: Record<string, string>;
  html?: string;
}

const classToClassName = <T extends Record<string, string>>(
  r: T
): Omit<T, "class"> & { className?: string } => {
  if ("class" in r) {
    const { class: _class, ...rest } = r;
    return { className: _class, ...rest };
  }
  return r;
};

export const getScripts = (scripts: Array<string>): Array<Scripts> => {
  return scripts
    .map((script) => {
      const $ = cheerio.load(script);
      const node = $("script");

      if (node) {
        const attr = classToClassName(node.attr() ?? {});
        const html = node.html() ?? "";

        if ("src" in attr) {
          return { attr };
        }

        return { attr, html };
      }
    })
    .filter(isT);
};

interface Style {
  type: "style";
  attr: Record<string, string>;
  html: string;
}

interface Link {
  type: "link";
  attr: Record<string, string>;
}

type Styles = Style | Link;

export const getStyles = (styles: Array<string>): Array<Styles> => {
  return styles
    .map((style) => {
      const $ = cheerio.load(style);
      const _style = $("style");
      const _link = $("link");

      if (_style.length > 0) {
        const attr = classToClassName(_style.attr() ?? {});
        const html = _style.html() ?? "";

        return { type: "style" as const, attr, html };
      }

      if (_link.length > 0) {
        const attr = classToClassName(_link.attr() ?? {});

        return { type: "link" as const, attr };
      }
    })
    .filter(isT);
};
