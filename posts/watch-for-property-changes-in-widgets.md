---
title: Watch for property changes in widgets
date: 2018-11-19
author: Rene Rubalcava
description: Use the @watch decorator in Dojo to watch for property changes in widgets
tags: javascript, dojo, decorators
cover_image: /assets/blog/watch-for-property-changes-in-widgets.jpg
published: true
---

We've seen how you can manage more complex state in your Dojo applications with [Containers](https://learn-dojo.com/dojo-containers/), but with the [release of Dojo 4](https://dojo.io/blog/2018/10/15/2018-10-15-Version-4-Dojo/) we now have access to a new `@watch` decorator. This very useful for managing the internal state of your widgets, because you no longer have to concern yourself with having to call a widgets `invalidate()` method if you don't want to. For example, let's say that I want to have a simple clock widget in my application that is just going to display the current time. For demo purposes, I'll display the time up to the second. I can create a `Clock` widget that will do exactly that.

```ts
class Clock extends WidgetBase {
  // use watch decorator so that any updates
  // to this property will now call the
  // internal invalidate() method and
  // rerender my widget
  @watch() private _currentTime = new Date();

  // a widget lifecycle method that is called
  // when a widget is added to the DOM
  onAttach() {
    // update time every second
    setInterval(() => {
      this._currentTime = new Date();
    }, 1000);
  }

  protected render() {
    return v("h1", { classes: css.root }, [
      `Time: ${this._currentTime.toLocaleTimeString()}!`
    ]);
  }
}
```

As you can see, this greatly simplifies my widget so that I can just update my internal state without having to worry about invalidating my widget. This is powerful stuff! Here is a live demo of this application.

[Code Sandbox](https://codesandbox.io/embed/zx4l7k5m3?module=%2Fsrc%2Fwidgets%2FClock.ts)

There have been some other great updates to Dojo 4 such as a simplified render method to mount Dojo widgets and [much more](https://github.com/dojo/framework/releases/tag/v4.0.0)!