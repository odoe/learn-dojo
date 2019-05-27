---
title: Dojo CLI Template App
date: 2019-01-02
author: Rene Rubalcava
description: Review of the Dojo CLI template application
tags: javascript, web development, dojo, typescript
cover_image: /assets/blog/dojo-cli-template-app.jpg
---


The release of [Dojo 4](https://dojo.io/blog/2018/10/15/2018-10-15-Version-4-Dojo/) introduced some really nice new features in their build pipeline to optimize for [progressive web apps](https://developers.google.com/web/progressive-web-apps/), some performance improvements under the hood in their rendering engine, and more.

However, one of the really cool things I haven't seen talked about too much is the new template application you get with the dojo cli. You can check out my earlier post on [using the @dojo/cli](https://learn-dojo.com/up-and-running-with-dojo-cli/) to learn how to get started.

The previous template application gave a you a nice introduction to basic widgets and how to display the widget in your app. It was fine as an introduction, but if you wanted to do a little more, like routing, you had to do a little more research. _Not anymore!_ The new template application comes with routing out of the box so you can quickly get up and running with a feature that you will probably end up using at some point in a larger application.

Unfortunately, the latest template app is not on code sandbox, most likely due to the routing not working correctly in that environment, at least not the last time I tried.

Here is what the template application looks like.

<figure class="wp-block-image">![](https://learn-dojo.com/wp-content/uploads/2019/01/dojo4-template-app.gif)</figure>

I have put up the untouched source for the template application [on github](https://github.com/odoe/dojo-4-template-app).

Now let's take a look at what you get with the new template app.

I'll do a more detailed post on routing in the future, but you can read more details in the [Dojo documentation](https://dojo.io/docs/index.html#doc--dojo__framework__v4_0_0__src__routing__README_md). The key here is that each view for a route is defined by an Outlet. An [Outlet](https://dojo.io/docs/index.html#doc--dojo__framework__v4_0_0__src__routing__README_md___outlets) is just a wrapper for widgets that will be displayed in that routes view.

```ts
// src/App.ts
import WidgetBase from "@dojo/framework/widget-core/WidgetBase";
import { v, w } from "@dojo/framework/widget-core/d";
import Outlet from "@dojo/framework/routing/Outlet";

import Menu from "./widgets/Menu";
import Home from "./widgets/Home";
import About from "./widgets/About";
import Profile from "./widgets/Profile";

import * as css from "./App.m.css";

export default class App extends WidgetBase {
  protected render() {
    return v("div", { classes: [css.root] }, [
      w(Menu, {}),
      v("div", [
        w(Outlet, {
          key: "home", id: "home", renderer: () => w(Home, {})
        }),
        w(Outlet, {
          key: "about", id: "about", renderer: () => w(About, {})
        }),
        w(Outlet, {
          key: "profile",
          id: "profile",
          renderer: () => w(Profile, {
            username: "Dojo User"
          })
        })
      ])
    ]);
  }
}
```

Ok, so let's break this down a little bit. The **w** is a function to render widgets and **v** will create virtual dom nodes. You can see that in this case, what is happening is there is a top level menu, with a div underneath. In this div is where each Outlet is defined, with an id, key (optional), and what to display in the **render** method.

I won't go in to detail on each view. They are fairly standard widgets, but let's take a look at the routing part. The routes are defined in a simple object.

```ts
// src/routes.ts
export default [
  {
    path: "home",
    outlet: "home",
    defaultRoute: true
  },
  {
    path: "about",
    outlet: "about"
  },
  {
    path: "profile",
    outlet: "profile"
  }
];
```

Each route has a path, with the name of the outlet id, which coincides with the id of the outlet defined in the previous snippet. Super simple and straight forward. You can also see that the home route is defined as the **defaultRoute**.

Here is how the whole thing is put together.

```ts
// src/main.ts
import renderer from '@dojo/framework/widget-core/vdom';
import Registry from '@dojo/framework/widget-core/Registry';
import { w } from '@dojo/framework/widget-core/d';
import { registerRouterInjector } from '@dojo/framework/routing/RouterInjector';
import {
  registerThemeInjector
} from '@dojo/framework/widget-core/mixins/Themed';
import dojo from '@dojo/themes/dojo';
import '@dojo/themes/dojo/index.css';

import routes from './routes';
import App from './App';

const registry = new Registry();
registerRouterInjector(routes, registry);
registerThemeInjector(dojo, registry);

const r = renderer(() => w(App, {}));
r.mount({ registry });
```

I'll go into more detail in the future, but you register your route with the [Registry,](https://dojo.io/tutorials/1020_registries/) which is a way that you can do more configuration with your widgets beyond just display them on the page. You even get a taste of working with [themes](https://dojo.io/tutorials/007_theming/) via the [ThemeInjector](https://dojo.io/docs/index.html#doc--dojo__framework__v4_0_0__src__widget-core__README_md___styling--theming).

Once your routes are registered, you can then [mount](https://dojo.io/docs/index.html#doc--dojo__framework__v4_0_0__src__widget-core__README_md___rendering-a-widget-in-the-dom) the application with the registry. If I were to do anything different here, it would probably be to do all the Registry work in a separate module, but that is just a preference.

I am really glad to see the new dojo cli template app giving users a solid start with routing and an introduction to the registry, which in my opinion are key components of building scalable applications.

Now, why is routing important in progressive web apps? It allows you to lazy load parts of your application until you need them. For example, in the template application some users may never click on the profile page, so why should your application load the files for that page unnecessarily . You can see what I mean in this animated image.

<figure class="wp-block-image">![](https://learn-dojo.com/wp-content/uploads/2019/01/dojo4-template-app-files.gif)</figure>

Here, you can see that the files for the pages are not loaded until I click on them. This is code splitting, something Dojo 1 was fantastic at and that the new Dojo takes advantage of [webpack](https://webpack.js.org/) under the hood in their build tools to handle as well.
