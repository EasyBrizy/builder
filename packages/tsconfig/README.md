# @brizy/tsconfig

@brizy/tsconfig have a ready config to use

## Instalation

In `package.json` in the `devDependencies` field `@brizy/tsconfig: "*"`

# Usage

Create tsconfig.json in root folder of your project

Add a directive `"extends": "@brizy/base.json"` or another one config

Note that `"extends"` applies only 1 config to extend

If you need to create specified tsconfig for your project u can simply `"extends": "@brizy/base.json"` and override the necessary rules for your needs or create new config in ts-config package and then import it.

There are basic settings of `base.json` for `TS`

```
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "display": "Default",
  "compilerOptions": {
    "composite": false,
    "declaration": false,
    "declarationMap": false,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "inlineSources": false,
    "isolatedModules": true,
    "moduleResolution": "node",
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "preserveWatchOutput": true,
    "skipLibCheck": true,
    "strict": true
  },
  "exclude": ["node_modules"]
}

```
