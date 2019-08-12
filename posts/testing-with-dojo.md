---
title: Testing with Dojo
date: 2019-05-06
author: Rene Rubalcava
description: How to use the testing tools of the Dojo framework
tags: javascript, dojo, tdd, testing
cover_image: /assets/blog/testing-with-dojo.jpg
published: true
---

When you use the [Dojo cli](https://github.com/dojo/cli) to create an application, it comes with a full test framework for you to use. If like me, you aren't as diligent with your tests as you maybe you could be, that's ok, there's no testing police that will give you a citation, _only your own shame when you try to track down how you broke some feature after some updates you made_. I kid, I kid. But, it is a good idea to have some tests written to make sure core features of your application don't break as you write new code.

When you first create a Dojo application, it will already provide you with some unit tests that you can use as a guide.

<figure class="aligncenter">![](assets/blog/test-structure.png)

<figcaption>Default Dojo Installation  
</figcaption>

</figure>

You can find this sample repo [on github](https://github.com/odoe/dojo-testing).

Let's see what a unit test looks like.

## Running Tests

You can run these tests using `npm test` and you should get results like below.

<figure class="aligncenter">![](assets/blog/test-results.png)

<figcaption>Dojo testing results</figcaption>

</figure>


So what does one of these tests look like?

```ts
// tests/unit/widgets/Profile.ts
const { describe, it } = intern.getInterface("bdd");
import harness from "@dojo/framework/testing/harness";
import { w, v } from "@dojo/framework/widget-core/d";

import Profile from "../../../src/widgets/Profile";
import * as css from "../../../src/widgets/styles/Profile.m.css";

describe("Profile", () => {
  it("default renders correctly", () => {
    const h = harness(() => w(Profile, { username: "Dojo User" }));
    h.expect(() => v("h1", { classes: [css.root] }, ["Welcome Dojo User!"]));
  });
});
```

When testing widgets, you are basically testing that the output of the widget is what you expect, especially when given a set of properties. Ideally, rendering a widget is going to be _[pure function](https://github.com/MostlyAdequate/mostly-adequate-guide/blob/master/ch03.md#chapter-03-pure-happiness-with-pure-functions)_, meaning they should be pretty easy to test when given the same input.

The Dojo framework comes with a [harness](https://github.com/dojo/framework/tree/master/src/testing#harness) helper, which can be used to test your widgets. You can give it a widget, and check that the virtual DOM output is what you expect.

*   Does it render as expected?
*   Does a child widget or element render as expected?
*   Do event handlers work as expected?

## Assertion Templates

The Profile widget we tested above has a property username that we can test against in the output. We could rewrite the entirety of the expected virtual DOM output for each test (that's a lot of typing) or we could create an assertion to test against that would allow us to change the expected properties on each run.

Let's see how that would work.

First, I need to update the Profile widget slightly since the `username` property is required. We can make it optional and provide a default value in the widget.

```ts
// src/widgets/Profile.ts
export interface ProfileProperties {
  username?: string;
}

export default class Profile extends WidgetBase<ProfileProperties> {
  protected render() {
    const { username } = this.properties;
    return v("h1", { classes: [css.root] }, [
      `Welcome ${username || "Stranger"}!`
    ]);
  }
}
```

This is a little safer anyway. Now in my test, I can create my assertion template.

```ts
// tests/unit/widgets/Profile.ts
// Add the assertionTemplate module
import assertionTemplate from "@dojo/framework/testing/assertionTemplate";
...

// Create my assertion
const profileAssertion = assertionTemplate(() =>
  v("h1", { classes: [css.root], "~key": "welcome" }, ["Welcome Stranger!"])
);

describe("Profile", () => {
  it("default renders correctly", () => {
    const h = harness(() => w(Profile, {}));
    // Test against my base assertion
    h.expect(profileAssertion);
  });
});
```

We can test against our base assertion like we did before. In our assertion template, we add a `~key` property to the node so that we can update it's expected output. In a tsx file, this is called `assertion-key`.

We can now test the output if we provide a given property to the widget.

```ts
// src/tests/unit/widgets/Profile.ts
describe("Profile", () => {
  it("default renders correctly", () => {
    const h = harness(() => w(Profile, {}));
    h.expect(profileAssertion);
  });

  it("renders given username correctly", () => {
    // update the expected result with a given username
    const namedAssertion = profileAssertion.setChildren("~welcome", [
      "Welcome Kel Varnsen!"
    ]);
    const h = harness(() => w(Profile, { username: "Kel Varnsen" }));
    h.expect(namedAssertion);
  });
});
```

What the `~key` allows is for us to update that expected portion of our assertion template. So if I provide a `username`, I should expect a different welcome message. The `assertionTemplate.setChildren()` returns a new assertion template you can reference so that you don't need to reset it after each unit test, which is incredibly useful and I think is a nice touch to the library.

You can read more about assertion templates and some of its other useful methods in the [documentation](https://github.com/dojo/framework/tree/master/src/testing#assertion-templates).

## Summary

This was just a quick look at testing with Dojo, but I think it highlights how useful the provided tools are for you test your widgets! Dojo tests use [intern](https://theintern.io/) by default, so you can look at the docs on how to test the business logic of your applications as well. An added benefit here is that intern provides [functional tests](https://theintern.io/docs.html#Intern/4/docs/docs%2Fwriting_tests.md/functional-tests), so you can test the behavior of your application as a user would interact with it. This would require a blog post of its own, but you can look at the [Dojo todo-mvc example](https://github.com/dojo/examples/tree/master/todo-mvc) to see how it uses functional tests.

Now I know everyone is going to go out and write unit tests for all their code!
