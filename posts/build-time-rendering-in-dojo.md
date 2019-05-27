---
title: Build Time Rendering in Dojo
date: 2019-03-15
author: Rene Rubalcava
description: Quick look at how to use Build Time Rendering with Dojo
tags: javascript, web development, dojo
cover_image: /assets/blog/build-time-rendering-in-dojo.jpg
---

You may have worked with other frameworks that support server side rendering. What it basically does is render the HTML of your page and pass it down to the client as it would look when the initial JavaScript loads and then you can interact with it and the JavaScript stuff works its _magic_ to make a cool interactive application.

The Dojo method of doing this is much simpler. Instead of rendering the pages on the server, you can create your pages during the build process, and then you can just upload it anywhere.

You can find some information about Build Time Rendering on the github page for [dojo/cli-build-app](https://github.com/dojo/cli-build-app#build-time-renderbtr-object). You can get started by using the [dojo/cli](https://github.com/dojo/cli) to quickly scaffold an application and modify it a bit.

Once you have your template application ready to go, let's make some modifications. First thing we need to do in `src/index.html` is add a root div that the build time rendering tools can work with.

```html
<!DOCTYPE html>
<html lang="en-us">
<head>
  <title>dojo-btr</title>
  <meta name="theme-color" content="#222127">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
  <div id="root"></div> <!-- Add this element -->
</body>
</html>
```

Now we can set up the configuration for build time rendering. One thing to note is that by default, the template application uses hash routing, meaning that routes look like `myapp/#about`. This will generate a single index.html file in your build that will quickly load those routes. If you use a different [history manager](https://github.com/dojo/framework/tree/master/src/routing#router), it will create an _index.html_ for each route.

```json
{
  "build-app": {
    "build-time-render": {
      "root": "root",
      "paths": [
        "#home",
        "#about",
        "#profile"
      ]
  }
}
```

Note that I have prefixed my paths with a `#` so that the BTR can generate the pages correctly. The output of this is pretty interesting. Each route is stored in an array as strings, and as you change your route at runtime, it will load the HTML of that route as needed.

The benefit here is that your HTML is ready to go and the JavaScript parts just do their thing without having to do an initial render of your page. It makes for a very responsive experience. You get a lot of benefit from Build Time Rendering with some simple configuration, so take advantage of it!

You can see a sample of how this looks in a sample application I put together [here](https://github.com/odoe/dojo-btr). I also have it running live [here](https://learn-dojo-btr-demo.netlify.com).

