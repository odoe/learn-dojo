---
title: Dojo GraphQL
date: 2019-06-17
author: Rene Rubalcava
description: How you can integrate GraphQL into your Dojo applications with Apollo and Dojo containers
tags: javascript, dojo, webdev, graphql, dojo5
cover_image: /assets/blog/dojo-graphql.jpg
---

[GraphQL](https://graphql.org/) has grown in popularity over the past couple of years. Where GraphQL shines is in its descriptive nature of querying data.

If you want to write a query for the [Star Wars API](https://swapi.co/) to get all the film titles, it might look something like this.

```
{
  allFilms{
    edges{
      node{
        title
      }
    }
  }
}
```

The query is _JSON-like_, but it's not JSON. You can learn more about GraphQL on the [tutorials page](https://www.graphql.com/tutorials/).

[Apollo](https://github.com/apollographql/apollo-client) provides a client API you can use to work with GraphQL. It saves you some work of writing your own POST requests, so I highly recommend you learn it. Apollo provides libraries to integrate with Angular and React, but so far not one for Dojo. But that's ok, because you can use the Apollo Client to build your own GraphQL integration.

Looking at [react-apollo](https://github.com/apollographql/react-apollo), they have an `ApolloProvider` that you can use to wrap components of your application. This provides the Apollo client to components. Those components can then use a `Query` higher order component to pass the query and client and thus display the result.

_How hard can that be?_

## Trust the Process

When working with Dojo, most of your work with external APIs is probably going to be done in a [process](https://github.com/dojo/framework/tree/master/src/stores#processes). We covered this topic in detail in [this post](https://learn-dojo.com/maintain-state-with-dojo-stores).

Here is what a generic process for working with GraphQL might look like.

```ts
// src/processes/apolloProcess.ts
import {
  createProcess,
  createCommandFactory
} from "@dojo/framework/stores/process";
import { add } from "@dojo/framework/stores/state/operations";

const commandFactory = createCommandFactory<{
  client: any; // this will be the apollo client
  data: any; // this will be graphql result
  loaded: boolean; // keep track if the data has been loaded yet
}>();

const fetchData = commandFactory(async ({ path, payload }) => {
  const { client, query } = payload;
  const { data } = await client.query({ query });
  return [add(path("data"), data), add(path("loaded"), true)];
});

export const fetchDataProcess = createProcess("fetch-data", [fetchData]);
```

This process will take a given apollo client instance and a GraphQl query to fetch some results. This works pretty well because it's not tied to any particular endpoint or data structure, even though it is currently typed as `any` for client and data. I could try to work around that with some generics, but wanted to keep this example fairly simple.

## Put it in a box

We can tie this together with a widget and [Dojo container](https://dojo.io/tutorials/1010_containers_and_injecting_state/).

```tsx
// src/containers/QueryContainer.tsx
import { tsx } from "@dojo/framework/widget-core/tsx";
import { WidgetBase } from "@dojo/framework/widget-core/WidgetBase";

import { Store } from "@dojo/framework/stores/Store";
import { StoreContainer } from "@dojo/framework/stores/StoreInjector";

import { fetchDataProcess } from "../processes/apolloProcess";

// Use the ApolloClient for typing
import ApolloClient from "apollo-boost";

interface QueryProps {
  client?: ApolloClient<any>;
  query: string;
  data?: any;
  loaded?: boolean;
  fetchData?: (args: any) => void;
}

// base widget that handles displaying children that use the Query
export class BaseQuery extends WidgetBase<QueryProps, any> {
  onAttach() {
    const { client, query, loaded, fetchData } = this.properties;
    // if the data has not been loaded yet
    // and we have a query, lets get some data
    if (!loaded && query) {
      fetchData({ client, query });
    }
  }
  protected render() {
    const { loaded, data } = this.properties;
    return this.children.map(child => {
      // if the child nodes are a function,
      // call the function with data from the
      // GraphQL process
      if (typeof child === "function") {
        return child({ loading: !loaded, data });
      }
      // or just return a regular node
      return child;
    });
  }
}

function getProperties(store: Store<{ data: any; loaded: boolean }>): any {
  const { get, path } = store;

  // pass the Dojo store properties and methods to the widget
  return {
    data: get(path("data")),
    loaded: get(path("loaded")),
    fetchData: fetchDataProcess(store)
  };
}
// Use a StoreContainer
export const Query = StoreContainer(BaseQuery, "state", {
  getProperties
});
```

In this snippet we provide a `BaseQuery` that is going to handle taking any queries that child widgets might provide and use those queries to to fetch some data. This widget uses a `StoreContainer` to pass the store that is updated using our process to the `BaseQuery`. We can call this container a `Query` to keep it simple. This is going to allow us to write some code like the following.

```tsx
export class MyWidget extends WidgetBase<{ client: any }> {
  protected render() {
    const { client } = this.properties;
    return (
      // use our Query Widget with the client it's given and
      // a query we have written
      <Query query={query} client={client}>
        {({ loading, data }) => {
          if (loading) {
            return <span>Loading...</span>;
          } else {
            return <div classes={[css.root]}>{parseMyData(data)}</div>;
          }
        }}
      </Query>
    );
  }
}
```

## Be a good provider

At this point you might be asking yourself, _How do I pass a client to a widget that uses this?_

Good question. Technically, you could create the client in your Widget module and provide it to `<Query>`. But that seems kind of icky to bind backend concerns into my UI code. The way `react-apollo` does this is by providing an `<ApolloProvider>` that you can give a `client` and then wrap your application components with it. These components will have access to the Apollo `client` to give to the `Query` higher order component.

It basically looks like the `<ApolloProvider>` _provides_ its `client` property to child widgets. _I can do that_.

```tsx
// src/providers/ApolloProvider.tsx
import { tsx } from "@dojo/framework/widget-core/tsx";
import { WidgetBase } from "@dojo/framework/widget-core/WidgetBase";

export class ApolloProvider extends WidgetBase<{ client: any }> {
  protected render() {
    const { client } = this.properties;
    for (let child of this.children) {
      if ((child as any).properties) {
        // inject the client of the provider into each child
        // widget
        (child as any).properties.client = client;
      }
    }
    return this.children;
  }
}
```

What this _naive_ `ApolloProvider` does is iterates over the `children` of the widget and injects the `client` property into each one. I'm sure the `react-apollo` implementation does much more, but I'm not going to argue with what works.

Now that I have my provider, I can start to tie it all together.

## The great provider

In my `main.tsx` where I initialize my Dojo application, I can create my `ApolloClient` and pass it my `ApolloProvider` that will wrap my other widgets so that I can use it.

```tsx
// src/main.tsx
...
import { Store } from "@dojo/framework/stores/Store";
import { registerStoreInjector } from "@dojo/framework/stores/StoreInjector";

import ApolloClient from "apollo-boost";

import { ApolloProvider } from "./providers/ApolloProvider";
import { Countries } from "./widgets/Countries";

// initialize a GraphQL client
const client = new ApolloClient({
  uri: "https://countries.trevorblades.com"
});

const store = new Store();
const registry = registerStoreInjector(store);

class App extends WidgetBase {
  protected render() {
    // pass the client to the ApolloProvider
    // The <Countries /> widget will use it
    return (
      <div>
        <ApolloProvider client={client}>
          <h2>{"\u2728 dojo-apollo \u2728"}</h2>
          <Countries />
        </ApolloProvider>
      </div>
    );
  }
}
...
```

The sample GraphQL API I am going to use provides a list of Countries. So I'm going to write a widget that can display those results.

## GraphQL results

Here is where we get to see the fruit of our labors! We can write a widget that will display a specific set of data from our GraphQL API. So the widget can provide its own GraphQL query. This makes sense when you think of the widget as _owning_ this query.

```tsx
import { tsx } from "@dojo/framework/widget-core/tsx";
import { WidgetBase } from "@dojo/framework/widget-core/WidgetBase";
import gql from "graphql-tag";

import * as css from "./styles/Countries.m.css";

import { Query } from "../containers/QueryContainer";

interface Country {
  name: string;
  code: number;
}
// initialize a GraphQL query
export const query = gql`
  {
    countries {
      name
      code
    }
  }
`;

// helper method to display each country as a list item
// each country will link to a wikipedia page
const countryItems = (countries: Country[] = []) =>
  countries.map(({ name, code }) => (
    <li classes={[css.item]} key={code}>
      <a
        classes={[css.link]}
        key={code}
        href={`https://en.wikipedia.org/wiki/${name}`}
        target="_blank"
      >
        {name}
      </a>
    </li>
  ));

export class Countries extends WidgetBase<{ client?: any }> {
  protected render() {
    // this is the `client` that was injected by the `<ApolloProvider>`
    const { client } = this.properties;
    return (
      <Query query={query} client={client}>
        {({ loading, data }) => {
          // if data is still loading, show a message
          if (loading) {
            return <span>Loading...</span>;
          } else {
            // when data is done loading, display the list
            return <ul classes={[css.root]}>{countryItems(data.countries)}</ul>;
          }
        }}
      </Query>
    );
  }
}
```

This widget uses our `Query` container to wrap up the part of the widget that relies on the GraphQL results. This looks pretty much exactly like `react-apollo`.

You can see this entire example in action in this [code sandbox](https://codesandbox.io/s/dojo-graphql-zgmi6?fontsize=14).

## Summary

This is a fairly simple implementation of a GraphQL `<Query>` and `<ApolloProvider>`, but it works pretty well in a case like this. If you have multiple different queries you want to run in a single application, I think you would need to create a factory method for your containers to define multiple states that would contain different results.

This is definitely something I want to continue working on in the future and I think there might be some more _Dojo way_ of handling this in some features that look to be coming to Dojo in the future.

As always, have fun with it and keep on hacking!
