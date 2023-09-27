import esbuild from "esbuild";
import Minimist from "minimist";

const argv_ = Minimist(process.argv.slice(2));
const IS_PRODUCTION = Boolean(argv_.production);
const WATCH = Boolean(argv_.watch);

const define = {
  "process.env": JSON.stringify("{}"),
  "process.env.IS_PRODUCTION": JSON.stringify(IS_PRODUCTION),
};

const baseConfig = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  loader: { ".ts": "ts" },
  minify: IS_PRODUCTION,
  sourcemap: IS_PRODUCTION ? false : "inline",
  define,
};

esbuild
  .build({
    ...baseConfig,
    platform: "node",
    outfile: "dist/index.js",
  })
  .then(async () => {
    if (WATCH) {
      let ctx = await esbuild.context({
        ...baseConfig,
        outdir: "dist",
      });

      await ctx.watch();
    } else {
      console.log("⚡ Done");
    }
  })
  .catch(() => process.exit(1));

esbuild
  .build({
    ...baseConfig,
    format: "esm",
    outfile: "dist/index.esm.js",
  })
  .then(async () => {
    if (WATCH) {
      let ctx = await esbuild.context({
        ...baseConfig,
        outdir: "dist",
      });

      await ctx.watch();
    } else {
      console.log("⚡ Done");
    }
  })
  .catch(() => process.exit(1));
