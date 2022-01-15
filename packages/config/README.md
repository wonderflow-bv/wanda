# Wanda Shared Configurations [<img src="https://svgshare.com/i/Ygj.svg" alt="Wonderflow Logo" width="90" height="90" align="right">](https://design.wonderflow.ai)

[![Release](https://github.com/wonderflow-bv/config/actions/workflows/release.yml/badge.svg?branch=main)](https://github.com/wonderflow-bv/config/actions/workflows/release.yml)

This repository contains the source code of the Wanda design system shared configurations.

```sh
npm i @wonderflow/config
```

## Configurations

This package provides a set of predefined [Wanda's](https://design.wonderflow.ai) configurations which you can (and sometimes must) use in wonderflow projects.

### PostCSS

Import `postcssConfig` inside your local `postcss.config.js` file. You can [check the exported configuration here](https://github.com/wonderflow-bv/config/blob/main/src/postcss/config.ts#L19-L47).

```js
const { postcssConfig } = require("@wonderflow/config");
module.exports = postcssConfig;
```
