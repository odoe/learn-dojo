---
title: Building a static site with dojo
date: 2019-05-28
author: Rene Rubalcava
description: We'll look at how you can use dojo as a static site generator
tags: javascript, dojo, typescript, webdev
cover_image: /assets/blog/building-static-site-with-dojo.jpg
published: true
---

We've seen how you can use [dojo blocks](https://learn-dojo.com/dojo-from-the-blocks) with [build-time-rendering](https://learn-dojo.com/build-time-rendering-in-dojo) to create static web pages. This is pretty powerful, because it means you _could_ build an entire website without having to back with API and database calls. Of course, this isn't ideal web applications that require dynamic data or handle authorization, but it is ideal for situations where the content is fairly static, like documentation or [this blog](https://github.com/odoe/learn-dojo)! This is very much what something like [gatsby](https://www.gatsbyjs.org/) is for. All the pieces to build a static site generator are there in dojo, you just need to put them together.

## Parsing

I was heavily inspired by what the dojo team is doing with [dojo/site](https://github.com/dojo/site) to statically build the pages for the next [dojo](http://dojo.io/) documentation. I borrowed heavily from their blocks to parse markdown to virtual dom nodes as I found I was recreating the wheel.

My main goal for my static site generator was to parse markdown to pages, specifically blog pages. The core tools in this process are [unified](https://github.com/unifiedjs/unified) and [remark](https://github.com/remarkjs/remark). If you have built sites with gatsby, you may be familiar with these as they are used heavily in gatsby plugins.

Here is a sample of the block used to parse markdown looks like.

```ts
// Converts markdown to VNodes in hyperscript
export const toVNodes = (content: string) => {
	let counter = 0;
	const pipeline = unified()
		.use(markdown as any, { commonmark: true })
		.use(externalLinks, { target: '_blank', rel: [ 'nofollow' ] })
		.use(frontmatter, 'yaml')
		.use(remark2rehype)
		.use(slug)
		.use(rehypePrism);

	const nodes = pipeline.parse(content);
	const result = pipeline.runSync(nodes);
	return toH((tag: string, props: any, children: any[]) => v(tag, { ...props, key: counter++ }, children), result);
};
```

This block function uses `unified` to parse a markdown file. The result of parsing this file is a [markdown abstract tree](https://github.com/syntax-tree/mdast) that is then passed through a series of remark plugins to transform that markdown into a product that we can then parse to HTML with [rehype](https://github.com/rehypejs/rehype) and some other rehype plugins. Once that is done, we can transform this product to hyperscript using [hast-to-hyperscript](https://github.com/syntax-tree/hast-to-hyperscript) using the built in dojo virtual dom tooling to produce the needed nodes.

## Routing

I wasn't just building a static site generator for this blog. I was porting an existing wordpress blog to a static site. So I wanted to make sure that all the existing links out there would still work, so I had to mimic the existing structure. To do this, my routes look like this.

```ts
export default [
	{
		path: '/{path}',
		outlet: 'blog',
		defaultRoute: true
	}
];
```

The root of the route would be `/` and blog posts links would go to `/{path}`. I wanted the home page to consist of a list of the blog posts with the published date and descriptions. So I made a card widget to display these.

```tsx
export default class Card extends WidgetBase<CardProperties> {
	protected render() {
		const { title, date, description, path, cover_image } = this.properties;
		return (
			<section classes={[ css.root ]}>
				<div classes={[ css.column ]}>
					<Link
						to="blog"
						params={{
							// markdown is a posts/ folder with extension .md
							// so clean that up
							path: path.replace('posts/', '').replace('.md', '')
						}}
					>
						{title}
					</Link>
					<p>{dateFormatter(new Date(date))}</p>
					<span>{description}</span>
					<br />
					<Link
						to="blog"
						params={{
							path: path.replace('posts/', '').replace('.md', '')
						}}
					>
						READ MORE
					</Link>
				</div>
				<div classes={[ css.column ]}>
					<img classes={[ css.image ]} src={cover_image} />
				</div>
			</section>
		);
	}
}
```

I'm using the metadata from each blog post to create these cards. I'm using a lot of the front matter for metadata that [dev.to](https://dev.to) uses, because it will make it easier for me to cross-post there as well.

The result is a card that looks similar to this.

![dojo blog card](/assets/blog/dojo-blog-card.png)

## Templates

Blog posts are represented as templates. In this case they can render in a card style for the main page or as the entire blog post. The blog post template looks like this.

```tsx
export default class BlogPost extends WidgetBase<PostProperties> {
	protected render() {
		let { excerpt = false, path } = this.properties;
		if (!path.includes('.md')) {
			path = `${path}.md`;
    }
		// compile the blog post content
		const post: any = this.meta(Block).run(compileBlogPost)({
			path
		});
		if (post) {
      const date = dateFormatter(new Date(post.meta.date));
			// if displayed as a card, just return the content in card format
			if (excerpt) {
				return <Card path={path} {...post.meta} />;
      }
			// or return the content as a full blog post
			return (
				<Content key={post.meta.title}>
					{!excerpt && <img src={post.meta.cover_image} />}
					<Link
						to="blog"
						params={{
							path: path.replace('posts/', '').replace('.md', '')
						}}
					>
						<h2>{post.meta.title}</h2>
					</Link>
					<p>
						{post.meta.author} | {date}
					</p>
					{post.content}
				</Content>
			);
		}
	}
}
```

_The results of this looks just like this blog!_

## Building

In order for the static pages to be built, I need to configure my `.dojorc` correctly with the routes to all my blog posts. Note that `"."` is how I can tell the dojo build-time-render to build a static index page.

```json
{
	"build-app": {
		"build-time-render": {
			"root": "root",
			"paths": [
				"build-time-rendering-in-dojo",
				"building-a-simple-app-in-dojo",
				"build-static-site-with-dojo",
				"creating-a-datepicker-with-dojo",
				"dojo-cli-template-app",
				"dojo-containers",
				"dojo-from-the-blocks",
				"intro-to-the-dojo-registry",
				"intro-to-the-dojo-router",
				"maintain-state-with-dojo-stores",
				"style-dojo-widgets",
				"testing-with-dojo",
				"up-and-running-with-dojo-cli",
				"watch-for-property-changes-in-widgets",
				"web-components-with-dojo",
				"."
			],
			"puppeteerOptions": {
				"args": [ "--no-sandbox", "--disable-setuid-sandbox" ]
			}
		}
	}
}
```

I'm planning on automating the updates of the `.dojorc` with a script that I can run before the build is run, but I haven't gotten that far yet.

Once it's been built, the result is a static website with subdirectories to each page I've built.

![dojo buil time render result](/assets/blog/dojo-btr-built.png)

This means that even if someone is on a slow connection or the javascript doesn't load correctly, my site should still be visible, including the routes of my site.

## Deployment

Since my site doesn't require making any API calls or rely on a server to do any server side rendering, it's fairly easy to deploy to any number of your favorite hosting services. For the record, I tried to deploy to [zeit](https://zeit.co/) and [netlify](https://www.netlify.com/) and they both appeared to work great at first. However, it looks like the subdirectories of my `dist` directory would not deploy, so links to pages other than the main page would not work. If I linked to a page from the main page, dojo routing worked fine, but not when using the URL. I'm sure I just did not configure something correctly, but it wasn't clear to me _what_ I didn't do right.

So at the end of the day, I deployed to [aws s3](https://aws.amazon.com/s3/). Although, s3 configuration isn't exactly _simple_, I know enough to drag and drop the folders over and I could even set up a pipeline from github. I'll probably need to add a `published` tag to my posts like [dev.to](https://dev.to/) does so I an push posts in progress to github without deploying them with the rest of the site.

There is plenty more I want to do with this project going forward!

## For web apps

My blog is not a full blown web application, but that doesn't mean you can't take the same static site generating tools of dojo to build a _mostly_ static site that will also fetch data from external sources and use them both to build powerful web applications. The static site generating tools are just one piece of a larger system of powerful features built in to dojo.

## Try it yourself

If you want to try this dojo static site generator out yourself, you can quickly get started with the following command.

```bash
npx degit odoe/btr-site my-awesome-site
```

You can check out this starter project on [github](https://github.com/odoe/btr-site)!

## Summary

I've had a lot of fun putting this project together and learned a lot about how unified, remark, rehype, and other plugins work, as well as how to really use dojo blocks to do some interesting things. I may not have all the bells and whistles of wordpress, but I don't think I fully need them. Anything substantial that wordpress could tell me, I can get from google analytics and I'm much more comfortable just publishing in markdown anyway. It also won't hurt to save a few bucks on that digital ocean bill :)
