# Package @brizy/prettier-config

### Is used for code style

### Is intended for share config betwen all internal packages such as :

# Usage:

### 1. Add this package as devDependencies in package.json:

```JSON
{
  "devDependencies": {
    "@brizy/prettier-config": "*"
  }
}
```

### 2. In any package you can extend from the basic rules, for example:

_.prettierrc.js_

```js
module.exports = {
  ...require("@brizy/prettier-config")
  // ... your custom rules.
};
```
