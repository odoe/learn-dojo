---
title: Migrating learn-dojo to Dojo 6
date: 2019-08-16
author: Rene Rubalcava
description: Provide a good SEO subscription
tags: javascript, dojo, webdev,  dojo6
cover_image: /assets/blog/image.jpg
published: false
---

The latest release of Dojo 6 brings with it some major updates to how you can build apps with Dojo. Some files have moved, but I think one of the biggest new features available to developers is the use of functional widgets. This doesn't mean you can't continue to use class based widgets, but there are some nice advantages to using functional widgets.

In case you didn't know, [learn-dojo](https://learn-dojo.com) is a static site, [built with Dojo](https://learn-dojo.com/building-static-site-with-dojo). So as Dojo 6 development was ongoing, I was already looking at what I would need to do to migrate the site to the latest Dojo.

## Updates to Widgets

Let's take a look at a basic [Header](https://github.com/odoe/learn-dojo/blob/df41818497429706e235c7b39437abb5ed4ee3b5/src/widgets/header/Header.tsx) widget, that accepts properties to display the title and and links to the main page.

```tsx
// src/widgets/header/Header.tsx
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';
import Link from '@dojo/framework/routing/Link';

import * as css from './Header.m.css';

export default class Header extends WidgetBase<{ title: string }> {
	protected render() {
		const { title } = this.properties || 'My Site';
		return (
			<header classes={[css.root]}>
				<div classes={[css.title]}>
					<Link to="/" isOutlet={false} classes={[css.link]}>
						{title}
					</Link>
				</div>
			</header>
		);
	}
}
```

This widget takes an object with a `title` that is a `string` as it's property. This isn't a complicated widget, Now, when we convert it to a functional widget, not much is going to change in terms of what is being rendered, but there are some slight differences.

```tsx
// converted to Dojo 6
// src/widgets/header/Header.tsx
import { tsx, create } from '@dojo/framework/core/vdom';

import Link from '@dojo/framework/routing/Link';

import * as css from './Header.m.css';

const factory = create().properties<{ title: string }>();

export default factory(({ properties }) => {
  const { title } = properties() || 'My Site';
  return (
    <header classes={[css.root]}>
      <div classes={[css.title]}>
        <Link to="/" isOutlet={false} classes={[css.link]}>
          {title}
        </Link>
      </div>
    </header>
  );
});
```

First of all, the folder `widget-core` ha been renamed to `core` in `@dojo/framework`. This is just a organizational change to Dojo. But the other new one is the use of this `create` module. The `create` module that lets you create a factory method for your render function.

To create a basic factory render function you could just do something like this.

```tsx
// return a render factory
const factory = create();

export factory(function MyBasicWidget() {
  return <h2>Everything is awesome!</h2>;
});
```

But the `Header` widget requires some properties, so we can tell the render factory that properties are expected and we can type them.

```ts
const factory = create().properties<{ title: string }>();
```

Now in the factory method, it will be pass a `properties()` method that will provide the passed properties to the widget.

```tsx
export default factory(({ properties }) => {
  const { title } = properties() || 'My Site';
  ...
});
```

Why is `properties` a function and not just an object? This has to do with some other features of functional widgets that allow middleware to be used. This ensures that you don't get stale values from the passed properties. 

> _We'll cover the new middleware capabilities in more detail in in a future blog post_.

The rest of this widget looks like the previous version returning JSX vdom.

It is normally recommended that you provide _named_ render methods to the render factory as it will help you track down errors in debugging, but it isn't required. _Sometimes you just need to live on the edge_.

## Basic Middleware

