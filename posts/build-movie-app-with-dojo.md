---
title: Build a movie search app with Dojo
date: 2019-11-11
author: Rene Rubalcava
description: A walkthrough on how to build a movie search application with Dojo
tags: javascript, dojo, webdev, application, dojo6
cover_image: /assets/blog/dojo-movie-search-app.jpg
published: true
---

I was recently reading this [blog post](https://www.freecodecamp.org/news/how-to-build-a-movie-search-app-using-react-hooks-24eb72ddfaf7/) on building a movie search app with React hooks, and thought it was a pretty good candidate for building a Dojo app.

For this application, we'll be using the [OMDb API](https://www.omdbapi.com/) where you can also sign up for a free API key.

## Getting Started

We can start with a basic dojo template app.

```bash
dojo create app --name movie-search
```

Go ahead and remove the routes and the widgets you get by default. This application will contain three distinct elements, a `Header`, a `Search` tool, and a `Movie` card.

## Data

First thing is first, since we're working in TypeScript, let's define the data that is going to be used in our application.

The OMDb API will return each movie with the following interface.

```ts
// src/Data.ts
export interface Record {
  Poster: string;
  Title: string;
  Year: string;
}
```

We'll refer to it as a `Record`. The `State` of my application will contain an array of `Record` values and a `loading` property.

```ts
// src/Data.ts
export interface State {
  loading: boolean;
  movies: Record[];
}
```

Awesome, now that we know what kind of interfaces we'll be working with, we can start on writing some widgets.

## Header

The `Header` widget is only going to display the name of the application.

```tsx
// src/widgets/Header.tsx
import { create, tsx } from "@dojo/framework/core/vdom";

import * as css from "./styles/Header.m.css";

interface HeaderProperties {
  title: string;
}

const factory = create().properties<HeaderProperties>();

export const Header = factory(function Header({ properties }) {
  const { title } = properties();
  return (
    <header classes={[css.root]}>
      <h2 classes={[css.text]}>{title}</h2>
    </header>
  );
});
```

This widget contains no internal state, so it will just take a `title` property and display it.

## Movie

The next widget we can make will be the `Movie` card. The application will display a series of movie cards. We _could_ make an entire widget to encapsulate the movies, but we'll stick with a simple list of cards.

```tsx
// src/widgets/Movie.tsx
import { create, tsx } from "@dojo/framework/core/vdom";

import * as css from "./styles/Movie.m.css";

import { Record } from "../Data";

const DEFAULT_PLACEHOLDER_IMAGE =
  "image_url";

const factory = create().properties<{ movie: Record }>();

export const Movie = factory(function Movie({ properties }) {
  const { movie } = properties();
  const poster =
    movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;
  return (
    <div classes={css.root}>
      <h2>{movie.Title}</h2>
      <div>
        <img
          width="200"
          alt={`The movie titled: ${movie.Title}`}
          src={poster}
        />
      </div>
      <p>({movie.Year})</p>
    </div>
  );
});
```

Before we start on our `Search` widget, let's build our search functionality.

## Stores and Processes

In Dojo, we'll want to provide our `store` as middleware in our widgets, so let's make a helper for that.

```ts
// src/middleware/store.ts
import createStoreMiddleware from "@dojo/framework/core/middleware/store";

import { State } from "../Data";

export default createStoreMiddleware<State>();
```

That's pretty simple. The reason we want this middleware store is so our widgets can execute processes to interact with external data sources and thus provide data back to our widgets.

```ts
// src/processes/search.ts
import {
  createCommandFactory,
  createProcess,
  ProcessCallback
} from "@dojo/framework/stores/process";
import { add, replace } from "@dojo/framework/stores/state/operations";

import { State } from "../Data";

const API_KEY = "INSERT_KEY_HERE";

const MOVIE_API_URL = `https://www.omdbapi.com/?s=man&apikey=${API_KEY}`;

// handle updating the loading state when
// fetching data
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

const commandFactory = createCommandFactory<State>();

// Fetch some initial movies to populate the application
const fetchInitialMoviesCommand = commandFactory(async ({ path }) => {
  const response = await fetch(MOVIE_API_URL);
  const json = await response.json();
  return [add(path("movies"), json.Search)];
});

// search for movies
const fetchMoviesCommand = commandFactory(
  async ({ path, payload: { value } }) => {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${value}&apikey=${API_KEY}`
    );
    const json = await response.json();
    return [replace(path("movies"), json.Search)];
  }
);

// initial movies process
export const fetchInitialMovies = createProcess(
  "fetch-initial-movies",
  [fetchInitialMoviesCommand],
  [progress]
);

// search movies process
export const fetchMovies = createProcess(
  "fetch-movies",
  [fetchMoviesCommand],
  [progress]
);
```

This process is going to search for movies from the OMDb API and then update the results using `return [replace(path("movies"), json.Search)]`. This will update the `movies` value of our application state with our search results.

With the store and process complete, we can beging writing our `Search` widget to perform the important task of actually searching for movies.

## Search

The `Search` widget will have some internal state to manage the search phrases, so we will use the [icache](https://dojo.io/learn/middleware/available-middleware#icache) middleware.

```tsx
// src/widgets/Search.tsx
import { create, tsx } from "@dojo/framework/core/vdom";
import icache from "@dojo/framework/core/middleware/icache";
import store from "../middleware/store";
import { fetchMovies } from "../processes/search";

import * as css from "./styles/Search.m.css";

const factory = create({ icache, store });

export const Search = factory(function Search({
  middleware: { icache, store }
}) {
  // get current or default empty value
  const value = icache.getOrSet("value", "");
  return (
    <form classes={css.root}>
      <input
        classes={[css.text]}
        value={value}
        onchange={(evt: Event) => {
          // when input value changes,
          // update internal state value
          const target = evt.target as HTMLInputElement;
          icache.set("value", target.value);
        }}
        type="text"
      />
      <input
        classes={[css.submit]}
        onclick={(evt: Event) => {
          evt.preventDefault();
          const value = icache.get("value");
          // take value of internal state and
          // use the store to execute the search
          store.executor(fetchMovies)({ value });
        }}
        type="submit"
        value="SEARCH"
      />
    </form>
  );
});
```

The core widgets for our application are now ready and we can bring them together in an `App` widget.

## App

The `App` widget will load some initial state if needed and display the results.

```tsx
import { create, tsx } from "@dojo/framework/core/vdom";

import * as css from "./styles/App.m.css";

import { Header } from "./Header";
import { Movie } from "./Movie";
import { Search } from "./Search";

import store from "../middleware/store";
import { fetchInitialMovies } from "../processes/search";

const factory = create({ store });

export const App = factory(function App({ middleware: { store } }) {
  const { get, path } = store;
  const loading = get(path("loading"));
  const movies = get(path("movies"));
  // if no movies currently loaded
  // fetch some movies to display
  if (!movies) {
    store.executor(fetchInitialMovies)({});
  }
  return (
    <div classes={[css.root]}>
      <Header title="Dojo Movie Search" />
      <Search />
      <p>Sharing a few of our favorite movies</p>
      <div classes={[css.movies]}>
        {loading ? (
          <span classes={[css.loader]}>loading...</span>
        ) : movies ? (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))
        ) : (
          <virtual />
        )}
      </div>
    </div>
  );
});
```

In the `App` widget, we are going to request movies if needed and then quickly display some loading text if the application is currently fetching results. If we have some movie results, we can map over those results and create a `Movie` card for each one.

From here, we can render our application in our `main` file.

```tsx
// src/main.tsx
import { renderer, tsx } from "@dojo/framework/core/vdom";

import { App } from "./widgets/App";

const r = renderer(() => <App />);
r.mount();
```

Your completed application should look like this.

!(https://codesandbox.io/embed/dojo-movie-search-s2gt3?fontsize=14&module=%2Fsrc%2Fprocesses%2Fsearch.ts)

## Summary

I had a lot of fun putting this little movie search application together. Processes and Stores can be very flexible to fetch and transform data, as well as manage various states while loading data. As usual, keep the actual widgets as simple as possible and we can make some really cool applications!
