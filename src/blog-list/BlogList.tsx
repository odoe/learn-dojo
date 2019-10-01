import { tsx, create } from '@dojo/framework/core/vdom';
import block from '@dojo/framework/core/middleware/block';

import Card from '../widgets/card/Card';
import compileBlogIndex from '../blocks/compile-blog-index.block';

const factory = create({ block });

export default factory(({ middleware: { block } }) => {
    const blogs = block(compileBlogIndex)({}) || [];
    console.warn(blogs);
    return (
        <virtual>
            {blogs.map((blog) => <Card key={blog.file} path={blog.file} {...blog.meta} />)}
        </virtual>
    );
});
