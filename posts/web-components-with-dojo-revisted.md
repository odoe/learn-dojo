---
title: Revisiting Web Components with Dojo
date: 2019-10-22
author: Rene Rubalcava
description: It's now even easier to export Dojo widgets to Web Components
tags: javascript, dojo, web components, webdev, dojo6
cover_image: /assets/blog/dojo-web-components-revisited.jpg
published: true
---

In a previous post, we looked at how you could [export Dojo widgets to Web Components](https://learn-dojo.com/web-components-with-dojo). With the release of Dojo 6, this step is [even easier](https://dojo.io/blog/version-6-dojo#zero-configuration-custom-elements). You no longer need to provide a decorator for your class based widgets, and even better, it works with function based widgets!

## Widget

In our post on [custom widget middlware](https://learn-dojo.com/dojo-custom-middleware), we created a geolocation widget. Here is what the middleware looked like.

```ts
// src/middleware/geolocation.ts
import { create } from "@dojo/framework/core/vdom";
import icache from "@dojo/framework/core/middleware/icache";

const factory = create({ icache });

type Coords = Pick<Coordinates, "latitude" | "longitude">;

// utility to get current geolocation
const getGeolocation = async (): Promise<Coords> => {
  return new Promise(resolve => {
    if (!("geolocation" in navigator)) {
      resolve({ latitude: 0, longitude: 0 });
    } else {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        resolve({ latitude, longitude });
      });
    }
  });
};

// default coordinates
const defaultCoordinates = { latitude: 0, longitude: 0 };

export const geolocation = factory(({ middleware: { icache } }) => {
  return (): Coords => {
    // get current value or default
    const coords = icache.getOrSet("coords", defaultCoordinates);
    if (coords.latitude === 0 && coords.longitude === 0) {
      // only get location if it is not the default
      getGeolocation().then(results => {
        if (
          coords.latitude !== results.latitude &&
          coords.longitude !== results.longitude
        ) {
          // only update cache if different from current value
          // this will invalidate the widget
          icache.set("coords", results);
        }
      });
    }
    return coords;
  };
});

export default geolocation;
```

And here is a widget I'm going to write to use it.

```tsx
// src/widgets/Geolocate.tsx
import { create, tsx } from "@dojo/framework/core/vdom";

import geolocation from "../middleware/geolocation";

import * as css from "./styles/Geolocate.m.css";

const factory = create({ geolocation });

const Geolocate = factory(function ({ middleware: { geolocation } }) {
  const { latitude, longitude } = geolocation();
  return (
    <div classes={[css.root]}>
      <span>
        <svg classes={[css.icon]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M15.5 0C10.806 0 7 1.817 7 6.543v16.901L15.5 32l8.5-8.556V6.543C24 1.817 20.194 0 15.5 0zm0 15.1a4.6 4.6 0 1 1 4.6-4.6 4.599 4.599 0 0 1-4.6 4.6z"/></svg>
      </span>
      <label>Lat: {latitude.toFixed(3)} | Lon: {longitude.toFixed(3)}</label>
    </div>
  );
});

export default Geolocate;
```

This widget will render the current latitude and longitude based on the browsers [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API).

This is what it should look like.

![dojo widget](/assets/images/web-components-with-dojo-revisited/dojo-geolocate.png)

In order to export this widget as a web component, I only need to update the `.dojorc` to let the build tooling know what I want to do.

```json
{
  "build-widget": {
    "prefix": "dojo",
    "widgets": [
      "src/widgets/Geolocate"
    ]
  }
}
```

This will create a web component, that I could use like this.

```html
<!DOCTYPE html>
<html lang="en-us" dir="ltr">
<head>
	<meta charset="utf-8">
	<title>geolocate-widget</title>
	<meta name="theme-color" content="#222127">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="output/dist/geolocate-1.0.0.css">
	<script src="output/dist/geolocate-1.0.0.js"></script>
</head>
<body>
  <!-- use my web component -->
	<dojo-geolocate></dojo-geolocate>
</body>
</html>
```

## Interactivity

Maybe I want to make this little widget and web component interactive. For example, I want to provide a property to make the text hidden and show it when I click on the icon of the my widget. I can update my widget like this.

```tsx
import { create, tsx } from "@dojo/framework/core/vdom";
// use the icache middleware
import icache from "@dojo/framework/core/middleware/icache";

import geolocation from "../middleware/geolocation";

import * as css from "./styles/Geolocate.m.css";

// provide an interface
interface GeolcateProperties {
  hidden?: boolean;
}

const factory = create({ geolocation, icache }).properties<GeolcateProperties>();

const Geolocate = factory(function ({ middleware: { geolocation, icache }, properties }) {
  // this will be a user provided property
  const { hidden } = properties();
  // this is the internal property based on the provided property
  const isHidden = icache.getOrSet('isHidden', hidden);

  const { latitude, longitude } = geolocation();
  // show or hide content based on given property
  const content = isHidden ? [] : <label>Lat: {latitude.toFixed(3)} | Lon: {longitude.toFixed(3)}</label>;
  return (
    <div classes={[css.root]}>
      <span classes={[css.span]} onclick={() => {
        icache.set('isHidden', !isHidden);
      }}>
        <svg classes={[css.icon]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M15.5 0C10.806 0 7 1.817 7 6.543v16.901L15.5 32l8.5-8.556V6.543C24 1.817 20.194 0 15.5 0zm0 15.1a4.6 4.6 0 1 1 4.6-4.6 4.599 4.599 0 0 1-4.6 4.6z"/></svg>
      </span>
      {content}
    </div>
  );
});

export default Geolocate;
```

Here is a demo of what this widget looks like.

!(https://codesandbox.io/embed/dojo-geolocate-s2v6i?fontsize=14&module=%2Fsrc%2Fwidgets%2FGeolocate.tsx)

Once this is compiled into a web component, I can use it with the hidden property.

```html
<body>
	<dojo-geolocate hidden></dojo-geolocate>
</body>
```

You can find the source code for this widget on [github](https://github.com/odoe/dojo-geolocate).

## Summary

I still think it's pretty useful to utilize Dojo widgets as a tool for building web components. In particular if you are interested in using some of the [@dojo/widgets](https://github.com/dojo/widgets) as web components in your own apps! Having the full capabilities of Dojo behind web components is very enticing!
