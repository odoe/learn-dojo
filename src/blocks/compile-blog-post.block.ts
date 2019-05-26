import { join } from 'canonical-path';
import { getLocalFile, getMetaData, toVNodes } from './utils';

const CONTENT_PATH = join(__dirname, '../../posts');

export default async function({ path }: { path: string }) {
	const contentPath = join(CONTENT_PATH, path);
	// TODO: add option to return excerpt from blog post
	// raw content
	// rawContent = rawContent.split('<!-- more -->')[0];

	const file = await getLocalFile(contentPath);
	const content = toVNodes(file);
	const meta = await getMetaData(file);
	return { content, meta };
}
