---
title: Using Middleware with Dojo Processes
date: 2019-07-14
author: Rene Rubalcava
description: How you can inject yourself into the Dojo process, juggle your data, and manage state updates
tags: javascript, web development, dojo, dojo5
cover_image: /assets/blog/dojo-process-middleware.jpg
---

We previously looked at how you can manage state in Dojo with [processes and stores](https://learn-dojo.com/maintain-state-with-dojo-stores). This isn't only a flexible way you can manage state in your applications, but it provides some hooks for you to be able to stick your nose into your applications business.

Maybe you want to manage some state in your application when you begin to fetch data and when you have completed fetching data. You could try to manage this in the widget itself or maybe in the process. This is kind of tricky though. Each process can update the store, and you could even run multiple processes at the same time, but it's treated as a single transaction. So you can't really start a process, change the `loading` state and change it back when you're done in a way that would update your widget in that single transaction.

```ts
// src/processes/starwarsProcesses.ts
const fetchItems = commandFactory<Item>(async ({ path }) => {
  // where do we change the starting state?
  const response = await fetch("https://swapi.co/api/");
  const json = await response.json();
  const items: Item[] = Object.keys(json).map(key => {
    return {
      label: key,
      value: json[key]
    };
  });
  // this workflow doesn't work, the widget never gets the 'true' state
  // this is a single transaction
  return [
    replace(path("loading"), true),
    replace(path("items"), items),
    replace(path("loading"), false)
  ];
});
```

## Middleware

But fear not! Dojo has a way for you to run some middleware on your processes to do all sorts of cool things! There is some more detailed information [here](https://github.com/dojo/framework/tree/master/src/stores#middleware).

What kind of tasks can you do with middleware?

* Transform the fetched result of your process.
* Validate arguments passed to your process.
* Define a loading state.
* Add logging and telemetry.
* Runtime caching.

And I'm sure you can think of many more uses!

The middleware API allows you to provide `after` and `before` methods. So in my use case above, We can update the `loading` state of the process before and after it begins.

![](/assets/images/dojo-process-middleware/middleware-flow.png)

To update some loading state, that could look like this!

```ts
// src/processes/starWarsProcess.ts
const progress: ProcessCallback = () => ({
  before(payload, { apply, path }) {
    // update the app store before the process is run
    apply([replace(path("loading"), true)], true);
  },
  after(error, { apply, path }) {
    // update the app store when process is finished
    apply([replace(path("loading"), false)], true);
  }
});
```

In the middleware methods, we're given an `apply` and a `path`. The `apply` lets us _apply_ an operation to the store, and the `path` lets us pick the property that we want to act on. In this case, we can use the `replace` operation to _update_ an existing property. This state update will propagate to any other parts of the application that are using this store.

Now we can update the process to use this middleware!

```ts
// src/processes/starWarsProcess.ts
export const fetchItemsProcess = createProcess(
  "fetch-items", // process name
  [fetchItems],  // command
  [progress]     // middleware
);
```

With the middleware in place, we can update the widget so that it can recognize when data is being fetched.

```tsx
// src/widgets/APIExplorer.tsx
export class APIExplorer extends WidgetBase<ExplorerProperties> {
  ...
  render() {
    return (
      ...
      <TextArea
       rows={25}
       theme={theme}
       value={loading ? "Loading..." : result}
      />
      ...
    );
  }
  ...
}
```

Now in the widget, if the store `loading` state is true, we can show some loading text, if it's not loading, we can show the result!

You can see what this looks like in this [code sandbox](https://codesandbox.io/embed/dojo-stores-middleware-ho8kn?fontsize=14&module=%2Fsrc%2Fprocesses%2FstarwarsProcesses.ts)!

## Summary

The ability to have the after/before middleware in our application state is not only practical, but incredibly flexible. We've just scratched the surface of what you can do with Dojo middleware, but I'm excited about the possibilities and I'm sure you are too!
