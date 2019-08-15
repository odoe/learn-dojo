import { tsx, create } from '@dojo/framework/core/vdom';
import block from '@dojo/framework/core/middleware/block';


import compileBlogIndex from '../blocks/compile-blog-index.block';

import Post from '../templates/blog-post/BlogPost';

import * as css from './Blog.m.css';

const factory = create({ block }).properties<{ standalone?: boolean; path?: string }>();

export default factory(({ middleware: { block }, properties }) => {
  const { standalone = false, path } = properties();
  const blogs: any = block(compileBlogIndex)({});

  return (
    <div classes={[ css.root ]}>
      {!standalone ? (
        blogs &&
        blogs.map((blog: any) => [
          <Post key={blog.file} path={blog.file} excerpt />,
          <hr key={blog.file} />
        ])
      ) : (
        undefined
      )}
      {path && path.length && <Post key={path} path={path} />}
    </div>
  );
});

