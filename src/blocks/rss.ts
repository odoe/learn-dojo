// adapted from dojo blog https://github.com/dojo/site/blob/master/src/blog/rss.ts
import { DNode } from '@dojo/framework/core/interfaces';

import { Feed } from 'feed';
import { join } from 'path';
import { outputFileSync } from 'fs-extra';

const outputDirectory = join(__dirname, '../../output/dist');

export interface BlogEntry {
	title: string;
	author: string;
	link: string;
	image: string;
	description: string;
	content: DNode;
	date: Date;
}

// In order to not spam people's RSS feed when this goes live, we skip items before May 2019
const skipItemsBefore = new Date(2019, 4, 1).getTime();

export function createBlogFeed(files: any[]) {
	const feed = new Feed({
		title: 'Learn Dojo',
		description: 'Learn Dojo, byte by byte',
		id: 'https://learn-dojo.com',
		link: 'https://learn-dojo.com',
		favicon: 'https://learn-dojo.com/favicon.ico',
		copyright: 'All rights reserved 2019, odoenet',
		feedLinks: {
			atom: 'https://learn-dojo.com/atom'
		},
		author: {
			name: 'Rene Rubalcava'
		},
		feed: ''
	});

	for (let file of files) {
    const { content, description, title, author } = file.meta;
    const { sortDate } = file;
		const publishedDate = sortDate instanceof Date ? sortDate : new Date();

		if (publishedDate.getTime() < skipItemsBefore) {
			continue;
		}

		const url = `https://learn-dojo.com/${file.file.replace('.md', '')}`;
		const item = {
			title: typeof title === 'string' ? title : '',
			id: url,
			author: [{ name: typeof author === 'string' ? author : '' }],
			link: url,
			description: description,
			content: content,
			date: publishedDate,
			published: publishedDate
		};

		// feed
		feed.addItem(item);
	}

	const feedOutputPath = join(outputDirectory, 'atom.xml');
  outputFileSync(feedOutputPath, feed.atom1())
};
