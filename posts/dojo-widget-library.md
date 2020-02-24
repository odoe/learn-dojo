---
title: Building a Dojo Widget Library
date: 2020-03-03
author: Rene Rubalcava
description: Learn how Dojo provides a robust experience for building and deploying reusable widget libraries!
tags: javascript, dojo, webdev, dojo7
cover_image: /assets/blog/image.jpg
published: false
---

Reusability can be a key factor in any developer's toolbox. When you write some code, widgets or utilities, if you can reuse them across multiple projects, you are not only saving yourself some time, but quite possibly some headaches. This is essentially how must JavaScript libraries start out.

## Scaffold a widget library

The ability to create widget libraries in Dojo is not entirely new, but with the latest version 7 release, it has become easier to architect using [`@dojo/cli-create-widget`](https://github.com/dojo/cli-create-widget). This will simplify the steps for you to scaffold a project with the specific purpose of distributing a widget library.

Similar to how you might scaffold an application, you can scaffold a widget library. Here is a [link](https://github.com/odoe/odoe-dojo-comps) to the sample widget library for this post.

`dojo create widget --name my-dojo-widgets`

This will scaffold a project similar to this.

```
src/
├── button/
│   ├── Button.spec.tsx
│   └── Button.tsx
│   └── README.md
├── examples/
│   ├── button/
│   └── config.tsx
│   └── README.md
│   └── tests.tsx
└── theme/
│   └── default/
│   └── custom-widgets/
├── index.html
└── main.tsx
```

You will get a sample widget, with a theme. You will also get some markdown documentation for how to use the widget, as well as an example on how to use it.

What is really great about this scaffold project, is that it sets up the widget library with a theme. This is a particularly good practice since you or other consumers of these widgets will use them in projects where they might want to theme the widgets to match their own UI design. There’s nothing more frustrating than finding a cool component library that requires CSS magic to match the rest of your application.

## Reusable Widget

We can add a snackbar widget. A snackbar is a tooltip like component that will pop up on a page to let the user know about some action or maybe an error. They’re very useful to communicate when something happens in your application.

Our simple snackbar will have two properties. A message property and a show property that would be true or false based on whether the snackbar is visible.

```ts
import { create, tsx } from '@dojo/framework/core/vdom';
import * as css from './snackbar.m.css';

const factory = create().properties<{message: string, open: boolean}>();

export default factory(function ({ properties }) {
  const { message, open } = properties();
  const currClass = [css.root];

  if (open) {
    currClass.push(css.show);
  }

  return (
    <div classes={currClass} key={message}>{ message }</div>
  );
});
```

## Theme

When it comes to building a theme for your widget, you will want to provide a default theme and possibly an overall theme for your library. It’s not required, but at the least, you should provide the default theme.

## Put it all together

The next step is to update the .dojorc so the build tools know what widgets to build into the library.

```json
{
  "extends": "./node_modules/@dojo/parade/parade.json",
    "build-widget": {
      "widgets": [
        "src/button/Button"
        "src/snackbar/Snackbar"
      ]
    }
}
```

Now, you can build the widget library and the product will be a folder that you can then distribute among your projects or publish as a package. If you testing the library locally, you can run npm link in the build directory to use it in another project. We’ll talk about that extends part in a bit.

Scaffold an application using dojo create app, and you can now run npm link my-dojo-widgets in to use your widget library in your project to make sure everything works as expected with the build output.

## A Parade of Documentation

At this point, we’ve managed to build a widget library and consume it in another application. This is already some great progress. Now comes the part that most developers might be too crazy about… the documentation. *Unless*, we can make documentation fun!

This is where Dojo Parade plays a pivotal role. Dojo Parade tool for building documentation to showcase your widgets. The cli-build-widget command will automatically set up some information to get you started with Dojo Parade. You can configure it in the src/examples/config.tsx file.

```ts
import myFirstWidgetLib from '../theme/my-first-widget-lib';
import ButtonExample from './button/ButtonExample';
`!has('docs')`;
import testsContext from './tests';
const tests = typeof testsContext !== 'undefined' ? testsContext : { keys: () => [] };

export const config = {
  name: '@dojo/widgets',
  home: 'src/examples/README.md',
  themes: [
    { label: 'my-first-widget-lib', theme: myFirstWidgetLib },
    { label: 'default', theme: {} }
  ],
  tests,
  readmePath: (widget: string) => `src/${widget}/README.md`,
  widgetPath: (widget: string, filename: string) => `src/${widget}/${filename || 'index'}.tsx`,
  examplePath: (widget: string, filename: string) =>
    `src/examples/src/widgets/${widget}/${filename || 'index'}.tsx`,
  codesandboxPath: () => '',
  widgets: {
    button: {
      filename: 'Button',
      overview: {
        example: {
          filename: 'ButtonExample',
          module: ButtonExample
        }
      }
    }
  }
};

export default config;
```

Dojo Parade takes advantage of Dojo build time rendering to build interactive documentation of your widgets. It’s a great way to showcase and share your widgets with other users. You can then distribute this output to your own documentation site.

Dojo Parade can be configured with a few options. You can define the path to the README documentation of your widget. There’s an option to view the widgets with different provided themes and the path the examples of your widgets.

<iframe src="https://odoe-dojo-comps.surge.sh/" width="100%" height="400" title="Documentation"></iframe>

There’s even an option to add a link to a CodeSandbox if you prepared a sample there.

Last, but not least, you could even run the unit tests in the documentation to verify the widgets are still valid! What better way to showcase your library than to showcase passing tests!

## Summary

The evolution of Dojo continues to bring a wide breadth of developer tooling. Not just in being able to quickly scaffold applications, but widget libraries and web components, static site generation, and now also built in documentation tools.

Building a themable and shareable widget library is a pragmatic choice for you to build a package you can use across multiple projects. Things are getting exciting with Dojo and it’s only going to get better!