One of the stand out features of Dojo is the use of [blocks](https://learn-dojo.com/dojo-from-the-blocks) that let you run code in node when you use build time rendering. It's critical in how learn-dojo is built because blocks are used to parse the posts from markdown, and run various tooling for code blocks, and formatting. In class based widgets, this is done via the use metas.

Here is how a blog page is rendered with a class based widget.

```tsx
// src/pages/Blog.tsx
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import Block from '@dojo/framework/widget-core/meta/Block';
import { tsx } from '@dojo/framework/widget-core/tsx';

import compileBlogIndex from '../blocks/compile-blog-index.block';

import Post from '../templates/blog-post/BlogPost';

import * as css from './Blog.m.css';

export default class Blog extends WidgetBase<{
  standalone?: boolean;
  path?: string;
}> {
  protected render() {
    const { standalone = false, path } = this.properties;
    // run the block as a meta
    const blogs: any = this.meta(Block).run(compileBlogIndex)({});
    // render blog excerpts or single blog post
    return (
      <div classes={[css.root]}>
        {!standalone
          ? blogs &&
            blogs.map((blog: any) => [
              <Post key={blog.file} path={blog.file} excerpt />,
              <hr key={blog.file} />
            ])
          : undefined}
        {path && path.length && <Post key={path} path={path} />}
      </div>
    );
  }
}
```

Let's dive right into how this looks as a functional widget in Dojo 6.

```tsx
// converted to Dojo 6
// src/pages/Blog.tsx
import { tsx, create } from '@dojo/framework/core/vdom';
import block from '@dojo/framework/core/middleware/block';

import compileBlogIndex from '../blocks/compile-blog-index.block';

import Post from '../templates/blog-post/BlogPost';

import * as css from './Blog.m.css';

const factory = create({ block }).properties<{ standalone?: boolean; path?: string }>();

export default factory(({ middleware: { block }, properties }) => {
  const { standalone = false, path } = properties();
  const blogs: any = block(compileBlogIndex)({});

  return (
    <div classes={[ css.root ]}>
      {!standalone ? (
        blogs &&
        blogs.map((blog: any) => [
          <Post key={blog.file} path={blog.file} excerpt />,
          <hr key={blog.file} />
        ])
      ) : (
        undefined
      )}
      {path && path.length && <Post key={path} path={path} />}
    </div>
  );
});

```

To use this in a render factory method, pass the block middleware to the `create` method so that it's available to your render factory.

> Anything you pass into the create() method will be available to your render factory methods as middlewarre.

```ts
const factory = create({ block }).properties<{ standalone?: boolean; path?: string }>();

// render factory
export default factory(({ middleware: { block }, properties }) => {...});
```

Now the `block` is available on the `middleware` property passed to the render factory method.

```ts
const blogs: any = block(compileBlogIndex)({});
```

Notice that now, you can run the middleware block independently of any `meta` helpers like in a class based method. This is one of my favorite features of the new functional widgets!

## Composable Widgets

The learn-dojo site takes advantage of the ability to create wrapper widgets that renders any children provided to it. This is used in something like the [`Layout`](https://github.com/odoe/learn-dojo/blob/df41818497429706e235c7b39437abb5ed4ee3b5/src/layouts/Layout.tsx) widget.

```tsx
// src/layouts/Layout.tsx
export default class Layout extends WidgetBase<SiteMeta> {
  protected render() {
    const { title, description, author, footerLinks } = this.properties;
    return (
      <div classes={[css.root]}>
        <Header title={title} />
        <Hero description={description} />
        {/* render the children */}
        <main classes={[css.section]}>{this.children}</main>
        <SignUp />
        <Footer {...{ author, footerLinks }} />
      </div>
    );
  }
}
```

Like the update to make `properties` a function so you always have the latest values, the same is true for `children`.

```tsx
// converted to Dojo 6
// src/layouts/Layout.tsx
const factory = create().properties<SiteMeta>();

export default factory(({ children, properties }) => {
  const { title, description, author, footerLinks } = properties();

  return (
    <div classes={[ css.root ]}>
      <Header title={title} />
      <Hero description={description} />
      {/* render the children */}
      <main classes={[ css.section ]}>{children()}</main>
      <SignUp />
      <Footer {...{ author, footerLinks }} />
    </div>
  );
});
```

That's the only change in regards to rendering children in your widgets.

## Summary

Dojo 6 is a significant release in the Dojo roadmap, offering some exciting new capabilities in build reactive widgets for your applications. There are plenty more new features not covered in this blog post that will be discussed in the future.

I was able to migrate learn-dojo in a single morning based off the Dojo 6 alpha and updated documentation. I am very impressed with the new functional widget pattern in Dojo and use of middleware that we barely scratched the surface of in this post.

Stay tuned for more!
