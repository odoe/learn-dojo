const { resolve } = require('path');
const { readFile } = require('fs-extra');

const unified = require('unified');
const markdown = require('remark-parse');
const remark2rehype = require('remark-rehype');
const toH = require('hast-to-hyperscript');
const frontmatter = require('remark-frontmatter');
const parseFrontmatter = require('remark-parse-yaml');
const remarkIframes = require('remark-iframes');

const { v } = require('@dojo/framework/core/vdom');

const { remarkPlugins, rehypePlugins } = require('../site-config');

// ---------------------------------------------------------------------------------------
// Based on https://github.com/dojo/site/blob/master/src/scripts/compile.ts
// ---------------------------------------------------------------------------------------

export const getLocalFile = async (path: string) => {
	path = resolve(__dirname, path);
	return await readFile(path, 'utf-8');
};

// Converts markdown to VNodes in hyperscript
export const toVNodes = (content: string) => {
	let counter = 0;
	let pipeline = unified()
		.use(markdown as any, { commonmark: true })
		.use(remarkIframes, {
			'codesandbox.io': {
				tag: 'iframe',
				width: '100%',
				height: 500,
			},
		})
		.use(remarkIframes, {
			'www.youtube.com': {
				tag: 'iframe',
				width: 560,
				height: 315,
				disabled: false,
				replace: [
					['watch?v=', 'embed/'],
					['http://', 'https://'],
				],
				thumbnail: {
					format: 'http://img.youtube.com/vi/{id}/0.jpg',
					id: '.+/(.+)$',
				},
				removeAfter: '&',
			},
		})
		.use(frontmatter, 'yaml');

	// markdown plugins
	remarkPlugins.forEach((plugin: any) => {
		pipeline =
			typeof plugin === 'string'
				? pipeline.use(require(plugin))
				: pipeline.use(require(plugin.resolve), plugin.options);
	});

	// convert rehype
	pipeline = pipeline.use(remark2rehype);

	// rehype plugins

	rehypePlugins.forEach((plugin: any) => {
		pipeline =
			typeof plugin === 'string'
				? pipeline.use(require(plugin))
				: pipeline.use(require(plugin.resolve), plugin.options);
	});

	const nodes = pipeline.parse(content);
	const result = pipeline.runSync(nodes);
	return toH((tag: string, props: any, children: any[]) => v(tag, { ...props, key: counter++ }, children), result);
};

// Gets yaml metadata from markdown
export const getMetaData = (content: string) => {
	const pipeline = unified().use(markdown, { commonmark: true }).use(frontmatter, 'yaml').use(parseFrontmatter);

	const nodes = pipeline.parse(content);
	const result = pipeline.runSync(nodes);
	const node = result.children.find((child: any) => Boolean(child.type === 'yaml'));
	return node ? node.data.parsedValue : {};
};
