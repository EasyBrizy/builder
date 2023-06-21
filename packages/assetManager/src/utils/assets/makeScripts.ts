import { Asset, AssetLibsMap, Scripts } from "../../types";
import { classToClassName } from "../jsx";
import { MValue } from "../types";
import * as cheerio from "cheerio";

type Assets = Asset | AssetLibsMap;

export const makeScripts = (asset: Assets): MValue<Array<Scripts>> => {
  const { content } = asset;
  switch (content.type) {
    case "inline": {
      return [
        {
          attr: classToClassName(content.attr ?? {}),
          html: content.content,
        },
      ];
    }

    case "code": {
      const $ = cheerio.load(content.content);
      const $nodes = $("script");

      if ($nodes.length > 0) {
        const scripts: Array<Scripts> = [];

        $nodes.each(function () {
          const $el = $(this);
          const attr = classToClassName($el.attr() ?? {});

          if ("src" in attr) {
            scripts.push({ attr });
          } else {
            const html = $el.html() ?? "";

            scripts.push({ attr, html });
          }
        });

        return scripts;
      }
      return undefined;
    }
    case "file": {
      return [
        {
          attr: {
            ...classToClassName(content.attr ?? {}),
            src: content.url,
          },
        },
      ];
    }
  }
};
