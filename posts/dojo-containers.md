---
title: Dojo Containers
date: 2018-10-15
author: Rene Rubalcava
description: Learn to use Dojo containers to manage state in your apps!
tags: javascript, dojo, webdev
---

Once you start building applications that begin to compose multiple widgets and you are trying to manage state across those widgets, you might want to start looking at [Dojo Containers](https://github.com/dojo/framework/blob/master/src/widget-core/README.md#containers--injectors). Containers allow you to inject values into widget properties, without having to import state directly into your widget.

To do this, Dojo provides a higher order component, similar to what you might use with [React](https://reactjs.org/docs/higher-order-components.html). That HOC is located in the `@dojo/framework/widget-core/Container`.

Let's say that you wanted to work with a streaming API and update your widget when the stream returns new data. We want to display this data in a simple list.

```ts
// src/widgets/Items.ts
export class Items extends WidgetBase<ItemsProperties> {
  protected render() {
    const { items } = this.properties;
    return v(
      "ul",
      { classes: css.root },
      items.map((x, idx) =>
        v("li", { innerHTML: x.name, key: `${x.name}-${idx}` })
      )
    );
  }
}
```

This widget has an `items` array in the properties. You could bind this widget directly a data store and update the widget when new data comes in, but again, maybe we want that data available in the parent widget, or other widgets in use.

Let's create a parent Application container that will render this widget.

```ts
// src/containers/AppContainer.ts
class AppContainer extends WidgetBase<ItemsProperties> {
  protected render() {
    return v("div", {}, [w(Items, { items: this.properties.items })]);
  }
}
```

This particular container is not doing much other than passing its properties to the child Items widget.

To use the Dojo Container, we need to create a `getProperties` function that defines the properties returned to the Container.

```ts
// src/containers/AppContainer.ts
function getProperties(inject: Context, properties: any) {
  const { items } = inject;
  return { items };
}
```

Now we can wrap our `AppContainer` in the Dojo Container.

```ts
// src/containers/AppContainer.ts
export default Container(AppContainer, "state", { getProperties });
```

In this case `"state"` is the name I'm providing for my context, which I refer to as my injector since it allows me to inject values into my widgets.

At this point, you have an option for how to manage your state. You can use [Dojo stores](https://github.com/dojo/framework/tree/master/src/stores) or you can create a class that accepts an `invalidator` and you can use this `invalidator` to let the higher order component know that state has changed and it will pass it to the widget that it has wrapped.

For now, let's go with a class that takes an invalidator and call it a context for our container. We can cover Dojo stores in another post.

```ts
// src/context.ts
export default class Context {
  private _items: Item[];

  private _invalidator: () => void;

  constructor(invalidator: () => {}, items: Item[] = []) {
    this._items = items;
    this._invalidator = invalidator;
    // subscribe to updates from our stream
    stream.subscribe((a: Item) => {
      this._addItem(a);
    });
  }

  get items(): Item[] {
    return this._items;
  }

  private _addItem(item: Item) {
    this._items = [...this._items, item];
    // call the invalidator to update wrapped container
    this._invalidator();
  }
}
```

It's in this `Context` that I am subscribing to my data stream and updating the `items` array when new data is streamed in.

Ok, let's tie it all together in our `main.ts` that kick starts the whole application.

```ts
// src/main.ts
const registry = new Registry();
// the `defineInjector` will provider the invalidator
registry.defineInjector("state", (invalidator: () => any) => {
  // create a new context and return it
  const context = new Context(invalidator);
  return () => context;
});

const Projector = ProjectorMixin(AppContainer);
const projector = new Projector();
// pass the registry to the projector
projector.setProperties({ registry });

projector.append();
```

When the Registry is passed to the projector, it will make sure everything is wired up as needed.

This may seem like a few steps, but it makes state management very flexible in your widgets without having to bind widgets to a data source, which makes them incredibly reusable.

You could create containers for each individual widget in your application and manage their state independently, this would be very powerful!

You can see a sample of this application above on [CodeSandbox](https://codesandbox.io/embed/j31zl4mwvy).

!(https://codesandbox.io/embed/j31zl4mwvy)

Be sure to [subscribe to the newsletter](https://learn-dojo.com/sign-up/) and stay up to date with the latest content!
