---
title: Building a simple app in Dojo
date: 2019-04-08
author: Rene Rubalcava
description: How to build a basic app in Dojo, but not hello world!
tags: javascript, typescript, dojo, webdev
cover_image: /assets/blog/building-a-simple-app-in-dojo.jpg
published: true
---

I've been thinking about how I could demonstrate building a basic Dojo application beyond a hello world app or a Todo app. There are some really good samples in the [dojo/examples](https://github.com/dojo/examples) repo. Then I came across [this react application](https://github.com/ahfarmer/emoji-search) for searching for emojis and who doesn't have to search for emojis regularly, so I knew I found my demo. It also helps that the dojo template on [Code Sandbox](https://codesandbox.io/) now uses TSX/JSX as the default.

Because the dojo template app uses JSX by default, it made this sample almost a complete one to one of the react sample. I won't go into detail of this application line by line, but I do want to cover some core concepts it shows.

### Get Meta

Meta in Dojo is _meta information_ about your widget. Pretty meta right?

When you build Dojo widgets, you never touch the output HTML of your application. There is no widget method to get a reference to the DOM. This prevents you from inadvertently changing a DOM element that is referenced by Dojos virtual DOM engine, which would be bad. So don't get too crazy here. But there are valid reasons for wanting to access a DOM node in your application. In the case of my emoji application, I am using a small library called [clipboardjs](https://clipboardjs.com/) to let me copy emojis to my clipboard from my application. This library requires I pass a DOM node it will use to copy data to the clipboard.

You can get this information in Dojo is via a [meta](https://dojo.io/docs/index.html#doc--dojo__framework__v5_0_1__src__widget-core__README_md___meta-configuration). Dojo provides some metas out of the box for you, like [Dimensions](https://dojo.io/docs/index.html#doc--dojo__framework__v5_0_1__src__widget-core__README_md___dimensions), [Animations](https://dojo.io/docs/index.html#doc--dojo__framework__v5_0_1__src__widget-core__README_md___animations), [Intersection](https://dojo.io/docs/index.html#doc--dojo__framework__v5_0_1__src__widget-core__README_md___intersection), and more. You can implement your own custom meta to access DOM nodes using `@dojo/framework/widget-core/meta/Base`.

```tsx
// src/widgets/ElementMeta.ts
import { Base as MetaBase } from "@dojo/framework/widget-core/meta/Base";

class ElementMeta extends MetaBase {
  get(key: string): Element {
    const node = this.getNode(key);
    return node as Element;
  }
}

export default ElementMeta;
```

The meta implements a `get()` method that will get the DOM node via a given key and return that DOM node. Now in my application, where I use clipboardjs, I can use my meta in combination with the `this.meta()` method of the Widget to get a referenced DOM node.

```tsx
// src/widgets/EmojiResultsRow.tsx
import { tsx } from "@dojo/framework/widget-core/tsx";
import { WidgetBase } from "@dojo/framework/widget-core/WidgetBase";

import * as css from "./styles/EmojiResultsRow.m.css";

import ElementMeta from "./ElementMeta";
import * as Clipboard from "clipboard";

export interface EmojiResultsRowProperties {
  title: string;
  symbol: string;
}

export class EmojiResultsRow extends WidgetBase<EmojiResultsRowProperties> {
  clipboard: Clipboard = null;

  onAttach() {
    // use my meta to get a DOM node
    const element = this.meta(ElementMeta).get(this.properties.title);
    this.clipboard = new Clipboard(element);
  }
  onDetach() {
    this.clipboard.destroy();
  }

  protected render() {
    const { title, symbol } = this.properties;
    const codePointHex = symbol.codePointAt(0).toString(16);
    const src = `//cdn.jsdelivr.net/emojione/assets/png/${codePointHex}.png`;
    // provide a `key` property to my widget element to
    // reference with my meta
    return (
      <div
        key={title}
        classes={[css.root, "copy-to-clipboard"]}
        data-clipboard-text={symbol}
      >
        <img alt={title} src={src} />
        <span classes={[css.title]}>{title}</span>
        <span classes={[css.info]}>Click to copy emoji</span>
      </div>
    );
  }
}

export default EmojiResultsRow;
```

Now I am able to use my custom meta to get a DOM node created by my widget. This makes access to output DOM nodes flexible, but also protects me from shooting myself in the foot unintentionally. If I break my DOM, it is totally my fault now.

### Core Widgets

Dojo provides a suite of [widgets](https://github.com/dojo/widgets/) you can use for your own applications. This includes items like [TimePicker](https://github.com/dojo/widgets/blob/master/src/time-picker/README.md), [Select](https://github.com/dojo/widgets/blob/master/src/select/README.md) and [layout widgets](https://github.com/dojo/widgets/#layout-widgets). For my application, I'm interested in having an input that I can use for search. Every time I update the input element, I want to filter the list of emojis shown in my application. So I'm going to wrap a [TextInput](https://github.com/dojo/widgets/blob/master/src/text-input/README.md) widget so I can manage some local state and pass the value of the input to a filter method.

```tsx
// src/widgets/SearchInput.tsx
...
export class SearchInput extends WidgetBase<SearchInputProperties> {
  @watch() private searchValue = "";

  private onChange(value) {
    if (!value) {
      return;
    }
    this.searchValue = value;
    const { handleChange } = this.properties;
    handleChange(value);
  }

  protected render() {
    return (
      <div classes={[css.root]}>
        <div>
          <TextInput
            placeholder="Search for emoji"
            value={this.searchValue}
            onInput={this.onChange}
          />
        </div>
      </div>
    );
  }
}
```

Yes, I could have used a regular `<input type="text" />` here, but the TextInput is very convenient as it already has an `onInput` method I can use that passes the value of the input directly, and not an event I would need to do `event.target.value` which, because I am lazy, I can really appreciate. Then I would need to use a `keyup` event, and maybe do some handling for different keys to on whether I want to get my value and why hassle with all that when Dojo provides a nice way to do it already.

I am also taking advantage of the [`@watch`](https://dojo.io/docs/index.html#doc--dojo__framework__v5_0_1__src__widget-core__README_md___internal-widget-state) decorator to manage local state in my widget. I talked about this method in more detail [here](https://learn-dojo.com/watch-for-property-changes-in-widgets/). This makes it very simple to manage the value of my input at all times.

You can see the full application in action [here](https://codesandbox.io/embed/9lpj1zmyw).

You can see that building applications in Dojo provides some safety and flexibility for you to piece together everything you need to build solid, and awesome applications. Dojo isn't just a toolkit anymore, it's a full blown framework and has a lot to offer!
