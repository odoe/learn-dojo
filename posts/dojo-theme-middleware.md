---
title: Theming with Dojo Middleware
date: 2019-09-17T15:43:43.856Z
author: Rene Rubalcava
description: A look at how to use the Dojo theme middleware to apply themes to your application.
tags: javascript, dojo, webdev, dojo6, styling
cover_image: /assets/blog/dojo-theme-middleware.jpg
published: true
---

Recently, we looked at the new [widget middleware](https://learn-dojo.com/dojo-widget-middleware/) that is available in Dojo. Aside from maintaining widget state or application stores, you can also use the `theme` middleware to [style your widgets](https://dojo.io/learn/styling/introduction).

Let's take a [previous example](https://codesandbox.io/s/dojo-function-based-widgets-94eyy) that used the function based widgets and add a theme to it.

## Themes

Themes are a great way to build applications and widgts that could be used by others. You might build a [library](https://github.com/dojo/cli-build-widget#building) of widgets to share with others. You can release the widgets with a default generic theme, but also allow others to provide their own themes. This lets developers repurpose widgets and applications for blogs, dashboards, or other applications and let them use a uniform theme.

You could even let users of your application choose their theme, such as providing a dark and light theme.

To add themes to our own applicaun, we can add a `themes` folder with `dark` and `light` folders to organize our themes. Then we can add a `Users` folder to each one for the themeable widget. To make the css available as themes, we need to create a module to export our themes.

```ts
/* src/themes/dark/Users/theme.ts */
/* src/themes/light/Users/theme.ts */
import * as css from "./Users.m.css";

export default {
  "dojo-function-based-widgets-themeable/Users": css
};
```

To export a theme, you need to export an object with the [widget theme key](https://dojo.io/learn/styling/working-with-themes#widget-theme-keys) and the referenced css. Note the format is as follows.

`{package-name}/{widget-css-module-name}: {css}`

Now, we can update our widget to make it themeable.

## Themeable Widget

Here is what the original widget looked like.

```tsx
// src/widgets/Users/Users.tsx
...
export default render(function Users({ middleware: { store } }) {
  const { get, path, executor } = store;
  const users = get(path("users"));
  if (!users) {
    executor(fetchUsersProcess)(null);
    return <em>Loading users...</em>;
  }

  return (
    <div classes={[css.root]}>
      <h1>Users</h1>
      <ul classes={[css.list]}>{userList(users)}</ul>
    </div>
  );
});
```

We can update it with the `theme` middleware.

```tsx
import { create, tsx } from "@dojo/framework/core/vdom";
// theme middleware
import theme from "@dojo/framework/core/middleware/theme";
import icache from "@dojo/framework/core/middleware/icache";

// dojo theme and dojo checkbox
import dojoTheme from "@dojo/themes/dojo";
import Checkbox, { Mode } from "@dojo/widgets/checkbox";

// base css and themes
import * as css from "./Users.m.css";
import dark from "../../themes/dark/theme";
import light from "../../themes/light/theme";

...

// add the theme middleware to the widget
const render = create({ icache, store, theme });

...

export default render(function Users({ middleware: { icache, store, theme } }) {
  const { get, path, executor } = store;
  const users = get(path("users"));
  if (!users) {
    executor(fetchUsersProcess)(null);
    return <em>Loading users...</em>;
  }
  const checked = icache.getOrSet("checked", false);
  // if no theme set, default to the light theme
  if (!theme.get()) {
    theme.set(light);
  }
  // extract the themed css to use
  const themedCss = theme.classes(css);
  return (
    <div classes={[themedCss.root]}>
      <Checkbox
        theme={dojoTheme}
        mode={Mode.toggle}
        checked={checked}
        onChange={() => {
          // use checkbox to toggle theme
          icache.set("checked", !checked);
          if (!checked) {
            theme.set(dark);
          } else {
            theme.set(light);
          }
        }}
      />
      <h1>Users</h1>
      <ul classes={[themedCss.list]}>{userList(users, themedCss)}</ul>
    </div>
  );
});
```

There is a bit going on here. We're adding some new imports.

```tsx
// theme middleware
import theme from "@dojo/framework/core/middleware/theme";
import icache from "@dojo/framework/core/middleware/icache";

// dojo theme and dojo checkbox
import dojoTheme from "@dojo/themes/dojo";
import Checkbox, { Mode } from "@dojo/widgets/checkbox";

// base css and themes
import * as css from "./Users.m.css";
import dark from "../../themes/dark/theme";
import light from "../../themes/light/theme";

const render = create({ icache, store, theme });
```

We're adding the `theme` middleware and the `icache` for the Dojo checkbox so that we can toggle themes. Then we import the base css and our light and dark themes. We then provide these as middleware to the function based widget.

Then we need to use them in the widget.

```tsx
export default render(function Users({ middleware: { icache, store, theme } }) {
  ...
  const checked = icache.getOrSet("checked", false);
  // if no theme set, default to the light theme
  if (!theme.get()) {
    theme.set(light);
  }
  // extract the themed css to use
  const themedCss = theme.classes(css);
  return (
    <div classes={[themedCss.root]}>
      <Checkbox
        theme={dojoTheme}
        mode={Mode.toggle}
        checked={checked}
        onChange={() => {
          // use checkbox to toggle theme
          icache.set("checked", !checked);
          if (!checked) {
            theme.set(dark);
          } else {
            theme.set(light);
          }
        }}
      />
      <h1>Users</h1>
      <ul classes={[themedCss.list]}>{userList(users, themedCss)}</ul>
    </div>
  );
});
```

We can toggle the theme by using `theme.set(customTheme)` and then use `const themedCss = theme.classes(css)` to get our themed css classes to apply to the widget. This `themedCss` is what we can use to apply our scoped css class names to the widget.

You can see the result below. Use the toggle button to toggle between light and dark theme.

!(https://codesandbox.io/embed/dojo-function-based-widgets-themeable-k8913?fontsize=14&module=%2Fsrc%2Fwidgets%2FUsers%2FUsers.tsx)


Once you get the pattern down, applying themes to your widgets can be a lot of fun.

If you are looking at providing a light and dark theme in your own applications, you could even use the preference set by users of Mac OS. You could use [`matchMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) to detect `prefers-color-scheme`.

```ts
if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  theme.set(dark);
}
```

## Things to remember

In general, it too me a little bit to really understand themes in Dojo, and I think I've finally got a good grasp on it.

Here are some things to remember.

* Theme class names must match widget default class names.
  - The theme will only be applied to class names in the default `css` of your widget, even if they are empty, make sure they match.
* `{package-name}/{widget-css-module-name}` - This is the [widget theme key](https://dojo.io/learn/styling/working-with-themes#widget-theme-keys).
  - This threw me off a bit, thanks to the Dojo team on [discord](https://discord.gg/M7yRngE) for helping me grasp this one!
* Use a `variables.css` to maintain [common theme properties](https://dojo.io/learn/styling/introduction#abstracting-common-theme-properties).
* Read the [documentation](https://dojo.io/learn/styling/introduction).
  - It's incredibly well written and contains all the details you need.

## Summary

Theming widgets can be a lot of fun, and you can find yourself diving down a rabbit hole of tweaks and css hacking to make some really cool things. Don't forget you can scaffold themes for `@dojo/widgets` using [`@dojo/cli-create-theme`](https://dojo.io/learn/styling/working-with-themes#scaffolding-themes-for-third-party-widgets). This will let you pick and choose which widgets you want to apply themes to.

Building themeable widgets also allows you to build more reusable widgets. This way you can drop your widgets into any other applications and quickly provide new themes without putting in a lot of effort to start from scratch!
