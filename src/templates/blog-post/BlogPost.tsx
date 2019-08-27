import { tsx, create } from '@dojo/framework/core/vdom';
import block from '@dojo/framework/core/middleware/block';

import Link from '@dojo/framework/routing/Link';

import compileBlogPost from '../../blocks/compile-blog-post.block';

import Article from '../../widgets/article/Article';
import Card from '../../widgets/card/Card';

import { dateFormatter } from '../../utils/formatter';

export interface PostProperties {
	excerpt?: boolean;
	path: string;
}

const factory = create({ block }).properties<PostProperties>();

export default factory(({ middleware: { block }, properties }) => {
  let { excerpt = false, path }  = properties();
  if (!path.includes('.md')) {
    path = `${path}.md`;
  }
  const post: any = block(compileBlogPost)({
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
});
