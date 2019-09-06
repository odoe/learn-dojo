---
title: Dojo Widget Middleware
date: 2019-09-05
author: Rene Rubalcava
description: Learn how to use middleware in Dojo function based widgets, managing local and application state, to build awesome applications!
tags: javascript, dojo, webdev, dojo6
cover_image: /assets/blog/dojo-widget-middleware.jpg
published: true
---

The newest features of [Dojo 6](https://dojo.io/blog/version-6-dojo) include the new function based widgets and widget middleware.

Dojo class based widgets come with decorators to [watch for property changes](https://learn-dojo.com/watch-for-property-changes-in-widgets) and work with [metas](https://learn-dojo.com/dojo-from-the-blocks) which allow you to get information about your widget.

With the introduction of function based widgets, those patterns have been replaced by the new [middleware](https://dojo.io/learn/middleware/introduction) system.

## Manage local state

There are two middlewares available for managing local state in a widget.

* [cache](https://dojo.io/learn/middleware/available-middleware#cache) - persists data
* [icache](https://dojo.io/learn/middleware/available-middleware#icache) - works like cache, but also invalidates the widget when data changes.

### cache

You might use `cache` for some fine grained state management, because if you do use it, it's up to you to manually invalidate the widget, so that it will render based with updated `cache` properties using the [`invalidator`](https://dojo.io/learn/middleware/core-render-middleware#invalidator) middleware.

```tsx
// src/widgets/Parrot/Parrot.tsx
import { create, invalidator, tsx } from "@dojo/framework/core/vdom";
import cache from "@dojo/framework/core/middleware/cache";

import * as css from "./Parrot.m.css";

// use `cache` and `invalidator` as middleware
// in render factory
const factory = create({ cache, invalidator });

export const Parrot = factory(function Parrot({
  middleware: { cache, invalidator }
}) {
  const name = cache.get<string>("name") || "";
  return (
    <virtual>
      <h3 classes={[css.root]}>{`Polly: ${name}`}</h3>
      <input
        classes={[css.input]}
        placeholder="Polly want a cracker?"
        type="text"
        onkeyup={event => {
          // update cache data with input value
          cache.set(
            "name",
            (event.target as HTMLInputElement).value
          );
          // invalidate widget to render
          // with new data
          invalidator();
        }}
      />
    </virtual>
  );
});

export default Parrot;
```

You can see this demo in action here.

!(https://codesandbox.io/embed/dojo-middleware-cache-3wc5n?fontsize=14&module=%2Fsrc%2Fwidgets%2FParrot%2FParrot.tsx)

This is fine, _but it could be easier_.

### icache

The `icache` is designed specifically to work like `cache`, but to also run an `invalidator()` on each update. It also comes with an extra method, `icache.getOrSet()` that will return the current value or a specified default value if none available.

```tsx
// src/widgets/Parrot/Parrot.tsx
import { create, tsx } from "@dojo/framework/core/vdom";
import icache from "@dojo/framework/core/middleware/icache";

import * as css from "./Parrot.m.css";

const factory = create({ icache });

export const Parrot = factory(function Parrot({ middleware: { icache } }) {
  // get the current name value or an empty string
  const name = icache.getOrSet("name", "");
  return (
    <virtual>
      <h3 classes={[css.root]}>{`Polly: ${name}`}</h3>
      <input
        classes={[css.input]}
        placeholder="Polly want a cracker?"
        type="text"
        onkeyup={event => {
          // when the cache is updated, it will
          // handle calling the invalidator
          icache.set(
            "name",
            (event.target as HTMLInputElement).value
          );
        }}
      />
    </virtual>
  );
});

export default Parrot;
```

This would be equivalent to the [`@watch`](https://github.com/dojo/framework/tree/master/src/core#internal-widget-state) decorator that you can use with class based widgets. I would guess that 99% of the time, you would use `icache` to manage local state in your widgets.

!(https://codesandbox.io/embed/dojo-middleware-icache-n6ktf?fontsize=14&module=%2Fsrc%2Fwidgets%2FParrot%2FParrot.tsx)

## Application Store

There are a number of ways you could work with [stores](https://dojo.io/learn/stores/introduction) in Dojo. You could use [containers](https://learn-dojo.com/dojo-containers) or a [provider](https://github.com/dojo/framework/tree/master/src/stores#advanced). _Or_, you could use a [store](https://dojo.io/learn/stores/introduction#store-middleware) middleware!

We can create a `store` middleware that will hold a list of users.

```ts
// src/middleware/store.ts
import createStoreMiddleware from "@dojo/framework/core/middleware/store";
import { User } from "../interfaces";

export default createStoreMiddleware<{ users: User[] }>();
```

Now, we need a way to retrieve a list of users. We could do that via a [process](https://github.com/dojo/framework/tree/master/src/stores#processes), which is how you can manage application behavior.

We can build a process that will fetch some user data.

```ts
// src/processes/userProcess.ts
import {
  createCommandFactory,
  createProcess
} from "@dojo/framework/stores/process";
import { replace } from "@dojo/framework/stores/state/operations";

const commandFactory = createCommandFactory();

const fetchUsersCommand = commandFactory(async ({ path }) => {
  const response = await fetch("https://reqres.in/api/users");
  const json = await response.json();
  return [replace(path("users"), json.data)];
});

export const getUsersProcess = createProcess("fetch-users", [
  fetchUsersCommand
]);
```

With a `store` and a `process` ready to go, we can use them in a widget that will display our list of users.

```tsx
// src/widgets/Users/Users.tsx
import { create, tsx } from "@dojo/framework/core/vdom";

import * as css from "./Users.m.css";

import store from "../../middleware/store";
import { fetchUsersProcess } from "../../processes/userProcesses";
import { User } from "../../interfaces";

// pass store to render factory
// as middleware
const render = create({ store });

// helper method to render list of Users
const userList = (users: User[]) =>
  users.map(user => (
    <li key={user.id} classes={[css.item]}>
      <img
        classes={[css.image]}
        alt={`${user.first_name} ${user.last_name}`}
        src={user.avatar}
      />
      <span classes={[css.title]}>
        {user.last_name}, {user.first_name}
      </span>
    </li>
  ));

export default render(function Users({ middleware: { store } }) {
  // extract helper methods from the store in widget
  const { get, path, executor } = store;
  // get current value of Users
  const users = get(path("users"));
  if (!users) {
    // if no Users, run the `executor` against
    // the process to fetch a list of Users
    executor(fetchUsersProcess)(null);
    // since the process to fetch Users does not need
    // any arguments, execute with null

    // if the network is slow, return
    // a loading message
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

The key here is that the `store` middleware has an `executor` method that can be used to execute processes directly from your widget.

```ts
executor(fetchUsersProcess)(null);
```

In this case, the `fetchUsersProcess` does not expect a payload, so we can pass `null` to it. If it needed to do pagination for example, we could pass which page we wanted as an argument and use it in our process.

You can see this demo in action here.

!(https://codesandbox.io/embed/dojo-function-based-widgets-94eyy?fontsize=14&module=%2Fsrc%2Fwidgets%2FUsers%2FUsers.tsx)

## Summary

There's more [middleware](https://dojo.io/learn/middleware/available-middleware) available that we didn't cover in this post, related to theming, i18n, DOM related, and interacting with the render method. We'll cover most of these in future blog posts!

I'm really excited about all the new features in this latest release of Dojo and working with the available middleware and even what I could do with a [custom middleware](https://dojo.io/learn/middleware/middleware-fundamentals#creating-middleware)!

