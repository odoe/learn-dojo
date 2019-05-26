import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';
import Link from '@dojo/framework/routing/Link';

import compileBlogPost from '../../blocks/compile-blog-post.block';

// import * as css from './BlogPost.m.css';
import Block from '@dojo/framework/widget-core/meta/Block';
import Content from '../../widgets/content/Content';

export interface PostProperties {
	excerpt?: boolean;
	path: string;
}

const options = { year: 'numeric', month: 'long', day: 'numeric' };
const dateFormatter = new Intl.DateTimeFormat('en-US', options);

export default class BlogPost extends WidgetBase<PostProperties> {
	protected render() {
		console.log(this.properties);
		let { excerpt = false, path } = this.properties;
		if (!path.includes('.md')) {
			path = `${path}.md`;
		}
		const post: any = this.meta(Block).run(compileBlogPost)({
			path
		});
		if (post) {
			const date = dateFormatter.format(new Date(post.meta.date));
			const postContent = [
				<p>
					{post.meta.author} | {date}
				</p>,
				excerpt ? post.meta.description : post.content
			];
			const readMoreLink = excerpt && (
				<Content key={post.meta.title}>
					<Link
						to="blog-post"
						params={{
							path: path.replace('posts/', '').replace('.md', '')
						}}
					>
						READ MORE
					</Link>
				</Content>
			);
			return (
				<Content key={post.meta.title}>
					<Link
						to="blog-post"
						params={{
							path: path.replace('posts/', '').replace('.md', '')
						}}
					>
						{post.meta.title}
					</Link>
					{postContent}
					{readMoreLink}
				</Content>
			);
		}
	}
}
