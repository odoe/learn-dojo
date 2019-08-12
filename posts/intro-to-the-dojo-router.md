---
title: Intro to the Dojo Router
date: 2019-01-22
author: Rene Rubalcava
description: An Introduction to using the Dojo Router for scalable apps
tags: javascript, typescript, dojo, webdev
cover_image: /assets/blog/intro-to-the-dojo-router.jpg
published: true
---


We took a quick look at the Dojo router when we [reviewed the template application](https://learn-dojo.com/dojo-cli-template-app/) from the dojo cli. The template application provides almost everything you need to know about the Dojo router. But let’s take a little deeper look at [routing](https://dojo.io/tutorials/1030_routing/).

## Defining Routes

The template application does a great job of providing a clear way to configure your routes.

```ts
// src/routes.ts
export default [
  {
    path: "home",
    outlet: "home",
    defaultRoute: true
  },
  {
    path: "about",
    outlet: "about"
  },
  {
    path: "profile/{username}",
    outlet: "profile"
  }
];
```

The routes are defined as an array of objects. each Route object has a [RouteConfig interface](https://github.com/dojo/framework/blob/master/src/routing/interfaces.d.ts) with properties you can define. In the snippet above I have made one change. I have set the path for the profile route as **profile/{username}**. This means I will need to define a parameter to that route, which we’ll get to in a moment, but first let’s look at the options for a route config.

```ts
// dojo/framework/src/routing/interfaces.d.ts
export interface RouteConfig {
  path: string;
  outlet: string;
  children?: RouteConfig[];
  defaultParams?: Params;
  defaultRoute?: boolean;
}
```

That’s the beauty of working with TypeScript and Dojo, you can look at the types and interfaces of the code and use them as a guide as to how you should use the tools. The only required properties are path and outlet. One of the other properties we see defined in our configuration is the defaultRoute, which as you may have guessed is the default route of your application. Who says naming things is hard?!

The children property would be used if you had nested routes. You could also define some default parameters, which is really useful if you have a route the depends on parameters, and your route needs them to behave correctly.

## Outlet

The first part of routing we need to look at is the [Outlet](https://dojo.io/docs/index.html#doc--dojo__framework__v4_0_0__src__routing__README_md___outlets). The Outlet is a higher order component that you use to wrap up widgets that are part of a designated route.

```ts
// src/App.ts
...
export default class App extends WidgetBase {
  protected render() {
    return v("div", { classes: [css.root] }, [
      w(Menu, {}),
      v("div", [
        // Outlet is where routes go
        // the decide which widgets
        // match each route
        w(Outlet, {
          key: "home",
          id: "home",
          renderer: () => w(Home, {})
        }),
        w(Outlet, {
          key: "about",
          id: "about",
          renderer: () => w(About, {})
        }),
        w(Outlet, {
          key: "profile",
          id: "profile",
          renderer: () => w(Profile, { username: "Dojo User" })
        })
      ])
    ]);
  }
}
```

Looking at the outlet, you can see that we define the id of the Outlet to match the Route configuration we defined. The actual widget rendered in the Route doesn’t have to match the id, but as you can see, it’s pretty good practice to do so. Keep the code readable please.

Outlets are pretty straightforward. Since they render the widget for a Route, they can also handle passing any URL parameters as properties to the widget.

## Link and Parameters

Before we dive in to URL parameters, first we need to talk about how you can create a link to a route that is expecting parameters. We can define those parameters with a specific component in Dojo for working with routes, the [Link](https://dojo.io/docs/index.html#doc--dojo__framework__v4_0_0__src__routing__README_md___link) component.

```ts
// src/widgets/Menu.ts
w(
  Link,
  {
    to: 'profile',
    key: 'profile',
    classes: [css.link],
    activeClasses: [css.selected],
    params: {
      username: 'odoe'
    }
  },
  ['Profile']
)
```

The Link component is designed specifically for creating links to routes and static paths in your application. They provide some sugar to regular anchor tags you can take advantage of in your apps. In this case, I am providing a value to the **username** parameter we defined for our route. This means that is will pass the object **{ username: ‘odoe’ }** to my Outlet that I can then use to pass to my child widget.

```ts
// src/App.ts
w(Outlet, {
  key: 'profile',
  id: 'profile',
  renderer: ({ params }: MatchDetails) => {
    return w(Profile, { username: params.username });
  }
})
```

When you pass parameters to a URL in the Dojo router, your render method is passed the parameters for you to use in your application as needed. Now, although this method works fine, you can be more explicit in how you use your route parameters.

You can define query parameters in your routes and use them for more advanced usage. Let’s update the route configuration.

```ts
// src/routes.ts
export default [
  ...
  {
    path: "profile/{param}?{value}",
    outlet: "profile"
  }
];
```

Maybe we have different ways of searching for users in our backend API. We can search by name or id,.


```ts
// src/widgets/Menu.ts
w(
  Link,
  {
    to: 'profile',
    key: 'profile',
    classes: [css.link],
    activeClasses: [css.selected],
    params: {
      param: 'name',
      value: 'odoe'
    }
  },
  ['Profile']
)
```

Now we can update our Outlet to pass the correct information to the child widget.

```ts
// src/App.ts
w(Outlet, {
  key: 'profile',
  id: 'profile',
  renderer: ({ params, queryParams }: MatchDetails) => {
    const user = users.find((user: User) => {
      return user[params.param] == queryParams.value;
    }) as User;
    return w(Profile, { username: `${user.name} ${user.lastName}` });
  }
})
```

Now we have built a fairly generic way of passing parameters and values to our Outlet and being able to search for the correct username to use in our widget. We can search by the **name** value or an **id** value.

## Default Parameters

So far we have been defining parameters in our Link, but maybe we want to define some default parameters directly in our route instead.

```ts
// src/routes.ts
export default [
  ...
  {
    path: 'profile/{param}?{value}',
    outlet: 'profile',
    defaultParams: {
      param: 'id',
      value: '2'
    }
  }
];
```

For out default route, we can decide to search by id with a value of 2. When you start dealing with URL parameters, everything is a string, so if you wanted to use real numbers, you would need to do some additional sanitization in your application, but I think we’ve dived pretty deep into setting up the Dojo router for starter use. Big thanks to [Anthony Gubler](https://twitter.com/agubler_) for helping me out with some of my router questions, it was a big help.

## Summary

As you can see, the Dojo router is very flexible in how you want to define your routes and parameters. Depending on how your backend APIs are defined, you could create some very powerful and scalable applications!

