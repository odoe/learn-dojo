import { SiteMeta } from './interfaces';
import { RouteConfig } from '@dojo/framework/routing/interfaces';

export const meta: SiteMeta = {
	title: 'learn dojo',
	author: 'odoenet',
	description: 'byte by byte',
	footerLinks: [
		{
			href: 'https://github.com/odoe/learn-dojo',
			text: 'github'
		},
		{
			href: 'https://dojo.io/',
			text: 'powered by @dojo'
		}
	]
};

export const routes: RouteConfig[] = [
	{
		path: '/{path}',
		outlet: 'blog',
		defaultRoute: true
	}
];

// -------------------------------------
// Plugins for static site generation
// -------------------------------------

// remark plugins with options
export const remarkPlugins = [
	{
		resolve: 'remark-external-links',
		options: { target: '_blank', rel: ['nofollow'] }
	}
];

// rehype plugins with options
export const rehypePlugins = ['@mapbox/rehype-prism', 'rehype-slug'];
