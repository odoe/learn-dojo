import { join } from 'canonical-path';
import { readdir } from 'fs-extra';

import { getLocalFile, getMetaData } from './utils';

const CONTENT_PATH = join(__dirname, '../../posts');

export default async function(options: any) {
	const files = await readdir(CONTENT_PATH);
	const blogs: any[] = [];
	for (let file of files) {
		const filePath = join(CONTENT_PATH, file);
		const content = await getLocalFile(filePath);
		const meta = getMetaData(content);

		blogs.push({
			file,
			content,
			meta
		});
	}
	return blogs.sort((a, b) => (new Date(a.date) > new Date(b.date) ? 1 : -1));
}
