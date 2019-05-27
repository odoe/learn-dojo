---
title: Dojo from the Blocks
date: 2019-04-24
author: Rene Rubalcava
description: How to use Dojo blocks during build time rendering
tags: javascript, dojo, webdev, frameworks
cover_image: /assets/blog/dojo-from-the-blocks.jpg
---

One of the low-key features that was released in [Dojo 5](https://dojo.io/blog/2019/01/29/2019-01-29-Version-5-Dojo/) was the introduction of Blocks. Blocks go hand-in-hand with [Dojo build time rendering](https://learn-dojo.com/build-time-rendering-in-dojo/).

What Blocks allow you to do is run some arbitrary code in a node environment during the build process.

[Build time rendering](https://dev.to/odoenet/build-time-rendering-in-dojo-i6e) is a great tool you can use to generate static content without having to worry about any server side component to generate pages as requested.

For example, you could use Blocks to preprocess images that you might want loaded into your page, or maybe a more common use case of converting markdown to use for you blog or site. Blocks give you the flexibility to run code you might normally run in the server environment during your build process.

## Building a block

Maybe I want to build my blog on top of Dojo, and I want to just write my articles in markdown. I can use a library like [showdown](https://github.com/showdownjs/showdown) to parse my markdown files to HTML. Here is a very basic module that can do this.

```ts
// src/blocks/markdown.block.ts
import * as fs from 'fs';
import { resolve } from 'path';

import { Converter } from 'showdown';

const mdConverter = new Converter();

export default function (path: string) {
  path = resolve(__dirname, path);
  const file = fs.readFileSync(path, 'utf8');
  // convert Markdown to HTML
  const html = mdConverter.makeHtml(file);
  return html
};
```

Blocks are types of [metas](https://github.com/dojo/framework/tree/master/src/widget-core#meta-configuration) you can use in your widgets. I can use my block by calling the meta, and running it with with the needed arguments, like the path to the markdown file I want to parse.

```ts
import WidgetBase from "@dojo/framework/widget-core/WidgetBase";
import { dom } from "@dojo/framework/widget-core/d";
import Block from "@dojo/framework/widget-core/meta/Block";
import { tsx } from "@dojo/framework/widget-core/tsx";

import fromMarkdown from "../blocks/markdown.block";

import * as css from "./styles/About.m.css";

export default class About extends WidgetBase {
  protected render() {
    const node = document.createElement("div");
    // Use my block
    const message = this.meta(Block).run(fromMarkdown)(
      "../../markdown/post2.md"
    );
    node.innerHTML = message;
    // Create a vnode to inject my HTML
    const vnode = dom({ node });
    return (
      <div>
        <h1 classes={css.root}>About Page</h1>
        {vnode}
      </div>
    );
  }
}
```

I can now naively inject my parsed markdown as HTML into my page. Ideally, I would like to convert that HTML into real virtual dom nodes, but I haven't gotten that far yet.

You can quickly see how useful this would be during build time to process files, maybe pull in some external files and use them in an app.

## Image processing

In my app, I might have some images that I want to convert to base64 strings so I can embed them. I can use a tool like [sharp](https://github.com/lovell/sharp) to resize my images. When I do, I can go ahead create the virtual dom nodes and return them in my block.

```ts
// src/blocks/imagebase64.block.ts
import { resolve } from 'path';
import { v } from '@dojo/framework/widget-core/d';
import * as sharp from 'sharp';

export default async function (path: string) {
  path = resolve(__dirname, path);
  // resize my images
  const images = [
    await sharp(path).resize(200).toBuffer(),
    await sharp(path).resize(300).toBuffer(),
    await sharp(path).resize(400).toBuffer(),
    await sharp(path).resize(500).toBuffer()
  ];

  return images.map((a) =>
    v('img', { src: `data:image/jpeg;base64, ${a.toString('base64')}`, alt: 'my dog sally' })
  );
};
```

You might notice, that I'm able to run asynchronous tasks inside my block. This allows me to do some more interesting things like image processing, fetching data, or maybe run some sort of analysis on a dataset to create formatted json that can be used by a charting library! I'm just throwing out some ideas here!

## Summary

You can view the source code for this sample [here](https://github.com/odoe/learning-dojo-blocks), and you can view a live demo [here](https://learning-dojo-blocks.surge.sh).

Dojo Blocks are really interesting, and I think they provide a whole new level of functionality for developers taking advantage of build time rendering with Dojo. I don't see a reason not to use build time rendering, and Blocks offer you a whole new opportunity to get crazy about it. I'm currently looking at a rewrite of my blog with Dojo using them!

