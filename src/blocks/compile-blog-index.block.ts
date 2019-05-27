import { join } from 'canonical-path';
import { readdir } from 'fs-extra';

import { getLocalFile, getMetaData } from './utils';

const CONTENT_PATH = join(__dirname, '../../posts');
// https://github.com/dojo/site/blob/master/src/scripts/compile-blog-index.block.ts
export default async function(options: any) {
	const files = await readdir(CONTENT_PATH);
	const blogs: any[] = [];
	for (let file of files) {
		const filePath = join(CONTENT_PATH, file);
		const content = await getLocalFile(filePath);
		const meta = getMetaData(content);

		blogs.push({
			sortDate: new Date(`${meta.date}`),
			file,
			content,
			meta
		});
	}

	return blogs.sort((a, b) => b.sortDate.getTime() - a.sortDate.getTime());
}
