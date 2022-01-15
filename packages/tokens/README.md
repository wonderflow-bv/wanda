# Wanda Design Tokens [<img src="https://svgshare.com/i/Ygj.svg" alt="Wonderflow Logo" width="90" height="90" align="right">](https://design.wonderflow.ai)

This repo contains all the design tokens generated from the Wonderflow design language. These tokens are the foundation for our digital products.

## How to use

To use the tokens you have to install the npm package first:

```sh
npm i @wonderflow/tokens
```

based on the platform you're working on, you can import the tokens from the relative platform folder inside **node_modules**. For example if you're working on **web**, you can import the tokens as `JSON` or `CSS` (custom-properties):

## Platforms

Currently we ship tokens only for the `web` platform, others may be added in the future.

### Inside javascript

If you want to import and use tokens inside your javascript-based project, you can import the `json` version and use it. Note that the color tokens are provided in HSL format, without the css `hsl()` notation, which you have to add each time.

```jsx
import tkns from "@wonderflow/tokens/platforms/web/tokens.json";

<div style={{ color: `hsl(${tkns.color.blue["50"]} / 10%)` }} />;
```

#### Typescript

If your codebase is based on typescript you can import the tokens types which provide types validation for tokens when you use them inside other components. Here an example:

```jsx
import { TokensTypes } from "@wonderflow/tokens/platforms/web/types";
import React from "react";

type MyComponentProps = {
  padding: TokensTypes["space"],
};
```

### Inside CSS

Inside css files the tokens are available as custom env variables (`env(--[TOKEN-NAME])`), they are then converted into the final value at build-time.

```css
@import "@wonderflow/tokens/platforms/web/tokens.css";

div {
  /* Colors are defined as HSL-4 but without the hsl() notation */
  color: hsl(env(--color-primary-50) / 50%);
}
```

> **NOTE**
>
> You need to use [`postcss-import`](https://github.com/postcss/postcss-import) or [`postcss-easy-import`](https://github.com/TrySound/postcss-easy-import) to import files from node_modules
