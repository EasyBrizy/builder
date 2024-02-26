// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

function updateConfig() {
  const configFilePath = path.join(__dirname, "config.ts");

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const packageJson = require("../../package.json");
  const installedPackages = packageJson.dependencies || {};

  let configContent = "";
  let imports = "";

  const packagesWithBrizyDisplayNames = {};

  for (const packageName in installedPackages) {
    const packagePath = path.resolve(
      path.dirname(require.resolve(`${packageName}/package.json`))
    );

    if (fs.existsSync(packagePath)) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const packageJson = require(path.join(packagePath, "package.json"));
        const brizyKind = packageJson.brizy ? packageJson.brizy.kind : null;

        if (brizyKind !== "plugin") {
          continue;
        }

        const brizyDisplayName = packageJson.brizy
          ? packageJson.brizy.name
          : null;
        const displayName = brizyDisplayName || packageName;

        if (!imports.includes(displayName)) {
          imports += `import { ${displayName} } from "${packageName}";\n`;
        }

        packagesWithBrizyDisplayNames[packageName] = displayName;
      } catch (error) {
        console.error(
          `Error reading package.json for package '${packageName}':`,
          error
        );
      }
    }
  }

  configContent += "export const config = {\n";
  configContent += "  plugins: {\n";
  for (const packageName in packagesWithBrizyDisplayNames) {
    const displayName = packagesWithBrizyDisplayNames[packageName];
    configContent += `    "${packageName}": ${displayName},\n`;
  }
  configContent += "  }\n";
  configContent += "};\n";

  const finalContent = imports + "\n" + configContent;

  fs.writeFileSync(configFilePath, finalContent);

  console.log("Config updated successfully.");
}

updateConfig();
