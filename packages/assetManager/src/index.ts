import { Asset, CompilerDataEntry, Assets, Scripts, Styles } from "./types";
import { getAssetBySelector } from "./utils/assets/getAssetBySelector";
import { makeScripts } from "./utils/assets/makeScripts";
import { makeStyles } from "./utils/assets/makeStyles";
import { sortAsset } from "./utils/assets/sortAsset";
import { parseCompileData } from "./utils/converters";

const getAssets = (assets: CompilerDataEntry): Assets => {
  const data = parseCompileData(assets);

  if (!data) {
    return { styles: [], scripts: [] };
  }

  const { freeStyles, freeScripts, proStyles, proScripts } = data.blocks;

  const freeStylesLib = getAssetBySelector(
    freeStyles.libsMap,
    freeStyles.libsSelectors
  );
  const freeScriptsLib = getAssetBySelector(
    freeScripts.libsMap,
    freeScripts.libsSelectors
  );
  const allStylesFree: Array<Asset> = [
    ...freeStyles.generic,
    ...freeStyles.pageFonts,
    ...freeStyles.pageStyles,
    ...(freeStylesLib ? [freeStylesLib] : []),
  ];
  const allScriptsFree: Array<Asset> = [
    ...freeScripts.generic,
    ...(freeScriptsLib ? [freeScriptsLib] : []),
  ];
  let allScriptsPro: Array<Asset> = [];
  let allStylesPro: Array<Asset> = [];

  if (proScripts) {
    const libs = getAssetBySelector(
      proScripts.libsMap,
      proScripts.libsSelectors
    );
    allScriptsPro = [
      ...proScripts.generic,
      ...(libs ? [libs] : []),
      proScripts.main,
    ];
  } else {
    allScriptsFree.push(freeScripts.main);
  }

  if (proStyles) {
    const libs = getAssetBySelector(proStyles.libsMap, proStyles.libsSelectors);
    allStylesPro = [
      ...proStyles.generic,
      ...(libs ? [libs] : []),
      proStyles.main,
    ];
  } else {
    allStylesFree.push(freeStyles.main);
  }

  const styles = [...allStylesFree, ...allStylesPro]
    .sort(sortAsset)
    .map(makeStyles)
    .flat()
    .filter((t): t is Styles => !!t);
  const scripts = [...allScriptsFree, ...allScriptsPro]
    .sort(sortAsset)
    .map(makeScripts)
    .flat()
    .filter((t): t is Scripts => !!t);

  return { styles, scripts };
};

const getHtml = (assets: CompilerDataEntry): string => {
  if (!assets.blocks) {
    return "<h1 style='color: red'>Invalid assets...</h1>";
  }

  return assets.blocks.body;
};

export { getHtml, getAssets };
