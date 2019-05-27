---
title: Intro to the Dojo Registry
date: 2019-01-09
author: Rene Rubalcava
description: An introduction to managing widgets with the Dojo Registry
tags: dojo, javascript, web development
cover_image: /assets/blog/intro-to-the-dojo-registry.jpg
---

The [Dojo Registry](https://dojo.io/docs/index.html#doc--dojo__framework__v4_0_0__src__widget-core__README_md___registry) is a powerful way you can work with widgets in your applications. We've had the opportunity to touch on the Registry in previous posts. We used it to inject context into our application with [Dojo Containers](https://learn-dojo.com/dojo-containers/) and it's also used when you want to use [routing](https://learn-dojo.com/dojo-cli-template-app/) in your applications.

### Basic Registry

The Registry allows you to do a few different things in your application. You can register widgets with the registry as string values and then reference the string values anywhere throughout your app.

For example, maybe I want to define a string value for an AboutMe widget used in my About page.

```ts
// src/main.ts
import Registry from '@dojo/framework/widget-core/Registry';
...
// define widgets
import AboutMe from './widgets/AboutMe';

const registry = new Registry();
registry.define('about-me', AboutMe);

// src/widgets/About.ts
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { w, v } from '@dojo/framework/widget-core/d';

import * as css from './styles/About.m.css';

export default class About extends WidgetBase {
  protected render() {
    return v('h1', { classes: [css.root] }, [
      'About Page',
      // can reference the string value
      // of widget without importing it
      w('about-me', {}, [])
    ]);
  }
}
```

This is pretty useful, as it can keep some of your widget code clean and you can define a series of widgets in a single location as you register them. Things start to get really interesting when we use the local registry of the widget to handle lazy loading via a [registry decorator](https://dojo.io/docs/index.html#doc--dojo__framework__v4_0_0__src__widget-core__README_md___registry-decorator).

## Registry Decorator

Each widget has it's own local registry that you can use to lazy load a widget until you need it. Maybe I want to have a button on my page that when clicked will load some other widget in its place. For the cli template application, maybe I have some profile information I want to show.

```ts
// src/widgets/MyProfile.ts
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { v } from '@dojo/framework/widget-core/d';

export default class MyProfile extends WidgetBase {
  protected render() {
    return v('aside', {}, [
      v('p', {}, [
        `I don't believe in the moon,
         I think it's just the back of the sun.`
      ])
    ]);
  }
}
```

This is a simple little widget, nothing too fancy. Now let's add it to our profile widget with the registry decorator.

```ts
// src/widgets/Profile.ts
import { registry } from '@dojo/framework/widget-core/decorators/registry';
import { watch } from '@dojo/framework/widget-core/decorators/watch';

...

// the decorator allows us to use a dynamic import
// to lazy load this widget until it's needed
@registry('my-profile', () => import('./MyProfile'))
export default class Profile extends WidgetBase<ProfileProperties> {
  @watch() private _showProfile = false;

  private onButtonClick() {
    this._showProfile = true;
  }

  protected render() {
    const { username } = this.properties;
    // check if the `_showProfile` property
    // is true to determine if I should load
    // the `MyProfile` widget
    const node = this._showProfile ?
                  w('my-profile', {}) :
                  v('button', {
                    onclick: this.onButtonClick
                    }, [ 'Show Profile' ]);
    return v('h1', { classes: [css.root] }, [
      `Welcome ${username}!`,
      v('p', {} , [
        node
      ])
    ]);
  }
}
```

We can take advantage of the watch decorator to update a value of our widget to determine what our widget should look like. You can read more about the watch decorator in my [previous blog post](https://learn-dojo.com/watch-for-property-changes-in-widgets/). _That's pretty awesome right!_ Because the registry decorator lets us use a dynamic import, the Dojo build system will create a bundle for that widget that can be lazy loaded. You can even do [multiple entries](https://dojo.io/docs/index.html#doc--dojo__framework__v4_0_0__src__widget-core__README_md___registry-decorator) with the registry decorator to allow access to multiple widgets in your own widgets.

You can see a demo of how this works in the following code sandbox.

<iframe src="https://codesandbox.io/embed/k5j1wllrv" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

### Summary

The Registry is a pretty powerful tool you have at your disposal in Dojo. We've seen it used for routing, predefining a series of widgets you can use throughout your application, lazy-loading, and with [containers and injectors](https://dojo.io/docs/index.html#doc--dojo__framework__v4_0_0__src__widget-core__README_md___containers--injectors). Once you get your feet wet with it, you'll be swimming Registry goodness to help you build awesome applications!

