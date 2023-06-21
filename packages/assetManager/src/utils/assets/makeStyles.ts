import { Asset, AssetLibsMap, Fonts, Styles } from "../../types";
import { pipe } from "../fp/pipe";
import { classToClassName, crossOrigin } from "../jsx";
import { MValue } from "../types";
import * as cheerio from "cheerio";

type Assets = Asset | Fonts | AssetLibsMap;

const normalizeAttr = pipe(classToClassName, crossOrigin);

export const makeStyles = (asset: Assets): MValue<Array<Styles>> => {
  const { content } = asset;
  switch (content.type) {
    case "inline": {
      return [
        {
          type: "style",
          html: content.content,
          attr: normalizeAttr(content.attr ?? {}),
        },
      ];
    }
    case "code": {
      const $ = cheerio.load(content.content);
      const $styles = $("style");
      const $links = $("link");

      if ($styles.length > 0) {
        const styles: Array<Styles> = [];

        $styles.each(function () {
          const $el = $(this);
          const attr = normalizeAttr($el.attr() ?? {});
          const html = $el.html() ?? "";

          styles.push({ type: "style" as const, attr, html });
        });

        return styles;
      }

      if ($links.length > 0) {
        const links: Array<Styles> = [];

        $links.each(function () {
          const $el = $(this);
          const attr = normalizeAttr($el.attr() ?? {});

          links.push({ type: "link" as const, attr });
        });

        return links;
      }
      return undefined;
    }
    case "file": {
      return [
        {
          type: "link",
          attr: { ...normalizeAttr(content.attr ?? {}), href: content.url },
        },
      ];
    }
  }
};
