---
title: Maintain State with Dojo Stores
date: 2019-04-18
author: Rene Rubalcava
description: How to use Dojo Stores to maintain state across your applications.
tags: javascript, dojo, typescript, webdev
cover_image: /assets/blog/maintain-state-with-dojo-stores.jpg
---

We previously looked at how you could maintain state with [Dojo containers](https://learn-dojo.com/dojo-containers/) using a context for your application. To recap, containers are basically higher order components that you can use to add state management to widgets.

Using a context with containers makes the process fairly simple, however if you want to wire up multiple containers and routes with shared state, you might want to start looking at using [Dojo Stores](https://github.com/dojo/framework/tree/master/src/stores).

Dojo Stores work by using [Processes](https://github.com/dojo/framework/tree/master/src/stores#processes) to execute [Commands](https://github.com/dojo/framework/tree/master/src/stores#commands) with varying [Operations](https://github.com/dojo/framework/tree/master/src/stores#operations) against your state. You don't need to define your operations, Dojo provides them for you. These operations are based on the [JSON Patch format](http://jsonpatch.com/). They currently support add, remove, replace, and test. If you're not familiar with these operations or they look intimidating, don't worry, they are much simpler than they may seem at first.

In order to try and grasp how everything works, let's create a small application that explores the [Star Wars API](https://swapi.co/).

## API Explorer Widget

First thing we'll do is create a widget that can explore the API. I'll use a [Listbox](https://github.com/dojo/widgets/tree/master/src/listbox) to display the endpoints of the API and a [TextArea](https://github.com/dojo/widgets/tree/master/src/text-area) to display the raw JSON results of the selected endpoint.

```tsx
// src/widgets/APIExplorer.tsx
import { tsx } from "@dojo/framework/widget-core/tsx";
import { WidgetBase } from "@dojo/framework/widget-core/WidgetBase";
import { watch } from "@dojo/framework/widget-core/decorators/watch";
import Listbox from "@dojo/widgets/listbox";
import TextArea from "@dojo/widgets/text-area";
import theme from "@dojo/themes/dojo";
import * as css from "./styles/APIExplorer.m.css";

import { ExplorerProperties, Item } from "../interfaces";

export class APIExplorer extends WidgetBase<ExplorerProperties> {
  @watch() index = 0;
  @watch() label = "";

  onAttach() {
    this.properties.fetchAllResults();
  }
  protected render() {
    return (
      <div classes={css.root}>
        <Listbox
          theme={theme}
          key="listbox1"
          activeIndex={this.index}
          widgetId="listbox1"
          optionData={this.properties.items}
          getOptionLabel={(option: Item) => option.label}
          getOptionSelected={(option: Item) => option.label === this.label}
          onActiveIndexChange={(index: number) => {
            this.index = index;
          }}
          onOptionSelect={(option: Item, index: number) => {
            this.label = option.label;
            this.properties.fetchData(option);
          }}
        />
        <TextArea rows={15} theme={theme} value={this.properties.result} />
      </div>
    );
  }
}

// src/interfaces.ts
export interface ExplorerProperties {
  items: Item[];
  result: string;
  fetchAllResults: () => void;
  fetchData: (item: Item) => void;
}
```

This widget has some local state to manage the selected value of the Listbox, but other than that, it relies on the properties passed to it in order to display anything useful. I'll be using a container to pass those properties to this widget. But first, how would I make my queries and actually update my application state in the first place?

## Processes

Processes are used to execute commands against your application store. It's in the processes that you are going to be doing most of the heavy lifting for your application. This is where you can do queries, transformations, filtering, validation, and so on. There are factory functions in Dojo to help you create your commands.

```ts
// src/processes/starwarsProcesses.ts
import {
  createProcess,
  createCommandFactory
} from "@dojo/framework/stores/process";
import { replace } from "@dojo/framework/stores/state/operations";

import { State, Item } from "../interfaces";

// commandFactory typed to my application state
const commandFactory = createCommandFactory<State>();
```

In this application, I'm going to use the **replace** operation to make my state updates. If I were adding items to an array in my commands, I could do some interesting things using the **at** helper and **add** operation to insert new items into an array _at_ specific indices.

Let me create a command that will fetch all the available endpoints of the Star Wars API.

```ts
// src/processes/starwarsProcesses.ts
const fetchItems = commandFactory<Item>(async ({ path }) => {
  const response = await fetch("https://swapi.co/api/");
  const json = await response.json();
  const items: Item[] = Object.keys(json).map(key => {
    return {
      label: key,
      value: json[key]
    };
  });
  return [replace(path("items"), items)];
});
```

I use my command factory to create a function that will make my query and then returns an array of operations. Why any array? Because I may want a single command do multiple state updates. In this case I use **[replace(path("items"), items)]**. This may look odd at first, but the path method is a way to designate a property path in my state. If I want to use the value from my state I could use a _get_ helper and write **get(path("items"))**, which would return the items array.

I was unsure how I felt about this method of accessing state at first, but it lends itself very well to a functional and reactive method of interacting with state that has really grown on me. This behavior is very much like working with [lenses](https://medium.com/javascript-scene/lenses-b85976cb0534).

Now, I'll create a command to fetch the results of one of the selected endpoints.

```ts
// src/processes/starwarsProcesses.ts
const fetchResult = commandFactory<Item>(async ({ path, payload }) => {
  const response = await fetch(payload.value);
  const result = await response.json();
  return [replace(path("result"), JSON.stringify(result, undefined, 2))];
});
```

Very similar to the previous command I am going to fetch the results of an endpoint, but that endpoint URL is coming from a **payload** object that was passed to my command. I've typed this payload to have a **value** property, but it will be any argument that has been passed to the process that will execute this command. We'll see how that is done in a moment, but first we need to create a couple of processes that will be used to execute these commands.

```ts
// src/processes/starwarsProcesses.ts
export const fetchItemsProcess = createProcess("fetch-items", [fetchItems]);
export const fetchResultProcess = createProcess("fetch-result", [fetchResult]);
```

We create two processes to do two distinct operations on my state. What I find interesting here is that I can have a single process execute multiple commands that could in turn perform multiple operations against my state. I haven't done this yet, but I find the fact that _I could_ to be awesome!

## Container

Let's wrap our widget in a container that will use our processes to wire up properties and methods.

```ts
// src/containers/APIExplorerContainer.ts
import { Store } from "@dojo/framework/stores/Store";
import { StoreContainer } from "@dojo/framework/stores/StoreInjector";
import { APIExplorer } from "../widgets/APIExplorer";

import { State } from "../interfaces";

import {
  fetchItemsProcess,
  fetchResultProcess
} from "../processes/starwarsProcesses";

function getProperties(store: Store<State>): any {
  const { get, path } = store;

  return {
    items: get(path("items")),
    result: get(path("result")),
    fetchAllResults: fetchItemsProcess(store),
    fetchData: fetchResultProcess(store)
  };
}
// Use a StoreContainer
export const APIExplorerContainer = StoreContainer(
  APIExplorer,
  "state",
  { getProperties }
);
```

We are using a specific container called a **StoreContainer** that will inject our store in to our **getProperties** method. This method is how you can pass properties to your wrapped widget from the container.

You can see here that the store has helper methods, **get** and **path**, that I mentioned before to access the values of properties on the store. I can now pass processes that will execute commands against the store as methods that my widget is expecting as part of its properties.

Once this is done, I need to register my store with my application and inject it.

```tsx
// src/main.tsx
const store = new Store();
const registry = registerStoreInjector(store);

class App extends WidgetBase {
  protected render() {
    return <APIExplorerContainer />;
  }
}

const r = renderer(() => <App />);
r.mount({ registry });
```

I use a helper called **registerStoreInjector** and then inject that store into a named state that I used in my container.

[Code Sandbox](https://codesandbox.io/s/7m9q47yvj?fontsize=14&module=%2Fsrc%2Fprocesses%2FstarwarsProcesses.ts)


## Summary

There is a lot happening here, but what it boils down to is the following steps.

*   Create processes to execute commands against a Store
*   Wrap widget in a container to pass processes and store properties
*   Inject store into application

Any subsequent updates the store will be passed down to the widget. There is even more you could do with your store. I could have wrapped my widget in a [StoreProvider](https://github.com/dojo/framework/tree/master/src/stores#advanced) and passed store properties down, and manually [subscribe to store changes](https://github.com/dojo/framework/tree/master/src/stores#subscribing-to-store-changes). Subscribing to store changes could be a very useful tool inside your applications for some granular control of managing widget visibility for example.

Processes even provide the ability to add [middleware](https://github.com/dojo/framework/tree/master/src/stores#middleware) so you can add logging and authentication, or maybe payload validation without having to pollute your processes with extra code and possibly extra sources of errors.

At the end of the day, I have had a fun time learning how to use processes and stores in my applications. They provide a lot of flexibility in managing state and I can already see how useful they would be in building out an application as it grows!