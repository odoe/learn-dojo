import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';
import Link from '@dojo/framework/routing/Link';

import compileBlogPost from '../../blocks/compile-blog-post.block';

import Block from '@dojo/framework/widget-core/meta/Block';
import Article from '../../widgets/article/Article';
import Card from '../../widgets/card/Card';

import { dateFormatter } from '../../utils/formatter';

export interface PostProperties {
	excerpt?: boolean;
	path: string;
}

export default class BlogPost extends WidgetBase<PostProperties> {
	protected render() {
		let { excerpt = false, path } = this.properties;
		if (!path.includes('.md')) {
			path = `${path}.md`;
		}
		const post: any = this.meta(Block).run(compileBlogPost)({
			path
		});
		if (post) {
			const date = dateFormatter(new Date(post.meta.date));
			if (excerpt) {
				return <Card path={path} {...post.meta} />;
			}
			return (
        <section>
          {!excerpt && <img src={post.meta.cover_image} />}
          <Article key={post.meta.title}>
            <Link
              to="blog"
              params={{
                path: path.replace('posts/', '').replace('.md', '')
              }}
            >
              <h2>{post.meta.title}</h2>
            </Link>
            <p>
              {`${post.meta.author} | ${date}`}
            </p>
            {post.content}
          </Article>
        </section>
			);
		}
	}
}
