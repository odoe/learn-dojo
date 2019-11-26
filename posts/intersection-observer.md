---
title: Intersection Observer with Dojo
date: 2019-11-22
author: Rene Rubalcava
description: Learn how to use the Intersection Observer middleware in your Dojo applications
tags: javascript, dojo, webdev, middleware, dojo6
cover_image: /assets/blog/dojo-intersection-observer.jpg
published: true
---

The [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) is a web API that provides information about elements position in a viewport of your page. You can check if an element is currently intersecting with the viewport, meaning it's visible in the browser and even how much of the element is visible. This gives you the tools to do things like lazy-load images on the page, determine if you want to show other parts of the page as users reach the end or load more content as a user scrolls the page.

Loading of more content as a user scrolls the page has some great benefits. You might need to display a very large dataset to your users, but there is no point in fetching and displaying all the data if the user may not scroll to it.

## Intersection Middleware

Dojo provides an [intersection middleware](https://dojo.io/learn/middleware/available-middleware#intersection) you can use in building widgets for your application. You can use this middleware to lazy-load images or even integrate paging into your application!

In a previous post, we built a [movie application](https://learn-dojo.com/build-movie-app-with-dojo/) with Dojo. For this application we use the [OMDb API](https://www.omdbapi.com/) which also includes the ability to page through results. So we can go ahead and add paging to this application using the Intersection Observer middleware.

Since we're going to introduce paging into our application, we're going to modify our State interface to handle it.

```ts
// src/Data.ts
export interface State {
  value: string;
  page: number;
  pagingEnabled: boolean;
  movies: Record[];
}
```

We need the current `search` value to be available to other parts of our application and not just the Search widget. We'll also want to keep track of the current `page` we are on. We also want to keep track of whether or not paging is enabled, because once we reach the end of results, we don't want to keep trying to fetch data when there are no more results.

The work of fetching the results is done in our `search` process. The process has a few responsibilities.

* Keep track of current page of results
* Add results or replace results based on current and previous search term
* Disable paging if no more results available

```ts
// src/processes/search.ts
const fetchMoviesCommand = commandFactory(
  async ({ get, path, payload: { value } }) => {
    const previousValue = get(path("value"));
    const previousMovies = get(path("movies"));
    const page = get(path("page"));
    // determine if we need to ask for
    // the next page of results
    let currentPage = previousValue === value ? page + 1 : 1;
    const response = await fetch(
      `https://www.omdbapi.com/?s=${value}&page=${currentPage}&apikey=${API_KEY}`
    );
    const json = await response.json();
    // if the `Response` is `False`
    // no more movies are available
    // for search term.
    // we can disable paging now
    if (json.Response === "False") {
      return [
        replace(path("value"), value),
        replace(path("page"), 1),
        replace(path("pagingEnabled"), false)
      ];
    }
    // if still searching for same
    // term, combine results
    // or else replace them completely
    let updater =
      previousValue === value
        ? replace(path("movies"), previousMovies.concat(json.Search))
        : replace(path("movies"), json.Search);
    return [
      updater,
      replace(path("value"), value),
      replace(path("page"), currentPage),
      replace(path("pagingEnabled"), true)
    ];
  }
);
```

With `search` process updated to manage paging results for our movie queries, we can move on to using the Intersection Observer in our application to implement it.

## Intersection Middleware

The `intersection` middleware has a fairly basic API. You can ask for information about a specific element based on the `key` of that element.

```tsx
const { intersectionRatio, isIntersecting } = intersection.get("key-name");
...
// element in a widget
<div key="key-name" />;
```

The `intersection` middleware will now tell you if the element is currently intersecting the page, and if you need it, you can find out how much of that element is intersecting the page. The `intersectionRatio` will be a value between `0.0` and `1`.

In the `App` widget, we can add an empty element to the bottom of the page, so as we scroll, once it intersects with the viewport, we can fetch more movies to display.

```tsx
// src/widgets/App.tsx
export const App = factory(function App({
  middleware: { intersection, store }
}) {
  const { get, path } = store;
  const movies = get(path("movies"));
  const pagingEnabled = get(path("pagingEnabled"));
  if (!movies) {
    store.executor(fetchInitialMovies)({});
  }
  // get current intersection information
  const { intersectionRatio, isIntersecting } = intersection.get("app-footer");
  // Check for three things
  // 1. Is the element completely in the viewport?
  // 2. Is the element currently intersecting?
  // 3. Is paging enabled, meaning can I get more results?
  if (intersectionRatio === 1 && isIntersecting && pagingEnabled) {
    const { get, path } = store;
    const value = get(path("value"));
    // if all the above are true, fetch more movies
    store.executor(fetchMovies)({ value });
  }
  return (
    <div classes={[css.root]}>
      <Header title="Dojo Movie Search" />
      <Search />
      <p>Sharing a few of our favorite movies</p>
      <div classes={[css.movies]}>
        {movies ? (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))
        ) : (
          <virtual />
        )}
        <div key="app-footer" />
      </div>
    </div>
  );
});
```

Now we can freely scroll through our search results and fetch more data as we need it. A user may never scroll through all the results and thus we don't need to fetch everything up front, only what's needed.

You can see this application here.

!(https://codesandbox.io/embed/dojo-movie-search-intersection-observer-v232h?fontsize=14&module=%2Fsrc%2Fwidgets%2FApp.tsx&theme=light)

## Summary

The `intersection` middleware provides a clean and simple way for you to determine if an element is currently in the viewport of the page. This opens up the possibility for you to do some interesting UI optimizations, such as limit network traffic, lazy-load images or even entire sets of widgets or tools that only appear at the end of the page. You have the freedom to be creative with how you use it!
