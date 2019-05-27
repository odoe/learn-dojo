---
title: Style Dojo Widgets
date: 2019-04-08
author: Rene Rubalcava
description: How to style the out-of-the-box Dojo widgets
tags: javascript,dojo,webdev
cover_image: /assets/blog/style-dojo-widgets.jpg
---

There's an entire Dojo tutorial on [creating custom themes](https://dojo.io/tutorials/007_theming/), and if you look at any of the guides on creating widgets you will learn how to create css modules to use with your widgets and your applications.

But how about if you want to use some of the [out-of-the-box widgets with Dojo?](https://github.com/dojo/widgets) There is an entire library of ready to use widgets you can start building off for your applications today. We saw this when we created a [datepicker](https://learn-dojo.com/creating-a-datepicker-with-dojo/), and there's even widgets like [select](https://github.com/dojo/widgets/tree/master/src/select) and [button](https://github.com/dojo/widgets/tree/master/src/button). Check out the [widget showcase](https://dojo.github.io/examples/widget-showcase/) for more!

If you just wanted to quickly get started with a nice looking theme, you can use the [Dojo theme](https://github.com/dojo/themes). I'll cover how to create your own themes another time, but for now, let's assume you have a Dojo widget in your application and you really like the Dojo theme, but you would like to slightly make some adjustments. Not enough to warrant a custom theme, but maybe add some italic font, change a background here and there.

Dojo provides a way to do this in a [CSS modules](https://css-tricks.com/css-modules-part-1-need/) friendly manner. Every widget has a section in its documentation on the CSS classes you can override, such as those in the [select widget](https://github.com/dojo/widgets/tree/master/src/select#theming). To get started, let's add the Dojo theme to this widget.

```ts
import theme from "@dojo/themes/dojo";
...

// in your render method
<Select
  theme={theme} // apply the Dojo theme
  options={names}
  value={this.selectedValue}
  placeholder="Pick a name"
  onChange={this.onSelectChange}
/>
```

At this point, you're able use a nice looking theme provided by Dojo. However, maybe I would like the placeholder text to be italicized, and I'd like to change the background color of the button and some other colors a bit. I don't want to change much, just a few things.


```css
.arrow {
  background: #959595;
  color: #fff;
}

.focused {
  color: #005e95;
}

.placeholder {
  font-style: italic;
}

.inputWrapper {
  color: #6e6e6e;
}
```

Now I have some simple CSS that matches the class names in the [documentation](https://github.com/dojo/widgets/tree/master/src/select#theming). You can now apply these class names to your Select widget using a plain old JavaScript object that will map the extra classes to the widget key. You can see more detail [here](https://github.com/dojo/framework/tree/master/src/widget-core#styling--theming).


```ts
const SelectClasses = {
  "@dojo/widgets/select": {
    arrow: \[css.arrow\],
    focused: \[css.focused\],
    placeholder: \[css.placeholder\],
    inputWrapper: \[css.inputWrapper\]
  }
};

// in your render method
<Select
  theme={theme} // apply the Dojo theme
  classes={SelectClasses}
  options={names}
  value={this.selectedValue}
  placeholder="Pick a name"
  onChange={this.onSelectChange}
/>
```

This will now maintain the Dojo theme you are already using, but also apply the classes you are adding the widget as well. You end up with an application that looks something like below.

[Code Sandbox](https://codesandbox.io/embed/lp3xl1x2om?fontsize=14&amp;module=%2Fsrc%2Fwidgets%2FHello.tsx)

As you can see, it doesn't take a lot of work to use the provided Dojo theme with your applications and apply your own little CSS sugar to the out-of-the-box Dojo widgets. You can also take this a step further and create your own [custom theme](https://dojo.io/tutorials/007_theming/) for your application and even a [reusable theme](https://github.com/dojo/cli-create-theme) for a suite of applications! Happy dev'ing!

