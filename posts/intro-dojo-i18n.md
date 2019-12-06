---
title: Intro to i18n with Dojo
date: 2019-12-06
author: Rene Rubalcava
description: Learn how to use i18n with Dojo applications
tags: javascript, dojo, webdev, i18n, dojo6
cover_image: /assets/blog/dojo-i18n-intro.jpg
published: true
---

If you are building an application that is meant to have a wide user base, one of the things you should spend time on is [internationalization](https://en.wikipedia.org/wiki/Internationalization_and_localization). Chances are that you will want to support multiple languages based on where your application is used or possibly as a user preference.

Dojo provides [i18n support](https://dojo.io/learn/i18n/introduction) as well as advanced [CLDR formatting](https://dojo.io/learn/i18n/advanced-formatting-cldr).

Let's take a look at providing multiple language support to the [codesandbox dojo template](https://codesandbox.io/s/github/dojo/dojo-codesandbox-template).

## Language Strings

In order to provide multiple language support, we can create some nls (National Language Support) files that will contain the translated strings for us to use.

We can create a couple of nls files for our `Hello` widget.

```ts
// src/nls/en/Hello.ts
export default {
  locales: {
    es: () => import("../es/Hello")
  },
  messages: {
    title: "Hello"
  }
};

// src/nls/es/Hello.ts
export default {
  title: "Hola"
};
```

The structure of these files is that the default language file, which in this case will be english, has a `messages` property. We have a `title` of `Hello`. Under the `locales` option, we can dynamically import the spanish strings for our language file. This will replace any message keys with matching keys from the imported file.

The supported language files are just objects with the keys that are mapped to the translated strings.

We can make one more for the main `App.tsx` content.

```ts
// src/nls/en/App.ts
export default {
  locales: {
    es: () => import("../es/App")
  },
  messages: {
    content: "Start editing to see some magic happen \u2728"
  }
};

// src/nls/es/App.ts
export default {
  content: "Comienza a editar para ver algo de magia \u2728"
};
```

> _Tip: Don't rely completely on Google Translate for your translated strings. If you are building a large application, find someone that can help you with proper translations or maybe even spend a few bucks for professional translations._

Now we can look at how to use our translated strings in our widgets.

## i18n Widgets

Dojo is kind enough to provide an i18n middleware to help us localize our applications! We can use this middleware to load the correct language strings in our nls bundles based on the browser locale.

```tsx
// src/widgets/Hello/tsx
import { create, tsx } from "@dojo/framework/core/vdom";
import i18n from "@dojo/framework/core/middleware/i18n";
// language bundle
import nlsBundle from "../nls/en/Hello";

...
const factory = create({ i18n }).properties<HelloProperties>();

export const Hello = factory(function({ properties, middleware: { i18n } }) {
  // pull correct localized strings
  const { messages } = i18n.localize(nlsBundle);
  const { name } = properties();
  return <h1 classes={[css.root]}>{`${messages.title}, ${name}`}</h1>;
});

export default Hello;
```

We can also do this for the main application content.

```tsx
// src/main.tsx
import { renderer, create, tsx } from "@dojo/framework/core/vdom";
import i18n from "@dojo/framework/core/middleware/i18n";
import "@dojo/themes/dojo/index.css";
// language bundle
import nlsBundle from "./nls/en/App";

...

const factory = create({ i18n });

const App = factory(function App({ middleware: { i18n } }) {
  // pull correct localized strings
  const { messages } = i18n.localize(nlsBundle);
  return (
    <div>
      <Hello name="Dojo CodeSandbox" />
      <h2>{messages.content}</h2>
    </div>
  );
});
```

Using i18n, even if only with a default language, is a good practice so these strings can be easily maintained and updated in our applications. Then we can incrementally add more language support in the future. But not only can we support the browser locale, we can give our users a _language preference_. That is pretty cool! Let's add a simple widget to switch locales in this application.

## Switching Locales

The [i18n middleware](https://dojo.io/learn/middleware/available-middleware#i18n) provides a `set` method to define the locale programmatically. The Dojo documentation provides a [great sample](https://dojo.io/learn/i18n/introduction#changing-the-locale-within-an-application) to do this, so we can make something similar.

```tsx
// src/widgets/LocaleSwitcher.tsx
import { create, tsx } from "@dojo/framework/core/vdom";
import i18n from "@dojo/framework/core/middleware/i18n";
import Button from "@dojo/widgets/button";
import theme from "@dojo/themes/dojo";

const factory = create({ i18n });

export const LocaleSwitcher = factory(function({ middleware: { i18n } }) {
  return (
    <virtual>
      <Button
        theme={theme}
        onClick={() => {
          // set to english
          i18n.set({ locale: "en" });
        }}
      >
        English
      </Button>
      <Button
        theme={theme}
        onClick={() => {
          // set to spanish
          i18n.set({ locale: "es" });
        }}
      >
        Spanish
      </Button>
    </virtual>
  );
});

export default LocaleSwitcher;
```

Now we can add this widget to our application.

```tsx
// src/main.tsx
...
import LocaleSwitcher from "./widgets/LocaleSwitcher";

const factory = create({ i18n });

const App = factory(function App({ middleware: { i18n } }) {
  // pull correct localized strings
  const { messages } = i18n.localize(nlsBundle);
  return (
    <div>
      <Hello name="Dojo CodeSandbox" />
      <h2>{messages.content}</h2>
      <LocaleSwitcher />
    </div>
  );
});

...
```

We can see what this looks like here.

!(https://codesandbox.io/embed/dojo-i18n-v6-j3pbj?fontsize=14&hidenavigation=1&theme=light)

One thing I should point out, when building our application, make sure we list our locales in the `.dojorc` so that Dojo can build our language bundles for us.

```json
{
	"build-app": {
			"locale": "en",
			"supportedLocales": [ "es" ]
	}
}
```

## Summary

Providing support for multiple languages in our applications isn't something many developers are concerned about right away, _until we have to!_ It's nice to be able to lean on the framework tools to do tasks like this. We don't have to worry about finding a well supported library, comparing features or developer ergonomics. Dojo i18n isn't just limited to language support for strings, but also provides [advanced formatting](https://dojo.io/learn/i18n/advanced-formatting-cldr) support for pluralization, dates, numbers, time zones and more. So we know when we need it, Dojo has us covered!
